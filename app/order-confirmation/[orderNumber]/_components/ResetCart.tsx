"use client";
import React, { useEffect } from "react";
import { useCartStore } from "@/src/stores/cart-store";

export default function ResetCart() {
  const { clearCart } = useCartStore((state) => state);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return null;
}
