import React from "react";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Yarn Petals | Checkout",
  description: "Beautiful floral arrangements for any occasion.",
};

export default function layout({ children }: { children: React.ReactNode }) {
  // check if params.lang is a valid language key inside LangKey
  // if not, redirect to the english version of the page (en)

  return <div>{children}</div>;
}
