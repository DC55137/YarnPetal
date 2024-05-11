// adds a discount code to the database

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function addDiscountCode() {
  await prisma.discountCode.create({
    data: {
      code: "OPEN30", // ALWAYS UPPERCASE
      discountSS: 30,
      discountSBS: 20,
      discountSUFC: 10,
    },
  });
}

addDiscountCode()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
