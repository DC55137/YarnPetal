// CartContent.tsx
"use client";

import { useEffect, useState } from "react";
import { CartItem, useCartStore } from "@/src/stores/cart-store";
import Image from "next/image";
import { TrashIcon } from "lucide-react";
import { Animal, Flower, FlowerType } from "@prisma/client";
import { cn } from "@/lib/utils";

export const CartContent = ({ cart }: { cart: CartItem[] }) => {
  type QuantitiesType = {
    [key: number]: number;
  };

  const { changeQuantity, removeFromCart } = useCartStore();
  const [quantities, setQuantities] = useState<QuantitiesType>({});

  useEffect(() => {
    const initialQuantities: QuantitiesType = cart.reduce(
      (acc, item, index) => {
        acc[index] = item.quantity;
        return acc;
      },
      {} as QuantitiesType
    );
    setQuantities(initialQuantities);
  }, [cart]);

  const handleQuantityChange = (item: CartItem, newQuantity: number) => {
    setQuantities((prev) => ({
      ...prev,
      [cart.findIndex((i) => i === item)]: newQuantity,
    }));
    changeQuantity(item, newQuantity);
  };

  return (
    <div className="py-16">
      <div className="lg:col-start-2">
        <h3 className="sr-only">Items in your cart</h3>
        <ul role="list" className="divide-y divide-gray-200">
          {cart.map((item, index) => (
            <li key={index} className="flex px-4 py-6 relative">
              {/* Bundle Preview */}
              <div className="flex-shrink-0 space-y-4">
                {/* Color Preview */}
                <div className="relative w-24 aspect-square rounded-lg overflow-hidden">
                  <Image
                    src={item.color.imageBack}
                    alt={item.color.name}
                    className="object-cover"
                    fill
                    sizes="(max-width: 768px) 96px, 96px"
                  />
                </div>

                {/* Selected Items Preview */}
                <div className="grid grid-cols-4 gap-1 max-w-[96px]">
                  {/* Small Flowers */}
                  {item.flowers
                    .filter((f) => f.flower.flowerType === FlowerType.SMALL)
                    .map((flower, idx) => (
                      <div
                        key={`small-${idx}`}
                        className="relative aspect-square"
                      >
                        <Image
                          src={flower.flower.imageSingle}
                          alt={flower.flower.name}
                          className="object-contain"
                          fill
                          sizes="24px"
                        />
                      </div>
                    ))}

                  {/* Main Flowers */}
                  {item.flowers
                    .filter((f) => f.flower.flowerType === FlowerType.MAIN)
                    .map((flower, idx) => (
                      <div
                        key={`main-${idx}`}
                        className="relative aspect-square"
                      >
                        <Image
                          src={flower.flower.imageSingle}
                          alt={flower.flower.name}
                          className="object-contain"
                          fill
                          sizes="24px"
                        />
                      </div>
                    ))}

                  {/* Special Flower */}
                  {item.specialFlower && (
                    <div className="relative aspect-square">
                      <div className="absolute inset-0 border-2 border-pink-400 rounded"></div>
                      <Image
                        src={item.specialFlower.specialFlower.imageSingle}
                        alt={item.specialFlower.specialFlower.name}
                        className="object-contain"
                        fill
                        sizes="24px"
                      />
                    </div>
                  )}

                  {/* Animals with Hats */}
                  {item.animals.map((animal, idx) => (
                    <div
                      key={`animal-${idx}`}
                      className="relative aspect-square"
                    >
                      <Image
                        src={animal.animal.imageUrl}
                        alt={animal.animal.name}
                        className="object-contain"
                        fill
                        sizes="24px"
                      />
                      {animal.hat && animal.hat.imageUrl && (
                        <div className="absolute top-0 left-0 right-0 flex justify-center">
                          <Image
                            src={animal.hat.imageUrl}
                            alt={animal.hat.name}
                            width={12}
                            height={12}
                            className="object-contain"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bundle Details */}
              <div className="ml-6 flex flex-1 flex-col">
                <div className="flex">
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xl font-medium text-gray-700">
                      {item.color.name} Bundle ({item.size.size})
                    </h4>

                    {/* Special Flower */}
                    {item.specialFlower && (
                      <div className="mt-1">
                        <h5 className="text-sm font-medium text-pink-600">
                          Special Flower:
                        </h5>
                        <span className="text-sm text-pink-500">
                          {item.specialFlower.specialFlower.name} (+$
                          {item.specialFlowerPrice.toFixed(2)})
                        </span>
                      </div>
                    )}

                    {/* Flowers */}
                    {item.flowers.length > 0 && (
                      <div className="mt-1">
                        <h5 className="text-sm font-medium text-gray-600">
                          Flowers:
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {item.flowers.map((flower, idx) => (
                            <span key={idx} className="text-sm text-gray-500">
                              {flower.flower.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Animals */}
                    {item.animals.length > 0 && (
                      <div className="mt-1">
                        <h5 className="text-sm font-medium text-gray-600">
                          Animals:
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {item.animals.map((animal, idx) => (
                            <span key={idx} className="text-sm text-gray-500">
                              {animal.animal.name}
                              {animal.hat && ` with ${animal.hat.name} hat`}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Price Breakdown */}
                    <div className="mt-2 space-y-1 text-sm text-gray-500">
                      <div>Base Price: ${item.basePrice.toFixed(2)}</div>
                      {item.extraAnimalPrice > 0 && (
                        <div>
                          Extra Animal: +${item.extraAnimalPrice.toFixed(2)}
                        </div>
                      )}
                      {item.specialFlowerPrice > 0 && (
                        <div>
                          Special Flower: +${item.specialFlowerPrice.toFixed(2)}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Remove Button */}
                  <div className="ml-4 flow-root flex-shrink-0">
                    <button
                      type="button"
                      className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
                      onClick={() => removeFromCart(item)}
                    >
                      <span className="sr-only">Remove</span>
                      <TrashIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                {/* Total Price and Quantity */}
                <div className="flex flex-1 items-end justify-between pt-2">
                  <div className="mt-1">
                    <p className="text-sm text-gray-500">Item Total:</p>
                    <p className="text-lg font-medium text-gray-900">
                      ${item.totalPrice.toFixed(2)}
                    </p>
                  </div>

                  <div className="ml-4">
                    <label htmlFor={`quantity-${index}`} className="sr-only">
                      Quantity
                    </label>
                    <select
                      id={`quantity-${index}`}
                      name="quantity"
                      value={quantities[index] || item.quantity}
                      onChange={(e) => {
                        const newQuantity = parseInt(e.target.value);
                        handleQuantityChange(item, newQuantity);
                      }}
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
  );
};
