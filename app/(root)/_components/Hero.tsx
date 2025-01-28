import Image from "next/image";
import { Button } from "@/components/ui/button";
import Logo from "@/components/LogoHeader";
import { ChevronRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <div className="overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-secondary-100/50 to-secondary-200/50 pointer-events-none" />

      <div className="flex w-full flex-col md:flex-row relative">
        {/* Left Section with Text */}
        <div className="LeftTextSection md:w-1/2 bg-secondary-500 flex justify-center xl:pl-40 pt-28 md:pt-28 text-center relative">
          <div className="hidden md:flex grow"></div>
          <HeroText />

          {/* Decorative floating elements */}
          {/* <div className="absolute top-20 left-10 animate-bounce delay-100">
            <Sparkles className="text-accent-500 w-6 h-6" />
          </div>
          <div className="absolute bottom-20 right-10 animate-bounce delay-300">
            <Sparkles className="text-accent-600 w-8 h-8" />
          </div> */}
        </div>

        {/* Right Section with Image */}
        <div className="RightSectionImage md:w-1/2 bg-main-500 flex md:items-end justify-center md:justify-start px-8 md:pt-32 pt-8 grow-0 relative group">
          <div className="absolute inset-0 bg-gradient-to-t from-main-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <Image
            src="https://res.cloudinary.com/dddxwdp7v/image/upload/v1716462664/YarnPetals/giveGift_atuztq.webp"
            alt="Bouquet image"
            width={500}
            height={500}
            className="md:w-auto h-auto grow-0 mx-auto w-94 transition-transform duration-700 group-hover:scale-105"
          />

          <div className="hidden md:flex grow"></div>
        </div>
      </div>
    </div>
  );
}

const HeroText = () => {
  return (
    <div className="xl:max-w-4xl md:pr-8 grow-0 relative z-10">
      <Logo className="mx-auto md:w-[500px] w-[350px] animate-fade-in-up" />

      <p className="text-lg md:text-xl text-accent-800 mt-6 mb-8 max-w-md mx-auto opacity-0 animate-fade-in">
        Discover handcrafted yarn bouquets that bring warmth and beauty to every
        occasion
      </p>

      <div className="my-10 flex items-center justify-center">
        <a href="/create" className="group relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-main-400 to-main-600 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
          <Button className="relative px-8 py-6 text-lg bg-main-500 hover:bg-main-600 transition-colors duration-200 flex items-center gap-2 group-hover:gap-4">
            Shop Now
            <ChevronRight className="w-5 h-5 transition-all duration-200" />
          </Button>
        </a>
      </div>

      {/* <div className="mt-6 text-sm text-accent-700 opacity-0 animate-fade-in delay-300">
        Free shipping on orders over $50
      </div> */}
    </div>
  );
};
