import Hero from "./_components/Hero";
import { Features1, Features2 } from "./_components/Features";

import Bundles from "./_components/Bundles";
import Display from "./_components/Display";
import Delivery from "./_components/Delivery";

export default function Home() {
  return (
    <>
      <main className="">
        <Hero />
        <Display />
        <Bundles />
        <Features1 />
        <Features2 />
      </main>
    </>
  );
}
