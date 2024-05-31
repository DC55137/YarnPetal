import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import prismadb from "@/lib/prismadb";
import { Resend } from "resend";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET_TEST!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId;

    if (!orderId) {
      return new NextResponse("Order ID not found in metadata", {
        status: 400,
      });
    }

    const order = await prismadb.order.update({
      where: { id: Number(orderId) },
      include: {
        orderItems: {
          include: {
            bundleTheme: true,
            animal: true,
            hat: true,
          },
        },
      },
      data: { paid: true },
    });

    if (!order) {
      return new NextResponse("Order not found", { status: 404 });
    }

    // Send an email confirming the purchase
    const resendApiKey = process.env.RESEND_API_KEY;
    const resend = new Resend(resendApiKey);
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "daniel.correa55137@gmail.com",
      subject: `Purchase made: ${order.email}`,
      html: `
      <h1>Purchase Made</h1>
      <p>by ${order.firstName} ${order.lastName},</p>
      <p>We are excited to confirm your order. Below are the details of your purchase:</p>
            <strong>Price:</strong> ${order.total}<br />
            <h2>Order Summary</h2>
            <ul>
              <li><strong>Order ID:</strong> ${order.id}</li>
              <li><strong>Order Date:</strong> ${new Date(
                order.createdAt
              ).toLocaleDateString()}</li>
              <li><strong>Delivery Method:</strong> ${order.deliveryMethod}</li>
              <li><strong>Total Price:</strong> $${order.total.toFixed(2)}</li>
            </ul>
            <h2>Customer Information</h2>
            <ul>
              <li><strong>Email:</strong> ${order.email}</li>
              <li><strong>Phone:</strong> ${order.phone}</li>
              <li><strong>Address:</strong> ${order.address}, ${
        order.apartment
      }, ${order.city}, ${order.region}, ${order.postalCode}, ${
        order.country
      }</li>
            </ul>
            <h2>Items Purchased</h2>
            <ul>
              ${order.orderItems
                .map(
                  (item) => `
                <li>
                  <strong>Bundle Theme:</strong> ${item.bundleTheme.name} <br />
                  <strong>Animal:</strong> ${item.animal.name} <br />
                  <strong>Hat:</strong> ${
                    item.hat ? item.hat.name : "No hat"
                  } <br />
                  <strong>Quantity:</strong> ${item.quantity} <br />
                  <strong>Price:</strong> $${item.price.toFixed(2)} <br />
                  <img src="${item.bundleTheme.imageBlank}" alt="${
                    item.bundleTheme.name
                  }" width="100" />
                </li>
              `
                )
                .join("")}
            </ul>
              `,
    });

    return new NextResponse(null, { status: 200 });
  } else {
    return new NextResponse(
      `Webhook Error: Unhandled event type ${event.type}`,
      { status: 200 }
    );
  }
}
