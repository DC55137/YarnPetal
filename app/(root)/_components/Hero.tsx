import Image from "next/image";
import { pacifico } from "@/app/fonts";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <div className="overflow-hidden">
      <div className="flex w-full flex-col md:flex-row ">
        {/* Left Section with Text */}
        <div className="LeftTextSection md:w-1/2 bg-secondary-500 flex justify-center xl:pl-40 pt-52 text-center">
          <div className="hidden md:flex grow"></div>
          <HeroText />
        </div>

        {/* Right Section with Image */}
        <div className="RightSectionImage md:w-1/2 bg-main-500 flex md:items-end justify-center md:justify-start px-8 md:pt-32 pt-8 grow-0 ">
          <Image
            src="https://res.cloudinary.com/dddxwdp7v/image/upload/v1716462664/YarnPetals/giveGift_atuztq.webp"
            alt="Bouquet image"
            width={500}
            height={500}
            className="md:w-auto h-auto grow-0 mx-auto w-94"
          />

          <div className="hidden md:flex grow"></div>
        </div>
      </div>
    </div>
  );
}

const HeroText = () => {
  return (
    <div className="xl:max-w-4xl md:pr-8 grow-0">
      <h1
        className={cn(
          " font-bold tracking-tight text-6xl lg:text-7xl xl:text-8xl text-accent-900 ",
          pacifico.className
        )}
      >
        Crochet Bouquets
      </h1>
      <p className="mt-10 text-3xl leading-8 text-accent-900 max-w-xl mx-auto">
        Craft Timeless Memories and lighten up someone&apos;s day.
      </p>
      <div className="my-10 flex items-center ">
        <a href="/bundles" className="mx-auto">
          <Button size="lg">Shop Now </Button>
        </a>
      </div>
    </div>
  );
};
