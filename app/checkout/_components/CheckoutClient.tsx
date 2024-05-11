"use client";

import { useState } from "react";
import { Description, Label, Radio, RadioGroup } from "@headlessui/react";
import { cn } from "@/lib/utils";
import { Check, CheckCircle } from "lucide-react";
import useStore from "@/src/useStore";
import { CartItem, CartStore, useCartStore } from "@/src/stores/cart-store";
import { CartContent } from "@/components/CartContent";
import { deliveryMethodType, deliveryMethods } from "@/data/constants";
import axios from "axios";
import { z } from "zod";
import CheckoutMailForm from "./CheckoutMailForm";
import CheckoutPickUpForm from "./CheckoutPickUpForm";
import DeliveryOptions from "./DeliveryOptions";

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
    <div className="bg-gray-50">
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
