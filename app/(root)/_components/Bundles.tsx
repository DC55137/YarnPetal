import { pacifico } from "@/app/fonts";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { bundles } from "@/data/bundles";

export default function Bundles() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className={cn("font-handwriting")}>Our Bundles</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Discover the best of Yarn Petals with our curated bundles. Each
            bundle offers a selection of themes based on different colors. Our
            flowers are meticulously chosen to match these themes, ensuring a
            harmonious and beautiful arrangement perfect for any occasion.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
        >
          {bundles.map((bundle) => (
            <li key={bundle.name}>
              <Link href={`/bundles/${bundle.slug}`}>
                <div className="relative">
                  <Image
                    className="aspect-[3/2] w-full rounded-2xl object-cover object-top"
                    src={bundle.imageUrl}
                    alt=""
                    width={300}
                    height={400}
                  />
                  <h3
                    className={cn(
                      "mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900"
                    )}
                  >
                    {bundle.name}
                  </h3>
                  <p className="text-base leading-7 text-gray-600">
                    {bundle.description}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
