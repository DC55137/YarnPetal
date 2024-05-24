import React from "react";
import BundlePage from "./_components/Bundle";
import prisma from "@/lib/prismadb";

export default async function page({
  params: { bundle },
}: {
  params: { bundle: string };
}) {
  const bundleList = await prisma.bundle.findUnique({
    where: {
      slug: bundle,
    },
    include: {
      products: {
        include: {
          animal: true,
          color: true,
        },
      },
    },
  });

  const hatList = await prisma.hat.findMany();

  if (!bundleList) {
    return {
      notFound: true,
    };
  }

  return (
    <div className="bg-white">
      <BundlePage bundle={bundleList} hatList={hatList} />
    </div>
  );
}
