// availableLessonSlots.ts
interface LessonSlot {
  lessonTime: Date;
}

const data: LessonSlot[] = [];

const startDate = new Date("2024-04-18T00:00:00.000Z");
const endDate = new Date("2024-05-31T00:00:00.000Z");
const lessonHours = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

for (
  let day = new Date(startDate);
  day <= endDate;
  day.setDate(day.getDate() + 1)
) {
  // Exclude Sundays
  if (day.getUTCDay() !== 0) {
    for (const hour of lessonHours) {
      // Adjust for each hour in the lessonHours array
      const lessonTimeAtHour = new Date(day);
      lessonTimeAtHour.setUTCHours(hour - 10, 0, 0, 0); // Set minutes to 00
      data.push({ lessonTime: lessonTimeAtHour });

      const lessonTimeAtHalfHour = new Date(day);
      lessonTimeAtHalfHour.setUTCHours(hour - 10, 30, 0, 0); // Set minutes to 30
      data.push({ lessonTime: lessonTimeAtHalfHour });
    }
  }
}

export default data;

console.log(data);
