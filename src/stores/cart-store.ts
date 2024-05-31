"use client";

import { Animal, BundleTheme, Flower, Hat } from "@prisma/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const areExtrasEqual = (
  extras1: ExtraType[],
  extras2: ExtraType[]
): boolean => {
  if (extras1.length !== extras2.length) return false;
  return extras1.every((extra1, index) => {
    const extra2 = extras2[index];
    return (
      extra1.type === extra2.type &&
      extra1.item.id === extra2.item.id &&
      extra1.hat?.id === extra2.hat?.id
    );
  });
};

type ExtraType = {
  type: "animal" | "flower";
  item: Animal | Flower;
  hat?: Hat;
};

export type CartItem = {
  bundleTheme: BundleTheme;
  animal: Animal;
  bundleName: string;
  bundleSlug: string;
  bundlePrice: number;
  quantity: number;
  hat: Hat;
  extras: ExtraType[];
};

export type CartState = {
  cart: CartItem[];
};

export type CartActions = {
  setCart: (cart: CartItem[]) => void;
  addToCart: (bundleTheme: CartItem) => void;
  removeFromCart: (
    bundleThemeId: number,
    animal: Animal,
    hat: Hat,
    extras: ExtraType[]
  ) => void;
  updateCartItem: (bundleThemeId: number, newProduct: CartItem) => void;
  changeQuantity: (
    bundleThemeId: number,
    animal: Animal,
    hat: Hat,
    quantity: number,
    extras: ExtraType[]
  ) => void;
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
          const cartItemIndex = state.cart.findIndex(
            (item) =>
              item.bundleTheme.id === newItem.bundleTheme.id &&
              item.hat === newItem.hat &&
              item.animal.id === newItem.animal.id &&
              areExtrasEqual(item.extras, newItem.extras)
          );
          if (cartItemIndex !== -1) {
            // Product already in cart, update the quantity
            let updatedCart = [...state.cart];
            updatedCart[cartItemIndex] = {
              ...updatedCart[cartItemIndex],
              quantity: updatedCart[cartItemIndex].quantity + 1,
            };
            return { cart: updatedCart };
          } else {
            // Product not in cart, add new item
            return { cart: [...state.cart, { ...newItem, quantity: 1 }] };
          }
        });
      },
      removeFromCart: (
        bundleThemeId: number,
        animal: Animal,
        hat: Hat,
        extras: ExtraType[]
      ) => {
        set((state) => {
          const cartItemIndex = state.cart.findIndex(
            (item) =>
              item.bundleTheme.id === bundleThemeId &&
              item.hat === hat &&
              item.animal.id === animal.id &&
              areExtrasEqual(item.extras, extras)
          );

          // Remove the item entirely
          return {
            cart: state.cart.filter(
              (item) =>
                item.bundleTheme.id !== bundleThemeId ||
                item.hat !== hat ||
                item.animal.id !== animal.id ||
                !areExtrasEqual(item.extras, extras)
            ),
          };
        });
      },
      changeQuantity: (
        bundleThemeId: number,
        animal: Animal,
        hat: Hat,
        quantity: number,
        extras: ExtraType[]
      ) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.bundleTheme.id === bundleThemeId &&
            item.hat === hat &&
            item.animal.id === animal.id &&
            areExtrasEqual(item.extras, extras)
              ? { ...item, quantity }
              : item
          ),
        })),
      updateCartItem: (bundleThemeId, newProduct) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.bundleTheme.id === bundleThemeId
              ? { ...item, bundleTheme: newProduct.bundleTheme }
              : item
          ),
        })),
      clearCart: () => set({ cart: [] }),
    }),
    { name: "cart-storage" }
  )
);
