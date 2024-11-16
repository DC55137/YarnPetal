import { Color } from "@prisma/client";

export const isOutOfStock = (color: Color) => {
  return color.stock === 0;
};

export const calculatePrice = (
  selectedSize: any,
  selectedFlowers: any,
  selectedAnimals: any,
  selectedHat: any
) => {
  let total = selectedSize.price;
  selectedFlowers.forEach((item: any) => (total += item.flower.price));
  selectedAnimals.forEach((item: any) => (total += item.animal.price));
  if (selectedHat) total += selectedHat.price;
  return total;
};
