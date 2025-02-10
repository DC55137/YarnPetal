import { pacifico } from "@/app/fonts";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Logo({ className }: { className?: string }) {
  return (
    <Link className={cn("", className)} href="/">
      <Image
        src="https://res.cloudinary.com/dddxwdp7v/image/upload/v1738737751/YarnPetals/LongLogo_gd6oqa.png"
        alt="Yarn Petals Logo"
        width={600}
        height={100}
        className="mx-auto"
      />
    </Link>
  );
}
