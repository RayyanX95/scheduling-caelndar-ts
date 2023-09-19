import { TimeSlot } from "../types/slots.type";
import { TimeSlotInfo } from "./slots";

/**
 * Convert time slot and offset format to number
 * @param timeSlot time slot or offset
 */
export const convertTimeFormatToNumber = (time: TimeSlot | string) => {
  if (!validateTimeAndOffsetFormat(time)) {
    throw new Error(
      `Something went wrong when processing the time slot or timezone: ${time}`,
    );
  }

  const [hours, minutes] = time.split(":").map(Number);
  return hours + minutes / 60;
};

/**
 * Adjust time slot value after adding/subtracting the given timezone offset
 * The time slot value is being changed according to the timezone offset
 * @param timeSlot The time slot
 * @param offset The timezone offset
 */
export const adjustTimeSlotForGivenTimezoneOffset = (
  timeSlot: TimeSlot,
  offset = "00:00",
) => {
  if (!timeSlot) {
    return "";
  }

  const timeSlotNumber = convertTimeFormatToNumber(timeSlot);
  const offsetNumber = convertTimeFormatToNumber(offset);
  const calculatedTimeAfterAddingOffset = (timeSlotNumber + offsetNumber) % 24;

  const adjustedHours = Math.trunc(calculatedTimeAfterAddingOffset + 24) % 24;
  const adjustedMinutes = Math.trunc(
    ((calculatedTimeAfterAddingOffset + 60) % 1) * 60,
  );
  const formattedAdjustedTime = `${adjustedHours
    .toString()
    .padStart(2, "0")}:${adjustedMinutes.toString().padStart(2, "0")}`;

  return formattedAdjustedTime;
};

/**
 * Validate the format is in time or offset format ([-/+]hh:mm)
 */
export const validateTimeAndOffsetFormat = (offset: TimeSlot | string) => {
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

/**
 * Check if time slot is selected
 * @param selectedTimeSlots selected multi-slots
 * @param timeSlot time slot record to check if selected
 */
export const isTimeSlotSelected = (
  timeSlot: TimeSlotInfo,
  selectedTimeSlots: TimeSlotInfo[],
) => {
  const index = selectedTimeSlots.findIndex(
    (slot) => slot.slot === timeSlot.slot,
  );

  if (index !== -1) {
    return true;
  }

  return false;
};
