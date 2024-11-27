"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Loader, Plus, Trash } from "lucide-react";
import { pacifico } from "@/app/fonts";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

import { useCartStore, SelectedFlowerItem } from "@/src/stores/cart-store";
import { Animal, Hat, Size, Flower, FlowerType, Color } from "@prisma/client";
import { AnimalWithHat, CreatePageProps, ImageDisplayProps } from "@/lib/types";
import StepIndicator from "./StepIndicator";
import { revalidatePath } from "next/cache";

// Define step types
type Step = "size" | "color" | "smallFlowers" | "mainFlowers" | "animals";

const STEPS: Step[] = [
  "size",
  "color",
  "smallFlowers",
  "mainFlowers",
  "animals",
];

const STEP_TITLES: Record<Step, string> = {
  size: "Choose Your Bundle Size",
  color: "Select Your Color",
  smallFlowers: "Add Small Flowers",
  mainFlowers: "Add Main Flowers",
  animals: "Choose Your Animals",
};

const StepHeader: React.FC<{
  currentStep: Step;
  onBack: () => void;
  isFirstStep: boolean;
  selectedSize?: Size;
  selectedColor?: Color;
}> = ({ currentStep, onBack, isFirstStep, selectedSize, selectedColor }) => {
  return (
    <div className="flex flex-col items-center justify-between mb-6">
      <div className="flex mr-auto items-center gap-3">
        {!isFirstStep && (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
          </>
        )}
      </div>
      <div className="flex items-center gap-4 text-sm"></div>
      <h2 className="text-2xl font-bold text-gray-900">
        <span className="text-main-500">
          {STEPS.indexOf(currentStep) + 1}.{" "}
        </span>
        {STEP_TITLES[currentStep]}
      </h2>
    </div>
  );
};

const ColorCard: React.FC<{
  color: Color;
  isSelected: boolean;
  onSelect: (color: Color) => void;
}> = ({ color, isSelected, onSelect }) => (
  <button
    onClick={() => color.stock > 0 && onSelect(color)}
    disabled={color.stock === 0}
    className={cn(
      "relative aspect-square rounded-lg border-2 transition-all",
      isSelected ? "ring-2 ring-main-500 border-main-500" : "border-gray-200",
      color.stock === 0
        ? "opacity-50 cursor-not-allowed"
        : "hover:border-main-300",
      "group"
    )}
  >
    <div className="relative w-full h-full rounded-lg overflow-hidden">
      <Image
        src={color.imageBack}
        alt={color.name}
        fill
        className="object-cover"
      />
      <div
        className={cn(
          "absolute inset-0 flex flex-col items-center justify-center bg-white/90 transition-opacity",
          isSelected ? "opacity-0" : "opacity-0 group-hover:opacity-100"
        )}
      >
        <span className="text-sm font-medium text-gray-900">{color.name}</span>
        {color.stock <= 3 && color.stock > 0 && (
          <span className="text-xs text-orange-500">
            Only {color.stock} left
          </span>
        )}
        {color.stock === 0 && (
          <span className="text-xs text-red-500">Out of stock</span>
        )}
      </div>
    </div>
  </button>
);

