import { ChangeEvent } from "react";
import moment from "moment-timezone";

import "./style.css";

const TARGET_TIMEZONES = [
  "Europe/Berlin",
  "Europe/London",
  "Europe/Amsterdam",
  "Africa/Cairo",
  "America/Los_Angeles",
];

const TIMEZONES = TARGET_TIMEZONES.map((timezone) => ({
  name: timezone,
  offset: moment.tz(timezone).format("Z"),
}));

/** */
const TimezoneDropdown = ({
  selectedTimezoneOffset,
  handleTimezoneChange,
}: {
  selectedTimezoneOffset: string;
  handleTimezoneChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}) => {
  return (
    <div className="timezone-dropdown">
      <select value={selectedTimezoneOffset} onChange={handleTimezoneChange}>
        <option value="">Select a timezone...</option>
        {TIMEZONES.map((timezone) => (
          <option
            key={timezone.name}
            value={timezone.offset}
            data-name={timezone.name}
          >
            {`${timezone.name} (GMT${timezone.offset})`}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TimezoneDropdown;
