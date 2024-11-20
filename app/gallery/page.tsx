//  @/gallery/page.tsx
import { GalleryImage } from "@/lib/types";
import GalleryPage from "./_components/Gallery";

export const metadata = {
  title: "Gallery | Crochet Bouquets",
  description: "Explore our collection of handcrafted crochet bouquets",
};

async function getGalleryImages(): Promise<GalleryImage[]> {
  // Replace with your actual data fetching logic
  return [
    {
      id: 1,
      src: "https://res.cloudinary.com/dddxwdp7v/image/upload/v1716475114/YarnPetals/graduationhat_bzoddz.webp",
      alt: "Graduation Bouquet",
      size: "large",
      tags: ["Graduation", "Small"],
    },
    {
      id: 2,
      src: "https://res.cloudinary.com/dddxwdp7v/image/upload/v1716298927/YarnPetals/DSCF0752_psr0md.jpg",
      alt: "Bear Bouquet",
      size: "large",
      tags: ["Variations"],
    },
    {
      id: 3,
      src: "https://res.cloudinary.com/dddxwdp7v/image/upload/v1716474234/YarnPetals/GRADUATION_BUNDLE-2_1024x1024_xz3lal.webp",
      alt: "Birthday Bouquet",
      size: "small",
      tags: ["birthday"],
    },
    {
      id: 4,
      src: "https://res.cloudinary.com/dddxwdp7v/image/upload/v1716475114/YarnPetals/ribbonHat_pnswwj.webp",
      alt: "Bunny Bouquet",
      size: "large",
      tags: ["bunny", "large"],
    },
    {
      id: 5,
      src: "https://res.cloudinary.com/dddxwdp7v/image/upload/v1716475113/YarnPetals/BirthdayHat_yghoil.webp",
      alt: "Bear Bouquet",
      size: "large",
      tags: ["Bear", "Strawberry"],
    },
    {
      id: 6,
      src: "https://res.cloudinary.com/dddxwdp7v/image/upload/v1716461808/YarnPetals/sprout_h26j4s.webp",
      alt: "Bear Bouquet",
      size: "large",
      tags: ["Bunny"],
    },
    {
      id: 7,
      src: "https://res.cloudinary.com/dddxwdp7v/image/upload/v1716461807/YarnPetals/leaf_eicdcq.webp",
      alt: "Bear Bouquet",
      size: "large",
      tags: ["Bacon", "Medium"],
    },
    {
      id: 8,
      src: "https://res.cloudinary.com/dddxwdp7v/image/upload/v1713442356/YarnPetals/434973525_18025930553306884_4182640538013182044_n_ylffgo.jpg",
      alt: "Bear Bouquet",
      size: "large",
      tags: [],
    },
    {
      id: 9,
      src: "https://res.cloudinary.com/dddxwdp7v/image/upload/v1716461807/YarnPetals/Bud_iu6oe7.webp",
      alt: "Bear Bouquet",
      size: "large",
      tags: [],
    },
    {
      id: 10,
      src: "https://res.cloudinary.com/dddxwdp7v/image/upload/v1716298927/YarnPetals/DSCF0752_psr0md.jpg",
      alt: "Bear Bouquet",
      size: "large",
      tags: [],
    },
    {
      id: 11,
      src: "https://res.cloudinary.com/dddxwdp7v/image/upload/v1713442356/YarnPetals/434554575_18025711277306884_883951949668096031_n_ckrrom.jpg",
      alt: "Bear Bouquet",
      size: "large",
      tags: [],
    },
    {
      id: 12,
      src: "https://res.cloudinary.com/dddxwdp7v/image/upload/v1716474234/YarnPetals/Untitled_design-9_1024x1024_z2hnzc.webp",
      alt: "Bear Bouquet",
      size: "large",
      tags: [],
    },
    {
      id: 13,
      src: "https://res.cloudinary.com/dddxwdp7v/image/upload/v1713442355/YarnPetals/434178734_18025296947306884_1789045991371111936_n_qkrlzc.jpg",
      alt: "Bear Bouquet",
      size: "large",
      tags: [],
    },
    {
      id: 14,
      src: "https://res.cloudinary.com/dddxwdp7v/image/upload/v1713442355/YarnPetals/434952031_18026874308306884_1798088203075924863_n_zivrlz.jpg",
      alt: "Bear Bouquet",
      size: "large",
      tags: [],
    },
    {
      id: 15,
      src: "https://res.cloudinary.com/dddxwdp7v/image/upload/v1713520292/YarnPetals/ProductImage/16%20Leaf%20Bundle%20-%20Blue%20Theme/1_Froggie_pnjytr.webp",
      alt: "Bear Bouquet",
      size: "large",
      tags: [],
    },
  ];
}

export default async function Page() {
  const images = await getGalleryImages();

  return <GalleryPage images={images} />;
}
