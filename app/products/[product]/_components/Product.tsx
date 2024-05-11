"use client";

import { useState } from "react";
import { CurrencyIcon, Globe } from "lucide-react";

import { cn } from "@/lib/utils";
import { Product, Bundle, Animal } from "@prisma/client";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumbs";
import { useCartStore } from "@/src/stores/cart-store";

const policies = [
  {
    name: "International delivery",
    icon: Globe,
    description: "Get your order in 2 years",
  },
  {
    name: "Loyalty rewards",
    icon: CurrencyIcon,
    description: "Don't look at other tees",
  },
];

type BundleWithProducts = Bundle & {
  products: (Product & { animal: Animal })[];
};

export default function ProductPage({
  bundle,
}: {
  bundle: BundleWithProducts;
}) {
  const [selectedProduct, setSelectedProduct] = useState(bundle.products[0]);
  const { addToCart } = useCartStore((state) => state);

  const pages = [
    {
      name: "Products",
      href: "/products",
    },
    {
      name: bundle.name,
      href: `/products/${bundle.slug}`,
    },
  ];

  const handleAddToCart = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission from reloading the page
    addToCart({
      product: selectedProduct,
      bundleName: bundle.name,
      bundleSlug: bundle.slug,
      bundlePrice: bundle.price,
      quantity: 1,
    });
  };

  return (
    <div className="pb-16 pt-6 sm:pb-24">
      <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <Breadcrumb pages={pages} className="mb-4" />
        <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-5 lg:col-start-8">
            <div className="flex justify-between">
              <h1 className="text-xl font-medium text-gray-900">
                {bundle.name}
              </h1>
              <p className="text-xl font-medium text-gray-900">
                ${bundle.price.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
            <h2 className="sr-only">Images</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
              <Image
                key={selectedProduct.id}
                src={selectedProduct.imageUrl}
                alt={`${selectedProduct.animal.name} - ${bundle.name}`}
                className={cn("lg:col-span-2 lg:row-span-2", "rounded-lg")}
                width={500}
                height={500}
              />
            </div>
          </div>

          <div className="mt-8 lg:col-span-5">
            <form onSubmit={handleAddToCart}>
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-medium text-gray-900">Animal</h2>
                </div>
                <div className="mt-2 grid grid-cols-3 gap-3 sm:grid-cols-6">
                  {bundle.products.map((product) => (
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
                        onChange={() => setSelectedProduct(product)}
                        disabled={product.animal.stock === 0}
                        className="sr-only"
                      />
                      {product.animal.name}
                    </label>
                  ))}
                </div>
              </div>
              <button
                type="submit"
                className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-main-600 px-8 py-3 text-base font-medium text-white hover:bg-main-700 focus:outline-none focus:ring-2 focus:ring-main-500 focus:ring-offset-2"
              >
                Add to cart
              </button>
            </form>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Description</h2>
              <div
                className="prose prose-sm mt-4 text-gray-500"
                dangerouslySetInnerHTML={{ __html: bundle.description }}
              />
            </div>
            <div className="mt-8 border-t border-gray-200 pt-8">
              <h2 className="text-sm font-medium text-gray-900">
                Fabric & Care
              </h2>
            </div>
            <section aria-labelledby="policies-heading" className="mt-10">
              <h2 id="policies-heading" className="sr-only">
                Our Policies
              </h2>
              <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {policies.map((policy) => (
                  <div
                    key={policy.name}
                    className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center"
                  >
                    <dt>
                      <policy.icon
                        className="mx-auto h-6 w-6 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      <span className="mt-4 text-sm font-medium text-gray-900">
                        {policy.name}
                      </span>
                    </dt>
                    <dd className="mt-1 text-sm text-gray-500">
                      {policy.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
