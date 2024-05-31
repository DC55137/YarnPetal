"use client";

import { useEffect, useState } from "react";
import { CartItem, useCartStore } from "@/src/stores/cart-store";
import Image from "next/image";
import { TrashIcon } from "lucide-react";
import { Animal, Flower, Hat } from "@prisma/client";

type ExtraType = {
  type: "animal" | "flower";
  item: Animal | Flower;
  hat?: Hat;
};

const getHatUrl = (animal: Animal, hatName: string) => {
  if (hatName === "graduation") {
    return animal.graduationUrl;
  } else if (hatName === "birthday") {
    return animal.birthdayUrl;
  } else {
    return animal.imageUrl;
  }
};

export const CartContent = ({ cart }: { cart: CartItem[] }) => {
  // Define a type where the keys are numbers and the values are also numbers
  type QuantitiesType = {
    [key: number]: number;
  };
  const { changeQuantity, removeFromCart } = useCartStore((state) => state);

  // Initialize the state with the correct type
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

  const handleQuantityChange = (
    index: number,
    bundleThemeId: number,
    animal: Animal,
    hat: Hat,
    newQuantity: number,
    extras: ExtraType[]
  ) => {
    console.log("Changing quantity for index:", index, newQuantity);
    setQuantities((prev) => ({ ...prev, [index]: newQuantity }));
    changeQuantity(bundleThemeId, animal, hat, newQuantity, extras);
  };

  return (
    <div>
      <div className="mx-auto  py-16">
        <div className="lg:col-start-2">
          <h3 className="sr-only">Items in your cart</h3>
          <ul role="list" className="divide-y divide-gray-200">
            {cart.map((bundle, index) => {
              let animalImage = bundle.animal.imageUrl;
              if (bundle.hat.name === "birthday") {
                animalImage = bundle.animal.birthdayUrl;
              }
              if (bundle.hat.name === "graduation") {
                animalImage = bundle.animal.graduationUrl;
              }

              return (
                <li key={index} className="flex px-4 py-6 relative">
                  <div className="flex-shrink-0 ">
                    <Image
                      src={animalImage}
                      alt={bundle.bundleName}
                      className="w-8 rounded-md mx-auto "
                      width={80}
                      height={80}
                    />
                    <Image
                      src={bundle.bundleTheme.imageBlank}
                      alt={bundle.bundleName}
                      className="w-20 rounded-md"
                      width={80}
                      height={80}
                    />{" "}
                    {bundle.extras.length > 0 && (
                      <div>
                        <div className="flex flex-wrap  max-w-14 mx-auto mt-2">
                          {bundle.extras.map((extra, index) => {
                            const previewUrl =
                              extra.type === "animal"
                                ? getHatUrl(
                                    extra.item as Animal,
                                    extra.hat?.name || "none"
                                  )
                                : (extra.item as Flower).imageUrl;
                            return (
                              <div
                                key={index}
                                className="flex flex-col items-center "
                              >
                                <Image
                                  src={previewUrl}
                                  alt={`${
                                    extra.type === "animal"
                                      ? (extra.item as Animal).name
                                      : (extra.item as Flower).name
                                  } preview`}
                                  width={20}
                                  height={20}
                                  className="rounded-md"
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="ml-6 flex flex-1 flex-col">
                    <div className="flex">
                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm">
                          <a
                            href={`/bundles/${bundle.bundleSlug}`}
                            className="font-medium text-gray-700 hover:text-gray-800 text-xl"
                          >
                            {bundle.bundleName}
                          </a>
                        </h4>

                        <h4 className="text-base font-medium text-gray-900 hover:text-gray-800 ">
                          {bundle.bundleTheme.name}
                        </h4>
                        <h4 className="text-sm font-medium text-gray-700 hover:text-gray-800 ">
                          {bundle.animal.name}
                        </h4>
                        {bundle.hat.name !== "none" && (
                          <h4 className="text-sm font-medium text-gray-700 hover:text-gray-800 ">
                            {bundle.hat.name} hat
                          </h4>
                        )}
                        {bundle.extras.length > 0 && (
                          <h4 className="text-sm font-medium text-gray-700 hover:text-gray-800 ">
                            Extras:
                          </h4>
                        )}

                        {bundle.extras.length > 0 && (
                          <h4 className="text-sm font-medium text-gray-700 hover:text-gray-800 ">
                            {bundle.extras
                              .map((extra) =>
                                extra.type === "animal"
                                  ? (extra.item as Animal).name
                                  : (extra.item as Flower).name
                              )
                              .join(", ")}
                          </h4>
                        )}
                      </div>

                      <div className="ml-4 flow-root flex-shrink-0">
                        <button
                          type="button"
                          className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
                          onClick={() =>
                            removeFromCart(
                              bundle.bundleTheme.id,
                              bundle.animal,
                              bundle.hat,
                              bundle.extras
                            )
                          }
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
                          id={`quantity-${index}`}
                          name="quantity"
                          value={quantities[index] || bundle.quantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              index,
                              bundle.bundleTheme.id,
                              bundle.animal,
                              bundle.hat,
                              parseInt(e.target.value),
                              bundle.extras
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
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
