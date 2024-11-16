import React from "react";
import CreatePage from "./_components/Create";
import prisma from "@/lib/prismadb";

export default async function Page() {
  // Fetch all the necessary data for customization
  const colors = await prisma.color.findMany({
    orderBy: {
      id: "asc",
    },
  });

  const sizes = await prisma.size.findMany({
    orderBy: {
      id: "asc",
    },
  });

  const flowers = await prisma.flower.findMany({
    orderBy: {
      id: "asc",
    },
  });

  const animals = await prisma.animal.findMany({
    orderBy: {
      id: "asc",
    },
  });

  const hats = await prisma.hat.findMany({
    orderBy: {
      id: "asc",
    },
  });

  return (
    <div className="bg-white">
      <CreatePage
        colors={colors}
        sizes={sizes}
        flowers={flowers}
        animals={animals}
        hats={hats}
      />
    </div>
  );
}
