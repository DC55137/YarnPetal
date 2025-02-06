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

    // Adjust special flower stock if present
    if (item.specialFlowerId) {
      await prismadb.specialFlower.update({
        where: { id: item.specialFlowerId },
        data: { stock: { decrement: item.quantity } },
      });
    }

    // Adjust base animal stock if present
    if (item.baseAnimalId) {
      await prismadb.animal.update({
        where: { id: item.baseAnimalId },
        data: { stock: { decrement: item.quantity } },
      });
    }

    // Adjust base animal hat stock if present
    if (item.baseAnimalHatId) {
      await prismadb.hat.update({
        where: { id: item.baseAnimalHatId },
        data: { stock: { decrement: item.quantity } },
      });
    }

    // Adjust extra animal stock if present
    if (item.extraAnimalId) {
      await prismadb.animal.update({
        where: { id: item.extraAnimalId },
        data: { stock: { decrement: item.quantity } },
      });
    }

    // Adjust extra animal hat stock if present
    if (item.extraAnimalHatId) {
      await prismadb.hat.update({
        where: { id: item.extraAnimalHatId },
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
            baseAnimal: true,
            baseAnimalHat: true,
            extraAnimal: true,
            extraAnimalHat: true,
            specialFlower: true,
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
      ${
        order.notes
          ? `
      <h2>Notes for Floral Artisan</h2>
      <div style="margin: 15px 0; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #4f46e5; border-radius: 4px;">
        <p style="margin: 0; color: #374151;">${order.notes}</p>
      </div>
      `
          : ""
      }
      <h2>Items Purchased</h2>
      <ul>
        ${order.orderItems
          .map((item) => {
            // Get all small flowers
            const smallFlowers = item.flowers
              .filter((f) => f.flower.flowerType === "SMALL")
              .map((f) => f.flower.name)
              .join(", ");

            // Get all main flowers
            const mainFlowers = item.flowers
              .filter((f) => f.flower.flowerType === "MAIN")
              .map((f) => f.flower.name)
              .join(", ");

            const itemTotal = item.totalPrice * item.quantity;

            return `
            <li style="margin-bottom: 20px; padding: 15px; border: 1px solid #eee; border-radius: 5px;">
              <h3 style="margin: 0 0 10px 0;">${item.color.name} Bundle (${
              item.size.size
            })</h3>
              
              ${
                smallFlowers
                  ? `
                <strong>Small Flowers:</strong> ${smallFlowers}<br />
              `
                  : ""
              }
              
              ${
                mainFlowers
                  ? `
                <strong>Main Flowers:</strong> ${mainFlowers}<br />
              `
                  : ""
              }
              
              ${
                item.specialFlower
                  ? `
                <strong style="color: #db2777;">Special Flower:</strong> ${item.specialFlower.name}<br />
              `
                  : ""
              }
              
              ${
                item.baseAnimal
                  ? `
                <strong>Base Animal:</strong> ${item.baseAnimal.name}
                ${
                  item.baseAnimalHat
                    ? ` with ${item.baseAnimalHat.name} hat`
                    : ""
                }<br />
              `
                  : ""
              }

              ${
                item.extraAnimal
                  ? `
                <strong style="color: #2563eb;">Extra Animal:</strong> ${
                  item.extraAnimal.name
                }
                ${
                  item.extraAnimalHat
                    ? ` with ${item.extraAnimalHat.name} hat`
                    : ""
                }<br />
              `
                  : ""
              }
              
              <div style="margin-top: 10px; padding: 10px; background-color: #f8fafc; border-radius: 4px;">
                <div style="margin-bottom: 8px;">
                  <strong>Price Breakdown (per item):</strong>
                </div>
                <div style="padding-left: 10px;">
                  <div>Base Price: $${item.basePrice.toFixed(2)}</div>
                  ${
                    item.extraAnimalPrice > 0
                      ? `<div style="color: #2563eb;">Extra Animal: +$${item.extraAnimalPrice.toFixed(
                          2
                        )}</div>`
                      : ""
                  }
                  ${
                    item.specialFlowerPrice > 0
                      ? `<div style="color: #db2777;">Special Flower: +$${item.specialFlowerPrice.toFixed(
                          2
                        )}</div>`
                      : ""
                  }
                  <div style="margin-top: 4px; padding-top: 4px; border-top: 1px solid #e2e8f0;">
                    <strong>Price per item:</strong> $${item.totalPrice.toFixed(
                      2
                    )}
                  </div>
                </div>
              </div>
              
              <div style="margin-top: 10px;">
                <strong>Quantity:</strong> ${item.quantity}<br />
                <strong>Total for this item:</strong> $${itemTotal.toFixed(2)}
              </div>
              
              <div style="margin-top: 10px;">
                <img src="${item.color.imageBack}" alt="${
              item.color.name
            }" width="100" style="border-radius: 5px;" />
              </div>
            </li>
          `;
          })
          .join("")}
      </ul>
      <div style="margin-top: 20px; padding: 15px; background-color: #f8fafc; border-radius: 4px;">
        <h3 style="margin: 0 0 10px 0;">Order Total Breakdown</h3>
        <div>
          <strong>Items Subtotal:</strong> $${(
            order.total - parseFloat(order.deliveryMethod.split("$")[1])
          ).toFixed(2)}
        </div>
        <div>
          <strong>Delivery Fee:</strong> $${parseFloat(
            order.deliveryMethod.split("$")[1]
          ).toFixed(2)}
        </div>
        <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #e2e8f0;">
          <strong>Final Total:</strong> $${order.total.toFixed(2)}
        </div>
      </div>
      <p style="color: #666; font-size: 14px; margin-top: 20px;">
        Thank you for your purchase! If you have any questions about your order, please don't hesitate to contact us.
      </p>
      `,
    });

    return new NextResponse(null, { status: 200 });
  }

  return new NextResponse(`Webhook Error: Unhandled event type ${event.type}`, {
    status: 200,
  });
}
