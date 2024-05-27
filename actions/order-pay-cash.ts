"use server";

import prismadb from "@/lib/prismadb";
import { CartItem } from "@/src/stores/cart-store";
import { generateOrderNumber } from "@/lib/functions";

type OrderPayCashProps = {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    deliveryMethod: string;
    price: number;
    cartItems: CartItem[];
  };
};

export async function orderPayCash({ formData }: OrderPayCashProps) {
  const {
    firstName,
    lastName,
    email,
    phone,
    deliveryMethod,
    price,
    cartItems,
  } = formData;

  try {
    // create a unique order number by checking with the database
    let orderNumber = generateOrderNumber();
    let order = await prismadb.order.findFirst({
      where: { orderNumber },
    });
    while (order) {
      orderNumber = generateOrderNumber();
      order = await prismadb.order.findFirst({
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

    return order.orderNumber;
  } catch (error) {
    console.error("Error creating order:", error);
    throw new Error("An error occurred while processing the order");
  }
}
