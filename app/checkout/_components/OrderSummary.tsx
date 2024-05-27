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
  return (
    <>
      <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
      <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
        <h3 className="sr-only">Items in your cart</h3>
        {cart.length === 0 && (
          <div className="flex items-center justify-center h-64">
            <p className="text-lg font-medium text-gray-500">
              Your cart is empty
            </p>
          </div>
        )}
        {cart.length > 0 && <CartContent cart={cart} />}
        {pickUp && <PickUpLocationMap />}
        <div className="space-y-6 py-6 text-sm font-medium text-gray-500 px-6">
          <div className="flex items-center justify-between border-t border-gray-200 pt-6 text-gray-900">
            <dt className="text-base">
              {selectedDeliveryMethod.id === 2
                ? "Transaction Fee"
                : "Shipping Fee"}
            </dt>
            <dd className="text-base">
              ${selectedDeliveryMethod.price.toFixed(2)}
            </dd>
          </div>
        </div>
        <div className="space-y-6 py-6 text-sm font-medium text-gray-500 px-6">
          <div className="flex items-center justify-between text-gray-900">
            <dt className="text-base">Total</dt>
            <dd className="text-base">
              $
              {(
                cart.reduce(
                  (acc, item) => acc + item.bundlePrice * item.quantity,
                  0
                ) + selectedDeliveryMethod.price
              ).toFixed(2)}
            </dd>
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
        <p>3029 The Blvd, Carrara QLD 4211</p>

        <Link
          href={
            "https://www.google.com/maps/place/3029+The+Blvd,+Carrara+QLD+4211/data=!4m2!3m1!1s0x6b911b21296d7a59:0x27619f25d792bca2?sa=X&ved=1t:242&ictx=111"
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
          src="https://res.cloudinary.com/dddxwdp7v/image/upload/v1716789828/YarnPetals/frenchQuarters_j6kstw.webp"
          alt="Map"
          width={200}
          height={200}
          className="rounded-lg"
        />
      </div>
    </div>
  );
};
