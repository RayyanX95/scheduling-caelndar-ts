import { TimeSlot } from "../types/slots.type";

/** */
const convertTimeSlotFormatToIntegerNumber = (
  timeSlot: TimeSlot,
  offset: string,
) => {
  const timeSlotInt =
    Number(timeSlot.toString().split(":")[0]) +
    Number(timeSlot.toString().split(":")[1]) / 60;

  const offsetInt =
    Number(offset.split(":")[0]) + Number(offset.split(":")[1]) / 60;

  return timeSlotInt + offsetInt;
};

/** */
export const convertTimeIntToItsCorrespondingSlotFormat = (
  selectedSlot: TimeSlot,
  offset = "00:00",
) => {
  if (!selectedSlot) {
    return "";
  }

  if (!validateTimeOffset(offset)) {
    offset = "00:00";
  }

  const timeInt =
    convertTimeSlotFormatToIntegerNumber(selectedSlot, offset) % 24;

  return `${Math.trunc((timeInt + 24) % 24)
    .toString()
    .padStart(2, "0")}:${(((timeInt + 60) % 1) * 60)
    .toString()
    .padStart(2, "0")}`;
};

/** */
const validateTimeOffset = (offset: string) => {
  // Regular expression to match the desired formats
  const regex = /^([-+])?(\d{1,2}):(\d{1,2})$/;

  return regex.test(offset);
};

/** */
export const getLastDateOfNextTwoMonths = () => {
  const currentDate = new Date();
  const nextTwoMonths = new Date(
    currentDate.setMonth(currentDate.getMonth() + 2),
  );
  const lastDayOfNextTwoMonths = new Date(
    nextTwoMonths.getFullYear(),
    nextTwoMonths.getMonth() + 1,
    0,
  );

  console.log("lastDayOfNextTwoMonths", lastDayOfNextTwoMonths);
  return lastDayOfNextTwoMonths;
};
