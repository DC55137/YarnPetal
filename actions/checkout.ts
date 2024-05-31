"use server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import prismadb from "@/lib/prismadb";
import { CartItem } from "@/src/stores/cart-store";
import { generateOrderNumber } from "@/lib/functions";

type checkoutProps = {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    deliveryMethod: string;
    price: number;
    cartItems: CartItem[];
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
    cartItems,
    address,
    apartment,
    city,
    country,
    region,
    postalCode,
  } = formData;

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] =
    cartItems.map((item) => {
      const productName = item.bundleTheme.name
        ? `${item.bundleName} - ${item.animal.name} - ${item.color} `
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
      orderId: order.id.toString(), // Pass the order ID in the metadata
    },
  });

  return { url: session.url };
}
