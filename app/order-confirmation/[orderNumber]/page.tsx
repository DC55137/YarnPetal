import React from "react";
import Image from "next/image";
import prisma from "@/lib/prismadb";
import OrderSearch from "@/components/OrderSearch";
import { deliveryMethods } from "@/data/constants";
import { Animal, Flower, Hat } from "@prisma/client";

interface Extra {
  type: "animal" | "flower";
  item: Animal | Flower;
  hat?: Hat;
}

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
          bundleTheme: true,
          animal: true,
          hat: true,
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

  const getHatUrl = (animal: Animal, hatName: string) => {
    if (hatName === "birthday") return animal.birthdayUrl;
    if (hatName === "graduation") return animal.graduationUrl;
    return animal.imageUrl;
  };

  return (
    <main className="bg-white px-4 pb-24 pt-16 sm:px-6 sm:pt-24 lg:px-8 lg:py-32">
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
            <dt className="text-gray-900">Tracking number</dt>
            <dd className="mt-2 text-main-600">{order.orderNumber}</dd>
          </dl>
        </div>

        <section
          aria-labelledby="order-heading"
          className="mt-10 border-t border-gray-200 "
        >
          <div className="">
            <h2 id="order-heading" className="sr-only">
              Your order
            </h2>
            <h3 className="sr-only">Items</h3>
            <ul role="list" className="divide-y divide-gray-200">
              {order.orderItems.map((bundle, index) => {
                const extras: Extra[] = bundle.extras as unknown as Extra[];

                return (
                  <li key={index} className="flex px-4 py-6 relative">
                    <div className="flex-shrink-0">
                      <Image
                        src={getHatUrl(bundle.animal, bundle.hat.name)}
                        alt={bundle.id.toString()}
                        className="w-8 rounded-md mx-auto"
                        width={80}
                        height={80}
                      />
                      <Image
                        src={bundle.bundleTheme.imageBlank}
                        alt={bundle.id.toString()}
                        className="w-20 rounded-md"
                        width={80}
                        height={80}
                      />
                      {extras.length > 0 && (
                        <div className="flex flex-wrap max-w-14 mx-auto mt-2">
                          {extras.map((extra, index) => {
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
                                className="flex flex-col items-center"
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
                      )}
                    </div>

                    <div className="ml-6 flex flex-1 flex-col ">
                      <div className="flex">
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm">
                            <p className="font-medium text-gray-700 hover:text-gray-800 text-xl">
                              {bundle.bundleTheme.bundleName}
                            </p>
                          </h4>
                          <h4 className="text-base font-medium text-gray-900 hover:text-gray-800">
                            {bundle.bundleTheme.name}
                          </h4>
                          <h4 className="text-sm font-medium text-gray-700 hover:text-gray-800">
                            {bundle.animal.name}
                          </h4>
                          {bundle.hat.name !== "none" && (
                            <h4 className="text-sm font-medium text-gray-700 hover:text-gray-800">
                              {bundle.hat.name} hat
                            </h4>
                          )}
                          {extras.length > 0 && (
                            <>
                              <h4 className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                Extras:
                              </h4>
                              <h4 className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                {extras
                                  .map((extra) =>
                                    extra.type === "animal"
                                      ? (extra.item as Animal).name
                                      : (extra.item as Flower).name
                                  )
                                  .join(", ")}
                              </h4>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-1 items-end justify-between pt-2">
                        <p className="mt-1 text-lg font-medium text-gray-900">
                          ${bundle.price}.00 x{bundle.quantity}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className=" b-red-500">
            <h3 className="sr-only">Summary</h3>
            <dl className="space-y-6 border-t border-gray-200 pt-10 text-sm">
              <div className="flex justify-between">
                <dt className="font-medium text-gray-900">Subtotal</dt>
                <dd className="text-gray-700">
                  $
                  {order.orderItems
                    .reduce((acc, item) => acc + item.quantity * item.price, 0)
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
                      (acc, item) => acc + item.quantity * item.price,
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
