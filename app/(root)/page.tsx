import Navbar from "./_components/Navbar";
import Hero from "./_components/Hero";
import NewHero from "./_components/NewHero";
import FreeHat from "./_components/FreeHat";
import Customise from "./_components/Customise";
import Bundles from "./_components/Bundles";
import Delivery from "./_components/Delivery";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="">
        <NewHero />
        <FreeHat />
        <Customise />
        <Delivery />
        <Bundles />
      </main>
    </>
  );
}
