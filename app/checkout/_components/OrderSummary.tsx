import { CartContent } from "@/components/CartContent";
import { deliveryMethodType } from "@/data/constants";
import { CartItem } from "@/src/stores/cart-store";
import { ArrowRight, Locate, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type OrderSummaryProps = {
  cart: CartItem[];
  selectedDeliveryMethod: deliveryMethodType;
  pickUp?: boolean;
};

const OrderSummary = ({
  cart,
  selectedDeliveryMethod,
  pickUp = false,
}: OrderSummaryProps) => {
  // Calculate cart totals
  const subtotal = cart.reduce(
    (total, item) => total + item.basePrice * item.quantity,
    0
  );
  const extraAnimalTotal = cart.reduce(
    (total, item) => total + item.extraAnimalPrice * item.quantity,
    0
  );
  const specialFlowerTotal = cart.reduce(
    (total, item) => total + item.specialFlowerPrice * item.quantity,
    0
  );
  const itemsTotal = cart.reduce(
    (total, item) => total + item.totalPrice * item.quantity,
    0
  );
  const finalTotal = itemsTotal + selectedDeliveryMethod.price;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-main-600 font-handwriting">
        Order Summary
      </h2>

      <div className="rounded-xl border border-main-100 bg-white shadow-sm overflow-hidden">
        <h3 className="sr-only">Items in your cart</h3>

        {/* Empty Cart State */}
        {cart.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <div className="text-main-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <p className="text-lg text-gray-500">Your cart is empty</p>
            <Link
              href="/create"
              className="inline-flex items-center px-4 py-2 bg-main-500 text-white text-sm font-medium rounded-full hover:bg-main-600 transition-colors"
            >
              Start Creating
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        )}

        {/* Cart Items */}
        {cart.length > 0 && (
          <>
            <CartContent cart={cart} />
            <div className="px-6 py-4 bg-gradient-to-b from-main-50/50 to-white">
              <Link
                href="/create"
                className="inline-flex items-center px-4 py-2 bg-main-500 text-white text-sm font-medium rounded-full hover:bg-main-600 transition-colors"
              >
                Add Another Design
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </>
        )}

        {/* Pickup Location */}
        {pickUp && (
          <div className="border-t border-main-100">
            <PickUpLocationMap />
          </div>
        )}

        {/* Price Breakdown */}
        <div className="space-y-4 border-t border-main-100 px-6 py-6 bg-gradient-to-b from-white to-main-50/30">
          {/* Base Subtotal */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <dt>Base bundles subtotal</dt>
            <dd className="font-medium">${subtotal.toFixed(2)}</dd>
          </div>

          {/* Extra Animals */}
          {extraAnimalTotal > 0 && (
            <div className="flex items-center justify-between text-sm">
              <dt className="text-blue-600">Extra animals</dt>
              <dd className="font-medium text-blue-600">
                +${extraAnimalTotal.toFixed(2)}
              </dd>
            </div>
          )}

          {/* Special Flowers */}
          {specialFlowerTotal > 0 && (
            <div className="flex items-center justify-between text-sm">
              <dt className="text-main-600">Special flowers</dt>
              <dd className="font-medium text-main-600">
                +${specialFlowerTotal.toFixed(2)}
              </dd>
            </div>
          )}

          {/* Items Subtotal */}
          <div className="flex items-center justify-between pt-4 border-t border-main-100">
            <dt className="text-sm font-medium text-gray-900">
              Items subtotal
            </dt>
            <dd className="text-sm font-medium text-gray-900">
              ${itemsTotal.toFixed(2)}
            </dd>
          </div>

          {/* Delivery Fee */}
          <div className="flex items-center justify-between text-sm">
            <dt className="text-gray-600">
              {selectedDeliveryMethod.id === 2
                ? "Transaction Fee"
                : "Shipping Fee"}
            </dt>
            <dd className="font-medium text-gray-600">
              +${selectedDeliveryMethod.price.toFixed(2)}
            </dd>
          </div>

          {/* Final Total */}
          <div className="flex items-center justify-between pt-4 border-t border-main-100">
            <dt className="text-lg font-bold text-gray-900">Total</dt>
            <dd className="text-lg font-bold text-main-600">
              ${finalTotal.toFixed(2)}
            </dd>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;

const PickUpLocationMap = () => {
  return (
    <div className="p-6 bg-gradient-to-b from-main-50/50 to-white">
      <div className="flex items-center justify-between gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-main-600">
            <MapPin className="h-5 w-5" />
            <h4 className="font-medium">Pick Up Location</h4>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-gray-600">5 Batchworth Rd</p>
            <p className="text-sm text-gray-600">Molendinar QLD 4214</p>
          </div>

          <Link
            href="https://www.google.com/maps/place/5+Batchworth+Rd,+Molendinar+QLD+4214/data=!4m2!3m1!1s0x6b911a992a49e773:0x331eb854cd906a8c?sa=X&ved=1t:242&ictx=111&cshid=1731940642694121"
            className="inline-flex items-center gap-2 text-sm text-main-600 hover:text-main-700"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Directions
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="relative">
          <Image
            src="https://res.cloudinary.com/dddxwdp7v/image/upload/v1731940497/YarnPetals/Screenshot_2024-11-19_at_12.19.41_am_fzguub.png"
            alt="Map"
            width={200}
            height={200}
            className="rounded-lg ring-1 ring-main-100"
          />
        </div>
      </div>
    </div>
  );
};
