import React from "react";
import { deliveryMethodType, deliveryMethods } from "@/data/constants";

type DeliveryOptionsProps = {
  selectedDeliveryMethod: deliveryMethodType;
  setSelectedDeliveryMethod: (deliveryMethod: deliveryMethodType) => void;
};

export default function DeliveryOptions({
  selectedDeliveryMethod,
  setSelectedDeliveryMethod,
}: DeliveryOptionsProps) {
  return (
    <div className="w-full">
      <label
        htmlFor="delivery-method"
        className="block text-lg font-medium text-gray-900"
      >
        Delivery method
      </label>
      <p className="mt-2 text-sm text-gray-500">
        We are currently only shipping in the Gold Coast area.
      </p>
      <div className="mt-4 relative">
        <select
          id="delivery-method"
          name="delivery-method"
          value={selectedDeliveryMethod.id.toString()} // Convert the selectedDeliveryMethod id to string
          onChange={(e) => {
            const selected = deliveryMethods.find(
              (method) => method.id.toString() === e.target.value
            );
            if (selected) {
              setSelectedDeliveryMethod(selected);
            }
          }}
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-main-500 focus:border-main-500 sm:text-sm rounded-md"
        >
          {deliveryMethods.map((deliveryMethod) => (
            <option
              key={deliveryMethod.id}
              value={deliveryMethod.id.toString()}
            >
              {deliveryMethod.title} - {deliveryMethod.turnaround} - $
              {deliveryMethod.price.toFixed(2)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
