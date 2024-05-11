"use client";

import React, { useEffect, useRef } from "react";
import { CartItem, useCartStore } from "@/src/stores/cart-store";

interface StoreInitializerProps {
  cart: CartItem[];
}

const StoreInitializer: React.FC<StoreInitializerProps> = ({ cart }) => {
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      useCartStore.setState({ cart });
      initialized.current = true;
    }
  }, [cart]); // Depend on cart, update only if cart changes and not initialized

  return null; // This component does not render anything
};

export default StoreInitializer;