// ImageDisplay Component Enhancement
const ImagePlaceholder: React.FC<{
  type: "small-flower" | "main-flower" | "animal";
}> = ({ type }) => (
  <div className="relative aspect-square rounded-lg overflow-hidden border bg-gray-50 p-2">
    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
      <div className="w-10 h-10 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center mb-2">
        {type === "small-flower" && (
          <div className="w-4 h-4 rounded-full bg-gray-200" />
        )}
        {type === "main-flower" && (
          <div className="w-6 h-6 rounded-full bg-gray-200" />
        )}
        {type === "animal" && (
          <div className="w-6 h-6 bg-gray-200 rounded-lg" />
        )}
      </div>
      <span className="text-xs text-gray-500 text-center">
        {type.split("-").join(" ")}
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
                  onLoad={() => setImageLoading(false)}
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
            Main Items: {mainFlowers.length}/{selectedSize.mainFlowerLimit}
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
      "relative flex flex-col p-4 rounded-lg border cursor-pointer transition-all",
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
    {/* Size Image */}
    <div className="relative aspect-square w-full mb-3 rounded-lg overflow-hidden">
      <Image
        src={size.image}
        alt={`${size.size} size bundle`}
        fill
        className="object-contain"
        sizes="(max-width: 768px) 25vw, 20vw"
      />
    </div>

    <div className="text-center">
      <p className="font-semibold text-gray-900">{size.size}</p>
      <p className="text-sm font-medium text-main-600">
        ${size.price.toFixed(2)}
      </p>
    </div>

    <div className="mt-2 space-y-1 text-xs text-gray-500 text-center">
      <p>{size.mainFlowerLimit} main flowers</p>
      <p>{size.smallFlowerLimit} small flowers</p>
      <p>1 animal included</p>
      <p className="text-xs text-gray-400">
        {size.size === "SMALL"
          ? "Perfect for desks"
          : size.size === "MEDIUM"
          ? "Great for side tables"
          : size.size === "LARGE"
          ? "Beautiful centerpiece"
          : "Statement piece"}
      </p>
    </div>
  </label>
);

