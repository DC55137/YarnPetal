import ValentinesHero from "./_components/HeroValentine";
import { Features } from "./_components/Features";

import CustomiseBouquet from "./_components/CustomiseBouquet";
import ImageGallery from "./_components/ImageGallery";

export default function Home() {
  return (
    <>
      <main className="">
        <ValentinesHero />
        {/* <Display /> */}
        <CustomiseBouquet />
        <ImageGallery />
        <Features />
      </main>
    </>
  );
}
