"use client";

import { useState } from "react";
import useStore from "@/src/useStore";
import { CartStore, useCartStore } from "@/src/stores/cart-store";
import { deliveryMethods } from "@/data/constants";

import CheckoutMailForm from "./CheckoutMailForm";
import CheckoutPickUpForm from "./CheckoutPickUpForm";

export default function CheckoutClient() {
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(
    deliveryMethods[0]
  );

  const cartStore = useStore<CartStore, CartStore>(
    useCartStore,
    (state: any) => state
  );

  const cart = cartStore?.cart ?? [];

  // Handler to update quantities

  return (
    <div className="">
      <div>
        {selectedDeliveryMethod.id === 1 || selectedDeliveryMethod.id === 2 ? (
          <CheckoutPickUpForm
            selectedDeliveryMethod={selectedDeliveryMethod}
            setSelectedDeliveryMethod={setSelectedDeliveryMethod}
            cart={cart}
          />
        ) : (
          <CheckoutMailForm
            selectedDeliveryMethod={selectedDeliveryMethod}
            setSelectedDeliveryMethod={setSelectedDeliveryMethod}
            cart={cart}
          />
        )}
      </div>
    </div>
  );
}
