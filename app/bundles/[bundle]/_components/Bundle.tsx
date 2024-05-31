"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Animal, Hat, BundleTheme, Flower } from "@prisma/client";
import { BundleType } from "@/data/bundles";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumbs";
import { useCartStore } from "@/src/stores/cart-store";
import { pacifico } from "@/app/fonts";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Plus, Trash } from "lucide-react";

type ExtraType = {
  type: "animal" | "flower";
  item: Animal | Flower;
  hat?: Hat;
};

function cal(value: number) {
  return value;
}

export default function BundlePage({
  bundle,
  hatList,
  bundleThemes,
  flowers,
  animals,
}: {
  bundle: BundleType;
  bundleThemes: BundleTheme[];
  hatList: Hat[];
  flowers: Flower[];
  animals: Animal[];
}) {
  const [loading, setLoading] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(bundleThemes[0]);
  const [selectedAnimal, setSelectedAnimal] = useState(animals[0]);
  const [selectedHat, setSelectedHat] = useState(hatList[0]);
  const [imageLoading, setImageLoading] = useState(false);
  const [selectedExtras, setSelectedExtras] = useState<ExtraType[]>([]);
  const { addToCart } = useCartStore((state) => state);

  const pages = [
    {
      name: "Bundles",
      href: "/bundles",
    },
    {
      name: bundle.name,
      href: `/bundles/${bundle.slug}`,
    },
  ];

  const handleAddToCart = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    addToCart({
      bundleTheme: selectedTheme,
      animal: selectedAnimal,
      bundleName: bundle.name,
      bundleSlug: bundle.slug,
      bundlePrice: bundle.price + selectedExtras.length * 10,
      quantity: 1,
      hat: selectedHat,
      extras: selectedExtras,
    });
    toast.success("Added to cart");
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const currentBundleTheme = bundleThemes.find(
    (theme) => theme.name === selectedTheme.name
  );

  if (!currentBundleTheme) {
    return <div>Theme not found</div>;
  }

  const addExtra = () => {
    setSelectedExtras([
      ...selectedExtras,
      { type: "animal", item: animals[0] },
    ]);
  };

  const removeExtra = (index: number) => {
    setSelectedExtras(selectedExtras.filter((_, i) => i !== index));
  };

  const updateExtra = (
    index: number,
    type: "animal" | "flower",
    item: Animal | Flower,
    hat?: Hat
  ) => {
    const newExtras = [...selectedExtras];
    newExtras[index] = { type, item, hat };
    setSelectedExtras(newExtras);
  };

  return (
    <div className="py-12 bg-secondary-500">
      <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <Breadcrumb pages={pages} className="mb-4" />
        <div className="lg:col-span-5 lg:col-start-8 mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">{bundle.name}</h1>
            <p className="text-2xl font-bold text-gray-900">
              ${(bundle.price + selectedExtras.length * 10).toFixed(2)}
            </p>
          </div>
          <h2 className={cn("text-4xl text-main-600 mt-2", pacifico.className)}>
            {selectedTheme.name} Theme
          </h2>
        </div>
        <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8 mt-8">
          <div className="mt-8 lg:col-span-7 lg:row-span-3 lg:mt-0 lg:px-10">
            <h2 className="sr-only">Images</h2>
            <ImageDisplay
              currentBundleTheme={currentBundleTheme}
              selectedAnimal={selectedAnimal}
              imageLoading={imageLoading}
              setImageLoading={setImageLoading}
              selectedHat={selectedHat}
            />
          </div>

          <div className="lg:col-span-5 lg:mt-0 -mt-40 bg-white p-6 rounded-lg shadow-2xl z-50 relative">
            <form onSubmit={handleAddToCart}>
              <ColorSelector
                bundleThemes={bundleThemes}
                selectedTheme={selectedTheme}
                setSelectedTheme={setSelectedTheme}
                setLoading={setImageLoading}
              />
              <AnimalSelector
                animals={animals}
                selectedAnimal={selectedAnimal}
                setSelectedAnimal={setSelectedAnimal}
                setImageLoading={setImageLoading}
              />
              <HatSelector
                selectedHat={selectedHat}
                setSelectedHat={setSelectedHat}
                hatList={hatList}
              />
              <h2 className="text-lg font-semibold text-gray-900 mt-8">
                Extras
              </h2>
              <div className="flex justify-between items-center">
                <p className="flex-grow">Add animals and flowers.</p>
                <p>$10.00/each</p>
              </div>
              {selectedExtras.map((extra, index) => (
                <ExtraSelector
                  key={index}
                  index={index}
                  hat={extra.hat}
                  type={extra.type}
                  item={extra.item}
                  animals={animals}
                  flowers={flowers}
                  updateExtra={updateExtra}
                  removeExtra={removeExtra}
                  hats={hatList}
                />
              ))}
              <Button
                className="mt-4 w-full"
                size={"lg"}
                type="button"
                variant={"outline"}
                onClick={addExtra}
              >
                <p>
                  <Plus className="inline-block mb-1" /> Add Extras
                </p>
              </Button>

              <Button
                disabled={loading}
                className={cn("w-full mt-4", loading && "button-added")}
                size={"lg"}
                type="submit"
              >
                {loading ? "Adding..." : "Add to cart"}
              </Button>
            </form>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Description</h2>
              <div
                className="prose prose-sm mt-4 text-gray-500"
                dangerouslySetInnerHTML={{ __html: bundle.description }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ImageDisplay({
  currentBundleTheme,
  selectedAnimal,
  imageLoading,
  setImageLoading,
  selectedHat,
}: {
  currentBundleTheme: BundleTheme;
  selectedAnimal: Animal;
  imageLoading: boolean;
  setImageLoading: (loading: boolean) => void;
  selectedHat: Hat;
}) {
  const getHatUrlAndWidth = (hatName: string) => {
    let hatUrl = "";
    let hatWidth = 0;

    if (hatName === "graduation") {
      hatUrl = selectedAnimal.graduationUrl;
      hatWidth = selectedAnimal.widthFactor * currentBundleTheme.animalWidth;
    } else if (hatName === "birthday") {
      hatUrl = selectedAnimal.birthdayUrl;
      hatWidth = selectedAnimal.widthFactor * currentBundleTheme.animalWidth;
    } else if (hatName === "none") {
      hatUrl = selectedAnimal.imageUrl;
      hatWidth = selectedAnimal.widthFactor * currentBundleTheme.animalWidth;
    }

    return { hatUrl, hatWidth };
  };

  const { hatUrl, hatWidth } = getHatUrlAndWidth(selectedHat.name);

  return (
    <>
      <div className="relative h-[700px] object-contain overflow-visible sm:block hidden">
        <div className="relative w-full h-full overflow-visible">
          <Image
            src={currentBundleTheme.imageBlank}
            alt={`${selectedAnimal.name} - ${currentBundleTheme.name}`}
            className={cn(
              "absolute object-center object-cover w-full z-0 overflow-visible",
              imageLoading && "hidden"
            )}
            fill={true}
            priority
            onLoad={() => setImageLoading(false)}
          />

          <Image
            src={hatUrl}
            alt={`${selectedAnimal.name} - ${currentBundleTheme.name}`}
            className={cn("absolute z-10", imageLoading && "hidden")}
            style={{
              bottom: `${currentBundleTheme.animalLocationY}px`,
              left: `${currentBundleTheme.animalLocationX}%`,
              transform: `translateX(${selectedAnimal.xlocation}px)`,
              rotate: `${currentBundleTheme.animalRotation}deg`,
              width: `${hatWidth}px`,
            }}
            width={200}
            height={200}
            onLoad={() => setImageLoading(false)}
            quality={40}
          />

          <Image
            src={currentBundleTheme.imageFront}
            alt={`${selectedAnimal.name} - ${currentBundleTheme.name}`}
            className={cn(
              "absolute object-center object-cover w-full h-full z-20",
              imageLoading && "hidden"
            )}
            fill={true}
            priority
            onLoad={() => setImageLoading(false)}
          />
        </div>
      </div>
      <div className="relative h-[600px] max-h-[600px] min-h-[600px] object-contain sm:hidden">
        {imageLoading && <LoadingPlaceholder />}
        <div className="relative w-full h-full overflow-visible">
          <Image
            src={currentBundleTheme.imageBlank}
            alt={`${selectedAnimal.name} - ${currentBundleTheme.name}`}
            className={cn(
              "absolute object-top object-cover w-full z-0",
              imageLoading && "hidden"
            )}
            fill={true}
            priority
            onLoad={() => setImageLoading(false)}
          />

          <Image
            src={hatUrl}
            alt={`${selectedAnimal.name} - ${currentBundleTheme.name}`}
            className={cn("absolute z-10", imageLoading && "hidden")}
            style={{
              bottom: `${cal(currentBundleTheme.animalLocationY - 80)}px`,
              left: `${currentBundleTheme.animalLocationX}%`,
              transform: `translateX(${selectedAnimal.xlocation}px)`,
              rotate: `${currentBundleTheme.animalRotation}deg`,
              width: `${cal(hatWidth * 0.8)}px`,
            }}
            width={200}
            height={200}
            onLoad={() => setImageLoading(false)}
            quality={40}
          />

          <Image
            src={currentBundleTheme.imageFront}
            alt={`${selectedAnimal.name} - ${currentBundleTheme.name}`}
            className={cn(
              "absolute object-top object-cover w-full h-full z-20",
              imageLoading && "hidden"
            )}
            fill={true}
            priority
            onLoad={() => setImageLoading(false)}
          />
        </div>
      </div>
    </>
  );
}

function AnimalSelector({
  animals,
  selectedAnimal,
  setSelectedAnimal,
  setImageLoading,
}: {
  animals: Animal[];
  selectedAnimal: Animal;
  setSelectedAnimal: (animal: Animal) => void;
  setImageLoading: (loading: boolean) => void;
}) {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">
          Animal ({selectedAnimal.name})
        </h2>
      </div>
      <div className="mt-2 grid grid-cols-3 gap-3 sm:grid-cols-6">
        {animals.map((animal) => (
          <label
            key={animal.name}
            className={`flex items-center justify-center rounded-full border py-3 px-3 text-sm font-medium uppercase sm:flex-1 
          ${
            animal.stock > 0
              ? "cursor-pointer"
              : "cursor-not-allowed opacity-25"
          }
          ${
            selectedAnimal.name === animal.name
              ? "bg-main-600 text-white hover:bg-main-700"
              : "border-gray-200 bg-white text-gray-900 hover:bg-gray-50"
          }`}
          >
            <input
              type="radio"
              name="animal"
              value={animal.name}
              checked={selectedAnimal.name === animal.name}
              onChange={() => {
                setImageLoading(true);
                setSelectedAnimal(animal);
              }}
              disabled={animal.stock === 0}
              className="sr-only"
            />
            <Image
              src={animal.imageUrl}
              alt={animal.name}
              width={100}
              height={100}
              className="rounded-md"
            />
          </label>
        ))}
      </div>
    </div>
  );
}
type ColorSelectorProps = {
  bundleThemes: BundleTheme[];
  selectedTheme: BundleTheme;
  setSelectedTheme: (theme: BundleTheme) => void;
  setLoading: (loading: boolean) => void;
};

const ColorSelector: React.FC<ColorSelectorProps> = ({
  bundleThemes,
  selectedTheme,
  setSelectedTheme,
  setLoading,
}) => {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">
          Theme ({selectedTheme.name})
        </h2>
      </div>
      <div className="mt-2 grid grid-cols-3 gap-3 sm:grid-cols-6">
        {bundleThemes.map((theme) => (
          <label
            key={theme.name}
            className={`flex items-center justify-center rounded-full border py-3 px-3 text-sm font-medium uppercase sm:flex-1 
          ${
            theme.stock > 0 ? "cursor-pointer" : "cursor-not-allowed opacity-25"
          }
          ${
            selectedTheme.name === theme.name
              ? "bg-main-600 text-white hover:bg-main-700"
              : "border-gray-200 bg-white text-gray-900 hover:bg-gray-50"
          }`}
          >
            <input
              type="radio"
              name="theme"
              value={theme.name}
              checked={selectedTheme.name === theme.name}
              onChange={() => {
                setLoading(true);
                setSelectedTheme(theme);
              }}
              disabled={theme.stock === 0}
              className="sr-only"
            />
            <Image
              src={theme.imageBlank} // Ensure each theme has an `imageUrl` field
              alt={theme.name}
              width={100}
              height={100}
              className="rounded-md"
            />
          </label>
        ))}
      </div>
    </div>
  );
};

const LoadingPlaceholder = () => {
  return (
    <div className="animate-pulse flex col-span-1">
      <div className="rounded-lg bg-gray-300 h-[600px] w-[600px] hidden sm:block" />
      <div className="rounded-lg bg-gray-300 h-[300px] w-[200px] sm:hidden" />
    </div>
  );
};

type HatSelectorProps = {
  selectedHat: Hat;
  setSelectedHat: (hat: Hat) => void;
  hatList: Hat[];
};

const HatSelector: React.FC<HatSelectorProps> = ({
  selectedHat,
  setSelectedHat,
  hatList,
}) => {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">
          Select a Hat
        </h2>
      </div>
      <div className="mt-2 grid grid-cols-3 gap-3 ">
        {hatList.map((hat) => (
          <label
            key={hat.name}
            className={`flex items-center justify-center rounded-md border px-3 text-sm font-medium uppercase sm:flex-1 py-3
          ${hat.stock > 0 ? "cursor-pointer" : "cursor-not-allowed opacity-25"}
          ${
            selectedHat.name === hat.name
              ? "bg-main-600 text-white hover:bg-main-700"
              : "border-gray-200 bg-white text-gray-900 hover:bg-gray-50"
          }`}
          >
            <input
              type="radio"
              name="hat"
              value={hat.name}
              checked={selectedHat.name === hat.name}
              onChange={() => {
                setSelectedHat(hat);
              }}
              disabled={hat.stock === 0}
              className="sr-only"
            />
            {hat.name}
          </label>
        ))}
      </div>
    </div>
  );
};

