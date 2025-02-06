"use client";
import { deliveryMethodType } from "@/data/constants";
import { CartItem } from "@/src/stores/cart-store";
import React, { useState } from "react";
import { z } from "zod";
import OrderSummary from "./OrderSummary";
import DeliveryOptions from "./DeliveryOptions";
import toast from "react-hot-toast";
import { checkout } from "@/actions/checkout";
import { Loader } from "lucide-react";

const pickUpFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits long"),
  notes: z.string().optional(),
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
  const [form, setForm] = useState<PickUpFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    notes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target as {
      name: keyof PickUpFormData;
      value: string;
    };
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const calculateTotals = () => {
    const itemsTotal = cart.reduce((total, item) => {
      return total + item.totalPrice * item.quantity;
    }, 0);

    return {
      itemsTotal,
      finalTotal: itemsTotal + selectedDeliveryMethod.price,
    };
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const { finalTotal } = calculateTotals();

    const formData = {
      ...form,
      deliveryMethod: selectedDeliveryMethod.title,
      price: finalTotal,
      cart: cart.map((item) => ({
        ...item,
        price: item.totalPrice, // Ensure we're using the total price per item
      })),
    };

    try {
      pickUpFormSchema.parse(form);

      if (cart.length === 0) {
        toast.error("Cart is empty");
        setLoading(false);
        return;
      }

      if (selectedDeliveryMethod.id === 1) {
        const userConfirmed = window.confirm(
          "Please confirm that you would like to pay cash on pick up"
        );
        if (!userConfirmed) {
          setLoading(false);
          return;
        }

        checkout({ formData })
          .then((response) => {
            setErrors({});
            toast.success("Order placed successfully");
            window.location.assign(
              `/order-confirmation/${response.orderNumber}`
            );
          })
          .catch((error) => {
            toast.error(`Error: ${error.message}`);
            setLoading(false);
          });
      } else {
        checkout({ formData })
          .then((response) => {
            if (response.url) {
              setErrors({});
              window.location.assign(response.url);
            } else {
              toast.error("Error: No URL returned");
              setLoading(false);
            }
          })
          .catch((error) => {
            toast.error(`Error from server: ${error.message}`);
            setLoading(false);
          });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors = error.flatten().fieldErrors;
        const errorMessages: Record<string, string> = {};
        for (const key in newErrors) {
          errorMessages[key] = newErrors[key]?.[0] ?? "Unexpected error";
        }
        setErrors(errorMessages);
        setLoading(false);
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
            <DeliveryOptions
              selectedDeliveryMethod={selectedDeliveryMethod}
              setSelectedDeliveryMethod={setSelectedDeliveryMethod}
            />
            <div className="mt-6 sm:col-span-2">
              <label
                htmlFor="notes"
                className="block text-sm font-medium text-gray-700"
              >
                Notes for the Floral Artisan
              </label>
              <div className="mt-1">
                <textarea
                  onChange={handleChange}
                  name="notes"
                  id="notes"
                  rows={4}
                  placeholder="Special requests or notes for your bouquet's arrangement..."
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-main-500 focus:ring-main-500 sm:text-sm"
                  disabled={loading}
                />
                {errors.notes && (
                  <p className="text-red-500 text-xs italic">{errors.notes}</p>
                )}
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Let our Floral Artisan know if you have any specific preferences
                or requests for your bouquet.
              </p>
            </div>

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
                    disabled={loading}
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
                    disabled={loading}
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
                    disabled={loading}
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
                    disabled={loading}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs italic">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg mt-4 font-medium text-gray-900 my-4">
                Pick up confirmation
              </h2>
              <p>
                Yarn Petals will contact you to confirm your order and pick up
                time. Please ensure that the contact information provided is
                correct. Thank you!
              </p>
            </div>
          </div>

          <div className="mt-10 lg:mt-0">
            <OrderSummary
              cart={cart}
              selectedDeliveryMethod={selectedDeliveryMethod}
              pickUp={true}
            />
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <button
                disabled={loading}
                type="submit"
                className={`w-full rounded-md border border-transparent bg-main-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-main-700 focus:outline-none focus:ring-2 focus:ring-main-500 focus:ring-offset-2 focus:ring-offset-gray-50 ${
                  loading ? "cursor-not-allowed opacity-50 animate-pulse" : ""
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <Loader size={20} className="animate-spin" />
                    <span className="ml-2">Loading...</span>
                  </div>
                ) : (
                  "Confirm order"
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
