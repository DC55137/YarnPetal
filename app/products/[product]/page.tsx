import React from "react";
import Product from "./_components/Product";
import prisma from "@/lib/prismadb";

export default async function page({
  params: { product },
}: {
  params: { product: string };
}) {
  const bundle = await prisma.bundle.findUnique({
    where: {
      slug: product,
    },
    include: {
      products: {
        include: {
          animal: true,
        },
      },
    },
  });

  if (!bundle) {
    return {
      notFound: true,
    };
  }

  return (
    <div className="bg-white">
      <Product bundle={bundle} />
    </div>
  );
}
