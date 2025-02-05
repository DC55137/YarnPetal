"use client";

import React, { useEffect, useState } from "react";
import { pacifico } from "@/app/fonts";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Loader } from "lucide-react";

const animalList = [
  {
    src: "/Slides/2_Bacon.webp",
    alt: "Bacon",
  },
  {
    src: "/Slides/8_Ted.webp",
    alt: "Ted",
  },
  {
    src: "/Slides/12_Cat.webp",
    alt: "Cat",
  },
  {
    src: "/Slides/4_Bunny.webp",
    alt: "Bunny",
  },
];

const bouquetList = [
  {
    srcFront: "/Slides/PinkFront.webp",
    srcBack: "/Slides/PinkBlank.webp",
  },
  {
    srcFront: "/Slides/PurpleFront.webp",
    srcBack: "/Slides/PurpleBlank.webp",
  },
  {
    srcFront: "/Slides/PinkPurpleFront.webp",
    srcBack: "/Slides/PinkPurpleBlank.webp",
  },
];

export default function CustomiseBouquet() {
  const [currentAnimalIndex, setCurrentAnimalIndex] = useState(0);
  const [currentBouquetIndex, setCurrentBouquetIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [isBouquetSliding, setIsBouquetSliding] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = [
        ...animalList.map((animal) =>
          fetch(animal.src).then((res) => res.blob())
        ),
        ...bouquetList.map((bouquet) =>
          fetch(bouquet.srcBack).then((res) => res.blob())
        ),
        ...bouquetList.map((bouquet) =>
          fetch(bouquet.srcFront).then((res) => res.blob())
        ),
      ];
      await Promise.all(imagePromises);
      setImagesLoaded(true);
    };

    preloadImages();

    const interval = setInterval(() => {
      setIsSliding(true);
      setIsBouquetSliding(true);
      setTimeout(() => {
        setCurrentAnimalIndex((prevIndex) =>
          prevIndex === animalList.length - 1 ? 0 : prevIndex + 1
        );
        setCurrentBouquetIndex((prevIndex) =>
          prevIndex === bouquetList.length - 1 ? 0 : prevIndex + 1
        );
        setIsBouquetSliding(false);
        setIsSliding(false);
      }, 1000); // Duration of slide-out animation

      // if ((currentAnimalIndex + 1) % 2 === 0) {
      //   setIsBouquetSliding(true);
      //   setTimeout(() => {
      //     setCurrentBouquetIndex((prevIndex) =>
      //       prevIndex === bouquetList.length - 1 ? 0 : prevIndex + 1
      //     );
      //     setIsBouquetSliding(false);
      //   }, 1000); // Duration of bouquet slide-out animation
      // }
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [currentAnimalIndex]);

  const getRightPosition = (bouquetIndex: number) => {
    switch (bouquetIndex) {
      case 0:
        return "calc(40% - 50px)";
      case 1:
        return "calc(40% - 20px)";
      case 2:
        return "calc(40% - 15px)";
      default:
        return "calc(40% - 50px)";
    }
  };

  const getBottomPosition = (bouquetIndex: number) => {
    switch (bouquetIndex) {
      case 0:
        return "74%";
      case 1:
        return "76%";
      case 2:
        return "70%";
      default:
        return "73%";
    }
  };

  if (!imagesLoaded) {
    return (
      <div className="bg-accent-400 h-[800px] overflow-hidden">
        <div className="grid grid-cols-2 w-full p-10 container">
          <DisplayHeading />
          <DisplayInfo />
        </div>
        <div className="h-full flex items-center justify-center">
          <Loader className="animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-accent-400 py-4">
      <div className="custom-bouquet-container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-2 w-full p-10 container">
          <DisplayHeading />
          <DisplayInfo />
        </div>
        <div className="relative h-[400px] md:h-[600px] lg:h-[800px] overflow-hidden sm:overflow-visible isolate">
          {bouquetList.map((bouquet, index) => (
            <Image
              key={index}
              src={bouquet.srcBack}
              alt="Bouquet Back"
              fill={true}
              priority
              className={`absolute z-10 transition-transform object-contain duration-1000 ease-in-out ${
                index === currentBouquetIndex
                  ? isBouquetSliding
                    ? "slide-out"
                    : "slide-in"
                  : "hidden"
              }`}
            />
          ))}
          {animalList.map((animal, index) => (
            <Image
              key={index}
              src={animal.src}
              alt={animal.alt}
              width={400}
              height={400}
              priority
              className={`absolute z-20 w-24 sm:w-40 md:w-44 lg:w-56 transition-transform duration-1000 ease-in-out ${
                index === currentAnimalIndex
                  ? isSliding
                    ? "slide-out"
                    : "slide-in"
                  : "hidden"
              }`}
              style={{
                bottom: getBottomPosition(currentBouquetIndex),
                right: getRightPosition(currentBouquetIndex),
              }}
            />
          ))}
          {bouquetList.map((bouquet, index) => (
            <Image
              key={index}
              src={bouquet.srcFront}
              alt="Bouquet Front"
              fill={true}
              priority
              className={`absolute z-30 transition-transform object-contain duration-1000 ease-in-out ${
                index === currentBouquetIndex
                  ? isBouquetSliding
                    ? "slide-out"
                    : "slide-in"
                  : "hidden"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const DisplayHeading = () => {
  return (
    <div className="col-span-2 md:col-span-1 md:px-10">
      <h4 className="text-secondary-900">Customizable your</h4>
      <h2 className={cn("font-handwriting", "text-main-600")}>Bundles</h2>
    </div>
  );
};

const DisplayInfo = () => {
  return (
    <div className="col-span-2 md:col-span-1 md:px-10">
      <p className="mb-10 text-lg text-balance">
        Choose from our range of bouquets and animals to create your own unique
        bundle. Perfect for gifting or to treat yourself. Each bundle can be
        customized to match your style. Shop now!
      </p>
      <Link href="/create">
        <Button>Shop Bundles</Button>
      </Link>
    </div>
  );
};
