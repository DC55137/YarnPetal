"use server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import prismadb from "@/lib/prismadb";
import { generateOrderNumber } from "@/lib/functions";
import { Resend } from "resend";

// Remove the CartItem import and use our ExtendedCartItem type
type ExtendedCartItem = {
  size: {
    id: number;
    size: string;
    price: number;
    smallFlowerLimit: number;
    mainFlowerLimit: number;
    baseAnimalLimit: number;
    maxExtraAnimals: number;
    extraAnimalPrice: number;
    dimensionScale: number;
    image: string;
  };
  color: {
    id: number;
    name: string;
    imageBack: string;
    imageFront: string;
  };
  flowers: Array<{
    flower: {
      id: number;
      name: string;
      imageSingle: string;
    };
    position: number;
  }>;
  specialFlower: {
    specialFlower: {
      id: number;
      name: string;
      imageSingle: string;
      price: number;
    };
    position: number;
  } | null;
  animals: Array<{
    animal: {
      id: number;
      name: string;
      imageUrl: string;
    };
    hat: {
      id: number;
      name: string;
      imageUrl: string;
    } | null;
    position: number;
  }>;
  quantity: number;
  basePrice: number;
  extraAnimalPrice: number;
  specialFlowerPrice: number;
  totalPrice: number;
};

type checkoutProps = {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    deliveryMethod: string;
    price: number;
    cart: ExtendedCartItem[];
    notes?: string;
    address?: string;
    apartment?: string;
    city?: string;
    country?: string;
    region?: string;
    postalCode?: string;
  };
};

async function adjustStock(cart: ExtendedCartItem[]) {
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

    // Adjust special flower stock if present
    if (item.specialFlower) {
      await prismadb.specialFlower.update({
        where: { id: item.specialFlower.specialFlower.id },
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
    notes,
    address,
    apartment,
    city,
    country,
    region,
    postalCode,
  } = formData;

  // Create line items for Stripe with detailed price breakdown
  const cartItems: Stripe.Checkout.SessionCreateParams.LineItem[] = cart.map(
    (item) => ({
      quantity: item.quantity,
      price_data: {
        currency: "aud",
        product_data: {
          name: `${item.color.name} Bundle - ${item.size.size}`,
          description: `Base Price: $${item.basePrice.toFixed(2)}${
            item.extraAnimalPrice > 0
              ? `\nExtra Animal: +$${item.extraAnimalPrice.toFixed(2)}`
              : ""
          }${
            item.specialFlower
              ? `\nSpecial Flower (${
                  item.specialFlower.specialFlower.name
                }): +$${item.specialFlowerPrice.toFixed(2)}`
              : ""
          }\n\nFlowers: ${item.flowers
            .map((f) => f.flower.name)
            .join(", ")}\nAnimals: ${item.animals
            .map(
              (a) => `${a.animal.name}${a.hat ? ` with ${a.hat.name} hat` : ""}`
            )
            .join(", ")}`,
        },
        unit_amount: Math.round(item.totalPrice * 100),
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
            cart.reduce((acc, item) => acc + item.totalPrice * item.quantity, 0)
        ) * 100,
    },
  };

  const line_items = [...cartItems, deliveryLineItem];

  // Save order details in the database
  const order = await prismadb.order.create({
    data: {
      orderNumber: generateOrderNumber(),
      email,
      phone,
      firstName,
      lastName,
      deliveryMethod,
      notes,
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
          basePrice: item.basePrice,
          extraAnimalPrice: item.extraAnimalPrice,
          specialFlowerPrice: item.specialFlowerPrice || 0,
          totalPrice: item.totalPrice,
          specialFlowerId: item.specialFlower?.specialFlower.id || null,
          flowers: {
            create: item.flowers.map((flower) => ({
              flowerId: flower.flower.id,
              quantity: 1,
              position: flower.position,
            })),
          },
          baseAnimalId: item.animals[0]?.animal.id || null,
          baseAnimalHatId: item.animals[0]?.hat?.id || null,
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
          specialFlower: true,
          baseAnimal: true,
          baseAnimalHat: true,
          extraAnimal: true,
          extraAnimalHat: true,
        },
      },
    },
  });

  if (deliveryMethod === "Pick Up (PAY CASH)") {
    try {
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
      ${
        order.notes
          ? `
        <h2>Special Notes for Floral Artisan</h2>
        <p style="padding: 10px; background-color: #f9f9f9; border-left: 4px solid #4f46e5; margin: 10px 0;">
          ${order.notes}
        </p>
        `
          : ""
      }
      <h2>Items Purchased</h2>
      <ul>
        ${order.orderItems
          .map(
            (item) => `
          <li style="margin-bottom: 20px; padding: 15px; border: 1px solid #eee; border-radius: 5px;">
            <h3 style="margin: 0 0 10px 0;">${item.color.name} Bundle (${
              item.size.size
            })</h3>
            
            <div style="margin-bottom: 10px;">
              <strong>Base Price:</strong> $${item.basePrice.toFixed(2)}<br />
              ${
                item.extraAnimalPrice > 0
                  ? `<strong style="color: #2563eb;">Extra Animal:</strong> +$${item.extraAnimalPrice.toFixed(
                      2
                    )}<br />`
                  : ""
              }
              ${
                item.specialFlowerPrice > 0
                  ? `<strong style="color: #db2777;">Special Flower:</strong> +$${item.specialFlowerPrice.toFixed(
                      2
                    )}<br />`
                  : ""
              }
              <strong>Total per item:</strong> $${item.totalPrice.toFixed(2)}
            </div>

            <strong>Flowers:</strong> ${item.flowers
              .map((f) => f.flower.name)
              .join(", ")} <br />
            ${
              item.specialFlower
                ? `<strong style="color: #db2777;">Special Flower:</strong> ${item.specialFlower.name} <br />`
                : ""
            }
            <strong>Base Animal:</strong> ${
              item.baseAnimal ? item.baseAnimal.name : "None"
            }${
              item.baseAnimalHat ? ` with ${item.baseAnimalHat.name}` : ""
            } <br />
            ${
              item.extraAnimal
                ? `<strong style="color: #2563eb;">Extra Animal:</strong> ${
                    item.extraAnimal.name
                  }${
                    item.extraAnimalHat
                      ? ` with ${item.extraAnimalHat.name}`
                      : ""
                  } <br />`
                : ""
            }
            
            <div style="margin-top: 10px;">
              <strong>Quantity:</strong> ${item.quantity}<br />
              <strong>Item Total:</strong> $${(
                item.totalPrice * item.quantity
              ).toFixed(2)}
            </div>
            
            <div style="margin-top: 10px;">
              <img src="${item.color.imageBack}" alt="${
              item.color.name
            }" width="100" style="border-radius: 5px;" />
            </div>
          </li>
        `
          )
          .join("")}
      </ul>
      `,
      });
      return {
        url: `/order-confirmation/${order.orderNumber}`,
        orderNumber: order.orderNumber,
      };
    } catch (error) {
      console.error("Error processing pick-up order:", error);
      throw new Error("Failed to process pick-up order");
    }
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

  return {
    url: session.url || `/order-confirmation/${order.orderNumber}`,
    orderNumber: order.orderNumber,
  };
}
