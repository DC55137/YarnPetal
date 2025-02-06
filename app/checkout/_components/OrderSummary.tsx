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
    <>
      <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
      <div className="my-4 rounded-lg border border-gray-200 bg-white shadow-sm">
        <h3 className="sr-only">Items in your cart</h3>
        {cart.length === 0 && (
          <div className="flex items-center justify-center h-64">
            <p className="text-lg font-medium text-gray-500">
              Your cart is empty
            </p>
          </div>
        )}
        {cart.length > 0 && (
          <>
            <CartContent cart={cart} />
            <div className="flex justify-start mb-10 ml-4">
              <Link href="/create">
                <h1 className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-main-500 hover:bg-main-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-500">
                  Add Another Design
                  <ArrowRight className="ml-2" size={16} />
                </h1>
              </Link>
            </div>
          </>
        )}
        {pickUp && <PickUpLocationMap />}
        <div className="space-y-4 border-t border-gray-200 px-6 pt-6">
          {/* Base bundle subtotal */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <dt>Base bundles subtotal</dt>
            <dd>${subtotal.toFixed(2)}</dd>
          </div>

          {/* Extra animals total if any */}
          {extraAnimalTotal > 0 && (
            <div className="flex items-center justify-between text-sm text-blue-600">
              <dt>Extra animals</dt>
              <dd>+${extraAnimalTotal.toFixed(2)}</dd>
            </div>
          )}

          {/* Special flowers total if any */}
          {specialFlowerTotal > 0 && (
            <div className="flex items-center justify-between text-sm text-pink-600">
              <dt>Special flowers</dt>
              <dd>+${specialFlowerTotal.toFixed(2)}</dd>
            </div>
          )}

          {/* Items subtotal */}
          <div className="flex items-center justify-between text-sm font-medium text-gray-900 pt-4 border-t border-gray-200">
            <dt>Items subtotal</dt>
            <dd>${itemsTotal.toFixed(2)}</dd>
          </div>

          {/* Delivery fee */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <dt>
              {selectedDeliveryMethod.id === 2
                ? "Transaction Fee"
                : "Shipping Fee"}
            </dt>
            <dd>+${selectedDeliveryMethod.price.toFixed(2)}</dd>
          </div>

          {/* Final total */}
          <div className="flex mb-4 items-center justify-between border-t border-gray-200 pt-4 text-base font-medium text-gray-900">
            <dt>Total</dt>
            <dd>${finalTotal.toFixed(2)}</dd>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSummary;

const PickUpLocationMap = () => {
  return (
    <div className="w-full flex flex-row px-4 sm:px-6 justify-between">
      <div className="flex flex-col gap-2 grow-0">
        <MapPin size={24} />
        <p className="">Pick Up</p>
        <p>5 Batchworth Rd, Molendinar QLD 4214</p>

        <Link
          href={
            "https://www.google.com/maps/place/5+Batchworth+Rd,+Molendinar+QLD+4214/data=!4m2!3m1!1s0x6b911a992a49e773:0x331eb854cd906a8c?sa=X&ved=1t:242&ictx=111&cshid=1731940642694121"
          }
          className="flex items-center gap-2 text-main-500 underline-offset-4 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Get Directions →
        </Link>
      </div>
      <div className="">
        <Image
          src="https://res.cloudinary.com/dddxwdp7v/image/upload/v1731940497/YarnPetals/Screenshot_2024-11-19_at_12.19.41_am_fzguub.png"
          alt="Map"
          width={200}
          height={200}
          className="rounded-lg"
        />
      </div>
    </div>
  );
};
