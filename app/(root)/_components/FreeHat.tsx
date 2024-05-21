import { pacifico } from "@/app/fonts";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export default function FreeHat() {
  return (
    <div className="bg-accent-400  w-full py-32 ">
      <div className="md:container flex flex-col md:flex-row gap-10 ">
        <div className="imageDiv w-1/2 justify-center align-middle mx-auto ">
          <Image
            src="https://res.cloudinary.com/dddxwdp7v/image/upload/v1716290103/YarnPetals/FreeHat_nppzuy.png"
            alt="Free Hat with purchase"
            width={500}
            height={500}
            className="mx-auto w-auto h-auto align-bottom "
          />
        </div>
        <div className="TextDiv w-1/2 flex justify-center align-middle mx-auto">
          <div className="my-auto mx-auto flex flex-col gap-6">
            <h1
              className={cn(
                "md:text-8xl font-bold text-white text-center text-7xl",
                pacifico.className
              )}
            >
              Free Hat
            </h1>
            <p className="text-white text-center md:text-3xl text-lg">
              With any bouquet purchase!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
