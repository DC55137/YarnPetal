"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Loader, Plus, Trash } from "lucide-react";
import { pacifico } from "@/app/fonts";
import toast from "react-hot-toast";
import Breadcrumb from "@/components/Breadcrumbs";
import {
  useCartStore,
  SelectedFlowerItem,
  SelectedAnimalItem,
} from "@/src/stores/cart-store";
import { Animal, Hat, Color, Size, Flower, FlowerType } from "@prisma/client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Extended interfaces
interface AnimalWithHat extends SelectedAnimalItem {
  hat: Hat | null;
}

interface CreatePageProps {
  colors: Color[];
  sizes: Size[];
  flowers: Flower[];
  animals: Animal[];
  hats: Hat[];
}

interface ImageDisplayProps {
  selectedColor: Color;
  selectedFlowers: SelectedFlowerItem[];
  selectedAnimals: AnimalWithHat[];
  selectedSize: Size;
  availableHats: Hat[];
  imageLoading: boolean;
  totalPrice: number;
  setImageLoading: (loading: boolean) => void;
  onRemoveFlower: (position: number) => void;
  onRemoveAnimal: (position: number) => void;
  onHatChange: (position: number, hat: Hat | null) => void;
}

interface ItemCardProps {
  item: Flower | Animal;
  isDisabled: boolean;
  onAdd: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type: "flower" | "animal";
}

// Selected Animal Card Component with Hat Selection
// First, update the SelectedAnimalCard component to handle the case when there's no hat
const SelectedAnimalCard: React.FC<{
  animal: AnimalWithHat;
  availableHats: Hat[];
  onRemove: (position: number) => void;
  onHatChange: (position: number, hat: Hat | null) => void;
}> = ({ animal, availableHats, onRemove, onHatChange }) => (
  <div className="relative">
    <div className="relative aspect-square rounded-lg overflow-hidden border bg-white p-2">
      <Image
        src={animal.animal.imageUrl}
        alt={animal.animal.name}
        className="object-contain"
        fill
        sizes="(max-width: 768px) 25vw, 20vw"
      />
      {/* Only render hat image if hat exists AND has a valid imageUrl */}
      {animal.hat && animal.hat.imageUrl && animal.hat.imageUrl !== "none" && (
        <div className="absolute top-0 left-0 right-0 flex justify-center">
          <Image
            src={animal.hat.imageUrl}
            alt={animal.hat.name}
            width={40}
            height={40}
            className="object-contain"
          />
        </div>
      )}
    </div>
    <div className="mt-2">
      <select
        className="w-full text-sm rounded-md border-gray-200 bg-white"
        value={animal.hat?.id?.toString() || ""}
        onChange={(e) => {
          const selectedHat = e.target.value
            ? availableHats.find((h) => h.id === parseInt(e.target.value)) ||
              null
            : null;
          onHatChange(animal.position, selectedHat);
        }}
      >
        <option value="">No hat</option>
        {availableHats
          .filter((hat) => hat.imageUrl && hat.imageUrl !== "none")
          .map((hat) => (
            <option key={hat.id} value={hat.id.toString()}>
              {hat.name} (${hat.price.toFixed(2)})
            </option>
          ))}
      </select>
    </div>
    <Button
      size="sm"
      variant="destructive"
      className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
      onClick={() => onRemove(animal.position)}
    >
      <Trash className="h-3 w-3" />
    </Button>
  </div>
);

// ImageDisplay Component Enhancement
const ImagePlaceholder: React.FC<{
  type: "small-flower" | "main-flower" | "animal";
}> = ({ type }) => (
  <div className="relative aspect-square rounded-lg overflow-hidden border bg-gray-50 p-2">
    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
      <div className="w-12 h-12 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center mb-2">
        {type === "small-flower" && (
          <div className="w-6 h-6 rounded-full bg-gray-200" />
        )}
        {type === "main-flower" && (
          <div className="w-8 h-8 rounded-full bg-gray-200" />
        )}
        {type === "animal" && (
          <div className="w-8 h-8 bg-gray-200 rounded-lg" />
        )}
      </div>
      <span className="text-xs text-gray-500 text-center">
        Add {type.split("-").join(" ")}
      </span>
    </div>
  </div>
);

