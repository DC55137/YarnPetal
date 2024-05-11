import { PrismaClient } from "@prisma/client";
import availableLessonSlots from "./availableLessonSlots";

const prisma = new PrismaClient();

async function main() {
  // Clear the database
  await prisma.availableLessonSlot.deleteMany();

  // Populate the available lesson slots
  for (const slot of availableLessonSlots) {
    await prisma.availableLessonSlot.create({
      data: slot,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
