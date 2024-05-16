"use client";

import { Animal, Product } from "@prisma/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ProductWithAnimal = Product & { animal: Animal };

export type CartItem = {
  product: ProductWithAnimal;
  bundleName: string;
  bundleSlug: string;
  bundlePrice: number;
  quantity: number;
  color: string;
};

export type CartState = {
  cart: CartItem[];
};

export type CartActions = {
  setCart: (cart: CartItem[]) => void;
  addToCart: (product: CartItem) => void;
  removeFromCart: (productId: number) => void;
  updateCartItem: (productId: number, newProduct: CartItem) => void;
  changeQuantity: (productId: number, quantity: number) => void;
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
            (item) => item.product.id === newItem.product.id
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
      removeFromCart: (productId: number) => {
        set((state) => {
          const cartItemIndex = state.cart.findIndex(
            (item) => item.product.id === productId
          );
          if (cartItemIndex !== -1 && state.cart[cartItemIndex].quantity > 1) {
            // Reduce the quantity
            let updatedCart = [...state.cart];
            updatedCart[cartItemIndex] = {
              ...updatedCart[cartItemIndex],
              quantity: updatedCart[cartItemIndex].quantity - 1,
            };
            return { cart: updatedCart };
          } else {
            // Remove the item entirely
            return {
              cart: state.cart.filter((item) => item.product.id !== productId),
            };
          }
        });
      },
      changeQuantity: (productId, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        })),
      updateCartItem: (productId, newProduct) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.product.id === productId
              ? { ...item, product: newProduct.product }
              : item
          ),
        })),
      clearCart: () => set({ cart: [] }),
    }),
    { name: "cart-storage" }
  )
);
