import { CartContent } from "@/components/CartContent";
import { deliveryMethodType } from "@/data/constants";
import { CartItem } from "@/src/stores/cart-store";

type OrderSummaryProps = {
  cart: CartItem[];
  selectedDeliveryMethod: deliveryMethodType;
};

const OrderSummary = ({ cart, selectedDeliveryMethod }: OrderSummaryProps) => {
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
