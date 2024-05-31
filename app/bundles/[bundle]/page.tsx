import React from "react";
import BundlePage from "./_components/Bundle";
import prisma from "@/lib/prismadb";
import { bundlesNoAnimals } from "@/data/bundles";

function getBundleIdBySlug(slug: string) {
  const bundle = bundlesNoAnimals.find((bundle) => bundle.slug === slug);
  return bundle;
}

export default async function page({
  params: { bundle },
}: {
  params: { bundle: string };
}) {
  const bundleFull = getBundleIdBySlug(bundle);

  if (!bundleFull) {
    return {
      notFound: true,
    };
  }

  const bundleThemes = await prisma.bundleTheme.findMany({
    where: {
      bundleId: bundleFull.id,
    },
    orderBy: {
      id: "asc",
    },
  });

  const hatList = await prisma.hat.findMany({
    orderBy: {
      id: "asc",
    },
  });
  const animalList = await prisma.animal.findMany({
    orderBy: {
      id: "asc",
    },
  });

  const flowers = await prisma.flower.findMany({
    orderBy: {
      id: "asc",
    },
  });

  return (
    <div className="bg-white">
      <BundlePage
        bundles={bundlesNoAnimals}
        bundle={bundleFull}
        hatList={hatList}
        bundleThemes={bundleThemes}
        animals={animalList}
        flowers={flowers}
      />
    </div>
  );
}
