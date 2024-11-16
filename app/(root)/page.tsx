import Hero from "./_components/Hero";
import { Features } from "./_components/Features";

import CustomiseBouquet from "./_components/CustomiseBouquet";
import ImageGallery from "./_components/ImageGallery";

export default function Home() {
  return (
    <>
      <main className="">
        <Hero />
        {/* <Display /> */}
        <CustomiseBouquet />
        <ImageGallery />
        <Features />
      </main>
    </>
  );
}