const FlowerSection: React.FC<{
  title: string;
  flowerType: FlowerType;
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
  title,
  flowerType,
  flowers,
  selectedFlowers,
  selectedSize,
  getFlowerCount,
  handleAddFlower,
  setSelectedFlowers,
}) => {
  const filteredFlowers = flowers.filter((f) => f.flowerType === flowerType);

  const selectedCount = selectedFlowers.filter(
    (f) => f.flower.flowerType === flowerType
  ).length;

  const maxCount =
    flowerType === FlowerType.SMALL
      ? selectedSize.smallFlowerLimit
      : selectedSize.mainFlowerLimit;

  const isAtLimit = selectedCount >= maxCount;

  // Maximum 2 of the same main flower
  const MAX_SAME_MAIN_FLOWER = 2;

  const getCountDisplay = () => {
    if (flowerType === FlowerType.SMALL) {
      return (
        <div className="h-6 px-2 rounded-full flex items-center justify-center text-sm font-medium bg-gray-100 text-gray-700">
          {selectedCount}/{maxCount} Small Flowers
        </div>
      );
    }

    return (
      <div className="h-6 px-2 rounded-full flex items-center justify-center text-sm font-medium bg-gray-100 text-gray-700">
        {selectedCount}/{maxCount} Main Flowers
      </div>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <div className="flex items-center gap-2">
            {getCountDisplay()}
            {isAtLimit && (
              <span className="text-sm text-gray-600">Maximum selected</span>
            )}
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-4 grid-cols-3 sm:gap-5 gap-4">
        {filteredFlowers.map((flower) => {
          const count = getFlowerCount(flower);
          const isSoldOut = flower.stock - count <= 0;
          const isMaxSameFlower =
            flowerType === FlowerType.MAIN && count >= MAX_SAME_MAIN_FLOWER;
          const isDisabled = isSoldOut || isAtLimit || isMaxSameFlower;

          return (
            <div key={flower.id} className="relative group">
              <div
                className={cn(
                  "relative flex flex-col items-center justify-center rounded-md border p-2 transition-all",
                  isSoldOut || isMaxSameFlower
                    ? "border-red-200 bg-white/80"
                    : count > 0
                    ? "border-main-300 bg-main-50"
                    : isAtLimit
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
                      <div className="px-2 rounded-full bg-main-100">
                        <span className="text-xs font-medium text-main-700">
                          {count} selected
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Hover Message when limit reached */}
                {(isAtLimit || isMaxSameFlower) && count === 0 && (
                  <div className="absolute inset-0 bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2 z-10">
                    <p className="text-xs text-gray-600 text-center">
                      {isMaxSameFlower
                        ? "Maximum 2 of the same main flower allowed"
                        : flowerType === FlowerType.SMALL
                        ? `Maximum ${maxCount} small flowers allowed for this size`
                        : selectedSize.size === "EXTRA_LARGE"
                        ? "Maximum number reached"
                        : "Increase the size to add more main flowers"}
                    </p>
                  </div>
                )}

                {/* Remove Button */}
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
                    className="absolute -top-2 -right-2 h-8 w-8 rounded-full p-0 z-20 bg-main-100 hover:bg-main-200"
                  >
                    <Trash className="h-5 w-5 text-main-700" />
                  </Button>
                )}

                {/* Add Button */}
                <Button
                  size="sm"
                  variant={count > 0 ? "default" : "outline"}
                  className="absolute -top-2 -left-2 h-8 w-8 rounded-full p-0 z-20"
                  onClick={(e) => handleAddFlower(flower, e)}
                  disabled={isDisabled}
                >
                  <Plus className="h-6 w-6" />
                </Button>

                {/* Stock Indicators */}
                {isSoldOut && (
                  <div className="absolute inset-0 overflow-hidden rounded-md z-10">
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

                {/* Max same flower indicator */}
                {isMaxSameFlower && (
                  <span className="mt-1 text-xs text-gray-500">
                    Maximum 2 allowed
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

      <div className="grid sm:grid-cols-4 grid-cols-3 sm:gap-5 gap-4">
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
                      <div className=" px-2 bg-main-100 rounded-full">
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
                    className="absolute -top-2 -right-2 h-8 w-8 rounded-full p-0 bg-main-100 hover:bg-main-200"
                  >
                    <Trash className="h-5 w-5 text-main-700" />
                  </Button>
                )}

                {/* Add Button - Always visible but disabled when appropriate */}
                <Button
                  size="sm"
                  variant={isSelected ? "default" : "outline"}
                  className="absolute -top-2 -left-2 h-8 w-8 rounded-full p-0"
                  onClick={(e) => handleAddAnimal(animal, e)}
                  disabled={isSoldOut || isLimitReached}
                >
                  <Plus className="h-6 w-6" />
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

          <div className="grid sm:grid-cols-4 grid-cols-3 sm:gap-5 gap-4">
            {animals.map((animal) => {
              const isExtraAnimalSelected = selectedAnimals
                .slice(selectedSize.baseAnimalLimit)
                .some((a) => a.animal.id === animal.id);
              const isSame =
                selectedAnimals && selectedAnimals[0].animal.id === animal.id;
              let isSoldOut;
              if (isSame) {
                isSoldOut = animal.stock === 1;
              } else {
                isSoldOut = animal.stock === 0;
              }

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
                          <div className=" px-2 bg-main-100 rounded-full">
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
                        className="absolute -top-2 -right-2 h-8 w-8 rounded-full p-0 bg-main-100 hover:bg-main-200"
                      >
                        <Trash className="h-5 w-5 text-main-700" />
                      </Button>
                    )}

                    {/* Add Button - Always visible but disabled when appropriate */}
                    <Button
                      size="sm"
                      variant={isExtraAnimalSelected ? "default" : "outline"}
                      className="absolute -top-2 -left-2 h-8 w-8 rounded-full p-0"
                      onClick={(e) => handleAddAnimal(animal, e)}
                      disabled={isSoldOut || isLimitReached}
                    >
                      <Plus className="h-6 w-6" />
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
/////////////////// Main Create Page Component/////////////////// /////////////////// ///////////////////
/////////////////// Main Create Page Component/////////////////// /////////////////// ///////////////////
/////////////////// Main Create Page Component/////////////////// /////////////////// ///////////////////
const CreatePage: React.FC<CreatePageProps> = ({
  colors,
  sizes,
  flowers,
  animals,
  hats,
}) => {
  // Step state
  const [currentStep, setCurrentStep] = useState<Step>("size");

  // Bundle state
  const [loading, setLoading] = useState(false);
  const [selectedSize, setSelectedSize] = useState<Size | undefined>();
  const [selectedColor, setSelectedColor] = useState<Color | undefined>();
  const [selectedFlowers, setSelectedFlowers] = useState<SelectedFlowerItem[]>(
    []
  );
  const [selectedAnimals, setSelectedAnimals] = useState<AnimalWithHat[]>([]);
  const [imageLoading, setImageLoading] = useState(false);
  const [hasExtraAnimal, setHasExtraAnimal] = useState(false);

  const router = useRouter();

  const { addToCart } = useCartStore();

  const canNavigateToStep = (step: Step) => {
    const stepIndex = STEPS.indexOf(step);
    const currentIndex = STEPS.indexOf(currentStep);

    // Can always go back
    if (stepIndex < currentIndex) return true;

    // Can't skip ahead without completing current step
    if (stepIndex > currentIndex && !canProceedToNextStep()) return false;

    // Check requirements for each step
    switch (step) {
      case "size":
        return true;
      case "color":
        return !!selectedSize;
      case "smallFlowers":
        return !!selectedSize && !!selectedColor;
      case "mainFlowers":
        return (
          !!selectedSize &&
          !!selectedColor &&
          selectedFlowers.filter(
            (f) => f.flower.flowerType === FlowerType.SMALL
          ).length === selectedSize.smallFlowerLimit
        );
      case "animals":
        return (
          !!selectedSize &&
          !!selectedColor &&
          selectedFlowers.filter(
            (f) => f.flower.flowerType === FlowerType.SMALL
          ).length === selectedSize.smallFlowerLimit &&
          selectedFlowers.filter((f) => f.flower.flowerType === FlowerType.MAIN)
            .length === selectedSize.mainFlowerLimit
        );
      default:
        return false;
    }
  };

  // New function to get step status
  const getStepStatus = (step: Step): "complete" | "current" | "upcoming" => {
    const stepIndex = STEPS.indexOf(step);
    const currentIndex = STEPS.indexOf(currentStep);

    if (stepIndex < currentIndex && canNavigateToStep(STEPS[stepIndex + 1])) {
      return "complete";
    }
    if (stepIndex === currentIndex) {
      return "current";
    }
    return "upcoming";
  };

  // Handler for step navigation
  const handleStepClick = (step: Step) => {
    if (canNavigateToStep(step)) {
      setCurrentStep(step);
    }
  };

  // Step navigation
  const goToNextStep = () => {
    const currentIndex = STEPS.indexOf(currentStep);
    if (currentIndex < STEPS.length - 1) {
      setCurrentStep(STEPS[currentIndex + 1]);
    }
  };

  const goToPreviousStep = () => {
    const currentIndex = STEPS.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(STEPS[currentIndex - 1]);
    }
  };

  // Selection handlers with auto-advance
  const handleSizeSelect = (size: Size) => {
    setSelectedSize(size);
    setSelectedFlowers([]);
    setSelectedAnimals([]);
    setHasExtraAnimal(false);
    goToNextStep();
  };

  const handleColorSelect = (color: Color) => {
    setSelectedColor(color);
    setImageLoading(true);
    goToNextStep();
  };

  // Existing handlers
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

    // Check basic limits
    if (
      flower.flowerType === FlowerType.SMALL &&
      selectedSmallCount >= selectedSize!.smallFlowerLimit
    ) {
      toast.error(
        `Maximum ${selectedSize!.smallFlowerLimit} small flowers allowed`
      );
      return;
    }
    if (
      flower.flowerType === FlowerType.MAIN &&
      selectedMainCount >= selectedSize!.mainFlowerLimit
    ) {
      toast.error(
        `Maximum ${selectedSize!.mainFlowerLimit} main flowers allowed`
      );
      return;
    }

    // Check if trying to add more than 2 of the same main flower
    if (flower.flowerType === FlowerType.MAIN) {
      const sameFlowerCount = selectedFlowers.filter(
        (f) => f.flower.id === flower.id
      ).length;
      if (sameFlowerCount >= 2) {
        toast.error("Maximum 2 of the same main flower allowed");
        return;
      }
    }

    const position = selectedFlowers.length + 1;
    setSelectedFlowers([...selectedFlowers, { flower, position }]);
    toast.success(`Added ${flower.name}`);
  };

  const handleAddAnimal = (
    animal: Animal,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const maxAnimals =
      selectedSize!.baseAnimalLimit +
      (hasExtraAnimal ? selectedSize!.maxExtraAnimals : 0);

    if (selectedAnimals.length >= maxAnimals) {
      toast.error(`Maximum ${maxAnimals} animals allowed`);
      return;
    }

    const position = selectedAnimals.length + 1;
    setSelectedAnimals([...selectedAnimals, { animal, position, hat: null }]);
  };

  const handleToggleExtraAnimal = (value: boolean) => {
    if (!value && selectedAnimals.length > selectedSize!.baseAnimalLimit) {
      setSelectedAnimals((prev) =>
        prev.slice(0, selectedSize!.baseAnimalLimit)
      );
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

  const calculatePrice = () => {
    if (!selectedSize) return 0;
    return (
      selectedSize.price + (hasExtraAnimal ? selectedSize.extraAnimalPrice : 0)
    );
  };

  const getFlowerCount = (flower: Flower) =>
    selectedFlowers.filter((f) => f.flower.id === flower.id).length;

  const getAnimalCount = (animal: Animal) =>
    selectedAnimals.filter((a) => a.animal.id === animal.id).length;

  // Cart validation
  const isAddToCartDisabled =
    !selectedSize ||
    !selectedColor ||
    selectedFlowers.filter((f) => f.flower.flowerType === FlowerType.SMALL)
      .length !== selectedSize.smallFlowerLimit ||
    selectedFlowers.filter((f) => f.flower.flowerType === FlowerType.MAIN)
      .length !== selectedSize.mainFlowerLimit ||
    selectedAnimals.length !==
      selectedSize.baseAnimalLimit +
        (hasExtraAnimal ? selectedSize.maxExtraAnimals : 0);

  // Handle add to cart
  const handleAddToCart = () => {
    if (confirm("Add design to cart?")) {
      setLoading(true);
      addToCart({
        size: selectedSize!,
        color: selectedColor!,
        flowers: selectedFlowers,
        animals: selectedAnimals.map((animal) => ({
          ...animal,
          hat: animal.hat,
        })),
        price: calculatePrice(),
        quantity: 1,
        hat: null,
      });

      toast.success("Added to cart");
      setLoading(false);

      setSelectedFlowers([]);
      setSelectedAnimals([]);
      setCurrentStep("size");
      setSelectedSize(undefined);
      setSelectedColor(undefined);
      setHasExtraAnimal(false);
      setTimeout(() => setLoading(false), 1000);
      router.push("/checkout");
    }
  };

  // Render current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case "size":
        return (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {sizes.map((size) => (
              <SizeCard
                key={size.size}
                size={size}
                isSelected={selectedSize?.id === size.id}
                onChange={handleSizeSelect}
              />
            ))}
          </div>
        );

      case "color":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
              {colors.map((color) => (
                <ColorCard
                  key={color.id}
                  color={color}
                  isSelected={selectedColor?.id === color.id}
                  onSelect={handleColorSelect}
                />
              ))}
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-700">
                Please note that due to the handcrafted nature of our products,
                there might be slight variations in the color shades.
              </p>
            </div>
          </div>
        );

      case "smallFlowers":
        return selectedSize ? (
          <FlowerSection
            title="Small Flowers"
            flowerType={FlowerType.SMALL}
            flowers={flowers}
            selectedFlowers={selectedFlowers}
            selectedSize={selectedSize}
            getFlowerCount={getFlowerCount}
            handleAddFlower={handleAddFlower}
            setSelectedFlowers={setSelectedFlowers}
          />
        ) : null;

      case "mainFlowers":
        return selectedSize ? (
          <FlowerSection
            title="Main Flowers"
            flowerType={FlowerType.MAIN}
            flowers={flowers}
            selectedFlowers={selectedFlowers}
            selectedSize={selectedSize}
            getFlowerCount={getFlowerCount}
            handleAddFlower={handleAddFlower}
            setSelectedFlowers={setSelectedFlowers}
          />
        ) : null;

      case "animals":
        return (
          <>
            <AnimalsSection
              animals={animals}
              selectedAnimals={selectedAnimals}
              selectedSize={selectedSize!}
              getAnimalCount={getAnimalCount}
              handleAddAnimal={handleAddAnimal}
              setSelectedAnimals={setSelectedAnimals}
              hasExtraAnimal={hasExtraAnimal}
            />
            {selectedSize && selectedSize.maxExtraAnimals > 0 && (
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
            )}
          </>
        );
    }
  };

  // Check if requirements are met to proceed to next step
  const canProceedToNextStep = () => {
    if (!selectedSize) return false;

    switch (currentStep) {
      case "smallFlowers":
        return (
          selectedFlowers.filter(
            (f) => f.flower.flowerType === FlowerType.SMALL
          ).length === selectedSize.smallFlowerLimit
        );
      case "mainFlowers":
        return (
          selectedFlowers.filter((f) => f.flower.flowerType === FlowerType.MAIN)
            .length === selectedSize.mainFlowerLimit
        );
      default:
        return true;
    }
  };

  const isFullWidthStep = (step: Step) => {
    return step === "size" || step === "color";
  };

  return (
    <div className="py-12 bg-secondary-500">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        {/* Progress Bar */}
        <StepIndicator
          currentStep={currentStep}
          steps={STEPS}
          onStepClick={handleStepClick}
          canNavigateToStep={canNavigateToStep}
          getStepStatus={getStepStatus}
        />

        {/* Main Content */}

        <div
          className={cn(
            isFullWidthStep(currentStep)
              ? "w-full"
              : "lg:grid lg:grid-cols-12 lg:gap-x-8"
          )}
        >
          {/* Left Column - Preview */}
          {!isFullWidthStep(currentStep) && (
            <div className="lg:col-span-5">
              <div className="sticky top-4">
                {selectedSize && (
                  <ImageDisplay
                    selectedColor={selectedColor || colors[0]}
                    selectedFlowers={selectedFlowers}
                    selectedAnimals={selectedAnimals}
                    selectedSize={selectedSize}
                    availableHats={hats.filter((hat) => hat.stock > 0)}
                    imageLoading={imageLoading}
                    totalPrice={calculatePrice()}
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
                )}
              </div>
            </div>
          )}

          {/* Right Column - Current Step */}
          <div
            className={cn(
              isFullWidthStep(currentStep)
                ? "w-full"
                : "lg:col-span-7 mt-8 lg:mt-0"
            )}
          >
            <div className="bg-white rounded-lg shadow-xl p-6">
              <StepHeader
                currentStep={currentStep}
                onBack={goToPreviousStep}
                isFirstStep={currentStep === "size"}
                selectedSize={selectedSize}
                selectedColor={selectedColor}
              />

              {renderStepContent()}

              {/* Navigation/Action Buttons */}
              <div className="mt-8 flex justify-end gap-4">
                {currentStep !== "animals" && (
                  <Button
                    size="lg"
                    onClick={goToNextStep}
                    disabled={!canProceedToNextStep()}
                  >
                    Continue
                  </Button>
                )}

                {currentStep === "animals" && (
                  <Button
                    size="lg"
                    disabled={isAddToCartDisabled}
                    onClick={handleAddToCart}
                  >
                    {loading ? "Adding to Cart..." : "Add to Cart"}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
