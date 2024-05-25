"use client";

import React, { useState } from "react";
import { z } from "zod";

const orderNumberSchema = z
  .string()
  .regex(/^\d+$/, "Order number must be numeric");

export default function OrderSearch() {
  const [orderNumber, setOrderNumber] = useState("");
  const [error, setError] = useState("");

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      orderNumberSchema.parse(orderNumber);
      setError("");
      window.location.assign(`/order-confirmation/${orderNumber}`);
    } catch (e) {
      if (e instanceof z.ZodError) {
        setError(e.errors[0].message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border border-gray-200 rounded-lg shadow-md">
      <form onSubmit={handleSearch} className="flex flex-col">
        <label
          htmlFor="orderNumber"
          className="mb-2 text-lg font-medium text-gray-700"
        >
          Enter your Order Number
        </label>
        <input
          type="text"
          id="orderNumber"
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
          placeholder="Order Number"
          className="p-2 border border-gray-300 rounded-md mb-4 focus:ring-main-500 focus:border-main-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-main-600 text-white rounded-md hover:bg-main-700 transition"
        >
          Search
        </button>
        {error && <p className="mt-2 text-red-500">{error}</p>}
      </form>
    </div>
  );
}
