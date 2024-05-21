import { pacifico } from "@/app/fonts";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type BundleType = {
  id: number;
  name: string;
  description: string;
  price: number;
  theme: string;
  slug: string;
  stock: number;
  imageUrl: string;
};

export const bundles: BundleType[] = [
  {
    id: 1,
    name: "Bloom Bundle",
    description:
      "Discover the best of Yarn Petals with our Bloom Bundle! Lush, vibrant, and perfect for any setting.",
    price: 69.0,
    theme: "Varied",
    slug: "bloom-bundle",
    stock: 10,
    imageUrl:
      "https://res.cloudinary.com/dddxwdp7v/image/upload/v1713520259/YarnPetals/ProductImage/2%20Bloom%20Bundle%20-%20Green%20Theme/1_Froggie_zhyus0.webp",
  },
  {
    id: 2,
    name: "Bud Bundle",
    description:
      "Cool and calming, our Bud Bundle brings a soothing touch to any space. Perfectly arranged for tranquility.",
    price: 59.0,
    theme: "Varied",
    slug: "bud-bundle",
    stock: 20,
    imageUrl:
      "https://res.cloudinary.com/dddxwdp7v/image/upload/v1713520275/YarnPetals/ProductImage/7%20Bud%20Bundle%20-%20Blue%20Theme/9_Koala_ujdesp.webp",
  },
  {
    id: 3,
    name: "Leaf Bundle",
    description:
      "Add a unique and artistic touch with our Leaf Bundle. Perfect for sophisticated floral arrangements.",
    price: 49.0,
    theme: "Varied",
    slug: "leaf-bundle",
    stock: 30,
    imageUrl:
      "https://res.cloudinary.com/dddxwdp7v/image/upload/v1713520290/YarnPetals/ProductImage/13Bud%20Bundle%20-%20Yellow%20Theme/8_Ted_aqkado.webp",
  },
  {
    id: 4,
    name: "Sprout Bundle",
    description:
      "The perfect start for any flower enthusiast. Grow your passion with the Sprout Bundle.",
    price: 35.0,
    theme: "Varied",
    slug: "sprout-bundle",
    stock: 40,
    imageUrl:
      "https://res.cloudinary.com/dddxwdp7v/image/upload/v1713520290/YarnPetals/ProductImage/13Bud%20Bundle%20-%20Yellow%20Theme/8_Ted_aqkado.webp",
  },
];

export default function Bundles() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            className={cn(
              "text-3xl font-bold tracking-tight text-main-500 sm:text-8xl",
              pacifico.className
            )}
          >
            Our Bundles
          </h2>
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
                    className="aspect-[3/2] w-full rounded-2xl object-cover"
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
