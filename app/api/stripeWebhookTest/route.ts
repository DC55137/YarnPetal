import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import prismadb from "@/lib/prismadb";
import { generateOrderNumber } from "@/lib/functions";
import { Resend } from "resend";
import { CartItem } from "@/src/stores/cart-store"; // Import the CartItem type

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
    const sessionMetadata = session.metadata;
    const email = sessionMetadata?.email || "";
    const phone = sessionMetadata?.phone || "";
    const firstName = sessionMetadata?.firstName || "";
    const lastName = sessionMetadata?.lastName || "";
    const address = sessionMetadata?.address || "";
    const deliveryMethod = sessionMetadata?.deliveryMethod || "";
    const price = sessionMetadata?.price || "";

    const cartItems = sessionMetadata?.cartItems
      ? JSON.parse(sessionMetadata.cartItems)
      : [];

    console.log("sessionMetadata", sessionMetadata);

    // send an email confirmating a purchase
    const resendApiKey = process.env.RESEND_API_KEY;
    const resend = new Resend(resendApiKey);
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "daniel.correa55137@gmail.com",
      subject: `Purchase made: ${email}`,
      html: `
            <strong>Subject:</strong> Purchase made<br />
            <strong>First Name:</strong> ${firstName}<br />
            <strong>Last Name:</strong> ${lastName}<br />
            <strong>Email:</strong> ${email}<br />
            <strong>Phone:</strong> ${phone}<br />
            <strong>Address:</strong> ${address}<br />
            <strong>Delivery Method:</strong> ${deliveryMethod}<br />
            <strong>Price:</strong> ${price}<br />
            <strong>Cart Items:</strong> ${cartItems
              .map(
                (item: CartItem) =>
                  `${item.bundleName} x${item.quantity} ${item.product.animal.name}`
              )
              .join(", ")}<br />
              `,
    });

    let orderNumber = generateOrderNumber();
    let order = await prismadb.order.findFirst({
      where: { orderNumber },
    });
    while (order) {
      orderNumber = generateOrderNumber();
      order = await prismadb.order.findUnique({
        where: { orderNumber },
      });
    }

    order = await prismadb.order.create({
      data: {
        orderNumber,
        firstName,
        lastName,
        email,
        phone,
        deliveryMethod,
        total: Number(price),
        orderItems: {
          create: cartItems.map((item: CartItem) => ({
            hat: item.hat,
            productId: item.product.id,
            color: item.color,
            bundleImage: item.product.imageUrl,
            quantity: item.quantity,
            price: item.bundlePrice,
            bundle: item.bundleName,
          })),
        },
      },
    });

    return new NextResponse(null, { status: 200 });
  } else {
    return new NextResponse(
      `Webhook Error: Unhandled event type ${event.type}`,
      { status: 200 }
    );
  }
}
