import { pacifico } from "@/app/fonts";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export function Features() {
  return (
    <div className="relative bg-accent-400 w-full flex flex-col gap-20 md:gap-0 pb-20">
      <div className="absolute inset-0 bg-accent-500" />
      <div className="absolute inset-0 bg-[url('/noise.jpg')] opacity-5" />
      <div className="relative container">
        <div className=" flex flex-col md:flex-row gap-2 mt-10 md:mt-0">
          <FeaturesText
            header="Free Hat"
            subHeader="With any bouquet purchase!"
          />
          <FeatureImage2
            src="https://res.cloudinary.com/dddxwdp7v/image/upload/v1716474284/YarnPetals/Untitled_Artwork-5_bcfnni.webp"
            alt="Free Hat with purchase"
          />
        </div>
        <div className=" flex flex-col-reverse md:flex-row md:gap-10">
          <FeatureImage
            src="https://res.cloudinary.com/dddxwdp7v/image/upload/v1716474234/YarnPetals/GRADUATION_BUNDLE-2_1024x1024_xz3lal.webp"
            alt="Free Hat with purchase"
          />
          <FeaturesText
            header="Birthdays"
            subHeader="Celebrate with a bouquet!"
          />
        </div>
        <div className=" flex flex-col md:flex-row md:gap-10 ">
          <FeaturesText
            header="Graduations"
            subHeader="Celebrate with a bouquet!"
          />
          <FeatureImage
            src="https://res.cloudinary.com/dddxwdp7v/image/upload/v1716474234/YarnPetals/Untitled_design-9_1024x1024_z2hnzc.webp"
            alt="Customise your bouquet"
          />
        </div>
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
    <div className="md:w-1/2 flex justify-center text-center md:text-left mx-auto">
      <div className="my-auto mx-auto flex flex-col sm:gap-6">
        <h2 className={cn("font-handwriting", "text-center")}>{header}</h2>
        <h4 className="text-main-800 text-center">{subHeader}</h4>
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
    <div className="md:w-1/2 justify-center align-middle md:mx-auto my-10 mx-2 ">
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
const FeatureImage2 = ({ src, alt }: FeatureImageProps) => {
  return (
    <div className="md:w-1/2 justify-center align-middle md:mx-auto my-10 mx-2 ">
      <Image
        src={src}
        alt={alt}
        width={500}
        height={500}
        className="mx-auto w-auto h-auto align-bottom rounded-3xl lg:px-28 px-16"
      />
    </div>
  );
};
