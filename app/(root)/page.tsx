import Navbar from "./_components/Navbar";
import Hero from "./_components/Hero";
import { Features1, Features2 } from "./_components/Features";

import Bundles from "./_components/Bundles";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="">
        <Hero />
        <Features1 />
        <Bundles />
        <Features2 />
      </main>
    </>
  );
}
