"use client";

import { useEffect, useState } from "react";
import { CartItem, useCartStore } from "@/src/stores/cart-store";
import Image from "next/image";
import { TrashIcon } from "lucide-react";

export const CartContent = ({ cart }: { cart: CartItem[] }) => {
  // Define a type where the keys are numbers and the values are also numbers
  type QuantitiesType = {
    [key: number]: number;
  };
  const { changeQuantity, removeFromCart } = useCartStore((state) => state);

  // Initialize the state with the correct type
  const [quantities, setQuantities] = useState<QuantitiesType>({});

  useEffect(() => {
    // Set initial quantities from the cart
    const initialQuantities: QuantitiesType = cart.reduce((acc, item) => {
      acc[item.product.id] = item.quantity; // Ensure your CartItem includes a `quantity` field
      return acc;
    }, {} as QuantitiesType); // Use `as QuantitiesType` to assert the correct type
    setQuantities(initialQuantities);
  }, [cart]);

  // Handler to update quantities
  const handleQuantityChange = (productId: number, newQuantity: number) => {
    setQuantities((prev) => ({ ...prev, [productId]: newQuantity }));
    // Optionally update the cart store if quantities should sync immediately
    changeQuantity(productId, newQuantity);
  };

  return (
    <div>
      <div className="mx-auto py-16">
        <div className="lg:col-start-2">
          <h3 className="sr-only">Items in your cart</h3>
          <ul role="list" className="divide-y divide-gray-200">
            {cart.map((bundle) => (
              <li key={bundle.product.id} className="flex px-4 py-6 sm:px-6">
                <div className="flex-shrink-0">
                  <Image
                    src={bundle.product.imageUrl}
                    alt={bundle.bundleName}
                    className="w-20 rounded-md"
                    width={80}
                    height={80}
                  />
                </div>

                <div className="ml-6 flex flex-1 flex-col">
                  <div className="flex">
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm">
                        <a
                          href={`/products/${bundle.bundleSlug}`}
                          className="font-medium text-gray-700 hover:text-gray-800 text-xl"
                        >
                          {bundle.bundleName}
                        </a>
                      </h4>
                    </div>

                    <div className="ml-4 flow-root flex-shrink-0">
                      <button
                        type="button"
                        className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
                        onClick={() => removeFromCart(bundle.product.id)}
                      >
                        <span className="sr-only">Remove</span>
                        <TrashIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-1 items-end justify-between pt-2">
                    <p className="mt-1 text-lg font-medium text-gray-900">
                      {bundle.bundlePrice}.00
                    </p>

                    <div className="ml-4">
                      <label htmlFor="quantity" className="sr-only">
                        Quantity
                      </label>
                      <select
                        id={`quantity-${bundle.product.id}`} // Unique ID for each select based on product ID
                        name="quantity"
                        value={quantities[bundle.product.id]}
                        onChange={(e) =>
                          handleQuantityChange(
                            bundle.product.id,
                            parseInt(e.target.value)
                          )
                        }
                        className="rounded-md border border-gray-300 text-left text-base font-medium text-gray-700 shadow-sm focus:border-main-500 focus:outline-none focus:ring-1 focus:ring-main-500 sm:text-sm"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((qty) => (
                          <option key={qty} value={qty}>
                            {qty}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
