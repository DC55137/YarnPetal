import { pacifico } from "@/app/fonts";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export default function Delivery() {
  return (
    <div className="relative overflow-hidden bg-accent-400">
      {/* Sale */}
      <section
        aria-labelledby="sale-heading"
        className="relative mx-auto flex max-w-7xl flex-col items-center px-4 py-32 text-center sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <h2
            id="sale-heading"
            className={cn(
              "text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-8xl my-8",
              pacifico.className
            )}
          >
            Free Delivery
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-xl text-gray-600">
            We offer free delivery inside the Gold Coast area. If you are
            outside the Gold Coast area, we offer a flat rate of $10 for
            delivery.
          </p>
          <a href="/bundles">
            <Button className="my-4" size={"lg"}>
              Shop Now
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}
