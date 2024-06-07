import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Yarn Petals | Home",
  description: "Beautiful floral arrangements for any occasion.",
};

export default function layout({ children }: { children: React.ReactNode }) {
  // check if params.lang is a valid language key inside LangKey
  // if not, redirect to the english version of the page (en)

  return <div>{children}</div>;
}
