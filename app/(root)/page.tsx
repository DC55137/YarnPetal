import Navbar from "./_components/Navbar";
import DynamicImage from "@/components/DynamicBloomImage";
import ProductsTool from "./_components/ProductsTool";
import Hero from "./_components/Hero";

export default function Home() {
  const baseImageUrl = "/images/bloom/flowers.png"; // Adjust the path to your base image
  const wrapFrontUrl = "/images/bloom/wrapFront.png"; // Adjust the path to your outer part grayscale image
  const bowImageUrl = "/images/bloom/bow.png"; // Adjust the path to your bow grayscale image
  const wrapBackUrl = "/images/bloom/outWrap.png"; // Adjust the path to your outer wrap grayscale image
  const animalUrl = "/images/bloom/animal.png"; // Adjust the path to your animal grayscale image
  const wrapBackColor = "#00ff00"; // GREEN Replace with dynamic color
  const wrapFrontColor = "#ff0000"; // RED Replace with dynamic color
  const bowColor = "#0000ff"; // BLUE Replace with dynamic color
  return (
    <>
      <Navbar />
      <main className="">
        <Hero />
      </main>
    </>
  );
}
