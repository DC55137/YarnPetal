import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import prismadb from "@/lib/prismadb";
import { Resend } from "resend";

async function adjustStock(orderItems: any[]) {
  for (const item of orderItems) {
    // Adjust color stock
    await prismadb.color.update({
      where: { id: item.colorId },
      data: { stock: { decrement: item.quantity } },
    });

    // Adjust flower stock
    for (const flowerSelection of item.flowers) {
      await prismadb.flower.update({
        where: { id: flowerSelection.flowerId },
        data: { stock: { decrement: item.quantity } },
      });
    }

    // Adjust animal stock if present
    if (item.animalId) {
      await prismadb.animal.update({
        where: { id: item.animalId },
        data: { stock: { decrement: item.quantity } },
      });
    }

    // Adjust hat stock if present
    if (item.hatId) {
      await prismadb.hat.update({
        where: { id: item.hatId },
        data: { stock: { decrement: item.quantity } },
      });
    }
  }
}

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

    const order = await prismadb.order.findUnique({
      where: { id: Number(orderId) },
      include: {
        orderItems: {
          include: {
            color: true,
            size: true,
            animal: true,
            hat: true,
            flowers: {
              include: {
                flower: true,
              },
            },
          },
        },
      },
    });

    if (!order) {
      return new NextResponse("Order not found", { status: 404 });
    }

    // Update order to paid
    await prismadb.order.update({
      where: { id: Number(orderId) },
      data: { paid: true },
    });

    // Adjust stock
    await adjustStock(order.orderItems);

    // Send confirmation email
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
      <h2>Order Summary</h2>
      <ul>
        <li><strong>Order ID:</strong> ${order.id}</li>
        <li><strong>Order Number:</strong> ${order.orderNumber}</li>
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
        ${
          order.address
            ? `
        <li><strong>Address:</strong> ${order.address}
          ${order.apartment ? `, ${order.apartment}` : ""}
          ${order.city ? `, ${order.city}` : ""}
          ${order.region ? `, ${order.region}` : ""}
          ${order.postalCode ? `, ${order.postalCode}` : ""}
          ${order.country ? `, ${order.country}` : ""}
        </li>
        `
            : ""
        }
      </ul>
      <h2>Items Purchased</h2>
      <ul>
        ${order.orderItems
          .map(
            (item) => `
          <li>
            <strong>Color:</strong> ${item.color.name} <br />
            <strong>Size:</strong> ${item.size.size} <br />
            <strong>Flowers:</strong> ${item.flowers
              .map((f) => f.flower.name)
              .join(", ")} <br />
            ${
              item.animal
                ? `<strong>Animal:</strong> ${item.animal.name} <br />`
                : ""
            }
            ${item.hat ? `<strong>Hat:</strong> ${item.hat.name} <br />` : ""}
            <strong>Quantity:</strong> ${item.quantity} <br />
            <strong>Price:</strong> $${item.price.toFixed(2)} <br />
            <img src="${item.color.imageBack}" alt="${
              item.color.name
            }" width="100" />
          </li>
        `
          )
          .join("")}
      </ul>
      `,
    });

    return new NextResponse(null, { status: 200 });
  }

  return new NextResponse(`Webhook Error: Unhandled event type ${event.type}`, {
    status: 200,
  });
}
