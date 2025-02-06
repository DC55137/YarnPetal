"use client";

import {
  Animal,
  Color,
  Flower,
  Hat,
  Size,
  SpecialFlower,
} from "@prisma/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Types for selected items
export type SelectedFlowerItem = {
  flower: Flower;
  position: number;
};

export type SelectedSpecialFlowerItem = {
  specialFlower: SpecialFlower;
  position: number;
};

interface AnimalWithHat extends SelectedAnimalItem {
  hat: Hat | null;
}

export type SelectedAnimalItem = {
  animal: Animal;
  position: number;
};

// Updated CartItem interface with clearer price breakdown
export interface CartItem {
  size: Size;
  color: Color;
  flowers: SelectedFlowerItem[];
  specialFlower: SelectedSpecialFlowerItem | null;
  animals: AnimalWithHat[];
  basePrice: number; // Price of the bundle size only
  extraAnimalPrice: number; // Price for extra animals
  specialFlowerPrice: number; // Price for special flower
  totalPrice: number; // Sum of all prices
  quantity: number;
  hat: Hat | null;
}

export type CartState = {
  cart: CartItem[];
};

const areSelectedItemsEqual = (
  items1: SelectedFlowerItem[] | SelectedAnimalItem[],
  items2: SelectedFlowerItem[] | SelectedAnimalItem[]
): boolean => {
  if (items1.length !== items2.length) return false;
  return items1.every((item1, index) => {
    const item2 = items2[index];
    if ("flower" in item1 && "flower" in item2) {
      return (
        item1.flower.id === item2.flower.id && item1.position === item2.position
      );
    }
    if ("animal" in item1 && "animal" in item2) {
      return (
        item1.animal.id === item2.animal.id && item1.position === item2.position
      );
    }
    return false;
  });
};

const areCartItemsEqual = (item1: CartItem, item2: CartItem): boolean => {
  return (
    item1.size.id === item2.size.id &&
    item1.color.id === item2.color.id &&
    item1.hat?.id === item2.hat?.id &&
    areSelectedItemsEqual(item1.flowers, item2.flowers) &&
    !item1.specialFlower === !item2.specialFlower &&
    item1.specialFlower?.specialFlower.id ===
      item2.specialFlower?.specialFlower.id &&
    areSelectedItemsEqual(item1.animals, item2.animals)
  );
};

// Separate price calculation functions for clarity
const calculateBasePrice = (size: Size): number => {
  return size.price;
};

const calculateExtraAnimalPrice = (item: CartItem): number => {
  return item.animals.length > item.size.baseAnimalLimit
    ? item.size.extraAnimalPrice
    : 0;
};

const calculateSpecialFlowerPrice = (
  specialFlower: SelectedSpecialFlowerItem | null
): number => {
  return specialFlower ? specialFlower.specialFlower.price : 0;
};

const calculateTotalPrice = (
  basePrice: number,
  extraAnimalPrice: number,
  specialFlowerPrice: number
): number => {
  return basePrice + extraAnimalPrice + specialFlowerPrice;
};

export type CartActions = {
  setCart: (cart: CartItem[]) => void;
  addToCart: (
    item: Omit<
      CartItem,
      "basePrice" | "extraAnimalPrice" | "specialFlowerPrice" | "totalPrice"
    >
  ) => void;
  removeFromCart: (itemToRemove: CartItem) => void;
  updateCartItem: (
    oldItem: CartItem,
    newItem: Omit<
      CartItem,
      "basePrice" | "extraAnimalPrice" | "specialFlowerPrice" | "totalPrice"
    >
  ) => void;
  changeQuantity: (item: CartItem, quantity: number) => void;
  clearCart: () => void;
};

export type CartStore = CartState & CartActions;

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cart: [],

      setCart: (cart) => set({ cart }),

      addToCart: (newItem) => {
        set((state) => {
          const basePrice = calculateBasePrice(newItem.size);
          const extraAnimalPrice = calculateExtraAnimalPrice(
            newItem as CartItem
          );
          const specialFlowerPrice = calculateSpecialFlowerPrice(
            newItem.specialFlower
          );
          const totalPrice = calculateTotalPrice(
            basePrice,
            extraAnimalPrice,
            specialFlowerPrice
          );

          const itemToAdd = {
            ...newItem,
            basePrice,
            extraAnimalPrice,
            specialFlowerPrice,
            totalPrice,
          };

          const existingItemIndex = state.cart.findIndex((item) =>
            areCartItemsEqual(item, itemToAdd)
          );

          if (existingItemIndex !== -1) {
            const updatedCart = [...state.cart];
            updatedCart[existingItemIndex] = {
              ...updatedCart[existingItemIndex],
              quantity: updatedCart[existingItemIndex].quantity + 1,
            };
            return { cart: updatedCart };
          } else {
            return { cart: [...state.cart, { ...itemToAdd, quantity: 1 }] };
          }
        });
      },

      removeFromCart: (itemToRemove: CartItem) => {
        set((state) => ({
          cart: state.cart.filter(
            (item) => !areCartItemsEqual(item, itemToRemove)
          ),
        }));
      },

      changeQuantity: (item: CartItem, quantity: number) => {
        set((state) => ({
          cart: state.cart.map((cartItem) =>
            areCartItemsEqual(cartItem, item)
              ? { ...cartItem, quantity }
              : cartItem
          ),
        }));
      },

      updateCartItem: (oldItem: CartItem, newItem) => {
        set((state) => {
          const basePrice = calculateBasePrice(newItem.size);
          const extraAnimalPrice = calculateExtraAnimalPrice(
            newItem as CartItem
          );
          const specialFlowerPrice = calculateSpecialFlowerPrice(
            newItem.specialFlower
          );
          const totalPrice = calculateTotalPrice(
            basePrice,
            extraAnimalPrice,
            specialFlowerPrice
          );

          const updatedItem = {
            ...newItem,
            basePrice,
            extraAnimalPrice,
            specialFlowerPrice,
            totalPrice,
          };

          return {
            cart: state.cart.map((item) =>
              areCartItemsEqual(item, oldItem) ? updatedItem : item
            ),
          };
        });
      },

      clearCart: () => set({ cart: [] }),
    }),
    { name: "cart-storage" }
  )
);
