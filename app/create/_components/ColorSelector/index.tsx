import { cn } from "@/lib/utils";
import Image from "next/image";
import { ColorSelectorProps } from "./types";
import { isOutOfStock } from "@/utils/create-utils";

export const ColorSelector: React.FC<ColorSelectorProps> = ({
  colors,
  selectedColor,
  setSelectedColor,
  setLoading,
}) => {
  return (
    <div className="mt-8">
      <div className="">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">
          Color ({selectedColor.name}){" "}
          {isOutOfStock(selectedColor) && "- Out of stock"}
        </h2>
        <p className="text-sm text-gray-500">{selectedColor.description}</p>
      </div>
      <div className="mt-2 grid grid-cols-3 gap-3 sm:grid-cols-6">
        {colors.map((color) => (
          <label
            key={color.name}
            className={cn(
              "flex items-center justify-center rounded-full border py-3 px-3 text-sm font-medium uppercase sm:flex-1",
              !isOutOfStock(color)
                ? "cursor-pointer"
                : "cursor-not-allowed opacity-25",
              selectedColor.name === color.name
                ? "bg-main-600 text-white hover:bg-main-700"
                : "border-gray-200 bg-white text-gray-900 hover:bg-gray-50"
            )}
          >
            <input
              type="radio"
              name="color"
              value={color.name}
              checked={selectedColor.name === color.name}
              onChange={() => {
                setLoading(true);
                setSelectedColor(color);
              }}
              disabled={isOutOfStock(color)}
              className="sr-only"
            />
            <Image
              src={color.imageBack}
              alt={color.name}
              width={800}
              height={800}
              className="rounded-md"
            />
          </label>
        ))}
      </div>
    </div>
  );
};
