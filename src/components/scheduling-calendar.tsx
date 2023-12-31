import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./custom-styles.css";
import styled from "styled-components";
import AvailableTimeSlotsList from "./available-time-slots.tsx";
import TimezoneDropdown from "./timezones-dropdown.tsx";
import { AvailableTimeSlots } from "../types/slots.type.ts";
import { ChangeEvent } from "react";
import { TimeSlotInfo } from "../utils/slots.ts";

interface IProps {
  availableSlots: AvailableTimeSlots;
  calendarProps: object;
  destinationTimezone: string;
  selectedTimeSlot: TimeSlotInfo[];
  onDateChange: (value: any) => void;
  onSlotChange: (slot: TimeSlotInfo) => void;
  onTimeZoneChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

/** */
const SchedulingCalendar = ({
  availableSlots,
  calendarProps,
  destinationTimezone,
  selectedTimeSlot: selectedTimeSlots,
  onDateChange,
  onSlotChange,
  onTimeZoneChange,
}: IProps) => {
  return (
    <Container>
      <Grid>
        <Calendar onChange={onDateChange} {...calendarProps} />
        <DropdownContainer>
          <TimezoneDropdown
            handleTimezoneChange={onTimeZoneChange}
            selectedTimezoneOffset={destinationTimezone}
          />
        </DropdownContainer>
      </Grid>

      <AvailableTimeSlotsList
        availableSlots={availableSlots}
        destinationTimezoneOffset={destinationTimezone}
        onSlotChange={onSlotChange}
        selectedTimeSlots={selectedTimeSlots}
      />
    </Container>
  );
};

export default SchedulingCalendar;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 2rem 1.5rem;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);
  gap: 2rem;
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;

const DropdownContainer = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
`;
