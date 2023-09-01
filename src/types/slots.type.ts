/* eslint-disable @typescript-eslint/naming-convention */
import { TimeSlotInfo } from "../utils/slots";

export interface Timezone {
  name: string;
  offset: string;
}

export type TimeSlot = TimeSlotInfo["slot"];

export interface AvailableTimeSlots {
  slotsInfo: TimeSlotInfo[];
  timezone: Timezone;
}
