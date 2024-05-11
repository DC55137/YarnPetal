import { PrismaClient } from "@prisma/client";
import availableLessonSlots from "./availableLessonSlots";

const prisma = new PrismaClient();

async function addAvailableLessonSlots() {
  // Fetch all existing lessonTime
  const existingSlots = await prisma.availableLessonSlot.findMany({
    select: {
      lessonTime: true,
    },
  });

  const existingSlotSet = new Set(
    existingSlots.map((slot) => slot.lessonTime.toISOString())
  );

  // Iterate over availableLessonSlots and insert only the new ones
  for (const slot of availableLessonSlots) {
    const slotKey = slot.lessonTime.toISOString();

    if (!existingSlotSet.has(slotKey)) {
      await prisma.availableLessonSlot.create({
        data: slot,
      });
    }
  }
}

addAvailableLessonSlots()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
