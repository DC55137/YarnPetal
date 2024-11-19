import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus, Trash } from "lucide-react";
import Image from "next/image";

interface SelectionCardProps {
  name: string;
  imageUrl: string;
  isSelected: boolean;
  isDisabled?: boolean;
  onSelect: () => void;
  onRemove?: () => void;
  count?: number;
  stock?: number;
  price?: number;
}

export const SelectionCard = ({
  name,
  imageUrl,
  isSelected,
  isDisabled,
  onSelect,
  onRemove,
  count,
  stock,
  price,
}: SelectionCardProps) => {
  return (
    <div className="relative group">
      <div
        className={cn(
          "relative flex flex-col items-center justify-center rounded-md border p-2 transition-all",
          isDisabled
            ? "border-red-200 bg-white/80"
            : isSelected
            ? "border-main-300 bg-main-50"
            : "hover:border-main-200"
        )}
      >
        <div className="relative w-full aspect-square">
          <Image
            src={imageUrl}
            alt={name}
            className="object-contain object-top rounded-md"
            fill
            sizes="70px"
          />
        </div>

        <div className="mt-2 space-y-1 text-center">
          <span className="text-sm font-medium text-gray-700">{name}</span>
          {price && (
            <span className="text-sm text-gray-500">${price.toFixed(2)}</span>
          )}
          {count && count > 0 && (
            <div className="flex items-center justify-center gap-2">
              <div className="h-5 px-2 bg-main-100 rounded-full">
                <span className="text-xs font-medium text-main-700">
                  {count} selected
                </span>
              </div>
            </div>
          )}
        </div>

        {isDisabled && (
          <div className="absolute inset-0 overflow-hidden rounded-md">
            <div className="absolute top-0 right-0 left-0 bottom-0 bg-white/60" />
            <div className="absolute top-[40%] right-[-35%] left-[-35%] h-6 bg-red-500 text-white text-xs font-bold flex items-center justify-center rotate-[45deg]">
              SOLD OUT
            </div>
          </div>
        )}

        {!isDisabled && stock && stock <= 3 && (
          <span className="mt-1 text-[10px] text-orange-500 font-medium">
            Only {stock} left
          </span>
        )}

        {onRemove && isSelected && (
          <Button
            size="sm"
            variant="ghost"
            onClick={onRemove}
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 bg-main-100 hover:bg-main-200"
          >
            <Trash className="h-3 w-3 text-main-700" />
          </Button>
        )}

        <Button
          size="sm"
          variant={isSelected ? "default" : "outline"}
          className="absolute -top-2 -left-2 h-6 w-6 rounded-full p-0"
          onClick={onSelect}
          disabled={isDisabled}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
