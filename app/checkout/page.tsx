import React from "react";
import CheckoutClient from "./_components/CheckoutClient";
import Navbar from "../(root)/_components/Navbar";

export default function page() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-10">
        <CheckoutClient />
      </main>
    </>
  );
}
