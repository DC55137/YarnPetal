// hooks/useCreateBundle.ts
import { useState, useEffect } from "react";
import { Size, Color, Flower, Animal, Hat } from "@prisma/client";
import { SelectedFlowerItem, AnimalWithHat } from "@/lib/types";
import { toast } from "react-hot-toast";

export const useCreateBundle = (initialSize: Size) => {
  const [selectedSize, setSelectedSize] = useState(initialSize);
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [selectedFlowers, setSelectedFlowers] = useState<SelectedFlowerItem[]>(
    []
  );
  const [selectedAnimals, setSelectedAnimals] = useState<AnimalWithHat[]>([]);
  const [hasExtraAnimal, setHasExtraAnimal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSelectedFlowers([]);
    setSelectedAnimals([]);
    setHasExtraAnimal(false);
  }, [selectedSize]);

  const handleAddFlower = (flower: Flower) => {
    const selectedSmallCount = selectedFlowers.filter(
      (f) => f.flower.flowerType === "SMALL"
    ).length;
    const selectedMainCount = selectedFlowers.filter(
      (f) => f.flower.flowerType === "MAIN"
    ).length;

    if (
      flower.flowerType === "SMALL" &&
      selectedSmallCount >= selectedSize.smallFlowerLimit
    ) {
      toast.error(
        `Maximum ${selectedSize.smallFlowerLimit} small flowers allowed`
      );
      return;
    }
    if (
      flower.flowerType === "MAIN" &&
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

  const handleAddAnimal = (animal: Animal) => {
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

  const calculatePrice = () => {
    return (
      selectedSize.price + (hasExtraAnimal ? selectedSize.extraAnimalPrice : 0)
    );
  };

  const isValid = () => {
    return (
      !loading &&
      selectedColor?.stock !== 0 &&
      selectedFlowers.filter((f) => f.flower.flowerType === "SMALL").length ===
        selectedSize.smallFlowerLimit &&
      selectedFlowers.filter((f) => f.flower.flowerType === "MAIN").length ===
        selectedSize.mainFlowerLimit &&
      selectedAnimals.length ===
        selectedSize.baseAnimalLimit +
          (hasExtraAnimal ? selectedSize.maxExtraAnimals : 0)
    );
  };

  return {
    selectedSize,
    selectedColor,
    selectedFlowers,
    selectedAnimals,
    hasExtraAnimal,
    loading,
    setSelectedSize,
    setSelectedColor,
    setSelectedFlowers,
    setSelectedAnimals,
    setHasExtraAnimal,
    setLoading,
    handleAddFlower,
    handleAddAnimal,
    calculatePrice,
    isValid,
  };
};
