"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Loader, ChevronRight, Sparkles } from "lucide-react";

const animalList = [
  { src: "/Slides/2_Bacon.webp", alt: "Bacon" },
  { src: "/Slides/8_Ted.webp", alt: "Ted" },
  { src: "/Slides/12_Cat.webp", alt: "Cat" },
  { src: "/Slides/4_Bunny.webp", alt: "Bunny" },
];

const bouquetList = [
  { srcFront: "/Slides/PinkFront.webp", srcBack: "/Slides/PinkBlank.webp" },
  { srcFront: "/Slides/PurpleFront.webp", srcBack: "/Slides/PurpleBlank.webp" },
  {
    srcFront: "/Slides/PinkPurpleFront.webp",
    srcBack: "/Slides/PinkPurpleBlank.webp",
  },
];

type AnimalPosition = {
  bottom: string;
  right: string;
};

export default function CustomiseBouquet() {
  const [currentAnimalIndex, setCurrentAnimalIndex] = useState(0);
  const [currentBouquetIndex, setCurrentBouquetIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [isBouquetSliding, setIsBouquetSliding] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
      }, 1000);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentAnimalIndex]);

  const getAnimalPosition = (bouquetIndex: number): AnimalPosition => {
    if (isMobile) {
      switch (bouquetIndex) {
        case 0:
          return { bottom: "75%", right: "32%" };
        case 1:
          return { bottom: "72%", right: "35%" };
        case 2:
          return { bottom: "66%", right: "35%" };
        default:
          return { bottom: "72%", right: "33%" };
      }
    }

    // Desktop positions
    return { bottom: "72%", right: "30%" };
  };

  if (!imagesLoaded) {
    return (
      <div className="min-h-[800px] bg-gradient-to-b from-accent-400 via-accent-400 to-accent-500 overflow-hidden">
        <div className="h-full flex items-center justify-center">
          <Loader className="animate-spin text-main-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-accent-400 via-accent-400 to-accent-500">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 animate-blob">
        <div className="w-72 h-72 rounded-full bg-main-200 opacity-20 blur-xl" />
      </div>
      <div className="absolute bottom-10 right-10 animate-blob animation-delay-2000">
        <div className="w-72 h-72 rounded-full bg-accent-300 opacity-20 blur-xl" />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
          <div className="space-y-7">
            <div className="inline-block">
              <span className="text-main-600 font-handwriting text-4xl md:text-5xl lg:text-6xl relative">
                Customise Your Bundle
                <Sparkles className="absolute -top-6 -right-8 text-main-500 w-8 h-8 animate-bounce" />
              </span>
            </div>
            <p className="text-lg text-slate-700 max-w-lg leading-8">
              Create your perfect moment with our customizable bundles. Mix and
              match your favorite bouquets with adorable companions to craft a
              truly unique gift that speaks from the heart.
            </p>
            <div className="pt-4">
              <Link href="/create" className="group relative inline-block">
                <div className="absolute -inset-1 bg-gradient-to-r from-main-400 to-main-600 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                <Button className="relative px-8 py-6 text-lg bg-main-500 hover:bg-main-600 transition-colors duration-300 flex items-center gap-2 group-hover:gap-4">
                  Create Your Bundle
                  <ChevronRight className="w-5 h-5 transition-all duration-300" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative h-[500px] md:h-[600px] isolate px-4">
            <div className="absolute inset-0 bg-gradient-to-t from-accent-500/40 via-transparent to-transparent z-40" />
            {bouquetList.map((bouquet, index) => (
              <Image
                key={`back-${index}`}
                src={bouquet.srcBack}
                alt="Bouquet Back"
                fill
                priority
                className={cn(
                  "absolute z-10 transition-transform duration-1000 ease-in-out object-contain",
                  index === currentBouquetIndex
                    ? isBouquetSliding
                      ? "slide-out"
                      : "slide-in"
                    : "hidden"
                )}
              />
            ))}
            {animalList.map((animal, index) => {
              const position = getAnimalPosition(currentBouquetIndex);
              return (
                <Image
                  key={`animal-${index}`}
                  src={animal.src}
                  alt={animal.alt}
                  width={400}
                  height={400}
                  priority
                  className={cn(
                    "absolute z-20 transition-transform duration-1000 ease-in-out",
                    "w-28 md:w-32 lg:w-44",
                    index === currentAnimalIndex
                      ? isSliding
                        ? "slide-out"
                        : "slide-in"
                      : "hidden"
                  )}
                  style={{
                    bottom: position.bottom,
                    right: position.right,
                  }}
                />
              );
            })}
            {bouquetList.map((bouquet, index) => (
              <Image
                key={`front-${index}`}
                src={bouquet.srcFront}
                alt="Bouquet Front"
                fill
                priority
                className={cn(
                  "absolute z-30 transition-transform duration-1000 ease-in-out object-contain",
                  index === currentBouquetIndex
                    ? isBouquetSliding
                      ? "slide-out"
                      : "slide-in"
                    : "hidden"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
