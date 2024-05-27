"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { Product, Bundle, Animal, Color, Hat } from "@prisma/client";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumbs";
import { useCartStore } from "@/src/stores/cart-store";
import { pacifico } from "@/app/fonts";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import toast from "react-hot-toast";

type BundleWithProducts = Bundle & {
  products: (Product & { animal: Animal; color: Color })[];
};

export default function BundlePage({
  bundle,
  hatList,
}: {
  bundle: BundleWithProducts;
  hatList: Hat[];
}) {
  const [loading, setLoading] = useState(false);
  const [selectColor, setSelectColor] = useState(bundle.products[0].color);
  const [selectedProduct, setSelectedProduct] = useState(bundle.products[0]);
  const [selectedHat, setSelectedHat] = useState("none");
  const [imageLoading, setImageLoading] = useState(true);

  const { addToCart } = useCartStore((state) => state);

  // find the different colors available in the bundle
  const colors = bundle.products.map((p) => p.color);

  const uniqueColors = colors.filter(
    (color, index, self) =>
      index ===
      self.findIndex((c) => c.name === color.name && c.id === color.id)
  );

  // filter bundle by color
  const products = bundle.products.filter(
    (product) => product.color.id === selectColor.id
  );

  useEffect(() => {
    const preloaded: { [key: string]: boolean } = {};
    bundle.products.forEach((product) => {
      const img = new window.Image();
      img.src = product.imageUrl;
      img.height = 500;
      img.width = 500;
      img.onload = () => {
        preloaded[product.imageUrl] = true;
      };
    });
  }, [bundle.products]);

  const changeColor = (color: Color) => {
    setSelectColor(color);
    // filter products by color
    setSelectedProduct(
      bundle.products.filter((product) => product.color.id === color.id)[
        selectedProduct.animal.id - 1
      ]
    );
    setImageLoading(true);
  };

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
    e.preventDefault(); // Prevent form submission from reloading the page
    setLoading(true);
    addToCart({
      product: selectedProduct,
      bundleName: bundle.name,
      bundleSlug: bundle.slug,
      bundlePrice: bundle.price,
      quantity: 1,
      color: selectColor.name,
      hat: selectedHat,
    });
    toast.success("Added to cart");
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="py-12  sm:pb-24 min-h-screen">
      <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <Breadcrumb pages={pages} className="mb-4" />
        <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8 md:mt-20 mt-8">
          <div className="lg:col-span-5 lg:col-start-8">
            <div className="flex justify-between">
              <h1 className="text-xl font-medium text-gray-900">
                {bundle.name}
              </h1>
              <p className="text-xl font-medium text-gray-900">
                ${bundle.price.toFixed(2)}
              </p>
            </div>
            <h1
              className={cn(
                "text-3xl text-main-600 font-bold",
                pacifico.className
              )}
            >
              {selectColor.name} Theme
            </h1>
          </div>
          <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
            <h2 className="sr-only">Images</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
              {imageLoading && <LoadingPlaceholder />}{" "}
              {/* Display a loading spinner */}
              <Image
                key={selectedProduct.id}
                src={selectedProduct.imageUrl}
                alt={`${selectedProduct.animal.name} - ${bundle.name}`}
                className={cn(
                  "lg:col-span-2 lg:row-span-2",
                  imageLoading && "hidden"
                )}
                width={500}
                height={500}
                priority
                onLoad={() => setImageLoading(false)} // Hide spinner when image loads
              />
            </div>
          </div>

          <div className="lg:col-span-5">
            <form onSubmit={handleAddToCart}>
              <ColorSelector
                colors={uniqueColors}
                selectColor={selectColor}
                changeColor={changeColor}
              />
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">
                    Animal
                  </h2>
                </div>

                <div className="mt-2 grid grid-cols-3 gap-3 sm:grid-cols-6">
                  {products.map((product) => (
                    <label
                      key={product.animal.name}
                      className={`flex items-center justify-center rounded-md border py-3 px-3 text-sm font-medium uppercase sm:flex-1 
                    ${
                      product.animal.stock > 0
                        ? "cursor-pointer"
                        : "cursor-not-allowed opacity-25"
                    }
                    ${
                      selectedProduct.animal.name === product.animal.name
                        ? "bg-main-600 text-white hover:bg-main-700"
                        : "border-gray-200 bg-white text-gray-900 hover:bg-gray-50"
                    }`}
                    >
                      <input
                        type="radio"
                        name="product"
                        value={product.animal.name}
                        checked={
                          selectedProduct.animal.name === product.animal.name
                        }
                        onChange={() => {
                          setSelectedProduct(product);
                          setImageLoading(true);
                        }}
                        disabled={product.animal.stock === 0}
                        className="sr-only"
                      />
                      {product.animal.name}
                    </label>
                  ))}
                </div>
              </div>
              <HatSelector
                selectedHat={selectedHat}
                setSelectedHat={setSelectedHat}
                hatList={hatList}
              />
              <Button
                disabled={loading}
                className={cn("w-full mt-4", { "button-added": loading })}
                size={"lg"}
                type="submit"
              >
                {loading ? "Added" : "Add to cart"}
              </Button>
            </form>
            <Link href="/checkout">
              <Button className="w-full mt-4" size={"lg"} variant={"outline"}>
                Checkout
              </Button>
            </Link>

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

type ColorSelectorProps = {
  colors: Color[];
  selectColor: Color;
  changeColor: (color: Color) => void;
};

const ColorSelector: React.FC<ColorSelectorProps> = ({
  colors,
  selectColor,
  changeColor,
}) => {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Theme</h2>
      </div>
      <div className="mt-2">
        <select
          className="block w-full rounded-md border-gray-300 py-2 px-3 text-base focus:border-main-500 focus:outline-none focus:ring-main-500 sm:text-sm"
          value={selectColor.name}
          onChange={(e) => {
            const selectedColor = colors.find(
              (color) => color.name === e.target.value
            );
            if (selectedColor) {
              changeColor(selectedColor);
            }
          }}
        >
          {colors.map((color) => (
            <option
              key={color.name}
              value={color.name}
              disabled={color.stock === 0}
            >
              {color.stock > 0 ? color.name : `${color.name} (Out of stock)`}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

const LoadingPlaceholder = () => {
  return (
    <div className="animate-pulse flex col-span-2">
      <div className="rounded-lg bg-gray-300 h-[600px] w-[600px]" />
    </div>
  );
};

type HatSelectorProps = {
  selectedHat: string;
  setSelectedHat: (hat: string) => void;
  hatList: Hat[];
};

const HatSelector: React.FC<HatSelectorProps> = ({
  selectedHat,
  setSelectedHat,
  hatList,
}) => {
  const outOfStockHats = hatList.filter((hat) => hat.stock === 0);

  return (
    <div className="mt-8 ">
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">
            Select a Hat
          </h2>
          <p className="text-sm text-gray-600">
            Optional - Add a hat to the animal to suit the occasion
          </p>
        </div>
        <Image
          src="https://res.cloudinary.com/dddxwdp7v/image/upload/v1716475573/YarnPetals/small_uhhwt5.webp"
          alt="Hat Choices"
          width={100}
          height={100}
          className="rounded-full"
        />
      </div>
      <div className="mt-4">
        <select
          className="block w-full rounded-md border border-gray-300 py-2 px-3 text-base focus:border-main-500 focus:outline-none focus:ring-main-500 sm:text-sm"
          value={selectedHat}
          onChange={(e) => setSelectedHat(e.target.value)}
        >
          <option value="none">None</option>
          {hatList.map((hat) => (
            <option key={hat.id} value={hat.name} disabled={hat.stock === 0}>
              {hat.description}
            </option>
          ))}
        </select>
        {outOfStockHats.length > 0 && (
          <div className="mt-2 text-sm text-red-600">
            {outOfStockHats.map((hat) => (
              <p key={hat.id}>{hat.description} is out of stock</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
