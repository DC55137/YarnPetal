// This component is responsible for rendering the mail form for the checkout page
// @/checkout/_components/CheckoutMailForm.tsx

"use client";

import React, { useState } from "react";
import { set, z } from "zod";
import { deliveryMethodType } from "@/data/constants";
import DeliveryOptions from "./DeliveryOptions";
import OrderSummary from "./OrderSummary";
import { CartItem, useCartStore } from "@/src/stores/cart-store";
import { checkout } from "@/actions/checkout";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";

const availablePostCodes = [
  4207, 4211, 4215, 4219, 4223, 4227, 4212, 4216, 4220, 4224, 4228, 4209, 4217,
  4221, 4225, 4230, 4214, 4218, 4222, 4226,
];

const mailFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits long"),
  address: z.string().min(1, "Address is required"),
  apartment: z.string().optional(),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
  region: z.string().min(1, "Region is required"),
  postalCode: z
    .string()
    .min(1, "Postal code is required")
    .refine((val) => /^[0-9]+$/.test(val), "Postal code must be numeric"),
  notes: z.string().optional(),
});

type MailFormData = z.infer<typeof mailFormSchema>;

type CheckoutMailFormProps = {
  selectedDeliveryMethod: deliveryMethodType;
  setSelectedDeliveryMethod: (deliveryMethod: deliveryMethodType) => void;
  cart: CartItem[];
};

export default function CheckoutMailForm({
  selectedDeliveryMethod,
  setSelectedDeliveryMethod,
  cart,
}: CheckoutMailFormProps) {
  const [loading, setLoading] = useState(false);
  const isAustraliaWide = selectedDeliveryMethod.id === 4;

  const [form, setForm] = useState<MailFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    country: "Australia",
    region: "Queensland",
    postalCode: "",
    notes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target as {
      name: keyof MailFormData;
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

    if (cart.length === 0) {
      toast.error("Cart is empty");
      setLoading(false);
      return;
    }

    // Validate postal code for non-Australia-wide deliveries
    if (
      !isAustraliaWide &&
      !availablePostCodes.includes(Number(form.postalCode))
    ) {
      setErrors({
        ...errors,
        postalCode: "Only deliveries within the Gold Coast area",
      });
      setLoading(false);
      toast.error("Only deliveries within the Gold Coast area");
      return;
    }

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
      mailFormSchema.parse(form);
      checkout({ formData })
        .then((response) => {
          if (response.url) {
            if (response.url.includes("cancelled=true")) {
              toast.error("Payment canceled");
              setLoading(false);
              return;
            } else {
              setErrors({});
              window.location.assign(response.url);
            }
          } else {
            toast.error("Error: No URL returned");
            setLoading(false);
          }
        })
        .catch((error) => {
          toast.error(`error: ${error.message}`);
          setLoading(false);
        });
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
              {/* Contact Information Fields */}
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

                {/* Shipping Information Section */}
                <div className="mt-10 border-t border-gray-200 pt-10">
                  <h2 className="text-lg font-medium text-gray-900">
                    Shipping Information
                  </h2>
                  <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Address
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          onChange={handleChange}
                          name="address"
                          id="address"
                          autoComplete="street-address"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-main-500 focus:ring-main-500 sm:text-sm"
                          disabled={loading}
                        />
                        {errors.address && (
                          <p className="text-red-500 text-xs italic">
                            {errors.address}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="apartment"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Apartment, suite, etc.
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          onChange={handleChange}
                          name="apartment"
                          id="apartment"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-main-500 focus:ring-main-500 sm:text-sm"
                          disabled={loading}
                        />
                        {errors.apartment && (
                          <p className="text-red-500 text-xs italic">
                            {errors.apartment}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="col-span-1">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700"
                      >
                        City
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          onChange={handleChange}
                          name="city"
                          id="city"
                          autoComplete="address-level2"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-main-500 focus:ring-main-500 sm:text-sm"
                          disabled={loading}
                        />
                        {errors.city && (
                          <p className="text-red-500 text-xs italic">
                            {errors.city}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="col-span-1">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Country
                      </label>
                      <div className="mt-1">
                        <select
                          disabled={true}
                          id="country"
                          name="country"
                          autoComplete="country-name"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-main-500 focus:ring-main-500 sm:text-sm"
                        >
                          <option>Australia</option>
                        </select>
                        {errors.country && (
                          <p className="text-red-500 text-xs italic">
                            {errors.country}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="region"
                        className="block text-sm font-medium text-gray-700"
                      >
                        State / Province
                      </label>
                      <div className="mt-1">
                        <input
                          disabled={isAustraliaWide ? false : true}
                          onChange={handleChange}
                          value={isAustraliaWide ? form.region : "Queensland"}
                          type="text"
                          name="region"
                          id="region"
                          autoComplete="address-level1"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-main-500 focus:ring-main-500 sm:text-sm"
                        />
                        {errors.region && (
                          <p className="text-red-500 text-xs italic">
                            {errors.region}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="postal-code"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Postal code
                      </label>
                      <div className="mt-1">
                        <input
                          onChange={handleChange}
                          type="text"
                          name="postalCode"
                          id="postal-code"
                          autoComplete="postal-code"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-main-500 focus:ring-main-500 sm:text-sm"
                          disabled={loading}
                        />
                        {errors.postalCode && (
                          <p className="text-red-500 text-xs italic">
                            {errors.postalCode}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
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
