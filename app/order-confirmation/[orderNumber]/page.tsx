import React from "react";
import Image from "next/image";
import prisma from "@/lib/prismadb";

export default async function page({
  params: { orderNumber },
}: {
  params: { orderNumber: string };
}) {
  const order = await prisma.order.findUnique({
    where: { id: Number(orderNumber) },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!order) {
    return {
      notFound: true,
    };
  }

  return (
    <main className="bg-white px-4 pb-24 pt-16 sm:px-6 sm:pt-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-3xl">
        <div className="max-w-xl">
          <h1 className="text-base font-medium text-main-600">Thank you!</h1>
          <p className="mt-2 text-4xl font-bold tracking-tight">
            It&apos;s on the way!
          </p>
          <p className="mt-2 text-base text-gray-500">
            Your order #{order.id} has shipped and will be with you soon.
          </p>

          <dl className="mt-12 text-sm font-medium">
            <dt className="text-gray-900">Tracking number</dt>
            <dd className="mt-2 text-main-600">{order.id}</dd>
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
                src={product.bundleImage}
                alt={product.hat}
                className="h-20 w-20 flex-none rounded-lg bg-gray-100 object-cover object-center sm:h-40 sm:w-40"
                width={80}
                height={80}
              />
              <div className="flex flex-auto flex-col">
                <div>
                  <h4 className="font-medium text-gray-900">{product.id}</h4>
                  <p className="mt-2 text-sm text-gray-600">
                    {product.hat} in {product.color} {product.product.id}
                  </p>
                </div>
                <div className="mt-6 flex flex-1 items-end">
                  <dl className="flex space-x-4 divide-x divide-gray-200 text-sm sm:space-x-6">
                    <div className="flex">
                      <dt className="font-medium text-gray-900">Quantity</dt>
                      <dd className="ml-2 text-gray-700">{product.quantity}</dd>
                    </div>
                    <div className="flex pl-4 sm:pl-6">
                      <dt className="font-medium text-gray-900">Price</dt>
                      <dd className="ml-2 text-gray-700">{product.color}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          ))}

          <div className="sm:ml-40 sm:pl-6">
            <h3 className="sr-only">Your information</h3>
            {order.shippingAddress && (
              <>
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
                        <span className="block">{order.shippingAddress}</span>
                        <span className="block">
                          {order.shippingCity}, {order.shippingState}{" "}
                          {order.shippingZip}
                        </span>
                      </address>
                    </dd>
                  </div>
                </dl>
              </>
            )}

            {/* <h4 className="sr-only">Payment</h4>
            <dl className="grid grid-cols-2 gap-x-6 border-t border-gray-200 py-10 text-sm">
              <div>
                <dt className="font-medium text-gray-900">Payment method</dt>
                <dd className="mt-2 text-gray-700">
                  <p>{order.paymentMethod.type}</p>
                  <p>
                    <span aria-hidden="true">••••</span>
                    <span className="sr-only">Ending in </span>
                    {order.paymentMethod.last4}
                  </p>
                </dd>
              </div>
              <div>
                <dt className="font-medium text-gray-900">Shipping method</dt>
                <dd className="mt-2 text-gray-700">
                  <p>{order.shippingMethod}</p>
                  <p>{order.shippingMethodDetails}</p>
                </dd>
              </div>
            </dl>

            <h3 className="sr-only">Summary</h3>

            <dl className="space-y-6 border-t border-gray-200 pt-10 text-sm">
              <div className="flex justify-between">
                <dt className="font-medium text-gray-900">Subtotal</dt>
                <dd className="text-gray-700">${order.subtotal}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="flex font-medium text-gray-900">
                  Discount
                  <span className="ml-2 rounded-full bg-gray-200 px-2 py-0.5 text-xs text-gray-600">
                    {order.discountCode}
                  </span>
                </dt>
                <dd className="text-gray-700">-${order.discount}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium text-gray-900">Shipping</dt>
                <dd className="text-gray-700">${order.shippingCost}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium text-gray-900">Total</dt>
                <dd className="text-gray-900">${order.total}</dd>
              </div>
            </dl> */}
          </div>
        </section>
      </div>
    </main>
  );
}
