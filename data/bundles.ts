export type BundleType = {
  id: number;
  name: string;
  description: string;
  price: number;
  slug: string;
  size: string;
  stock: number;
  imageUrl: string;
};

export const bundles: BundleType[] = [
  {
    id: 1,
    name: "Bloom Bundle",
    description:
      "Discover the best of Yarn Petals with our Bloom Bundle! Lush, vibrant, and perfect for any setting.",
    size: "Extra Large",
    price: 69.0,
    slug: "bloom-bundle",
    stock: 10,
    imageUrl:
      "https://res.cloudinary.com/dddxwdp7v/image/upload/v1716461811/YarnPetals/Bloom_rr2gbn.webp",
  },
  {
    id: 2,
    name: "Bud Bundle",
    description:
      "Cool and calming, our Bud Bundle brings a soothing touch to any space. Perfectly arranged for tranquility.",
    price: 59.0,
    size: "Large",
    slug: "bud-bundle",
    stock: 20,
    imageUrl:
      "https://res.cloudinary.com/dddxwdp7v/image/upload/v1716461807/YarnPetals/Bud_iu6oe7.webp",
  },
  {
    id: 3,
    name: "Leaf Bundle",
    description:
      "Add a unique and artistic touch with our Leaf Bundle. Perfect for sophisticated floral arrangements.",
    price: 49.0,
    size: "meduim",

    slug: "leaf-bundle",
    stock: 30,
    imageUrl:
      "https://res.cloudinary.com/dddxwdp7v/image/upload/v1716461807/YarnPetals/leaf_eicdcq.webp",
  },
  {
    id: 4,
    name: "Sprout Bundle",
    description:
      "The perfect start for any flower enthusiast. Grow your passion with the Sprout Bundle.",
    price: 35.0,
    size: "Small",

    slug: "sprout-bundle",
    stock: 40,
    imageUrl:
      "https://res.cloudinary.com/dddxwdp7v/image/upload/v1716461808/YarnPetals/sprout_h26j4s.webp",
  },
];
