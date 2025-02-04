import Logo from "@/components/LogoHeader";
import React from "react";

type Props = {};

export default function Loading({}: Props) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="max-w-4xl px-4">
        <Logo className="mx-auto md:w-[500px] w-[250px] flex animate-pulse" />
      </div>
    </div>
  );
}
