import { pacifico } from "@/app/fonts";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export default function Customise() {
  return (
    <div className=" w-full py-52">
      <div className="md:container flex flex-col md:flex-row gap-10 ">
        <div className="TextDiv w-1/2 flex justify-center align-middle mx-auto">
          <div className="my-auto mx-auto flex flex-col gap-6">
            <h1
              className={cn(
                "md:text-8xl font-bold text-main-500 text-center text-7xl my-4",
                "font-handwriting"
              )}
            >
              Customised Bouquet
            </h1>
            <p className="text-accent-800 text-center md:text-3xl text-lg">
              Choose your own flowers, colours and animals!
            </p>
          </div>
        </div>
        <div className="imageDiv w-1/2 justify-center align-middle mx-auto ">
          <Image
            src="https://res.cloudinary.com/dddxwdp7v/image/upload/v1716298927/YarnPetals/DSCF0752_psr0md.jpg"
            alt="Free Hat with purchase"
            width={500}
            height={500}
            className="mx-auto w-auto h-auto align-bottom rounded-full "
          />
        </div>
      </div>
    </div>
  );
}
