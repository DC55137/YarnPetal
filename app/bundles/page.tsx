import prisma from "@/lib/prismadb";
import BundlesCard from "./_components/BundlesCard";

export default async function Page() {
  const bundles = await prisma.bundle.findMany({
    orderBy: { id: "asc" },
  });

  return (
    <div>
      <BundlesCard bundles={bundles} />
    </div>
  );
}