function ExtraSelector({
  index,
  type,
  item,
  hat,
  animals,
  flowers,
  hats,
  updateExtra,
  removeExtra,
}: {
  index: number;
  type: "animal" | "flower";
  item: Animal | Flower;
  hat?: Hat;
  animals: Animal[];
  flowers: Flower[];
  hats: Hat[];
  updateExtra: (
    index: number,
    type: "animal" | "flower",
    item: Animal | Flower,
    hat?: Hat
  ) => void;
  removeExtra: (index: number) => void;
}) {
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as "animal" | "flower";
    updateExtra(index, newType, newType === "animal" ? animals[0] : flowers[0]);
  };

  const handleItemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = parseInt(e.target.value);
    const newItem =
      type === "animal"
        ? animals.find((animal) => animal.id === id)
        : flowers.find((flower) => flower.id === id);
    updateExtra(index, type, newItem!, hat);
  };

  const handleHatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = parseInt(e.target.value);
    const newHat = hats.find((hat) => hat.id === id);
    updateExtra(index, type, item, newHat!);
  };

  const getHatUrl = (animal: Animal, hatName: string) => {
    if (hatName === "graduation") {
      return animal.graduationUrl;
    } else if (hatName === "birthday") {
      return animal.birthdayUrl;
    } else {
      return animal.imageUrl;
    }
  };

  return (
    <div className="flex flex-col mt-4 border-2 p-4">
      <div className="flex justify-between items-center w-full">
        <Image
          src={
            type === "animal"
              ? getHatUrl(item as Animal, hat?.name || "none")
              : (item as Flower).imageUrl
          }
          alt="Extra"
          width={50}
          height={50}
          className="rounded-md"
        />
        <Button
          size={"sm"}
          variant={"outline"}
          onClick={() => removeExtra(index)}
          type="button"
        >
          <Trash size={20} />
        </Button>
      </div>
      <div className="flex items-center space-x-4 w-full mt-2">
        <select
          value={type}
          onChange={handleTypeChange}
          className="block w-1/3 rounded-md border-gray-300 py-2 px-3 text-base focus:border-main-500 focus:outline-none focus:ring-main-500 sm:text-sm"
        >
          <option value="animal">Animal</option>
          <option value="flower">Flower</option>
        </select>
        <select
          value={item.id}
          onChange={handleItemChange}
          className="block w-1/3 rounded-md border-gray-300 py-2 px-3 text-base focus:border-main-500 focus:outline-none focus:ring-main-500 sm:text-sm"
        >
          {type === "animal"
            ? animals.map((animal) => (
                <option
                  key={animal.id}
                  value={animal.id}
                  disabled={animal.stock === 0}
                >
                  {animal.name} {animal.stock === 0 ? "(Out of stock)" : ""}
                </option>
              ))
            : flowers.map((flower) => (
                <option
                  key={flower.id}
                  value={flower.id}
                  disabled={flower.stock === 0}
                >
                  {flower.name} {flower.stock === 0 ? "(Out of stock)" : ""}
                </option>
              ))}
        </select>
        {type === "animal" && (
          <select
            value={hat?.id ?? ""}
            onChange={handleHatChange}
            className="block w-1/3 rounded-md border-gray-300 py-2 px-3 text-base focus:border-main-500 focus:outline-none focus:ring-main-500 sm:text-sm"
          >
            <option value="">No Hat</option>
            {hats.map((hat) => (
              <option key={hat.id} value={hat.id} disabled={hat.stock === 0}>
                {hat.description} {hat.stock === 0 ? "(Out of stock)" : ""}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
}
