import React from "react";
import Image from "next/image";
import prisma from "@/lib/prismadb";
import OrderSearch from "@/components/OrderSearch";
import { deliveryMethods } from "@/data/constants";

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
          className="mt-10 border-t border-gray-200"
        >
          <h2 id="order-heading" className="sr-only">
            Your order
          </h2>

          <h3 className="sr-only">Items</h3>
          {order.orderItems.map((product) => (
            <div
              key={product.id}
              className="flex space-x-6 border-b border-gray-200 py-10"
            >
              <Image
                src={product.bundleTheme.imageBlank}
                alt={product.bundleTheme.name}
                className="w-20 flex-none sm:w-40"
                width={100}
                height={100}
              />
              <div className="flex flex-auto flex-col">
                <div>
                  <h4 className="font-medium text-gray-900">
                    {product.bundleTheme.name}
                  </h4>
                  <p className="mt-2 text-sm text-gray-600">
                    {product.animal.name} in {product.bundleTheme.name}
                  </p>
                  {product.hat?.name && (
                    <p className="mt-2 text-sm text-gray-600">
                      Hat: {product.hat.name}
                    </p>
                  )}
                </div>
                <div className="mt-6 flex flex-1 items-end">
                  <dl className="flex space-x-4 divide-x divide-gray-200 text-sm sm:space-x-6">
                    <div className="flex">
                      <dt className="font-medium text-gray-900">Quantity</dt>
                      <dd className="ml-2 text-gray-700">{product.quantity}</dd>
                    </div>
                    <div className="flex pl-4 sm:pl-6">
                      <dt className="font-medium text-gray-900">Price</dt>
                      <dd className="ml-2 text-gray-700">
                        ${Number(product.price).toFixed(2)}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          ))}

          <div className="sm:ml-40 sm:pl-6">
            {order.address && (
              <>
                <h3 className="sr-only">Your information</h3>
                <h4 className="sr-only">Addresses</h4>
                <dl className="grid grid-cols-2 gap-x-6 py-10 text-sm">
                  <div>
                    <dt className="font-medium text-gray-900">
                      Shipping address
                    </dt>
                    <dd className="mt-2 text-gray-700">
                      <address className="not-italic">
                        <span className="block">
                          {order.firstName} {order.lastName}
                        </span>
                        <span className="block">{order.address}</span>
                        <span className="block">
                          {order.city}, {order.region} {order.postalCode}
                        </span>
                        <span className="block">{order.country}</span>
                      </address>
                    </dd>
                  </div>
                </dl>
              </>
            )}

            <h3 className="sr-only">Summary</h3>

            <dl className="space-y-6 border-t border-gray-200 pt-10 text-sm">
              <div className="flex justify-between">
                <dt className="font-medium text-gray-900">Subtotal</dt>
                <dd className="text-gray-700">
                  $
                  {order.orderItems
                    .reduce((acc, item) => {
                      return acc + item.quantity * item.price;
                    }, 0)
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
                  {Number(
                    order.orderItems.reduce((acc, item) => {
                      return acc + item.quantity * item.price;
                    }, 0) + deliveryMethod!.price
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
