/* eslint-disable require-jsdoc */
import { useState } from "react";
import styled from "styled-components";

import "./App.css";
import SchedulingCalendar from "./components/scheduling-calendar";
import { TIME_SLOTS, TimeSlotInfo } from "./utils/slots";
import { AvailableTimeSlots } from "./types/slots.type";
import { convertTimeIntToItsCorrespondingSlotFormat } from "./utils/convert-slots";
import { ChangeEvent } from "react";
import moment from "moment-timezone";

const AVAILABLE_SLOTS: AvailableTimeSlots = {
  slotsInfo: [...TIME_SLOTS].slice(0, 12),
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
  const [selectedTimeSlot, setSelectedTimeSlot] = useState({} as TimeSlotInfo);
  const [selectedTimezone, setSelectedTimezone] = useState(currentTimeZone);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handleSlotChange = (timeSlot: TimeSlotInfo) => {
    if (!timeSlot.isAvailable) {
      return;
    }

    setSelectedTimeSlot(timeSlot);
  };

  /** */
  const handleTimezoneChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedTimezone(event.target.value);
  };

  const calendarProps = {
    className: "react-calendar-overwrites",
    minDate: new Date(),
    maxDate: new Date("2023-10-30"),
  };

  return (
    <Container>
      <SchedulingCalendar
        onDateChange={handleDateChange}
        calendarProps={calendarProps}
        availableSlots={AVAILABLE_SLOTS}
        onSlotChange={handleSlotChange}
        onTimeZoneChange={handleTimezoneChange}
        destinationTimezone={selectedTimezone}
        selectedTimeSlot={selectedTimeSlot}
      />
      <div>
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
      </div>
    </Container>
  );
};

export default App;

const Container = styled.div`
  padding: 3rem 0.2rem;
`;
