import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

import { bundles } from "./bundles";
import { animals } from "./animals";
import { products } from "./products";

async function seedDatabase() {
  console.log("Clearing existing data...");
  // Delete from bundleImage first as it depends on product
  await prisma.bundle.deleteMany();
  await prisma.product.deleteMany();
  await prisma.animal.deleteMany();

  console.log("Seeding Bundles...");
  for (const bundle of bundles) {
    await prisma.bundle.upsert({
      where: { name: bundle.name },
      update: {},
      create: bundle,
    });
  }

  console.log("Seeding Animals...");
  for (const animal of animals) {
    await prisma.animal.upsert({
      where: { name: animal.name },
      update: {},
      create: animal,
    });
  }

  console.log("Seeding Products...");
  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }
}

seedDatabase()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
