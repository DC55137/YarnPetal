import { Color } from "@prisma/client";

export interface ColorSelectorProps {
  colors: Color[];
  selectedColor: Color;
  setSelectedColor: (color: Color) => void;
  setLoading: (loading: boolean) => void;
}
