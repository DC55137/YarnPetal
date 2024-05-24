"use client";

import { useEffect, useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CartStore, useCartStore } from "@/src/stores/cart-store";
import useStore from "@/src/useStore";
import { ShoppingBag } from "lucide-react";
import { CartContent } from "@/components/CartContent";

export default function Cart() {
  const [isClient, setIsClient] = useState(false);
  const cartStore = useStore<CartStore, CartStore>(
    useCartStore,
    (state: any) => state
  );

  const cart = cartStore?.cart ?? [];

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <button
        type="button"
        className="relative rounded-full p-1 text-main-800 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-main-500 focus:ring-offset-2 hover:cursor-pointer"
      >
        <span className="absolute -inset-1.5" />
        <span className="sr-only">View cart, items</span>
        <ShoppingBag className="h-6 w-6 " aria-hidden="true" />
      </button>
    );
  }

  const cartCount = cartStore?.cart.length ?? 0;
  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <div className="relative rounded-full p-1 text-main-800 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-main-500 focus:ring-offset-2 hover:cursor-pointer">
            <span className="absolute -inset-1.5" />
            <span className="sr-only">View cart, {cartCount} items</span>
            <ShoppingBag className="h-6 w-6" aria-hidden="true" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-main-600 rounded-full">
                {cartCount}
              </span>
            )}
          </div>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="font-medium text-main-600">Cart</SheetTitle>
            <SheetDescription>
              {cart.length === 0 ? (
                <div className="flex items-center justify-center h-64">
                  <p className="text-lg font-medium text-gray-500">
                    Your cart is empty
                  </p>
                </div>
              ) : (
                <>
                  <CartContent cart={cart} />
                  <div className="space-y-6 pt-6 text-sm font-medium text-gray-500 px-6">
                    <div className="flex items-center justify-between border-t border-gray-200 pt-6 text-gray-900">
                      <dt className="text-base">Total</dt>
                      <dd className="text-base">
                        $
                        {cart
                          .reduce(
                            (acc, item) =>
                              acc + item.bundlePrice * item.quantity,
                            0
                          )
                          .toFixed(2)}
                      </dd>
                    </div>
                  </div>
                  {/* Shipping to be determined */}
                  <div className="mt-6 px-6">
                    <p className="text-sm text-gray-500">
                      Free Shipping within the Gold Coast.
                    </p>
                  </div>
                  <div className="mt-16 border-t border-gray-200 py-6 text-right">
                    <a
                      href="/checkout"
                      className="text-sm font-medium text-main-600 hover:text-main-500"
                    >
                      Check Out
                      <span aria-hidden="true"> &rarr;</span>
                    </a>
                  </div>
                </>
              )}
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}
