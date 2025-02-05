"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { X, ChevronLeft, ChevronRight, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GalleryImage, GalleryPageProps } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { pacifico } from "@/app/fonts";

const INSTAGRAM_URL = "https://www.instagram.com/yarn.petals.gc/";

const GalleryPage: React.FC<GalleryPageProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Memoize galleryItems
  const galleryItems = useMemo(() => images || [], [images]);

  const handleClose = useCallback(() => {
    setSelectedImage(null);
    document.body.style.overflow = "unset";
  }, []);

  const handlePrevious = useCallback(() => {
    if (!galleryItems.length) return;
    setCurrentIndex((prev) =>
      prev === 0 ? galleryItems.length - 1 : prev - 1
    );
    setSelectedImage(
      galleryItems[
        currentIndex === 0 ? galleryItems.length - 1 : currentIndex - 1
      ]
    );
  }, [currentIndex, galleryItems]);

  const handleNext = useCallback(() => {
    if (!galleryItems.length) return;
    setCurrentIndex((prev) =>
      prev === galleryItems.length - 1 ? 0 : prev + 1
    );
    setSelectedImage(
      galleryItems[
        currentIndex === galleryItems.length - 1 ? 0 : currentIndex + 1
      ]
    );
  }, [currentIndex, galleryItems]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      switch (e.key) {
        case "Escape":
          handleClose();
          break;
        case "ArrowLeft":
          handlePrevious();
          break;
        case "ArrowRight":
          handleNext();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [selectedImage, handleClose, handleNext, handlePrevious]);

  const handleImageClick = useCallback((image: GalleryImage, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
    document.body.style.overflow = "hidden";
  }, []);

  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 min-h-screen bg-white">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="mb-12 md:mb-16 lg:mb-20 text-center">
          <h1
            className={cn(
              "font-handwriting",
              "text-5xl md:text-7xl lg:text-8xl font-bold text-main-400 mb-5 md:mb-8"
            )}
          >
            Our Gallery
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our handcrafted crochet bouquets, each telling a unique
            story of love, creativity, and timeless beauty.
          </p>
        </div>

        {/* Masonry Gallery Grid */}
        <div className="gap-8 space-y-8 md:columns-2 lg:columns-3 md:space-y-8">
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              className="break-inside-avoid mb-8 cursor-pointer group overflow-hidden rounded-lg bg-gray-100"
              onClick={() => handleImageClick(item, index)}
            >
              <div className="relative aspect-auto transition-transform duration-300 group-hover:scale-105">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={800}
                  height={800}
                  className="w-full h-auto object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-all duration-300">
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-white/20 px-2 py-1 rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Full Screen Image Slider */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-90 backdrop-blur-sm">
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-white hover:bg-white/20 z-10"
                onClick={handleClose}
              >
                <X className="h-6 w-6" />
              </Button>

              {/* Navigation Buttons */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 text-white hover:bg-white/20 z-10"
                onClick={handlePrevious}
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 text-white hover:bg-white/20 z-10"
                onClick={handleNext}
              >
                <ChevronRight className="h-8 w-8" />
              </Button>

              {/* Main Image Container */}
              <div className="relative w-[90vw] h-[80vh] flex items-center justify-center">
                <div className="relative h-full">
                  <div className="relative h-full flex items-center justify-center">
                    <Image
                      src={selectedImage.src}
                      alt={selectedImage.alt}
                      width={1200}
                      height={800}
                      className="object-contain max-h-full"
                      style={{
                        maxHeight: "70vh",
                        width: "auto",
                      }}
                      priority
                    />
                  </div>

                  {/* Image Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <div className="flex flex-col gap-3">
                      <Link
                        href={INSTAGRAM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-white hover:text-white/80 transition-colors"
                      >
                        <Instagram className="h-5 w-5" />
                        <span className="text-sm font-medium">
                          @yarn.petals.gc
                        </span>
                      </Link>

                      <div className="flex flex-wrap items-center gap-2">
                        {selectedImage.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-sm bg-white/20 px-3 py-1 rounded-full text-white"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white">
                <span className="text-sm">
                  {currentIndex + 1} / {galleryItems.length}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GalleryPage;
