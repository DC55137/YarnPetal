import Image from "next/image";
import { pacifico } from "@/app/fonts";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function NewHero() {
  return (
    <div className="relative isolate overflow-hidden">
      <div className="flex w-full flex-col md:flex-row ">
        {/* Left Section with Text */}
        <div className="md:w-1/2 bg-secondary-500 flex justify-center xl:pl-40 pt-52 text-center">
          <div className="grow"></div>
          <div className="xl:max-w-4xl pr-8">
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
                <Button size="lg" className="py-6">
                  Shop Now{" "}
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Right Section with Image */}
        <div className="md:w-1/2 bg-main-500 flex items-end justify-start px-8 md:pt-32 pt-8 ">
          <Image
            src="https://res.cloudinary.com/dddxwdp7v/image/upload/v1716271595/YarnPetals/giveGift_nx0xon.png"
            alt="Bouquet image"
            width={500}
            height={500}
            className="w-auto h-auto align-bottom"
          />

          <div className="grow"></div>
        </div>
      </div>
    </div>
  );
}
