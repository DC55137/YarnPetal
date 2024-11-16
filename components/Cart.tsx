"use client";

import { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CartStore, useCartStore, CartItem } from "@/src/stores/cart-store";
import useStore from "@/src/useStore";
import { ShoppingBag, Minus, Plus, Trash } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FlowerType } from "@prisma/client";

interface CartItemDisplayProps {
  item: CartItem;
  onUpdateQuantity: (item: CartItem, quantity: number) => void;
  onRemove: (item: CartItem) => void;
}

const CartItemDisplay: React.FC<CartItemDisplayProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
}) => {
  const smallFlowers = item.flowers.filter(
    (f) => f.flower.flowerType === FlowerType.SMALL
  );
  const mainFlowers = item.flowers.filter(
    (f) => f.flower.flowerType === FlowerType.MAIN
  );

  // Calculate additional costs (animals + hat)

  const totalPrice = item.size.price * item.quantity;

  return (
    <div className="py-6">
      <div className="flex items-start gap-4">
        {/* Bundle Preview */}
        <div className="relative w-24 h-24 flex-shrink-0">
          <Image
            src={item.color.imageBack}
            alt={item.color.name}
            className="rounded-lg object-cover"
            fill
            sizes="96px"
          />
        </div>

        {/* Bundle Details */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between">
            <h3 className="text-base font-medium text-gray-900 truncate">
              {item.color.name} Bundle - {item.size.size}
            </h3>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => onRemove(item)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>

          {/* Contents Summary */}
          <div className="mt-1 text-sm text-gray-500">
            <p>
              {smallFlowers.length} small flowers, {mainFlowers.length} main
              flowers
              {item.animals.length > 0 && `, ${item.animals.length} animals`}
              {item.hat && `, ${item.hat.name} hat`}
            </p>
          </div>

          {/* Image Preview Grid */}
          <div className="mt-2 flex gap-1">
            <div className="flex gap-1 overflow-x-auto hide-scrollbar">
              {smallFlowers.map((flower, idx) => (
                <div
                  key={`small-${idx}`}
                  className="relative w-8 h-8 flex-shrink-0"
                >
                  <Image
                    src={flower.flower.imageSingle}
                    alt={flower.flower.name}
                    className="rounded border border-gray-200 object-cover object-top"
                    fill
                    sizes="32px"
                  />
                </div>
              ))}
              {mainFlowers.map((flower, idx) => (
                <div
                  key={`main-${idx}`}
                  className="relative w-8 h-8 flex-shrink-0"
                >
                  <Image
                    src={flower.flower.imageSingle}
                    alt={flower.flower.name}
                    className="rounded border border-gray-200 object-cover object-top"
                    fill
                    sizes="32px"
                  />
                </div>
              ))}
              {item.animals.map((animal, idx) => (
                <div
                  key={`animal-${idx}`}
                  className="relative w-8 h-8 flex-shrink-0"
                >
                  <Image
                    src={animal.animal.imageUrl}
                    alt={animal.animal.name}
                    className="rounded border border-gray-200 object-cover"
                    fill
                    sizes="32px"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Price and Quantity Controls */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() =>
                  onUpdateQuantity(item, Math.max(1, item.quantity - 1))
                }
                disabled={item.quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-sm w-8 text-center">{item.quantity}</span>
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => onUpdateQuantity(item, item.quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                ${totalPrice.toFixed(2)}
              </p>
              <p className="text-xs text-gray-500">
                ${item.size.price.toFixed(2)} add-ons
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Cart() {
  const [isClient, setIsClient] = useState(false);
  const cartStore = useStore<CartStore, CartStore>(
    useCartStore,
    (state) => state
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handlers = useSwipeable({
    onSwipedLeft: () => closeSheet(),
    onSwipedRight: () => openSheet(),
  });

  const closeSheet = () => {
    document.getElementById("sheet-content")?.classList.remove("open");
  };

  const openSheet = () => {
    document.getElementById("sheet-content")?.classList.add("open");
  };

  // Loading state component
  const LoadingCart = () => (
    <button
      type="button"
      className="relative rounded-full p-1 text-main-800 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-main-500 focus:ring-offset-2 hover:cursor-pointer"
    >
      <span className="absolute -inset-1.5" />
      <span className="sr-only">View cart</span>
      <ShoppingBag className="h-6 w-6" aria-hidden="true" />
    </button>
  );

  if (!isClient || !cartStore) {
    return <LoadingCart />;
  }

  const { cart, changeQuantity, removeFromCart } = cartStore;
  const cartCount = cart.length;
  const cartTotal = cart.reduce((total, item) => {
    const additionalCost =
      item.animals.reduce((sum, animal) => sum + animal.animal.price, 0) +
      (item.hat?.price || 0);
    return total + (item.size.price + additionalCost) * item.quantity;
  }, 0);

  return (
    <div {...handlers}>
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
        <SheetContent
          id="sheet-content"
          className="overflow-y-auto w-full sm:max-w-md"
        >
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
                  <div className="divide-y divide-gray-200">
                    {cart.map((item, index) => (
                      <CartItemDisplay
                        key={`${item.color.id}-${item.size.id}-${index}`}
                        item={item}
                        onUpdateQuantity={changeQuantity}
                        onRemove={removeFromCart}
                      />
                    ))}
                  </div>

                  <div className="space-y-4 mt-6 border-t border-gray-200">
                    <div className="flex items-center justify-between pt-6 text-base font-medium text-gray-900">
                      <dt>Total</dt>
                      <dd>${cartTotal.toFixed(2)}</dd>
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="text-sm text-gray-500">
                      Free Shipping within the Gold Coast
                    </p>
                  </div>

                  <div className="mt-6">
                    <Button asChild className="w-full" size="lg">
                      <a href="/checkout">Proceed to Checkout</a>
                    </Button>
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
