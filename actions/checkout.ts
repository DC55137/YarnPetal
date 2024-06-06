"use server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import prismadb from "@/lib/prismadb";
import { CartItem } from "@/src/stores/cart-store";
import { generateOrderNumber } from "@/lib/functions";
import { Prisma } from "@prisma/client"; // Import Prisma namespace for types
import { Resend } from "resend";

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

async function adjustStock(cart: CartItem[]) {
  for (const item of cart) {
    await prismadb.bundleTheme.update({
      where: { id: item.bundleTheme.id },
      data: { stock: { decrement: item.quantity } },
    });

    await prismadb.animal.update({
      where: { id: item.animal.id },
      data: { stock: { decrement: item.quantity } },
    });

    if (item.hat) {
      await prismadb.hat.update({
        where: { id: item.hat.id },
        data: { stock: { decrement: item.quantity } },
      });
    }

    for (const extra of item.extras) {
      if (extra.type === "flower") {
        await prismadb.flower.update({
          where: { id: extra.item.id },
          data: { stock: { decrement: item.quantity } },
        });
      } else if (extra.type === "animal") {
        await prismadb.animal.update({
          where: { id: extra.item.id },
          data: { stock: { decrement: item.quantity } },
        });
      }
      // Decrement stock for extra animal's hat if exists
      if (extra.hat) {
        await prismadb.hat.update({
          where: { id: extra.hat.id },
          data: { stock: { decrement: item.quantity } },
        });
      }
    }
  }
}

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
          hat: { connect: { id: item.hat.id } },
          quantity: item.quantity,
          extras: item.extras as Prisma.InputJsonValue, // Cast to InputJsonValue
          price: item.bundlePrice,
        })),
      },
    },
    include: {
      orderItems: {
        include: {
          bundleTheme: true,
          animal: true,
          hat: true,
        },
      },
    },
  });

  if (deliveryMethod === "Pick Up (PAY CASH)") {
    await adjustStock(cart);
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
    return { url: "none", orderNumber: order.orderNumber };
  }

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/order-confirmation/${order.orderNumber}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout?canceled=true`,
    customer_email: email,

    metadata: {
      orderId: order.id.toString(), // Pass the order ID in the metadata
    },
  });

  return { url: session.url, orderNumber: order.orderNumber };
}
