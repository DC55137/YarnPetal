// src/components/AppInitializer.js
import { ReactNode, useEffect } from "react";
import useCartStore, { CartItem } from "@/src/stores/cart-store";

const AppInitializer = ({
  initialCart,
  children,
}: {
  initialCart: CartItem[];
  children: ReactNode;
}) => {
  const setCart = useCartStore((state) => state.setCart);

  useEffect(() => {
    if (initialCart) {
      setCart(initialCart);
    }
  }, [initialCart, setCart]);

  return <>{children}</>;
};

export default AppInitializer;
