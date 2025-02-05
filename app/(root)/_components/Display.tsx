"use client";
import { useEffect, useRef, useState } from "react";
import { pacifico } from "@/app/fonts";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function Display() {
  const imageRef = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    const currentImageRef = imageRef.current;

    if (currentImageRef) {
      observer.observe(currentImageRef);
    }

    return () => {
      if (currentImageRef) {
        observer.unobserve(currentImageRef);
      }
    };
  }, [imageRef]);

  return (
    <div className="bg-accent-400 py-20">
      <div className="grid grid-cols-2 w-full p-10 container">
        <DisplayHeading />
        <DisplayInfo />
      </div>
      <div className="container relative sm:px-20 my-14">
        <Image
          src="https://res.cloudinary.com/dddxwdp7v/image/upload/v1716462457/YarnPetals/DSCF0752_gk6sgi.webp"
          alt="Customise your bouquet"
          width={1920}
          height={1080}
          className="md:w-10/12 w-full rounded-2xl"
        />
        <Image
          ref={imageRef}
          src="https://res.cloudinary.com/dddxwdp7v/image/upload/v1716465935/YarnPetals/IMG_2427_m5xnh0.webp"
          alt="Customise your bouquet"
          width={500}
          height={500}
          className={`rounded-2xl absolute hidden md:block sm:top-20 right-20 w-3/12 ${
            isIntersecting ? "image-slide-in" : "image-slide-out"
          }`}
        />
      </div>
    </div>
  );
}

const DisplayHeading = () => {
  return (
    <div className="col-span-2 sm:col-span-1 sm:px-10">
      <h4 className="text-secondary-900">Customizable your</h4>
      <h2 className={cn("font-handwriting", "text-main-600")}>Bundles</h2>
    </div>
  );
};

const DisplayInfo = () => {
  return (
    <div className="col-span-2 sm:col-span-1 sm:px-10">
      <p className="mb-10 text-lg text-balance">
        Our bundles are perfect for any occasion. Whether you&apos;re looking
        for a gift for a loved one or a treat for yourself, we have the perfect
        arrangement for you. Each bundle can be customized to match your style
        and preferences. Choose from a variety of themes and occasions, and
        personalize your bouquet with your favorite colors and flowers.
      </p>
      <Link href="/bundles">
        <Button size={"lg"}>Shop Bundles</Button>
      </Link>
    </div>
  );
};
