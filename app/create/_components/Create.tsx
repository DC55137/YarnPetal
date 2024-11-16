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

// Image Display Component
const ImageDisplay: React.FC<ImageDisplayProps> = ({
  selectedColor,
  selectedFlowers,
  selectedAnimals,
  selectedSize,
  availableHats,
  imageLoading,
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
    <div className="flex gap-6 flex-col pt-10">
      <div className="flex gap-6">
        {/* Color Preview */}
        <div className="w-1/3 flex flex-col gap-4">
          <h3 className="text-base font-medium">Selected Color</h3>
          <div className="relative aspect-square w-full rounded-lg overflow-hidden">
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
          </div>
        </div>

        {/* Selected Items Display */}
        <div className="w-2/3 space-y-6">
          {/* Small Flowers */}
          {smallFlowers.length > 0 && (
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
              </div>
            </div>
          )}

          {/* Main Flowers */}
          {mainFlowers.length > 0 && (
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
              </div>
            </div>
          )}

          {/* Animals with Hat Selection */}
          {selectedAnimals.length > 0 && (
            <div>
              <h3 className="text-sm font-medium mb-3">Animals</h3>
              <div className="grid grid-cols-4 gap-3">
                {selectedAnimals.map((animal) => (
                  <SelectedAnimalCard
                    key={animal.position}
                    animal={animal}
                    availableHats={availableHats}
                    onRemove={onRemoveAnimal}
                    onHatChange={onHatChange}
                  />
                ))}
              </div>
            </div>
          )}
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

// Item Selection Card
const ItemCard: React.FC<ItemCardProps> = ({
  item,
  isDisabled,
  onAdd,
  type,
}) => (
  <div className="relative">
    <label
      className={cn(
        "flex flex-col items-center justify-center rounded-md border p-2 cursor-pointer",
        isDisabled && "opacity-50 cursor-not-allowed"
      )}
    >
      <div className="relative w-full aspect-square">
        <Image
          src={item.imageUrl}
          alt={item.name}
          className="object-contain object-top rounded-md"
          fill
          sizes="70px"
        />
      </div>
      <span className="mt-2 text-xs text-center">{item.name}</span>
    </label>
    <Button
      size="sm"
      variant="outline"
      className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
      onClick={onAdd}
      disabled={isDisabled}
    >
      <Plus className="h-4 w-4" />
    </Button>
  </div>
);

// Main Create Page Component
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

  const { addToCart } = useCartStore();

  // Reset selections when size changes
  useEffect(() => {
    setSelectedFlowers([]);
    setSelectedAnimals([]);
  }, [selectedSize]);

  // Handlers
  const handleAddFlower = (
    flower: Flower,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const selectedSmallCount = selectedFlowers.filter(
      (f) => f.flower.flowerType === FlowerType.SMALL
    ).length;
    const selectedMainCount =
      selectedFlowers.filter((f) => f.flower.flowerType === FlowerType.MAIN)
        .length + selectedAnimals.length;

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
      toast.error(`Maximum ${selectedSize.mainFlowerLimit} main items allowed`);
      return;
    }

    const position = selectedFlowers.length + 1;
    setSelectedFlowers([...selectedFlowers, { flower, position }]);
  };

  const handleAddAnimal = (
    animal: Animal,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const selectedMainCount =
      selectedFlowers.filter((f) => f.flower.flowerType === FlowerType.MAIN)
        .length + selectedAnimals.length;

    if (selectedMainCount >= selectedSize.mainFlowerLimit) {
      toast.error(`Maximum ${selectedSize.mainFlowerLimit} main items allowed`);
      return;
    }

    const position = selectedAnimals.length + 1;
    setSelectedAnimals([...selectedAnimals, { animal, position, hat: null }]);
  };

  const handleHatChange = (animalPosition: number, hat: Hat | null) => {
    setSelectedAnimals((prev) =>
      prev.map((animal) =>
        animal.position === animalPosition ? { ...animal, hat } : animal
      )
    );
  };

  const calculatePrice = selectedSize.price;

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
            <p className="text-2xl font-bold text-gray-900">
              ${calculatePrice.toFixed(2)}
            </p>
          </div>
          <h2 className={cn("text-4xl text-main-600 mt-2", pacifico.className)}>
            {selectedColor.name} Bundle
          </h2>
        </div>

        <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
          {/* Sticky Image Display */}
          <div className="lg:col-span-6 lg:row-span-3">
            <div className="lg:sticky lg:top-4">
              <ImageDisplay
                selectedColor={selectedColor}
                selectedFlowers={selectedFlowers}
                selectedAnimals={selectedAnimals}
                selectedSize={selectedSize}
                availableHats={hats}
                imageLoading={imageLoading}
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
          <div className="lg:col-span-6 mt-8 lg:mt-0 bg-white p-6 rounded-lg shadow-2xl">
            {/* Size Selector */}
            <div className="mt-8">
              <div className="flex justify-between">
                <h2 className="text-lg font-semibold text-gray-900 mb-1">
                  Size ({selectedSize.size})
                </h2>
                <p className="text-sm text-gray-500">
                  ${selectedSize.price.toFixed(2)}
                </p>
              </div>
              <p className="text-sm text-gray-500 mb-2">
                Includes up to {selectedSize.mainFlowerLimit} main items and{" "}
                {selectedSize.smallFlowerLimit} small flowers
              </p>
              <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {sizes.map((size) => (
                  <label
                    key={size.size}
                    className={cn(
                      "flex items-center justify-center rounded-md border py-3 px-3 text-sm font-medium uppercase cursor-pointer",
                      selectedSize.size === size.size
                        ? "bg-main-600 text-white hover:bg-main-700"
                        : "border-gray-200 bg-white text-gray-900 hover:bg-gray-50"
                    )}
                  >
                    <input
                      type="radio"
                      name="size"
                      value={size.size}
                      checked={selectedSize.size === size.size}
                      onChange={() => setSelectedSize(size)}
                      className="sr-only"
                    />
                    {size.size}
                  </label>
                ))}
              </div>
            </div>

            {/* Color Selector */}
            <div className="mt-8">
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
            <div className="mt-8">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  Step 1: Small Flowers
                  <span className="text-sm font-normal text-gray-500 ml-2">
                    (Required: {selectedSize.smallFlowerLimit})
                  </span>
                </h3>
                <span className="text-sm font-medium text-gray-500">
                  {
                    selectedFlowers.filter(
                      (f) => f.flower.flowerType === FlowerType.SMALL
                    ).length
                  }
                  /{selectedSize.smallFlowerLimit}
                </span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                {flowers
                  .filter((flower) => flower.flowerType === FlowerType.SMALL)
                  .map((flower) => (
                    <ItemCard
                      key={flower.id}
                      item={flower}
                      isDisabled={
                        flower.stock === 0 ||
                        selectedFlowers.filter(
                          (f) => f.flower.flowerType === FlowerType.SMALL
                        ).length >= selectedSize.smallFlowerLimit
                      }
                      onAdd={(e) => handleAddFlower(flower, e)}
                      type="flower"
                    />
                  ))}
              </div>
            </div>

            {/* Main Items Section */}
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Step 2: Main Items
                  <span className="text-sm font-normal text-gray-500 ml-2">
                    (Required: {selectedSize.mainFlowerLimit})
                  </span>
                </h3>
                <span className="text-sm font-medium text-gray-500">
                  {selectedFlowers.filter(
                    (f) => f.flower.flowerType === FlowerType.MAIN
                  ).length + selectedAnimals.length}
                  /{selectedSize.mainFlowerLimit}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {/* Main Flowers */}
                <div className="border-r pr-4">
                  <h4 className="text-md font-medium text-gray-700 mb-2">
                    Main Flowers
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {flowers
                      .filter((flower) => flower.flowerType === FlowerType.MAIN)
                      .map((flower) => (
                        <ItemCard
                          key={flower.id}
                          item={flower}
                          isDisabled={
                            flower.stock === 0 ||
                            selectedFlowers.filter(
                              (f) => f.flower.flowerType === FlowerType.MAIN
                            ).length +
                              selectedAnimals.length >=
                              selectedSize.mainFlowerLimit
                          }
                          onAdd={(e) => handleAddFlower(flower, e)}
                          type="flower"
                        />
                      ))}
                  </div>
                </div>

                {/* Animals */}
                <div>
                  <h4 className="text-md font-medium text-gray-700 mb-2">
                    Animals
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {animals.map((animal) => (
                      <ItemCard
                        key={animal.id}
                        item={animal}
                        isDisabled={
                          animal.stock === 0 ||
                          selectedFlowers.filter(
                            (f) => f.flower.flowerType === FlowerType.MAIN
                          ).length +
                            selectedAnimals.length >=
                            selectedSize.mainFlowerLimit
                        }
                        onAdd={(e) => handleAddAnimal(animal, e)}
                        type="animal"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              disabled={
                loading ||
                selectedColor.stock === 0 ||
                selectedFlowers.filter(
                  (f) => f.flower.flowerType === FlowerType.SMALL
                ).length !== selectedSize.smallFlowerLimit ||
                selectedFlowers.filter(
                  (f) => f.flower.flowerType === FlowerType.MAIN
                ).length +
                  selectedAnimals.length !==
                  selectedSize.mainFlowerLimit
              }
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
                    hat: animal.hat, // This ensures the hat is included with each animal
                  })),
                  price: calculatePrice,
                  quantity: 1,
                  hat: null, // Set to null since hats are now per-animal
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