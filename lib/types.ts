// Types and interfaces file (types.ts)
import {
  Animal,
  Hat,
  Color,
  Size,
  Flower,
  FlowerType,
  BundleSize,
  SpecialFlower,
} from "@prisma/client";

export interface SelectedFlowerItem {
  flower: Flower;
  position: number;
}

// Add selected special flower type
export interface SelectedSpecialFlowerItem {
  specialFlower: SpecialFlower;
  position: number;
}

export interface SelectedAnimalItem {
  animal: Animal;
  position: number;
  hat: Hat | null;
}

export interface AnimalWithHat extends SelectedAnimalItem {
  hat: Hat | null;
}

// Update CreatePageProps to include specialFlowers
export interface CreatePageProps {
  colors: Color[];
  sizes: Size[];
  flowers: Flower[];
  animals: Animal[];
  hats: Hat[];
  specialFlowers: SpecialFlower[]; // Add this line
}

export interface ImageDisplayProps {
  selectedColor: Color;
  selectedFlowers: SelectedFlowerItem[];
  selectedAnimals: AnimalWithHat[];
  selectedSize: Size;
  availableHats: Hat[];
  imageLoading: boolean;
  totalPrice: number;
  setImageLoading: (loading: boolean) => void;
  onRemoveFlower: (position: number) => void;
  onRemoveAnimal: (position: number) => void;
  onHatChange: (position: number, hat: Hat | null) => void;
  selectedSpecialFlower: SelectedSpecialFlowerItem | null; // Replace premiumFlowers with this
  onRemoveSpecialFlower: () => void; // Add this line
}

// Common types for all items (flowers and animals)
export interface BaseItem {
  id: string;
  name: string;
  imageUrl: string;
  stock: number;
}

interface SelectionLimit {
  current: number;
  max: number;
}

export interface SelectionGridProps<T extends BaseItem> {
  title: string;
  items: T[];
  selectedItems: any[];
  selectionLimit: SelectionLimit;
  getItemCount?: (item: T) => number;
  isItemSelected: (item: T) => boolean;
  onAddItem: (item: T, e: React.MouseEvent<HTMLButtonElement>) => void;
  onRemoveItem: (item: T) => void;
  getLimitMessage?: (limit: number) => string;
  getSelectedLabel?: (item: T) => string;
  className?: string;
}

interface ItemWithStock {
  id: number;
  name: string;
  stock: number;
  imageUrl: string;
}

interface CommonSectionProps<T extends ItemWithStock> {
  title: string;
  subtitle?: string;
  items: T[];
  selectedItems: (SelectedFlowerItem | SelectedAnimalItem)[];
  selectedSize: Size;
  currentLimit: number;
  maxLimit: number;
  getCount: (item: T) => number;
  handleAdd: (item: T, e: React.MouseEvent<HTMLButtonElement>) => void;
  handleRemove: (position: number) => void;
  priceInfo?: {
    price: number;
    label: string;
  };
  extraControls?: React.ReactNode;
  showHatSelector?: boolean;
  availableHats?: Hat[];
  onHatChange?: (position: number, hat: Hat | null) => void;
}

// Update CartItem interface
export interface CartItem {
  size: Size;
  color: Color;
  flowers: SelectedFlowerItem[];
  specialFlower: SelectedSpecialFlowerItem | null; // Replace premiumFlowers with this
  animals: AnimalWithHat[];
  price: number;
  quantity: number;
  hat: Hat | null;
}

// types.ts
export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  size: "small" | "medium" | "large";
  tags: string[];
}

export interface GalleryPageProps {
  images: GalleryImage[];
}

// Add these types to your types.ts
export interface PremiumLimit {
  size: BundleSize;
  limit: number;
}
