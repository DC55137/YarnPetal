import { pacifico } from "@/app/fonts";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export function Features1() {
  return (
    <div className="bg-accent-400 w-full flex flex-col gap-20 md:gap-0 py-20">
      <div className="md:container flex flex-col-reverse md:flex-row gap-10 mt-10 md:mt-0">
        <FeatureImage
          src="https://res.cloudinary.com/dddxwdp7v/image/upload/v1716383052/YarnPetals/FreeHat_bp7kkn.png"
          alt="Free Hat with purchase"
        />
        <FeaturesText
          header="Free Hat"
          subHeader="With any bouquet purchase!"
        />
      </div>
      <div className="md:container flex flex-col md:flex-row-reverse gap-10 ">
        <FeatureImage
          src="https://res.cloudinary.com/dddxwdp7v/image/upload/v1716298927/YarnPetals/DSCF0752_psr0md.jpg"
          alt="Customise your bouquet"
        />
        <FeaturesText
          header="Customise Your Bouquet"
          subHeader="Browse our selection of flowers and create your own bouquet!"
        />
      </div>
    </div>
  );
}
export function Features2() {
  return (
    <div className="bg-accent-400 w-full flex flex-col gap-20 md:gap-0 py-20">
      <div className="md:container flex flex-col-reverse md:flex-row gap-10 mt-10 md:mt-0">
        <FeatureImage
          src="https://res.cloudinary.com/dddxwdp7v/image/upload/v1716383646/YarnPetals/Birthdays_eqer04.png"
          alt="Free Hat with purchase"
        />
        <FeaturesText
          header="Birthdays"
          subHeader="Celebrate with a bouquet!"
        />
      </div>
      <div className="md:container flex flex-col md:flex-row gap-10 ">
        <FeaturesText
          header="Graduations"
          subHeader="Celebrate with a bouquet!"
        />
        <FeatureImage
          src="https://res.cloudinary.com/dddxwdp7v/image/upload/v1716384006/YarnPetals/Graduation_jwc2bd.png"
          alt="Customise your bouquet"
        />
      </div>
    </div>
  );
}

type FeaturesTextProps = {
  header: string;
  subHeader: string;
};

const FeaturesText = ({ header, subHeader }: FeaturesTextProps) => {
  return (
    <div className="TextDiv w-1/2 flex justify-center text-center md:text-left mx-auto">
      <div className="my-auto mx-auto flex flex-col gap-6">
        <h2 className={cn(pacifico.className)}>{header}</h2>
        <h4 className="text-main-800 ">{subHeader}</h4>
      </div>
    </div>
  );
};

type FeatureImageProps = {
  src: string;
  alt: string;
};

const FeatureImage = ({ src, alt }: FeatureImageProps) => {
  return (
    <div className="w-1/2 justify-center align-middle mx-auto my-10">
      <Image
        src={src}
        alt={alt}
        width={500}
        height={500}
        className="mx-auto w-auto h-auto align-bottom rounded-3xl"
      />
    </div>
  );
};
