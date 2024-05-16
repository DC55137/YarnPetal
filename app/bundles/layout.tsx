import React from "react";
import Navbar from "../(root)/_components/Navbar";

export default function layout({ children }: { children: React.ReactNode }) {
  // check if params.lang is a valid language key inside LangKey
  // if not, redirect to the english version of the page (en)

  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
