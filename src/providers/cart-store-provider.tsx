// // cart-store-provider.tsx
// "use client";

// import { type ReactNode, createContext, useRef, useContext } from "react";
// import { type StoreApi, useStore } from "zustand";

// import {
//   type CartStore,
//   createCartStore,
//   initCartStore,
// } from "@/src/stores/cart-store";

// export const CartStoreContext = createContext<StoreApi<CartStore> | null>(null);

// export interface CartStoreProviderProps {
//   children: ReactNode;
// }

// const store = createCartStore(initCartStore()); // 👈

// export const CartStoreProvider = ({ children }: CartStoreProviderProps) => {
//   const storeRef = useRef<StoreApi<CartStore>>();
//   if (!storeRef.current) {
//     storeRef.current = store;
//   }

//   return (
//     <CartStoreContext.Provider value={store}>
//       {children}
//     </CartStoreContext.Provider>
//   );
// };

// export const useCartStore = <T,>(selector: (store: CartStore) => T): T => {
//   const cartStoreContext = useContext(CartStoreContext);

//   if (!cartStoreContext) {
//     throw new Error(`useCartStore must be use within CartStoreProvider`);
//   }

//   return useStore(cartStoreContext, selector);
// };
