import Hero from "./_components/Hero";
import { Features } from "./_components/Features";

import Bundles from "./_components/Bundles";
import CustomiseBouquet from "./_components/CustomiseBouquet";

export default function Home() {
  return (
    <>
      <main className="">
        <Hero />
        {/* <Display /> */}
        <CustomiseBouquet />
        <Bundles />
        <Features />
      </main>
    </>
  );
}