// Image Display Component
const ImageDisplay: React.FC<ImageDisplayProps> = ({
  selectedColor,
  selectedFlowers,
  selectedAnimals,
  selectedSize,
  availableHats,
  imageLoading,
  totalPrice,
  setImageLoading,
  onRemoveFlower,
  onRemoveAnimal,
  onHatChange,
}) => {
  const mainFlowers = selectedFlowers.filter(
    (f) => f.flower.flowerType === FlowerType.MAIN
  );
  const smallFlowers = selectedFlowers.filter(
    (f) => f.flower.flowerType === FlowerType.SMALL
  );

  useEffect(() => {
    setImageLoading(true);
  }, [selectedColor, setImageLoading]);

  return (
    <div className="flex gap-6 flex-col pt-6">
      {/* Header with Color Name and Price */}
      <div className="flex justify-between items-center px-4">
        <h2 className={cn("text-3xl text-main-600", pacifico.className)}>
          {selectedColor.name} Bundle
        </h2>
        <div className="bg-main-50 px-4 py-2 rounded-lg">
          <span className="text-2xl font-bold text-main-600">
            ${totalPrice.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Color Preview */}
        <div className="w-1/3 flex flex-col gap-4">
          <h3 className="text-base font-medium">Selected Color</h3>
          <div className="relative aspect-square w-full rounded-lg overflow-hidden">
            {selectedColor ? (
              <>
                <div
                  className={cn(
                    "absolute inset-0 flex items-center justify-center bg-white",
                    !imageLoading && "hidden"
                  )}
                >
                  <Loader className="w-8 h-8 animate-spin" />
                </div>
                <Image
                  key={selectedColor.id}
                  src={selectedColor.imageBack}
                  alt={selectedColor.name}
                  className={cn("object-cover", imageLoading && "opacity-0")}
                  fill
                  priority
                  onLoadingComplete={() => setImageLoading(false)}
                />
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                <span className="text-gray-400">Select a color</span>
              </div>
            )}
          </div>
          {/* Color Description */}
          <p className="text-sm text-gray-600">{selectedColor.description}</p>
        </div>

        {/* Selected Items Display */}
        <div className="w-2/3 space-y-6">
          {/* Small Flowers Section */}
          <div>
            <h3 className="text-sm font-medium mb-3">Small Flowers</h3>
            <div className="grid grid-cols-4 gap-3">
              {smallFlowers.map((flower) => (
                <div key={flower.position} className="relative">
                  <div className="relative aspect-square rounded-lg overflow-hidden border bg-white p-2">
                    <Image
                      src={flower.flower.imageSingle}
                      alt={flower.flower.name}
                      className="object-contain"
                      fill
                      sizes="(max-width: 768px) 25vw, 20vw"
                    />
                  </div>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                    onClick={() => onRemoveFlower(flower.position)}
                  >
                    <Trash className="h-3 w-3" />
                  </Button>
                </div>
              ))}
              {/* Placeholders */}
              {smallFlowers.length < selectedSize.smallFlowerLimit &&
                Array.from(
                  {
                    length: selectedSize.smallFlowerLimit - smallFlowers.length,
                  },
                  (_, i) => (
                    <ImagePlaceholder key={`small-${i}`} type="small-flower" />
                  )
                )}
            </div>
          </div>

          {/* Main Flowers Section */}
          <div>
            <h3 className="text-sm font-medium mb-3">Main Flowers</h3>
            <div className="grid grid-cols-4 gap-3">
              {mainFlowers.map((flower) => (
                <div key={flower.position} className="relative">
                  <div className="relative aspect-square rounded-lg overflow-hidden border bg-white p-2">
                    <Image
                      src={flower.flower.imageSingle}
                      alt={flower.flower.name}
                      className="object-contain"
                      fill
                      sizes="(max-width: 768px) 25vw, 20vw"
                    />
                  </div>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                    onClick={() => onRemoveFlower(flower.position)}
                  >
                    <Trash className="h-3 w-3" />
                  </Button>
                </div>
              ))}
              {/* Placeholders */}
              {mainFlowers.length < selectedSize.mainFlowerLimit &&
                Array.from(
                  { length: selectedSize.mainFlowerLimit - mainFlowers.length },
                  (_, i) => (
                    <ImagePlaceholder key={`main-${i}`} type="main-flower" />
                  )
                )}
            </div>
          </div>

          {/* Animals Section */}
          <div>
            <h3 className="text-sm font-medium mb-3">Animals</h3>
            <div className="grid grid-cols-4 gap-3">
              {selectedAnimals.map((animal) => (
                <div key={animal.position} className="relative">
                  <div className="relative aspect-square rounded-lg overflow-hidden border bg-white p-2">
                    <Image
                      src={animal.animal.imageUrl}
                      alt={animal.animal.name}
                      className="object-contain"
                      fill
                      sizes="(max-width: 768px) 25vw, 20vw"
                    />
                    {animal.hat &&
                      animal.hat.imageUrl &&
                      animal.hat.imageUrl !== "none" && (
                        <div className="absolute top-0 left-0 right-0 flex justify-center">
                          <Image
                            src={animal.hat.imageUrl}
                            alt={animal.hat.name}
                            width={40}
                            height={40}
                            className="object-contain"
                          />
                        </div>
                      )}
                  </div>
                  <div className="mt-2">
                    <select
                      className="w-full text-sm rounded-md border-gray-200 bg-white"
                      value={animal.hat?.id?.toString() || ""}
                      onChange={(e) => {
                        const selectedHat = e.target.value
                          ? availableHats.find(
                              (h) => h.id === parseInt(e.target.value)
                            ) || null
                          : null;
                        onHatChange(animal.position, selectedHat);
                      }}
                    >
                      <option value="">No hat</option>
                      {availableHats
                        .filter(
                          (hat) => hat.imageUrl && hat.imageUrl !== "none"
                        )
                        .map((hat) => (
                          <option key={hat.id} value={hat.id.toString()}>
                            {hat.name} (${hat.price.toFixed(2)})
                          </option>
                        ))}
                    </select>
                  </div>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                    onClick={() => onRemoveAnimal(animal.position)}
                  >
                    <Trash className="h-3 w-3" />
                  </Button>
                </div>
              ))}
              {/* Placeholders */}
              {selectedAnimals.length < selectedSize.baseAnimalLimit &&
                Array.from(
                  {
                    length:
                      selectedSize.baseAnimalLimit - selectedAnimals.length,
                  },
                  (_, i) => (
                    <ImagePlaceholder key={`animal-${i}`} type="animal" />
                  )
                )}
            </div>
          </div>
        </div>
      </div>

      {/* Size and Item Count Information */}
      <div className="mt-4 bg-gray-50 rounded-lg p-4">
        <div className="flex justify-between text-sm">
          <span>Size: {selectedSize.size}</span>
          <span>
            Small Flowers: {smallFlowers.length}/{selectedSize.smallFlowerLimit}
          </span>
          <span>
            Main Items: {mainFlowers.length + selectedAnimals.length}/
            {selectedSize.mainFlowerLimit}
          </span>
        </div>
      </div>
    </div>
  );
};

