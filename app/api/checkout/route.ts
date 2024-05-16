import Stripe from "stripe";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { CartItem } from "@/src/stores/cart-store";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      email,
      phone,
      firstName,
      lastName,
      address,
      deliveryMethod,
      discountCode,
      price,
      cartItems, // Include this to accept cart items
    } = body as {
      email: string;
      phone: string;
      firstName: string;
      lastName: string;
      address: string;
      deliveryMethod: string;
      discountCode: string;
      price: number;
      cartItems: CartItem[]; // Include this to accept cart items
    };

    const bundleNamesQantityAndAnimal = cartItems
      .map((item) => {
        return `${item.bundleName} x${item.quantity} ${item.product.animal.name}`;
      })
      .join(", ");

    const bundleNames = cartItems.map((item) => item.bundleName).join(", ");

    const productName = discountCode
      ? `credit(s) - Discount: ${discountCode.toUpperCase()} ${discountCode}% off`
      : `
        ${bundleNamesQantityAndAnimal} 
      `;

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] =
      cartItems.map((item) => {
        const productName = item.product.animal
          ? `${item.bundleName} - ${item.product.animal.name} - ${item.color} `
          : item.bundleName;
        return {
          quantity: item.quantity,
          price_data: {
            currency: "aud",
            product_data: {
              name: productName,
            },
            unit_amount: Math.round(item.bundlePrice * 100), // Use item price here
          },
        };
      });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/?canceled=true`,
      customer_email: email,
      metadata: {
        email,
        phone,
        firstName,
        lastName,
        address,
        deliveryMethod,
        price: price.toString(),
        discountCode: discountCode ? discountCode.toUpperCase() : "",
        discountApplied: discountCode ? "true" : "false",
        cartItems: bundleNamesQantityAndAnimal, // Store cart items as a JSON string
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("[YARN_PETALS_CHECKOUT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
