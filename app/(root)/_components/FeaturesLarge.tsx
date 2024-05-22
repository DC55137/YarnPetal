import { pacifico } from "@/app/fonts";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export default function FeaturesLarge() {
  return (
    <section className="flex flex-col justify-center align-middle  py-100 bg-accent-400">
      <div className="flex flex-col gap-4 justify-center align-middle">
        <div className="flex flex-row justify-center align-middle gap-10 px-10 w-full mx-auto ">
          <div className="">
            <Image
              src="https://res.cloudinary.com/dddxwdp7v/image/upload/v1716290103/YarnPetals/FreeHat_nppzuy.png"
              alt="Your Company"
              width={500}
              height={500}
              className=" h-auto mx-auto "
            />
          </div>
          <div className="flex flex-col justify-center align-top">
            <h1
              className={cn(
                "text-7xl font-bold tracking-tight text-white",
                pacifico.className
              )}
            >
              Free Hat
            </h1>
            <p className="mt-4 text-gray-500 ">
              Get a free hat with every purchase of $100 or more. Keep warm and
              stylish with our handmade hats.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
