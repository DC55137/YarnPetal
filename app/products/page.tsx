import prisma from "@/lib/prismadb";
import Products from "./_components/Products";

export default async function Page() {
  const bundles = await prisma.bundle.findMany();

  return (
    <div>
      <Products bundles={bundles} />
    </div>
  );
}
