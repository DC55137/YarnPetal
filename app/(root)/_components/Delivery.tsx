import { pacifico } from "@/app/fonts";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

export default function Delivery() {
  return (
    <div className="relative overflow-hidden bg-secondary-500">
      {/* Sale */}
      <section
        aria-labelledby="sale-heading"
        className="relative mx-auto flex max-w-7xl flex-col items-center px-4 py-32 text-center sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <h2
            id="sale-heading"
            className={cn(
              "text-7xl font-bold tracking-tight text-accent-900 md:text-8xl my-8",
              "font-handwriting"
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
