"use server";

import prismadb from "@/lib/prismadb";
import { CartItem } from "@/src/stores/cart-store";

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
  const order = await prismadb.order.create({
    data: {
      firstName,
      lastName,
      email,
      phone,
      deliveryMethod,
      price,
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
  return order.id;
}
