import React from "react";
import Image from "next/image";
import prisma from "@/lib/prismadb";
import OrderSearch from "@/components/OrderSearch";
import { deliveryMethods } from "@/data/constants";
import { FlowerType } from "@prisma/client";
import ResetCart from "./_components/ResetCart";

export default async function page({
  params: { orderNumber },
}: {
  params: { orderNumber: string };
}) {
  const order = await prisma.order.findUnique({
    where: { orderNumber: Number(orderNumber) },
    include: {
      orderItems: {
        include: {
          color: true,
          size: true,
          flowers: {
            include: {
              flower: true,
            },
          },
          baseAnimal: true,
          baseAnimalHat: true,
          extraAnimal: true,
          extraAnimalHat: true,
        },
      },
    },
  });

  if (!order) {
    return (
      <main className="bg-white px-4 pb-24 pt-16 sm:px-6 sm:pt-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-3xl">
          <div className="max-w-xl">
            <h1 className="text-base font-medium text-main-600">
              Order not found
            </h1>
            <p className="mt-2 text-4xl font-bold tracking-tight">
              Sorry, we couldn&apos;t find that order.
            </p>
          </div>
          <OrderSearch />
        </div>
      </main>
    );
  }

  const deliveryMethod = deliveryMethods.find(
    (method) => method.title === order.deliveryMethod
  );

  return (
    <main className="bg-white px-4 pb-24 pt-16 sm:px-6 sm:pt-24 lg:px-8 lg:py-32">
      <ResetCart />
      <div className="mx-auto max-w-3xl">
        <div className="max-w-xl">
          <h1 className="text-base font-medium text-main-600">Thank you!</h1>
          {deliveryMethod?.id === 1 || deliveryMethod?.id === 2 ? (
            <>
              <p className="mt-2 text-4xl font-bold tracking-tight">
                It&apos;s being prepared!
              </p>
              <p className="mt-2 text-base text-gray-500">
                Your order #{order.orderNumber} is being prepared and will be
                ready for pick up soon.
              </p>
            </>
          ) : (
            <>
              <p className="mt-2 text-4xl font-bold tracking-tight">
                It&apos;s on the way!
              </p>
              <p className="mt-2 text-base text-gray-500">
                Your order #{order.orderNumber} has shipped and will be with you
                soon.
              </p>
            </>
          )}
          <dl className="mt-12 text-sm font-medium">
            <dt className="text-gray-900">order number</dt>
            <dd className="mt-2 text-main-600">{order.orderNumber}</dd>
          </dl>
        </div>

        <section
          aria-labelledby="order-heading"
          className="mt-10 border-t border-gray-200"
        >
          <div className="">
            <h2 id="order-heading" className="sr-only">
              Your order
            </h2>
            <h3 className="sr-only">Items</h3>
            <ul role="list" className="divide-y divide-gray-200">
              {order.orderItems.map((item, index) => {
                const smallFlowers = item.flowers.filter(
                  (f) => f.flower.flowerType === FlowerType.SMALL
                );
                const mainFlowers = item.flowers.filter(
                  (f) => f.flower.flowerType === FlowerType.MAIN
                );

                // Safely handle nullable prices
                const basePrice = item.basePrice || 0;
                const extraAnimalPrice = item.extraAnimalPrice || 0;
                const totalPrice =
                  item.totalPrice || basePrice + extraAnimalPrice;

                return (
                  <li key={index} className="flex px-4 py-6 relative">
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
                        {smallFlowers.map((flower, idx) => (
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
                        {mainFlowers.map((flower, idx) => (
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

                        {/* Base Animal */}
                        {item.baseAnimal && (
                          <div className="relative aspect-square">
                            <Image
                              src={item.baseAnimal.imageUrl}
                              alt={item.baseAnimal.name}
                              className="object-contain"
                              fill
                              sizes="24px"
                            />
                            {item.baseAnimalHat && (
                              <div className="absolute top-0 left-0 right-0 flex justify-center">
                                <Image
                                  src={item.baseAnimalHat.imageUrl}
                                  alt={item.baseAnimalHat.name}
                                  width={12}
                                  height={12}
                                  className="object-contain"
                                />
                              </div>
                            )}
                          </div>
                        )}

                        {/* Extra Animal */}
                        {item.extraAnimal && (
                          <div className="relative aspect-square">
                            <Image
                              src={item.extraAnimal.imageUrl}
                              alt={item.extraAnimal.name}
                              className="object-contain"
                              fill
                              sizes="24px"
                            />
                            {item.extraAnimalHat && (
                              <div className="absolute top-0 left-0 right-0 flex justify-center">
                                <Image
                                  src={item.extraAnimalHat.imageUrl}
                                  alt={item.extraAnimalHat.name}
                                  width={12}
                                  height={12}
                                  className="object-contain"
                                />
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="ml-6 flex flex-1 flex-col">
                      <div className="flex">
                        <div className="min-w-0 flex-1">
                          <h4 className="text-xl font-medium text-gray-700">
                            {item.color.name} Bundle ({item.size.size})
                          </h4>

                          {/* Flowers */}
                          {item.flowers.length > 0 && (
                            <div className="mt-2">
                              <h5 className="text-sm font-medium text-gray-600">
                                Flowers:
                              </h5>
                              <div className="flex flex-wrap gap-2">
                                {item.flowers.map((flower, idx) => (
                                  <span
                                    key={idx}
                                    className="text-sm text-gray-500"
                                  >
                                    {flower.flower.name}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Base Animal */}
                          {item.baseAnimal && (
                            <div className="mt-2">
                              <h5 className="text-sm font-medium text-gray-600">
                                Base Animal:
                              </h5>
                              <span className="text-sm text-gray-500">
                                {item.baseAnimal.name}
                                {item.baseAnimalHat &&
                                  ` with ${item.baseAnimalHat.name}`}
                              </span>
                            </div>
                          )}

                          {/* Extra Animal */}
                          {item.extraAnimal && (
                            <div className="mt-2">
                              <h5 className="text-sm font-medium text-gray-600">
                                Extra Animal:
                              </h5>
                              <span className="text-sm text-gray-500">
                                {item.extraAnimal.name}
                                {item.extraAnimalHat &&
                                  ` with ${item.extraAnimalHat.name}`}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-1 items-end justify-between pt-2">
                        <div className="space-y-1">
                          <p className="text-sm text-gray-500">
                            Base Price: ${basePrice.toFixed(2)}
                          </p>
                          {extraAnimalPrice > 0 && (
                            <p className="text-sm text-gray-500">
                              Extra Animal: ${extraAnimalPrice.toFixed(2)}
                            </p>
                          )}
                          <p className="text-lg font-medium text-gray-900">
                            Total: ${totalPrice.toFixed(2)} x{item.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Order Summary */}
          <div className="">
            <h3 className="sr-only">Summary</h3>
            <dl className="space-y-6 border-t border-gray-200 pt-10 text-sm">
              <div className="flex justify-between">
                <dt className="font-medium text-gray-900">Subtotal</dt>
                <dd className="text-gray-700">
                  $
                  {order.orderItems
                    .reduce(
                      (acc, item) => acc + item.quantity * item.totalPrice,
                      0
                    )
                    .toFixed(2)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium text-gray-900">
                  {deliveryMethod?.title}
                </dt>
                <dd className="text-gray-700">
                  ${deliveryMethod?.price.toFixed(2)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium text-gray-900">Total</dt>
                <dd className="text-gray-900">
                  $
                  {(
                    order.orderItems.reduce(
                      (acc, item) => acc + item.quantity * item.totalPrice,
                      0
                    ) + deliveryMethod!.price
                  ).toFixed(2)}
                </dd>
              </div>
            </dl>
          </div>
        </section>
      </div>
    </main>
  );
}