// SizeCard Component
const SizeCard: React.FC<{
  size: Size;
  isSelected: boolean;
  onChange: (size: Size) => void;
}> = ({ size, isSelected, onChange }) => (
  <label
    className={cn(
      "relative flex flex-col items-center p-4 rounded-lg border cursor-pointer transition-all",
      isSelected
        ? "border-main-600 bg-main-50 ring-2 ring-main-500"
        : "border-gray-200 hover:border-main-300"
    )}
  >
    <input
      type="radio"
      name="size"
      value={size.size}
      checked={isSelected}
      onChange={() => onChange(size)}
      className="sr-only"
    />
    <div className="text-center">
      <p className="font-semibold text-gray-900">{size.size}</p>
      <p className="text-sm text-gray-500">${size.price.toFixed(2)}</p>
    </div>
    <div className="mt-2 text-xs text-gray-500 text-center">
      <p>{size.mainFlowerLimit} main flowers</p>
      <p>{size.smallFlowerLimit} small flowers</p>
      <p>1 animal included</p>
    </div>
  </label>
);

const MainFlowersSection: React.FC<{
  flowers: Flower[];
  selectedFlowers: SelectedFlowerItem[];
  selectedSize: Size;
  getFlowerCount: (flower: Flower) => number;
  handleAddFlower: (
    flower: Flower,
    e: React.MouseEvent<HTMLButtonElement>
  ) => void;
  setSelectedFlowers: React.Dispatch<
    React.SetStateAction<SelectedFlowerItem[]>
  >;
}> = ({
  flowers,
  selectedFlowers,
  selectedSize,
  getFlowerCount,
  handleAddFlower,
  setSelectedFlowers,
}) => {
  const mainFlowers = selectedFlowers.filter(
    (f) => f.flower.flowerType === FlowerType.MAIN
  );
  const isLimitReached = mainFlowers.length >= selectedSize.mainFlowerLimit;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-gray-900">
            Step 4: Main Flowers
          </h3>
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "h-6 px-2 rounded-full flex items-center justify-center text-sm font-medium",
                isLimitReached
                  ? "bg-gray-100 text-gray-700"
                  : "bg-gray-100 text-gray-700"
              )}
            >
              {mainFlowers.length}/{selectedSize.mainFlowerLimit}
            </div>
            {isLimitReached && (
              <span className="text-sm text-gray-600">Maximum selected</span>
            )}
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-4 grid-cols-3 sm:gap-5 gap-2">
        {flowers
          .filter((flower) => flower.flowerType === FlowerType.MAIN)
          .map((flower) => {
            const count = getFlowerCount(flower);
            const isSoldOut = flower.stock === 0;

            return (
              <div key={flower.id} className="relative group">
                <div
                  className={cn(
                    "relative flex flex-col items-center justify-center rounded-md border p-2 transition-all",
                    isSoldOut
                      ? "border-red-200 bg-white/80"
                      : count > 0
                      ? "border-main-300 bg-main-50"
                      : isLimitReached
                      ? "border-gray-200 bg-gray-50"
                      : "hover:border-main-200"
                  )}
                >
                  {/* Item Image */}
                  <div className="relative w-full aspect-square">
                    <Image
                      src={flower.imageUrl}
                      alt={flower.name}
                      className="object-contain object-top rounded-md"
                      fill
                      sizes="70px"
                    />
                  </div>

                  {/* Item Name and Count */}
                  <div className="mt-2 space-y-1 text-center">
                    <span className="text-sm font-medium text-gray-700">
                      {flower.name}
                    </span>
                    {count > 0 && (
                      <div className="flex items-center justify-center gap-2">
                        <div className="h-5 px-2 bg-main-100 rounded-full">
                          <span className="text-xs font-medium text-main-700">
                            {count} selected
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Hover Message when limit reached */}
                  {isLimitReached && count === 0 && (
                    <div className="absolute inset-0 bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2">
                      <p className="text-xs text-gray-600 text-center">
                        {selectedSize.size === "EXTRA_LARGE"
                          ? "Maximum number reached"
                          : "Increase the size to add more main flowers"}
                      </p>
                    </div>
                  )}

                  {/* Remove Button - Only show when selected */}
                  {count > 0 && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        const positionToRemove = selectedFlowers.find(
                          (f) => f.flower.id === flower.id
                        )?.position;
                        if (positionToRemove) {
                          setSelectedFlowers((prev) =>
                            prev.filter((f) => f.position !== positionToRemove)
                          );
                          toast.success(`Removed ${flower.name}`);
                        }
                      }}
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 bg-main-100 hover:bg-main-200"
                    >
                      <Trash className="h-3 w-3 text-main-700" />
                    </Button>
                  )}

                  {/* Add Button - Always visible but disabled when appropriate */}
                  <Button
                    size="sm"
                    variant={count > 0 ? "default" : "outline"}
                    className="absolute -top-2 -left-2 h-6 w-6 rounded-full p-0"
                    onClick={(e) => handleAddFlower(flower, e)}
                    disabled={isSoldOut || isLimitReached}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>

                  {/* Stock Indicators */}
                  {isSoldOut && (
                    <div className="absolute inset-0 overflow-hidden rounded-md">
                      <div className="absolute top-0 right-0 left-0 bottom-0 bg-white/60" />
                      <div className="absolute top-[40%] right-[-35%] left-[-35%] h-6 bg-red-500 text-white text-xs font-bold flex items-center justify-center rotate-[45deg]">
                        SOLD OUT
                      </div>
                    </div>
                  )}
                  {!isSoldOut && flower.stock <= 3 && (
                    <span className="mt-1 text-[10px] text-orange-500 font-medium">
                      Only {flower.stock} left
                    </span>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

const SmallFlowersSection: React.FC<{
  flowers: Flower[];
  selectedFlowers: SelectedFlowerItem[];
  selectedSize: Size;
  getFlowerCount: (flower: Flower) => number;
  handleAddFlower: (
    flower: Flower,
    e: React.MouseEvent<HTMLButtonElement>
  ) => void;
  setSelectedFlowers: React.Dispatch<
    React.SetStateAction<SelectedFlowerItem[]>
  >;
}> = ({
  flowers,
  selectedFlowers,
  selectedSize,
  getFlowerCount,
  handleAddFlower,
  setSelectedFlowers,
}) => {
  const smallFlowers = selectedFlowers.filter(
    (f) => f.flower.flowerType === FlowerType.SMALL
  );
  const isLimitReached = smallFlowers.length >= selectedSize.smallFlowerLimit;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-gray-900">
            Step 3: Small Flowers
          </h3>
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "h-6 px-2 rounded-full flex items-center justify-center text-sm font-medium",
                isLimitReached
                  ? "bg-gray-100 text-gray-700"
                  : "bg-gray-100 text-gray-700"
              )}
            >
              {smallFlowers.length}/{selectedSize.smallFlowerLimit}
            </div>
            {isLimitReached && (
              <span className="text-sm text-gray-600">Maximum selected</span>
            )}
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-4 grid-cols-3 sm:gap-5 gap-2">
        {flowers
          .filter((flower) => flower.flowerType === FlowerType.SMALL)
          .map((flower) => {
            const count = getFlowerCount(flower);
            const isSoldOut = flower.stock === 0;

            return (
              <div key={flower.id} className="relative group">
                <div
                  className={cn(
                    "relative flex flex-col items-center justify-center rounded-md border p-2 transition-all",
                    isSoldOut
                      ? "border-red-200 bg-white/80"
                      : count > 0
                      ? "border-main-300 bg-main-50"
                      : isLimitReached
                      ? "border-gray-200 bg-gray-50"
                      : "hover:border-main-200"
                  )}
                >
                  {/* Item Image */}
                  <div className="relative w-full aspect-square">
                    <Image
                      src={flower.imageUrl}
                      alt={flower.name}
                      className="object-contain object-top rounded-md"
                      fill
                      sizes="70px"
                    />
                  </div>

                  {/* Item Name and Count */}
                  <div className="mt-2 space-y-1 text-center">
                    <span className="text-sm font-medium text-gray-700">
                      {flower.name}
                    </span>
                    {count > 0 && (
                      <div className="flex items-center justify-center gap-2">
                        <div className="h-5 px-2 bg-main-100 rounded-full">
                          <span className="text-xs font-medium text-main-700">
                            {count} selected
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Hover Message when limit reached */}
                  {isLimitReached && count === 0 && (
                    <div className="absolute inset-0 bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2">
                      <p className="text-xs text-gray-600 text-center">
                        Maximum {selectedSize.smallFlowerLimit} small flowers
                        allowed for this size.
                      </p>
                    </div>
                  )}

                  {/* Remove Button - Only show when selected */}
                  {count > 0 && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        const positionToRemove = selectedFlowers.find(
                          (f) => f.flower.id === flower.id
                        )?.position;
                        if (positionToRemove) {
                          setSelectedFlowers((prev) =>
                            prev.filter((f) => f.position !== positionToRemove)
                          );
                          toast.success(`Removed ${flower.name}`);
                        }
                      }}
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 bg-main-100 hover:bg-main-200"
                    >
                      <Trash className="h-3 w-3 text-main-700" />
                    </Button>
                  )}

                  {/* Add Button - Always visible but disabled when appropriate */}
                  <Button
                    size="sm"
                    variant={count > 0 ? "default" : "outline"}
                    className="absolute -top-2 -left-2 h-6 w-6 rounded-full p-0"
                    onClick={(e) => handleAddFlower(flower, e)}
                    disabled={isSoldOut || isLimitReached}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>

                  {/* Stock Indicators */}
                  {isSoldOut && (
                    <div className="absolute inset-0 overflow-hidden rounded-md">
                      <div className="absolute top-0 right-0 left-0 bottom-0 bg-white/60" />
                      <div className="absolute top-[40%] right-[-35%] left-[-35%] h-6 bg-red-500 text-white text-xs font-bold flex items-center justify-center rotate-[45deg]">
                        SOLD OUT
                      </div>
                    </div>
                  )}
                  {!isSoldOut && flower.stock <= 3 && (
                    <span className="mt-1 text-[10px] text-orange-500 font-medium">
                      Only {flower.stock} left
                    </span>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

const AnimalsSection: React.FC<{
  animals: Animal[];
  selectedAnimals: AnimalWithHat[];
  selectedSize: Size;
  getAnimalCount: (animal: Animal) => number;
  handleAddAnimal: (
    animal: Animal,
    e: React.MouseEvent<HTMLButtonElement>
  ) => void;
  setSelectedAnimals: React.Dispatch<React.SetStateAction<AnimalWithHat[]>>;
  hasExtraAnimal: boolean;
}> = ({
  animals,
  selectedAnimals,
  selectedSize,
  getAnimalCount,
  handleAddAnimal,
  setSelectedAnimals,
  hasExtraAnimal,
}) => {
  const baseAnimalCount = selectedAnimals.slice(
    0,
    selectedSize.baseAnimalLimit
  ).length;
  const isLimitReached = baseAnimalCount >= selectedSize.baseAnimalLimit;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-gray-900">
            Step 5: Animals
          </h3>
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "h-6 px-2 rounded-full flex items-center justify-center text-sm font-medium",
                isLimitReached
                  ? "bg-gray-100 text-gray-700"
                  : "bg-gray-100 text-gray-700"
              )}
            >
              {baseAnimalCount}/{selectedSize.baseAnimalLimit}
            </div>
            {isLimitReached && (
              <span className="text-sm text-gray-600">Maximum selected</span>
            )}
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-4 grid-cols-3 sm:gap-5 gap-2">
        {animals.map((animal) => {
          const count = getAnimalCount(animal);
          const isSoldOut = animal.stock === 0;
          const isSelected = selectedAnimals
            .slice(0, selectedSize.baseAnimalLimit)
            .some((a) => a.animal.id === animal.id);

          return (
            <div key={animal.id} className="relative group">
              <div
                className={cn(
                  "relative flex flex-col items-center justify-center rounded-md border p-2 transition-all",
                  isSoldOut
                    ? "border-red-200 bg-white/80"
                    : isSelected
                    ? "border-main-300 bg-main-50"
                    : isLimitReached
                    ? "border-gray-200 bg-gray-50"
                    : "hover:border-main-200"
                )}
              >
                {/* Item Image */}
                <div className="relative w-full aspect-square">
                  <Image
                    src={animal.imageUrl}
                    alt={animal.name}
                    className="object-contain object-top rounded-md"
                    fill
                    sizes="70px"
                  />
                </div>

                {/* Item Name and Count */}
                <div className="mt-2 space-y-1 text-center">
                  <span className="text-sm font-medium text-gray-700">
                    {animal.name}
                  </span>
                  {isSelected && (
                    <div className="flex items-center justify-center gap-2">
                      <div className="h-5 px-2 bg-main-100 rounded-full">
                        <span className="text-xs font-medium text-main-700">
                          Selected
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Hover Message when limit reached */}
                {isLimitReached && !isSelected && (
                  <div className="absolute inset-0 bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2">
                    <p className="text-xs text-gray-600 text-center">
                      Maximum {selectedSize.baseAnimalLimit}{" "}
                      {selectedSize.baseAnimalLimit === 1
                        ? "animal"
                        : "animals"}
                      allowed for this size.
                    </p>
                  </div>
                )}

                {/* Remove Button - Only show when selected */}
                {isSelected && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      const animalToRemove = selectedAnimals.find(
                        (a) => a.animal.id === animal.id
                      );
                      if (animalToRemove) {
                        setSelectedAnimals((prev) =>
                          prev.filter(
                            (a) => a.position !== animalToRemove.position
                          )
                        );
                        toast.success(`Removed ${animal.name}`);
                      }
                    }}
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 bg-main-100 hover:bg-main-200"
                  >
                    <Trash className="h-3 w-3 text-main-700" />
                  </Button>
                )}

                {/* Add Button - Always visible but disabled when appropriate */}
                <Button
                  size="sm"
                  variant={isSelected ? "default" : "outline"}
                  className="absolute -top-2 -left-2 h-6 w-6 rounded-full p-0"
                  onClick={(e) => handleAddAnimal(animal, e)}
                  disabled={isSoldOut || isLimitReached}
                >
                  <Plus className="h-4 w-4" />
                </Button>

                {/* Stock Indicators */}
                {isSoldOut && (
                  <div className="absolute inset-0 overflow-hidden rounded-md">
                    <div className="absolute top-0 right-0 left-0 bottom-0 bg-white/60" />
                    <div className="absolute top-[40%] right-[-35%] left-[-35%] h-6 bg-red-500 text-white text-xs font-bold flex items-center justify-center rotate-[45deg]">
                      SOLD OUT
                    </div>
                  </div>
                )}
                {!isSoldOut && animal.stock <= 3 && (
                  <span className="mt-1 text-[10px] text-orange-500 font-medium">
                    Only {animal.stock} left
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ExtraAnimalSection: React.FC<{
  selectedSize: Size;
  selectedAnimals: AnimalWithHat[];
  animals: Animal[];
  getAnimalCount: (animal: Animal) => number;
  handleAddAnimal: (
    animal: Animal,
    e: React.MouseEvent<HTMLButtonElement>
  ) => void;
  setSelectedAnimals: React.Dispatch<React.SetStateAction<AnimalWithHat[]>>;
  hasExtraAnimal: boolean;
  onToggleExtraAnimal: (value: boolean) => void;
}> = ({
  selectedSize,
  selectedAnimals,
  animals,
  getAnimalCount,
  handleAddAnimal,
  setSelectedAnimals,
  hasExtraAnimal,
  onToggleExtraAnimal,
}) => {
  // Only show this section if base animal is selected
  if (selectedAnimals.length < selectedSize.baseAnimalLimit) {
    return null;
  }

  const extraAnimalCount = selectedAnimals.slice(
    selectedSize.baseAnimalLimit
  ).length;
  const isLimitReached = extraAnimalCount >= selectedSize.maxExtraAnimals;

  return (
    <div className="mt-8 border-t pt-8">
      <div className="flex items-center justify-between mb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-gray-900">
              Add an Extra Animal?
            </h3>
            <div className="text-sm font-normal text-gray-500">
              (+${selectedSize.extraAnimalPrice.toFixed(2)})
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              You can add one additional animal to your bundle
            </p>
            <Button
              variant={hasExtraAnimal ? "default" : "outline"}
              onClick={() => onToggleExtraAnimal(!hasExtraAnimal)}
              className="ml-4"
            >
              {hasExtraAnimal ? "Remove Extra Animal" : "Add Extra Animal"}
            </Button>
          </div>
        </div>
      </div>

      {hasExtraAnimal && (
        <div className="mt-4">
          <div className="flex items-center gap-2 mb-4">
            <div
              className={cn(
                "h-6 px-2 rounded-full flex items-center justify-center text-sm font-medium",
                isLimitReached
                  ? "bg-gray-100 text-gray-700"
                  : "bg-gray-100 text-gray-700"
              )}
            >
              {extraAnimalCount}/{selectedSize.maxExtraAnimals}
            </div>
            {isLimitReached && (
              <span className="text-sm text-gray-600">Maximum selected</span>
            )}
          </div>

          <div className="grid sm:grid-cols-4 grid-cols-3 sm:gap-5 gap-2">
            {animals.map((animal) => {
              const isExtraAnimalSelected = selectedAnimals
                .slice(selectedSize.baseAnimalLimit)
                .some((a) => a.animal.id === animal.id);
              const isSoldOut = animal.stock === 0;

              return (
                <div key={animal.id} className="relative group">
                  <div
                    className={cn(
                      "relative flex flex-col items-center justify-center rounded-md border p-2 transition-all",
                      isSoldOut
                        ? "border-red-200 bg-white/80"
                        : isExtraAnimalSelected
                        ? "border-main-300 bg-main-50"
                        : isLimitReached
                        ? "border-gray-200 bg-gray-50"
                        : "hover:border-main-200"
                    )}
                  >
                    {/* Item Image */}
                    <div className="relative w-full aspect-square">
                      <Image
                        src={animal.imageUrl}
                        alt={animal.name}
                        className="object-contain object-top rounded-md"
                        fill
                        sizes="70px"
                      />
                    </div>

                    {/* Item Name and Selected Status */}
                    <div className="mt-2 space-y-1 text-center">
                      <span className="text-sm font-medium text-gray-700">
                        {animal.name}
                      </span>
                      {isExtraAnimalSelected && (
                        <div className="flex items-center justify-center gap-2">
                          <div className="h-5 px-2 bg-main-100 rounded-full">
                            <span className="text-xs font-medium text-main-700">
                              Selected
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Hover Message when limit reached */}
                    {isLimitReached && !isExtraAnimalSelected && (
                      <div className="absolute inset-0 bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2">
                        <p className="text-xs text-gray-600 text-center">
                          Maximum {selectedSize.maxExtraAnimals} extra{" "}
                          {selectedSize.maxExtraAnimals === 1
                            ? "animal"
                            : "animals"}
                          allowed for this size.
                        </p>
                      </div>
                    )}

                    {/* Remove Button - Only show when selected */}
                    {isExtraAnimalSelected && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          const extraAnimal = selectedAnimals
                            .slice(selectedSize.baseAnimalLimit)
                            .find((a) => a.animal.id === animal.id);
                          if (extraAnimal) {
                            setSelectedAnimals((prev) =>
                              prev.filter(
                                (a) => a.position !== extraAnimal.position
                              )
                            );
                            toast.success(`Removed extra ${animal.name}`);
                          }
                        }}
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 bg-main-100 hover:bg-main-200"
                      >
                        <Trash className="h-3 w-3 text-main-700" />
                      </Button>
                    )}

                    {/* Add Button - Always visible but disabled when appropriate */}
                    <Button
                      size="sm"
                      variant={isExtraAnimalSelected ? "default" : "outline"}
                      className="absolute -top-2 -left-2 h-6 w-6 rounded-full p-0"
                      onClick={(e) => handleAddAnimal(animal, e)}
                      disabled={isSoldOut || isLimitReached}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>

                    {/* Stock Indicators */}
                    {isSoldOut && (
                      <div className="absolute inset-0 overflow-hidden rounded-md">
                        <div className="absolute top-0 right-0 left-0 bottom-0 bg-white/60" />
                        <div className="absolute top-[40%] right-[-35%] left-[-35%] h-6 bg-red-500 text-white text-xs font-bold flex items-center justify-center rotate-[45deg]">
                          SOLD OUT
                        </div>
                      </div>
                    )}
                    {!isSoldOut && animal.stock <= 3 && (
                      <span className="mt-1 text-[10px] text-orange-500 font-medium">
                        Only {animal.stock} left
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

/////////////////// Main Create Page Component/////////////////// /////////////////// ///////////////////
/////////////////// Main Create Page Component/////////////////// /////////////////// ///////////////////
const CreatePage: React.FC<CreatePageProps> = ({
  colors,
  sizes,
  flowers,
  animals,
  hats,
}) => {
  // State
  const [loading, setLoading] = useState(false);
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [selectedColor, setSelectedColor] = useState(
    colors.find((c) => c.stock > 0) || colors[0]
  );
  const [selectedFlowers, setSelectedFlowers] = useState<SelectedFlowerItem[]>(
    []
  );
  const [selectedAnimals, setSelectedAnimals] = useState<AnimalWithHat[]>([]);
  const [imageLoading, setImageLoading] = useState(false);
  const [hasExtraAnimal, setHasExtraAnimal] = useState(false);

  const { addToCart } = useCartStore();

  // Reset extra animal when size changes
  useEffect(() => {
    setSelectedFlowers([]);
    setSelectedAnimals([]);
    setHasExtraAnimal(false);
  }, [selectedSize]);

  // Update handlers to check limits separately
  const handleAddFlower = (
    flower: Flower,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const selectedSmallCount = selectedFlowers.filter(
      (f) => f.flower.flowerType === FlowerType.SMALL
    ).length;
    const selectedMainCount = selectedFlowers.filter(
      (f) => f.flower.flowerType === FlowerType.MAIN
    ).length;

    if (
      flower.flowerType === FlowerType.SMALL &&
      selectedSmallCount >= selectedSize.smallFlowerLimit
    ) {
      toast.error(
        `Maximum ${selectedSize.smallFlowerLimit} small flowers allowed`
      );
      return;
    }
    if (
      flower.flowerType === FlowerType.MAIN &&
      selectedMainCount >= selectedSize.mainFlowerLimit
    ) {
      toast.error(
        `Maximum ${selectedSize.mainFlowerLimit} main flowers allowed`
      );
      return;
    }

    const position = selectedFlowers.length + 1;
    setSelectedFlowers([...selectedFlowers, { flower, position }]);
  };

  // Update handleAddAnimal to handle extra animals
  const handleAddAnimal = (
    animal: Animal,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const maxAnimals =
      selectedSize.baseAnimalLimit +
      (hasExtraAnimal ? selectedSize.maxExtraAnimals : 0);

    if (selectedAnimals.length >= maxAnimals) {
      toast.error(`Maximum ${maxAnimals} animals allowed`);
      return;
    }

    const position = selectedAnimals.length + 1;
    setSelectedAnimals([...selectedAnimals, { animal, position, hat: null }]);
  };

  // Handle toggling extra animal
  const handleToggleExtraAnimal = (value: boolean) => {
    if (!value && selectedAnimals.length > selectedSize.baseAnimalLimit) {
      // Remove the extra animal when toggling off
      setSelectedAnimals((prev) => prev.slice(0, selectedSize.baseAnimalLimit));
    }
    setHasExtraAnimal(value);
  };

  const handleHatChange = (animalPosition: number, hat: Hat | null) => {
    setSelectedAnimals((prev) =>
      prev.map((animal) =>
        animal.position === animalPosition ? { ...animal, hat } : animal
      )
    );
  };

  // Update price calculation to include extra animal
  const calculatePrice =
    selectedSize.price + (hasExtraAnimal ? selectedSize.extraAnimalPrice : 0);

  // Update the flower and animal sections to include counters
  const getFlowerCount = (flower: Flower) =>
    selectedFlowers.filter((f) => f.flower.id === flower.id).length;

  const getAnimalCount = (animal: Animal) =>
    selectedAnimals.filter((a) => a.animal.id === animal.id).length;

  const isAddToCartDisabled =
    loading ||
    selectedColor.stock === 0 ||
    selectedFlowers.filter((f) => f.flower.flowerType === FlowerType.SMALL)
      .length !== selectedSize.smallFlowerLimit ||
    selectedFlowers.filter((f) => f.flower.flowerType === FlowerType.MAIN)
      .length !== selectedSize.mainFlowerLimit ||
    selectedAnimals.length !==
      selectedSize.baseAnimalLimit +
        (hasExtraAnimal ? selectedSize.maxExtraAnimals : 0) ||
    (hasExtraAnimal &&
      selectedAnimals.length !==
        selectedSize.baseAnimalLimit + selectedSize.maxExtraAnimals);

  // In the main CreatePage component, update the size selector section:

  return (
    <div className="py-12 bg-secondary-500">
      <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <Breadcrumb
          pages={[{ name: "Create", href: "/create" }]}
          className="mb-4"
        />
        <div className="lg:col-span-5 lg:col-start-8 mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Create Your Bundle
            </h1>
          </div>
        </div>

        <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
          {/* Sticky Image Display */}
          <div className="lg:col-span-5 lg:row-span-3">
            <div className="lg:sticky lg:top-4">
              <ImageDisplay
                selectedColor={selectedColor}
                selectedFlowers={selectedFlowers}
                selectedAnimals={selectedAnimals}
                selectedSize={selectedSize}
                availableHats={hats}
                imageLoading={imageLoading}
                totalPrice={calculatePrice} // Add this line
                setImageLoading={setImageLoading}
                onRemoveFlower={(position) =>
                  setSelectedFlowers((prev) =>
                    prev.filter((f) => f.position !== position)
                  )
                }
                onRemoveAnimal={(position) =>
                  setSelectedAnimals((prev) =>
                    prev.filter((a) => a.position !== position)
                  )
                }
                onHatChange={handleHatChange}
              />
            </div>
          </div>

          {/* Selection Form */}
          <div className="lg:col-span-7 mt-8 lg:mt-0 bg-white p-6 rounded-lg shadow-2xl">
            {/* Size Selector */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Step 1: Size Selection
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {sizes.map((size) => (
                  <SizeCard
                    key={size.size}
                    size={size}
                    isSelected={selectedSize.size === size.size}
                    onChange={setSelectedSize}
                  />
                ))}
              </div>
            </div>

            {/* Color Selector */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Step 2: Colour Selection
              </h3>
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-1">
                  Color ({selectedColor.name})
                  {selectedColor.stock === 0 && " - Out of stock"}
                </h2>
                <p className="text-sm text-gray-500">
                  {selectedColor.description}
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                {colors.map((color) => (
                  <label
                    key={color.name}
                    className={cn(
                      "relative flex items-center justify-center rounded-full border py-3 px-3 cursor-pointer",
                      color.stock === 0 && "opacity-25 cursor-not-allowed",
                      selectedColor.name === color.name &&
                        "ring-2 ring-main-500"
                    )}
                  >
                    <input
                      type="radio"
                      name="color"
                      value={color.name}
                      checked={selectedColor.name === color.name}
                      onChange={() => {
                        if (color.stock > 0) {
                          setSelectedColor(color);
                          setImageLoading(true);
                        }
                      }}
                      disabled={color.stock === 0}
                      className="sr-only"
                    />
                    <Image
                      src={color.imageBack}
                      alt={color.name}
                      width={60}
                      height={60}
                      className="rounded-full object-cover"
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Small Flowers Section */}
            <div className="mt-8 flex flex-col gap-1">
              <SmallFlowersSection
                flowers={flowers}
                selectedFlowers={selectedFlowers}
                selectedSize={selectedSize}
                getFlowerCount={getFlowerCount}
                handleAddFlower={handleAddFlower}
                setSelectedFlowers={setSelectedFlowers}
              />
              <MainFlowersSection
                flowers={flowers}
                selectedFlowers={selectedFlowers}
                selectedSize={selectedSize}
                getFlowerCount={getFlowerCount}
                handleAddFlower={handleAddFlower}
                setSelectedFlowers={setSelectedFlowers}
              />
              <AnimalsSection
                animals={animals}
                selectedAnimals={selectedAnimals}
                selectedSize={selectedSize}
                getAnimalCount={getAnimalCount}
                handleAddAnimal={handleAddAnimal}
                setSelectedAnimals={setSelectedAnimals}
                hasExtraAnimal={hasExtraAnimal}
              />
              {/* Add Extra Animal Section */}
              <ExtraAnimalSection
                selectedSize={selectedSize}
                selectedAnimals={selectedAnimals}
                animals={animals}
                getAnimalCount={getAnimalCount}
                handleAddAnimal={handleAddAnimal}
                setSelectedAnimals={setSelectedAnimals}
                hasExtraAnimal={hasExtraAnimal}
                onToggleExtraAnimal={handleToggleExtraAnimal}
              />
            </div>

            {/* Add to Cart Button */}
            <Button
              disabled={isAddToCartDisabled}
              className={cn(
                "w-full mt-8",
                loading && "opacity-50 cursor-not-allowed"
              )}
              size="lg"
              onClick={() => {
                setLoading(true);
                addToCart({
                  size: selectedSize,
                  color: selectedColor,
                  flowers: selectedFlowers,
                  animals: selectedAnimals.map((animal) => ({
                    ...animal,
                    hat: animal.hat,
                  })),
                  price: calculatePrice,
                  quantity: 1,
                  hat: null,
                });
                toast.success("Added to cart");
                setSelectedFlowers([]);
                setSelectedAnimals([]);
                setTimeout(() => setLoading(false), 1000);
              }}
            >
              {loading
                ? "Adding to Cart..."
                : selectedColor.stock === 0
                ? "Out of Stock"
                : "Add to Cart"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
