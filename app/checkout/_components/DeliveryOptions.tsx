import React from "react";
import { Description, Label, Radio, RadioGroup } from "@headlessui/react";
import { deliveryMethodType, deliveryMethods } from "@/data/constants";
import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type DeliveryOptionsProps = {
  selectedDeliveryMethod: deliveryMethodType;
  setSelectedDeliveryMethod: (deliveryMethod: deliveryMethodType) => void;
};

export default function DeliveryOptions({
  selectedDeliveryMethod,
  setSelectedDeliveryMethod,
}: DeliveryOptionsProps) {
  return (
    <RadioGroup
      value={selectedDeliveryMethod}
      onChange={setSelectedDeliveryMethod}
    >
      <Label className="text-lg font-medium text-gray-900">
        Delivery method
      </Label>
      <p className="mt-2 text-sm text-gray-500">
        We are currently only shipping in the Gold Coast area.
      </p>

      <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
        {deliveryMethods.map((deliveryMethod) => (
          <Radio
            key={deliveryMethod.id}
            value={deliveryMethod}
            className={({ checked, focus }) =>
              cn(
                checked ? "border-transparent" : "border-gray-300",
                focus ? "ring-2 ring-main-500" : "",
                "relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none"
              )
            }
          >
            {({ checked, focus }) => (
              <>
                <span className="flex flex-1">
                  <span className="flex flex-col">
                    <Label
                      as="span"
                      className="block text-sm font-medium text-gray-900"
                    >
                      {deliveryMethod.title}
                    </Label>
                    <Description
                      as="span"
                      className="mt-1 flex items-center text-sm text-gray-500"
                    >
                      {deliveryMethod.turnaround}
                    </Description>
                    <Description
                      as="span"
                      className="mt-6 text-sm font-medium text-gray-900"
                    >
                      ${deliveryMethod.price.toFixed(2)}
                    </Description>
                  </span>
                </span>
                {checked ? (
                  <CheckCircle
                    className="h-5 w-5 text-main-600"
                    aria-hidden="true"
                  />
                ) : null}
                <span
                  className={cn(
                    focus ? "border" : "border-2",
                    checked ? "border-main-500" : "border-transparent",
                    "pointer-events-none absolute -inset-px rounded-lg"
                  )}
                  aria-hidden="true"
                />
              </>
            )}
          </Radio>
        ))}
      </div>
    </RadioGroup>
  );
}
