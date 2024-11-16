import { Size } from "@prisma/client";

export interface SizeSelectorProps {
  sizes: Size[];
  selectedSize: Size;
  setSelectedSize: (size: Size) => void;
  setLoading: (loading: boolean) => void;
}
