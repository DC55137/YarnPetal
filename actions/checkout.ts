"use server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import prismadb from "@/lib/prismadb";
import { CartItem } from "@/src/stores/cart-store";
import { generateOrderNumber } from "@/lib/functions";
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
    // Adjust color stock
    await prismadb.color.update({
      where: { id: item.color.id },
      data: { stock: { decrement: item.quantity } },
    });

    // Adjust flower stock
    for (const flower of item.flowers) {
      await prismadb.flower.update({
        where: { id: flower.flower.id },
        data: { stock: { decrement: item.quantity } },
      });
    }

    // Adjust animals and their hats stock
    for (const animalWithHat of item.animals) {
      await prismadb.animal.update({
        where: { id: animalWithHat.animal.id },
        data: { stock: { decrement: item.quantity } },
      });

      if (animalWithHat.hat) {
        await prismadb.hat.update({
          where: { id: animalWithHat.hat.id },
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

  // Create line items for Stripe
  const cartItems: Stripe.Checkout.SessionCreateParams.LineItem[] = cart.map(
    (item) => ({
      quantity: item.quantity,
      price_data: {
        currency: "aud",
        product_data: {
          name: `${item.color.name} Bundle - ${item.size.size}`,
          description: `Flowers: ${item.flowers
            .map((f) => f.flower.name)
            .join(", ")}\nAnimals: ${item.animals
            .map(
              (a) => `${a.animal.name}${a.hat ? ` with ${a.hat.name} hat` : ""}`
            )
            .join(", ")}`,
        },
        unit_amount: Math.round(item.price * 100),
      },
    })
  );

  // Add delivery fee as a separate line item
  const deliveryLineItem: Stripe.Checkout.SessionCreateParams.LineItem = {
    quantity: 1,
    price_data: {
      currency: "aud",
      product_data: {
        name: deliveryMethod,
        description: "Delivery fee",
      },
      unit_amount:
        Math.round(
          price -
            cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
        ) * 100,
    },
  };

  const line_items = [...cartItems, deliveryLineItem];

  // Calculate extra animal price if applicable
  const getExtraAnimalPrice = (item: CartItem) => {
    if (item.animals.length > item.size.baseAnimalLimit) {
      return item.size.extraAnimalPrice;
    }
    return 0;
  };

  // Save order details in the database
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
          colorId: item.color.id,
          sizeId: item.size.id,
          quantity: item.quantity,
          basePrice: item.price - getExtraAnimalPrice(item), // Base price without extra animal
          extraAnimalPrice: getExtraAnimalPrice(item), // Price for extra animal if added
          totalPrice: item.price, // Total price including extras
          flowers: {
            create: item.flowers.map((flower) => ({
              flowerId: flower.flower.id,
              quantity: 1,
              position: flower.position,
            })),
          },
          // Handle base animal and its hat
          baseAnimalId: item.animals[0]?.animal.id || null,
          baseAnimalHatId: item.animals[0]?.hat?.id || null,
          // Handle extra animal and its hat if present
          extraAnimalId: item.animals[1]?.animal.id || null,
          extraAnimalHatId: item.animals[1]?.hat?.id || null,
        })),
      },
    },
    include: {
      orderItems: {
        include: {
          color: true,
          size: true,
          flowers: {
            include: {
              flower: true,
            },
          },
          baseAnimal: true,
          baseAnimalHat: true,
          extraAnimal: true,
          extraAnimalHat: true,
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
            <strong>Base Animal:</strong> ${
              item.baseAnimal ? item.baseAnimal.name : "None"
            }${
              item.baseAnimalHat ? ` with ${item.baseAnimalHat.name}` : ""
            } <br />
            ${
              item.extraAnimal
                ? `<strong>Extra Animal:</strong> ${item.extraAnimal.name}${
                    item.extraAnimalHat
                      ? ` with ${item.extraAnimalHat.name}`
                      : ""
                  } <br />`
                : ""
            }
            <strong>Quantity:</strong> ${item.quantity} <br />
            <strong>Total Price:</strong> $${item.totalPrice.toFixed(2)} <br />
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
    return { url: "none", orderNumber: order.orderNumber };
  }

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/order-confirmation/${order.orderNumber}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout?canceled=true`,
    customer_email: email,
    metadata: {
      orderId: order.id.toString(),
    },
  });

  return { url: session.url, orderNumber: order.orderNumber };
}
