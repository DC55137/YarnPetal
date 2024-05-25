"use server";

import prismadb from "@/lib/prismadb";
import { CartItem } from "@/src/stores/cart-store";

function generateOrderNumber() {
  // Generate a random number between 0 and 2,147,483,647
  const max = 2147483647;
  return Math.floor(Math.random() * (max + 1));
}

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

  // create a unique order number by checking with the database
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
      total: price,
      orderItems: {
        create: cartItems.map((item) => ({
          hat: item.hat,
          productId: item.product.id,
          quantity: item.quantity,
          price: item.bundlePrice,
          color: item.color,
          bundleImage: item.product.imageUrl,
          bundle: item.bundleName,
        })),
      },
    },
  });

  return order;
}
