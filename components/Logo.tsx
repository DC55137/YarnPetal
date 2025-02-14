import { pacifico } from "@/app/fonts";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Logo({ className }: { className?: string }) {
  return (
    <Link
      className={cn("flex gap-2 items-center justify-center", className)}
      href="/"
    >
      <Image
        src="https://res.cloudinary.com/dddxwdp7v/image/upload/v1739154907/YarnPetals/Logo_ydcjge.png"
        alt="logo"
        width={50}
        height={50}
      />
    </Link>
  );
}
