import { cn } from "@/lib/utils";
import { Bundle } from "@prisma/client";

import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumbs";
import { PATH_PAGE } from "@/routes/paths";
import { pacifico } from "@/app/fonts";

const pages = [{ name: "products", href: "/products", current: false }];

export default function BundlesCard({
  bundles,
  className,
}: {
  bundles: Bundle[];
  className?: string;
}) {
  return (
    <div className={cn("pb-32", className)}>
      <div className="mx-auto max-w-7xl overflow-hidden px-4 sm:px-6 lg:px-8 pt-12">
        <Breadcrumb pages={pages} />
        <Header />
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
          {bundles.map((bundle) => (
            <a
              key={bundle.id}
              href={`${PATH_PAGE.bundles}/${bundle.slug}`}
              className="group text-sm"
            >
              <div className="relative w-full overflow-visible h-96">
                <Image
                  src={bundle.imageUrl}
                  alt={bundle.name}
                  className="h-full w-full object-cover object-top transition-transform duration-200 group-hover:scale-105"
                  style={{ minHeight: "100%" }}
                  width={300}
                  height={300}
                />
                {bundle.stock === 0 && (
                  <div className="absolute top-0 left-0 bg-red-600 text-white text-xs uppercase font-bold px-2 py-1">
                    Sold Out
                  </div>
                )}
              </div>
              <div className="mt-4 flex flex-col items-start">
                <h3
                  className={cn(pacifico.className, "text-2xl text-main-500")}
                >
                  {bundle.name}
                </h3>
                <p className="font-medium text-lg text-gray-900">
                  {bundle.price.toLocaleString("en-AU", {
                    style: "currency",
                    currency: "AUD",
                  })}
                </p>
                <p className="text-gray-500 mt-2">{bundle.size}</p>
                {bundle.stock > 0 && (
                  <p className="text-green-600 mt-1">Available</p>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className=" my-4 ">
      <div className="mx-auto max-w-7xl ">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            className={cn(
              "my-4 text-4xl font-bold tracking-tight text-main-500 sm:text-6xl"
            )}
          >
            Bundles
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Handcrafted Yarn Bouquets for Every Occasion
          </p>
        </div>
      </div>
    </div>
  );
}
