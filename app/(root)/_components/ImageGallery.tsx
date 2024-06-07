"use client";
import { useEffect, useRef, useState, HTMLAttributes } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { pacifico } from "@/app/fonts";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// prettier-ignore
const images = [
  { src: "/Gallery/Valentines.webp", alt: "Valentines bouquet" },
  { src: "/Gallery/Romance.webp", alt: "Romance bouquet" },
  { src: "/Gallery/Relationship.webp", alt: "Relationship bouquet" },
  { src: "/Gallery/SingleGirl.webp", alt: "Single Girl bouquet" },
  { src: "/Gallery/Elegant.webp", alt: "Elegant bouquet" },
  { src: "/Gallery/Graduation.webp", alt: "Graduation bouquet" },
  { src: "/Gallery/Graduation2.webp", alt: "Graduation bouquet" },
  { src: "/Gallery/Birthday.webp", alt: "Birthday bouquet" },
  { src: "/Gallery/Flowers.webp", alt: "Flowers bouquet" },
];

function splitArray<T>(array: Array<T>, numParts: number) {
  const result: Array<Array<T>> = [];

  for (let i = 0; i < array.length; i++) {
    const index = i % numParts;
    if (!result[index]) {
      result[index] = [];
    }
    result[index].push(array[i]);
  }

  return result;
}

function ImageColumn({
  images,
  className,
  imageClassName,
  msPerPixel = 0,
}: {
  images: { src: string; alt: string }[];
  className?: string;
  imageClassName?: (imageIndex: number) => string;
  msPerPixel?: number;
}) {
  const columnRef = useRef<HTMLDivElement | null>(null);
  const [columnHeight, setColumnHeight] = useState(0);
  const duration = `${columnHeight * msPerPixel}ms`;

  useEffect(() => {
    if (!columnRef.current) return;

    const resizeObserver = new window.ResizeObserver(() => {
      setColumnHeight(columnRef.current?.offsetHeight ?? 0);
    });

    resizeObserver.observe(columnRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={columnRef}
      className={cn("animate-marquee space-y-8 py-4", className)}
      style={{ "--marquee-duration": duration } as React.CSSProperties}
    >
      {images.concat(images).map((image, imageIndex) => (
        <ImageWrapper
          key={imageIndex}
          className={imageClassName?.(imageIndex % images.length)}
          imgSrc={image.src}
          alt={image.alt}
        />
      ))}
    </div>
  );
}

interface ImageWrapperProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string;
  alt: string;
}

function ImageWrapper({ imgSrc, alt, className, ...props }: ImageWrapperProps) {
  const POSSIBLE_ANIMATION_DELAYS = [
    "0s",
    "0.1s",
    "0.2s",
    "0.3s",
    "0.4s",
    "0.5s",
  ];

  const animationDelay =
    POSSIBLE_ANIMATION_DELAYS[
      Math.floor(Math.random() * POSSIBLE_ANIMATION_DELAYS.length)
    ];

  return (
    <div
      className={cn(
        "animate-fade-in rounded-lg bg-white p-1 opacity-0 shadow-xl",
        className
      )}
      style={{ animationDelay }}
      {...props}
    >
      <Image
        src={imgSrc}
        alt={alt}
        width={400}
        height={400}
        className="w-full object-cover"
      />
    </div>
  );
}

function ImageGrid() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.4 });
  const columns = splitArray(images, 3);

  return (
    <div
      ref={containerRef}
      className="relative sm:-mx-4 mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-2 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3"
    >
      {isInView ? (
        <>
          <ImageColumn images={columns[0]} msPerPixel={8} />
          <ImageColumn
            images={columns[1]}
            className="hidden md:block"
            msPerPixel={12}
          />
          <ImageColumn
            images={columns[2]}
            className="hidden md:block"
            msPerPixel={8}
          />
        </>
      ) : null}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-secondary-500" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-secondary-500" />
    </div>
  );
}

export function ImageGallery() {
  return (
    <div className="relative max-w-5xl mx-auto pb-40 pt-20">
      <div className="grid grid-cols-2 w-full p-10 container">
        <DisplayHeading />
        <DisplayInfo />
      </div>
      <ImageGrid />
      <div className="mt-10 mx-4 justify-end flex">
        <Link href="/bundles">
          <Button>Shop Bundles</Button>
        </Link>
      </div>
    </div>
  );
}

export default ImageGallery;

const DisplayHeading = () => {
  return (
    <div className="col-span-2 md:col-span-1 md:px-10">
      <h4 className="text-secondary-900">Share the love.</h4>
      <h2 className={cn(pacifico.className, "text-main-600")}>Image Gallery</h2>
    </div>
  );
};

const DisplayInfo = () => {
  return (
    <div className="col-span-2 md:col-span-1 md:px-10">
      <p className="mb-10 text-lg text-balance">
        Here are some of the beautiful bouquets we have created for our
        customers. We hope you enjoy them as much as we do!
      </p>
    </div>
  );
};
