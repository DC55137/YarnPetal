import Hero from "./_components/Hero";
import { Features1, Features2 } from "./_components/Features";

import Bundles from "./_components/Bundles";
import Display from "./_components/Display";

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
