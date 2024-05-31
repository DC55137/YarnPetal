"use server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import prismadb from "@/lib/prismadb";
import { CartItem } from "@/src/stores/cart-store";
import { generateOrderNumber } from "@/lib/functions";
import { Prisma } from "@prisma/client"; // Import Prisma namespace for types

type checkoutProps = {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    deliveryMethod: string;
    price: number;
    cart: CartItem[];
    address?: string;
    apartment?: string;
    city?: string;
    country?: string;
    region?: string;
    postalCode?: string;
  };
};

export async function checkout({ formData }: checkoutProps) {
  const {
    firstName,
    lastName,
    email,
    phone,
    deliveryMethod,
    price,
    cart,
    address,
    apartment,
    city,
    country,
    region,
    postalCode,
  } = formData;

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = cart.map(
    (item) => {
      const productName = item.bundleTheme.name
        ? `${item.bundleName} - ${item.animal.name} - ${item.bundleTheme.name} `
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
    }
  );

  // Save order details in the database and generate an order ID
  const order = await prismadb.order.create({
    data: {
      orderNumber: generateOrderNumber(),
      email,
      phone,
      firstName,
      lastName,
      deliveryMethod,
      total: price,
      address,
      apartment,
      city,
      country,
      region,
      postalCode,
      orderItems: {
        create: cart.map((item) => ({
          bundleTheme: { connect: { id: item.bundleTheme.id } },
          animal: { connect: { id: item.animal.id } },
          hat: item.hat ? { connect: { id: item.hat.id } } : undefined,
          quantity: item.quantity,
          extras: item.extras as Prisma.InputJsonValue, // Cast to InputJsonValue
          price: item.bundlePrice,
        })),
      },
    },
  });
  if (deliveryMethod === "Pick Up (PAY CASH)") {
    return { url: "none", orderNumber: order.orderNumber };
  }

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/order-confirmation/${order.orderNumber}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/?canceled=true`,
    customer_email: email,
    metadata: {
      orderId: order.id.toString(), // Pass the order ID in the metadata
    },
  });

  return { url: session.url, orderNumber: order.orderNumber };
}
