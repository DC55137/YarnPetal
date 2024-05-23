import { pacifico } from "@/app/fonts";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <Link className="flex gap-2 items-center justify-center" href="/">
      <Image
        className="h-12 w-auto"
        src="https://res.cloudinary.com/dddxwdp7v/image/upload/v1716465126/YarnPetals/logo_2_lyaxqd.webp"
        alt="Your Company"
        width={50}
        height={50}
      />
      <h1 className={cn(pacifico.className, "text-main-400 text-4xl")}>
        Yarn Petals
      </h1>
    </Link>
  );
}
