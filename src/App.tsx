/* eslint-disable require-jsdoc */
import { useState } from "react";
import styled from "styled-components";

import "./App.css";
import SchedulingCalendar from "./components/scheduling-calendar";
import { TIME_SLOTS, TimeSlotInfo } from "./utils/slots";
import { AvailableTimeSlots } from "./types/slots.type";
import { ChangeEvent } from "react";
import moment from "moment-timezone";
import MultiSchedulingCalendar from "./components/multi-scheduling-calendar";

const AVAILABLE_SLOTS: AvailableTimeSlots = {
  slotsInfo: [...TIME_SLOTS].slice(0, 12),
  timezone: {
    name: "Africa/Cairo",
    offset: "+03:00",
  },
};

const MULTI_AVAILABLE_SLOTS: AvailableTimeSlots = {
  slotsInfo: [...TIME_SLOTS],
  timezone: {
    name: "Africa/Cairo",
    offset: "+03:00",
  },
};

const currentTimeZone = moment.tz(moment.tz.guess()).format("Z");

console.log(moment.tz.guess());

console.log(currentTimeZone);

/** */
const App = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMultiDate, setSelectedMultiDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState({} as TimeSlotInfo);
  const [selectedMultiTimeSlots, setSelectedMultiTimeSlots] = useState(
    [] as TimeSlotInfo[],
  );
  const [selectedTimezone, setSelectedTimezone] = useState(currentTimeZone);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handleSingleSlotChange = (timeSlot: TimeSlotInfo) => {
    if (!timeSlot.isAvailable) {
      return;
    }

    setSelectedTimeSlot(timeSlot);
  };

  const handleMultiDateChange = (date: Date) => {
    setSelectedMultiDate(date);
  };

  const handleMultiSlotChange = (timeSlot: TimeSlotInfo) => {
    if (!timeSlot.isAvailable) {
      return;
    }

    setSelectedMultiTimeSlots((multiTimeSlots) => [
      ...multiTimeSlots,
      timeSlot,
    ]);
  };

  /**
   * Handle timezone select
   */
  const handleTimezoneChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedTimezone(event.target.value);
  };

  const calendarProps = {
    className: "react-calendar-overwrites",
    minDate: new Date(),
    maxDate: new Date("2023-10-30"),
  };

  return (
    <div>
      <Heading>Single-Select Calendar</Heading>
      <Container>
        <SchedulingCalendar
          onDateChange={handleDateChange}
          calendarProps={calendarProps}
          availableSlots={AVAILABLE_SLOTS}
          onSlotChange={handleSingleSlotChange}
          onTimeZoneChange={handleTimezoneChange}
          destinationTimezone={selectedTimezone}
          selectedTimeSlot={selectedTimeSlot}
        />
        {/* <div>
        <h2>Selected Date:</h2>
        <p>{selectedDate.toDateString()}</p>
        <h2>Selected (Mentor) Time:</h2>
        <p>{selectedTimeSlot.slot}</p>
        <h2>Selected (User) Time:</h2>
        <p>
          {convertTimeIntToItsCorrespondingSlotFormat(
            selectedTimeSlot.slot,
            selectedTimezone,
          )}
        </p>
      </div> */}
      </Container>
      <Heading>Multi-Select Calendar</Heading>
      <Container>
        <MultiSchedulingCalendar
          onDateChange={handleMultiDateChange}
          calendarProps={calendarProps}
          availableSlots={MULTI_AVAILABLE_SLOTS}
          onSlotChange={handleMultiSlotChange}
          onTimeZoneChange={handleTimezoneChange}
          destinationTimezone={selectedTimezone}
          selectedTimeSlot={selectedMultiTimeSlots}
        />
        {/* <div>
        <h2>Selected Date:</h2>
        <p>{selectedDate.toDateString()}</p>
        <h2>Selected (Mentor) Time:</h2>
        <p>{selectedTimeSlot.slot}</p>
        <h2>Selected (User) Time:</h2>
        <p>
          {convertTimeIntToItsCorrespondingSlotFormat(
            selectedTimeSlot.slot,
            selectedTimezone,
          )}
        </p>
      </div> */}
      </Container>
    </div>
  );
};

export default App;

const Container = styled.div`
  padding: 1rem 0.2rem;
  display: flex;
  justify-content: center;
`;

const Heading = styled.h3`
  text-align: center;
`;
