import React from "react";
import CreatePage from "./_components/Create";
import prisma from "@/lib/prismadb";

// Opt out of caching for all data requests in the route segment
export const dynamic = "force-dynamic";

export default async function Page() {
  // Fetch all the necessary data for customization, including special flowers
  const [colors, sizes, flowers, animals, hats, specialFlowers] =
    await Promise.all([
      prisma.color.findMany({ orderBy: { id: "asc" } }),
      prisma.size.findMany({ orderBy: { id: "asc" } }),
      prisma.flower.findMany({ orderBy: { id: "asc" } }),
      prisma.animal.findMany({ orderBy: { id: "asc" } }),
      prisma.hat.findMany({ orderBy: { id: "asc" } }),
      prisma.specialFlower.findMany({
        where: {
          isActive: true, // Only fetch active special flowers
        },
        orderBy: { id: "asc" },
      }),
    ]);

  return (
    <div className="bg-white">
      <CreatePage
        colors={colors}
        sizes={sizes}
        flowers={flowers}
        animals={animals}
        hats={hats}
        specialFlowers={specialFlowers} // Pass special flowers to the component
      />
    </div>
  );
}
