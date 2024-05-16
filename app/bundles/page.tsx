import prisma from "@/lib/prismadb";
import BundlesCard from "./_components/BundlesCard";

export default async function Page() {
  const bundles = await prisma.bundle.findMany();

  return (
    <div>
      <BundlesCard bundles={bundles} />
    </div>
  );
}
