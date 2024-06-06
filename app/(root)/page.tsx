import Hero from "./_components/Hero";
import { Features1, Features2 } from "./_components/Features";

import Bundles from "./_components/Bundles";
import Display from "./_components/Display";
import CustomiseBouquet from "./_components/CustomiseBouquet";

export default function Home() {
  return (
    <>
      <main className="">
        <Hero />
        {/* <Display /> */}
        <CustomiseBouquet />
        <Bundles />
        <Features1 />
        <Features2 />
      </main>
    </>
  );
}
