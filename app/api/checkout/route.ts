import Stripe from "stripe";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import prismadb from "@/lib/prismadb";
import { CartItem } from "@/src/stores/cart-store";
import { generateOrderNumber } from "@/lib/functions";

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
      cartItems,
    } = body as {
      email: string;
      phone: string;
      firstName: string;
      lastName: string;
      address: string;
      deliveryMethod: string;
      discountCode: string;
      price: number;
      cartItems: CartItem[];
    };

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

    // Save cart items in the database and generate an order ID
    const order = await prismadb.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        email,
        phone,
        firstName,
        lastName,
        shippingAddress: address,
        deliveryMethod,
        total: price,
        orderItems: {
          create: cartItems.map((item) => ({
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

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/order-confirmation/${order.orderNumber}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/?canceled=true`,
      customer_email: email,
      metadata: {
        orderId: order.id.toString(),
        email,
        phone,
        firstName,
        lastName,
        address,
        deliveryMethod,
        price: price.toString(),
        discountCode: discountCode ? discountCode.toUpperCase() : "",
        discountApplied: discountCode ? "true" : "false",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("[YARN_PETALS_CHECKOUT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
