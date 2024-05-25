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

    const order = // Update the order status to paid
      await prismadb.order.update({
        where: { id: Number(orderId) },
        include: {
          orderItems: true,
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
            <strong>Subject:</strong> Purchase made<br />
            <strong>First Name:</strong> ${order.firstName}<br />
            <strong>Last Name:</strong> ${order.lastName}<br />
            <strong>Email:</strong> ${order.email}<br />
            <strong>Phone:</strong> ${order.phone}<br />
            <strong>Address:</strong> ${order.address}<br />
            <strong>Apartment:</strong> ${order.apartment}<br />
            <strong>City:</strong> ${order.city}<br />
            <strong>Country:</strong> ${order.country}<br />
            <strong>Region:</strong> ${order.region}<br />
            <strong>Postal Code:</strong> ${order.postalCode}<br />
            <strong>Delivery Method:</strong> ${order.deliveryMethod}<br />
            <strong>Price:</strong> ${order.total}<br />
            <strong>Cart Items:</strong> ${order.orderItems.map(
              (item) =>
                `${item.bundle} x${item.quantity} ${item.price} ${item.color} ${item.bundleImage}`
            )}<br />
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
