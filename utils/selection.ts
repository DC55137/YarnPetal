import {
  SelectedFlowerItem,
  AnimalWithHat,
  SelectedAnimalItem,
} from "@/lib/types";
import { Size, Color, FlowerType, Animal, Flower } from "@prisma/client";

// Shared utility functions (utils/selection.ts)
export const calculateTotalPrice = (
  selectedSize: Size,
  hasExtraAnimal: boolean
) => {
  return (
    selectedSize.price + (hasExtraAnimal ? selectedSize.extraAnimalPrice : 0)
  );
};

// Alternative more specific version if you prefer:
export const getFlowerCount = (
  selectedFlowers: SelectedFlowerItem[],
  targetFlower: Flower
): number => {
  return selectedFlowers.filter((item) => item.flower.id === targetFlower.id)
    .length;
};

export const getAnimalCount = (
  selectedAnimals: SelectedAnimalItem[],
  targetAnimal: Animal
): number => {
  return selectedAnimals.filter((item) => item.animal.id === targetAnimal.id)
    .length;
};

export const isAddToCartDisabled = ({
  loading,
  selectedColor,
  selectedFlowers,
  selectedAnimals,
  selectedSize,
  hasExtraAnimal,
}: {
  loading: boolean;
  selectedColor: Color;
  selectedFlowers: SelectedFlowerItem[];
  selectedAnimals: AnimalWithHat[];
  selectedSize: Size;
  hasExtraAnimal: boolean;
}) => {
  const smallFlowerCount = selectedFlowers.filter(
    (f) => f.flower.flowerType === FlowerType.SMALL
  ).length;
  const mainFlowerCount = selectedFlowers.filter(
    (f) => f.flower.flowerType === FlowerType.MAIN
  ).length;
  const totalRequiredAnimals =
    selectedSize.baseAnimalLimit +
    (hasExtraAnimal ? selectedSize.maxExtraAnimals : 0);

  return (
    loading ||
    selectedColor.stock === 0 ||
    smallFlowerCount !== selectedSize.smallFlowerLimit ||
    mainFlowerCount !== selectedSize.mainFlowerLimit ||
    selectedAnimals.length !== totalRequiredAnimals
  );
};
