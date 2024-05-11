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
    name: "Animal Flowers Add on only for Bloom/Bud Bundle",
    description:
      "Enhance your floral arrangements with adorable animal-shaped flowers, a perfect addition to any Bloom or Bud bundle.",
    price: 8.0,
    theme: "Animal Add-on",
    slug: "animal-flowers-add-on",
    stock: 150,
    imageUrl:
      "https://res.cloudinary.com/dddxwdp7v/image/upload/v1713520264/YarnPetals/ProductImage/1%20Animal%20Flower%20Add%20on/AnimalList_lvqdod.webp",
  },
  {
    id: 2,
    name: "Bloom Bundle - Green Theme",
    description:
      "A lush, vibrant collection of green-themed blooms designed to bring a natural, refreshing touch to your environment.",
    price: 69.0,
    theme: "Green",
    slug: "bloom-bundle-green-theme",
    stock: 10,
    imageUrl:
      "https://res.cloudinary.com/dddxwdp7v/image/upload/v1713520259/YarnPetals/ProductImage/2%20Bloom%20Bundle%20-%20Green%20Theme/1_Froggie_zhyus0.webp",
  },
  {
    id: 3,
    name: "Bloom Bundle - Pink Purple Theme",
    description:
      "A beautifully curated bouquet featuring a mix of pink and purple flowers, perfect for adding a splash of color and romance.",
    price: 69.0,
    theme: "Pink Purple",
    slug: "bloom-bundle-pink-purple-theme",
    stock: 10,
    imageUrl:
      "https://res.cloudinary.com/dddxwdp7v/image/upload/v1713520257/YarnPetals/ProductImage/3%20Bloom%20Bundle%20-%20Pink%20Purple%20Theme/5_Moo_wx1jqc.webp",
  },
  {
    id: 4,
    name: "Bloom Bundle - Pink Theme",
    description:
      "Bright and soft pink blooms that bring a cheerful and loving vibe, ideal for gifts and special occasions.",
    price: 69.0,
    theme: "Pink",
    slug: "bloom-bundle-pink-theme",
    stock: 20,
    imageUrl:
      "https://res.cloudinary.com/dddxwdp7v/image/upload/v1713520268/YarnPetals/ProductImage/4%20Bloom%20Bundle%20-%20Pink%20Theme/2_Bacon_o7ai3t.webp",
  },
  {
    id: 5,
    name: "Bloom Bundle - Purple Theme",
    description:
      "Elegant and mysterious purple flowers, assembled to offer a bouquet that conveys luxury and sophistication.",
    price: 69.0,
    theme: "Purple",
    slug: "bloom-bundle-purple-theme",
    stock: 15,
    imageUrl:
      "https://res.cloudinary.com/dddxwdp7v/image/upload/v1713520271/YarnPetals/ProductImage/5%20Bloom%20Bundle%20-%20Purple%20Theme/5_Moo_ssgg2p.webp",
  },
  {
    id: 6,
    name: "Bloom Bundle - Yellow Theme",
    description:
      "Sunny and bright yellow flowers that can light up any day with a touch of joy and exuberance.",
    price: 69.0,
    theme: "Yellow",
    slug: "bloom-bundle-yellow-theme",
    stock: 10,
    imageUrl:
      "https://res.cloudinary.com/dddxwdp7v/image/upload/v1713520273/YarnPetals/ProductImage/6%20Bloom%20Bundle%20-%20Yellow%20Theme/8_Ted_n25scq.webp",
  },
  {
    id: 7,
    name: "Bud Bundle - Blue Theme",
    description:
      "Cool and calming blue buds, perfectly arranged to provide a soothing experience to any viewer.",
    price: 59.0,
    theme: "Blue",
    slug: "bud-bundle-blue-theme",
    stock: 20,
    imageUrl:
      "https://res.cloudinary.com/dddxwdp7v/image/upload/v1713520275/YarnPetals/ProductImage/7%20Bud%20Bundle%20-%20Blue%20Theme/9_Koala_ujdesp.webp",
  },
  {
    id: 8,
    name: "Bud Bundle - Pink Theme (Style 1)",
    description:
      "Charming and delightful pink buds in Style 1, offering a classic floral aesthetic.",
    price: 59.0,
    theme: "Pink",
    slug: "bud-bundle-pink-theme-style-1",
    stock: 20,
    imageUrl:
      "https://res.cloudinary.com/dddxwdp7v/image/upload/v1713520278/YarnPetals/ProductImage/8%20Bud%20Bundle%20-%20Pink%20Theme%20%28style%201%29/4_Bunny_oynt7x.webp",
  },
  {
    id: 9,
    name: "Bud Bundle - Pink Theme (Style 2)",
    description:
      "Style 2 of our pink bud series, with a slightly more modern twist in arrangement and bloom selection.",
    price: 59.0,
    theme: "Pink",
    slug: "bud-bundle-pink-theme-style-2",
    stock: 20,
    imageUrl:
      "https://res.cloudinary.com/dddxwdp7v/image/upload/v1713520285/YarnPetals/ProductImage/10%20Bud%20Bundle%20-%20Pink%20Theme/3_Ducky_w7udp1.webp",
  },
  {
    id: 10,
    name: "Bud Bundle - Pink/Yellow Theme",
    description:
      "A vibrant mix of pink and yellow buds, designed to spark energy and happiness.",
    price: 59.0,
    theme: "Pink Yellow",
    slug: "bud-bundle-pink-yellow-theme",
    stock: 20,
    imageUrl:
      "https://res.cloudinary.com/dddxwdp7v/image/upload/v1713520282/YarnPetals/ProductImage/11%20Bud%20Bundle%20-%20Pink:Yellow%20Theme/6_Sheep_rw7jyr.webp",
  },
  {
    id: 11,
    name: "Bud Bundle - Purple Theme",
    description:
      "Deep purple buds that add a touch of mystery and royal vibes to your décor.",
    price: 59.0,
    theme: "Purple",
    slug: "bud-bundle-purple-theme",
    stock: 20,
    imageUrl:
      "https://res.cloudinary.com/dddxwdp7v/image/upload/v1713520287/YarnPetals/ProductImage/12%20Bud%20Bundle%20-%20Purple%20Theme/2_Bacon_slh3hz.webp",
  },
  {
    id: 12,
    name: "Bud Bundle - Yellow Theme",
    description:
      "Cheerful yellow buds that bring a lively and energetic feel to any space.",
    price: 59.0,
    theme: "Yellow",
    slug: "bud-bundle-yellow-theme",
    stock: 20,
    imageUrl:
      "https://res.cloudinary.com/dddxwdp7v/image/upload/v1713520290/YarnPetals/ProductImage/13Bud%20Bundle%20-%20Yellow%20Theme/8_Ted_aqkado.webp",
  },
  {
    id: 13,
    name: "Leaf Bundle - Blue Theme",
    description:
      "Not just flowers, our blue-themed leaf bundle adds a unique and artistic touch, perfect for sophisticated floral arrangements.",
    price: 49.0,
    theme: "Blue",
    slug: "leaf-bundle-blue-theme",
    stock: 30,
    imageUrl:
      "https://res.cloudinary.com/dddxwdp7v/image/upload/v1713520290/YarnPetals/ProductImage/13Bud%20Bundle%20-%20Yellow%20Theme/8_Ted_aqkado.webp",
  },
  {
    id: 14,
    name: "Leaf Bundle - Purple Theme",
    description:
      "Purple-themed leaves to complement your flowers, or stand alone as a minimalist but colorful arrangement.",
    price: 49.0,
    theme: "Purple",
    slug: "leaf-bundle-purple-theme",
    stock: 30,
    imageUrl:
      "https://res.cloudinary.com/dddxwdp7v/image/upload/v1713520290/YarnPetals/ProductImage/13Bud%20Bundle%20-%20Yellow%20Theme/8_Ted_aqkado.webp",
  },
  {
    id: 15,
    name: "Leaf Bundle - Yellow Theme",
    description:
      "Yellow leaves bring brightness and contrast, ideal for both vibrant and pastel flower combinations.",
    price: 49.0,
    theme: "Yellow",
    slug: "leaf-bundle-yellow-theme",
    stock: 30,
    imageUrl:
      "https://res.cloudinary.com/dddxwdp7v/image/upload/v1713520290/YarnPetals/ProductImage/13Bud%20Bundle%20-%20Yellow%20Theme/8_Ted_aqkado.webp",
  },
  {
    id: 16,
    name: "Mother's Day Bundle - Blue Theme",
    description:
      "Special for Mother's Day, this blue-themed bundle conveys calm and trust, perfect for showing appreciation and love.",
    price: 55.0,
    theme: "Blue",
    slug: "mothers-day-bundle-blue-theme",
    stock: 25,
    imageUrl:
      "https://res.cloudinary.com/dddxwdp7v/image/upload/v1713520290/YarnPetals/ProductImage/13Bud%20Bundle%20-%20Yellow%20Theme/8_Ted_aqkado.webp",
  },
  {
    id: 17,
    name: "Mother's Day Bundle - Pink Theme",
    description:
      "Lovingly crafted pink-themed blooms for Mother's Day to express gratitude and love in the most beautiful way.",
    price: 50.0,
    theme: "Pink",
    slug: "mothers-day-bundle-pink-theme",
    stock: 25,
    imageUrl:
      "https://res.cloudinary.com/dddxwdp7v/image/upload/v1713520290/YarnPetals/ProductImage/13Bud%20Bundle%20-%20Yellow%20Theme/8_Ted_aqkado.webp",
  },
  {
    id: 18,
    name: "Mother's Day Bundle - Pink/Yellow Theme",
    description:
      "A joyous blend of pink and yellow blooms perfect for Mother's Day, showing your warm and caring side.",
    price: 50.0,
    theme: "Pink Yellow",
    slug: "mothers-day-bundle-pink-yellow-theme",
    stock: 25,
    imageUrl:
      "https://res.cloudinary.com/dddxwdp7v/image/upload/v1713520290/YarnPetals/ProductImage/13Bud%20Bundle%20-%20Yellow%20Theme/8_Ted_aqkado.webp",
  },
  {
    id: 19,
    name: "Mother's Day Bundle - Purple Theme",
    description:
      "Regal purple blooms for Mother's Day that symbolize dignity, pride, and success to honor the queen that she is.",
    price: 50.0,
    theme: "Purple",
    slug: "mothers-day-bundle-purple-theme",
    stock: 25,
    imageUrl:
      "https://res.cloudinary.com/dddxwdp7v/image/upload/v1713520290/YarnPetals/ProductImage/13Bud%20Bundle%20-%20Yellow%20Theme/8_Ted_aqkado.webp",
  },
  {
    id: 20,
    name: "Mother's Day Bundle - Yellow Theme",
    description:
      "Sunny and bright, this yellow-themed bundle for Mother's Day delivers smiles and radiance, just like her.",
    price: 50.0,
    theme: "Yellow",
    slug: "mothers-day-bundle-yellow-theme",
    stock: 25,
    imageUrl:
      "https://res.cloudinary.com/dddxwdp7v/image/upload/v1713520290/YarnPetals/ProductImage/13Bud%20Bundle%20-%20Yellow%20Theme/8_Ted_aqkado.webp",
  },
  {
    id: 21,
    name: "Sprout Bundle",
    description:
      "The Sprout Bundle - a perfect start for any flower enthusiast looking to grow their passion.",
    price: 35.0,
    theme: "Varied",
    slug: "sprout-bundle",
    stock: 40,
    imageUrl:
      "https://res.cloudinary.com/dddxwdp7v/image/upload/v1713520290/YarnPetals/ProductImage/13Bud%20Bundle%20-%20Yellow%20Theme/8_Ted_aqkado.webp",
  },
];
