// Code: CheckoutPickUpForm component

"use client";
import { deliveryMethodType } from "@/data/constants";
import { CartItem, useCartStore } from "@/src/stores/cart-store";
import React, { useState } from "react";
import { z } from "zod";
import OrderSummary from "./OrderSummary";
import DeliveryOptions from "./DeliveryOptions";
import { orderPayCash } from "@/actions/order-pay-cash";
import toast from "react-hot-toast";
import { checkout } from "@/actions/checkout";

const pickUpFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits long"),
});

type PickUpFormData = z.infer<typeof pickUpFormSchema>;

type CheckoutPickUpFormProps = {
  selectedDeliveryMethod: deliveryMethodType;
  setSelectedDeliveryMethod: (deliveryMethod: deliveryMethodType) => void;
  cart: CartItem[];
};

export default function CheckoutPickUpForm({
  selectedDeliveryMethod,
  setSelectedDeliveryMethod,
  cart,
}: CheckoutPickUpFormProps) {
  const { clearCart } = useCartStore((state) => state);
  const [form, setForm] = useState<PickUpFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as {
      name: keyof PickUpFormData;
      value: string;
    };
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      ...form,
      deliveryMethod: selectedDeliveryMethod.title,
      price:
        cart.reduce((acc, item) => acc + item.bundlePrice * item.quantity, 0) +
        selectedDeliveryMethod.price,
      cartItems: cart,
    };
    // check selectedDeliveryMethod if it's pay cash or pay online

    try {
      pickUpFormSchema.parse(form);
      if (selectedDeliveryMethod.id === 1) {
        const userConfirmed = window.confirm(
          "Please confirm that you will pay cash on pick up"
        );
        if (!userConfirmed) return;
        orderPayCash({ formData })
          .then((response) => {
            setErrors({}); // Clear all errors on successful submission

            clearCart();
            toast.success("Order placed successfully");
            window.location.assign(`/order-confirmation/${response}`);
          })
          .catch((error) => {
            toast.error(`error: ${error.message}`);
          });
      } else {
        checkout({ formData })
          .then((response) => {
            if (response.url) {
              setErrors({}); // Clear all errors on successful submission
              clearCart();
              window.location.assign(response.url);
            } else {
              toast.error("Error: No URL returned");
            }
          })
          .catch((error) => {
            toast.error(`error: ${error.message}`);
          });
        // const response = await axios.post("/api/checkout", formData);
        // setErrors({}); // Clear all errors on successful submission
        // window.location.assign(response.data.url);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors = error.flatten().fieldErrors;
        const errorMessages: Record<string, string> = {};
        for (const key in newErrors) {
          // Use optional chaining and nullish coalescing to safely handle potentially undefined arrays
          errorMessages[key] = newErrors[key]?.[0] ?? "Unexpected error";
        }
        setErrors(errorMessages);
      }
    }
  };

  return (
    <div className="bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8"
      >
        <h2 className="sr-only">Checkout</h2>
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
          <div>
            {" "}
            {/* This div should contain everything that isn't OrderSummary */}
            <DeliveryOptions
              selectedDeliveryMethod={selectedDeliveryMethod}
              setSelectedDeliveryMethod={setSelectedDeliveryMethod}
            />
            <h2 className="text-lg mt-4 font-medium text-gray-900">
              Contact information
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
              <div className="col-span-1">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  First name
                </label>
                <div className="mt-1">
                  <input
                    onChange={handleChange}
                    type="text"
                    id="first-name"
                    name="firstName"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-main-500 focus:ring-main-500 sm:text-sm"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs italic">
                      {errors.firstName}
                    </p>
                  )}
                </div>
              </div>

              <div className="col-span-1">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last name
                </label>
                <div className="mt-1">
                  <input
                    onChange={handleChange}
                    type="text"
                    id="last-name"
                    name="lastName"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-main-500 focus:ring-main-500 sm:text-sm"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs italic">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-4 sm:col-span-2">
                <label
                  htmlFor="email-address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    onChange={handleChange}
                    type="email"
                    id="email-address"
                    name="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-main-500 focus:ring-main-500 sm:text-sm"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs italic">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-1 sm:col-span-2">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone
                </label>
                <div className="mt-1">
                  <input
                    onChange={handleChange}
                    type="text"
                    name="phone"
                    id="phone"
                    autoComplete="tel"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-main-500 focus:ring-main-500 sm:text-sm"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs italic">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 lg:mt-0">
            <OrderSummary
              cart={cart}
              selectedDeliveryMethod={selectedDeliveryMethod}
            />
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <button
                typeof="submit"
                className="w-full rounded-md border border-transparent bg-main-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-main-700 focus:outline-none focus:ring-2 focus:ring-main-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Confirm order
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
