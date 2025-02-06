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

// Extended interfaces
interface AnimalWithHat extends SelectedAnimalItem {
  hat: Hat | null;
}

export type SelectedAnimalItem = {
  animal: Animal;
  position: number;
};

// Type for cart item
export interface CartItem {
  size: Size;
  color: Color;
  flowers: SelectedFlowerItem[];
  specialFlower: SelectedSpecialFlowerItem | null; // Changed from premiumFlowers array
  animals: AnimalWithHat[];
  price: number;
  quantity: number;
  hat: Hat | null;
}

// Cart state type
export type CartState = {
  cart: CartItem[];
};

// Helper function to compare selected items
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
    !item1.specialFlower === !item2.specialFlower && // Check if both have or don't have special flower
    item1.specialFlower?.specialFlower.id ===
      item2.specialFlower?.specialFlower.id && // Check special flower ID if present
    areSelectedItemsEqual(item1.animals, item2.animals)
  );
};

const calculateSpecialFlowerPrice = (
  specialFlower: SelectedSpecialFlowerItem | null
): number => {
  return specialFlower ? specialFlower.specialFlower.price : 0;
};

const calculateBasePrice = (item: CartItem): number => {
  const basePrice = item.size.price;
  const extraAnimalPrice =
    item.animals.length > item.size.baseAnimalLimit
      ? item.size.extraAnimalPrice
      : 0;
  return basePrice + extraAnimalPrice;
};

export type CartActions = {
  setCart: (cart: CartItem[]) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemToRemove: CartItem) => void;
  updateCartItem: (oldItem: CartItem, newItem: CartItem) => void;
  changeQuantity: (item: CartItem, quantity: number) => void;
  clearCart: () => void;
};

export type CartStore = CartState & CartActions;

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cart: [],

      setCart: (cart) => set({ cart }),

      addToCart: (newItem: CartItem) => {
        set((state) => {
          const itemToAdd = {
            ...newItem,
            price:
              calculateBasePrice(newItem) +
              calculateSpecialFlowerPrice(newItem.specialFlower),
          };

          const existingItemIndex = state.cart.findIndex((item) =>
            areCartItemsEqual(item, itemToAdd)
          );

          if (existingItemIndex !== -1) {
            // Update quantity if item exists
            const updatedCart = [...state.cart];
            updatedCart[existingItemIndex] = {
              ...updatedCart[existingItemIndex],
              quantity: updatedCart[existingItemIndex].quantity + 1,
            };
            return { cart: updatedCart };
          } else {
            // Add new item
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

      updateCartItem: (oldItem: CartItem, newItem: CartItem) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            areCartItemsEqual(item, oldItem) ? newItem : item
          ),
        }));
      },

      clearCart: () => set({ cart: [] }),
    }),
    { name: "cart-storage" }
  )
);
