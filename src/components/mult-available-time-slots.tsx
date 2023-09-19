import styled from "styled-components";
import type { AvailableTimeSlots } from "../types/slots.type";
import { TimeSlotInfo } from "../utils/slots";
import { isTimeSlotSelected } from "../utils/convert-slots";

interface IProps {
  availableSlots: AvailableTimeSlots;
  selectedTimeSlots: TimeSlotInfo[];
  onSlotChange: (slot: TimeSlotInfo) => void;
}

/**
 * Multi (select) available time slots list
 */
const MultiAvailableTimeSlotsList = ({
  availableSlots,
  selectedTimeSlots,
  onSlotChange,
}: IProps) => {
  // eslint-disable-next-line lines-around-comment
  /**
   * Select slot handler
   */
  const selectSlotHandler = (selectedSlot: TimeSlotInfo) => {
    onSlotChange(selectedSlot);
  };

  return (
    <SlotsContainer>
      {availableSlots.slotsInfo.map((record) => {
        return (
          <TimeItem
            key={record.slot}
            selected={isTimeSlotSelected(record, selectedTimeSlots)}
            available={record.isAvailable}
            onClick={() => selectSlotHandler(record)}
            title={record.isAvailable ? "Available" : "Not Available"}
          >
            {record.slot}
          </TimeItem>
        );
      })}
    </SlotsContainer>
  );
};

export default MultiAvailableTimeSlotsList;

const SlotsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: auto;
  gap: 0.3rem;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding-right: 1rem;

  @media screen and ((min-width: 769px)) {
    width: 400px;
  }

  /* scrollbar for webkit-based browsers (Chrome, Safari) */
  &::-webkit-scrollbar {
    width: 10px;
    background-color: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }

  /* Edged ends for webkit-based browsers */
  &::-webkit-scrollbar-corner {
    background: #f1f1f1;
  }

  /* scrollbar for Firefox */
  scrollbar-width: thin;
  scrollbar-color: #888 #f1f1f1;

  > button {
    margin-bottom: 0.3rem;
  }
`;

const TimeItem = styled.button<{ selected: boolean; available: boolean }>`
  width: 23%;
  height: 3rem;
  border-radius: 0.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-sizing: border-box;
  font-weight: bold;
  border: 1px solid #007bff;
  background-color: #fff;
  color: #007bff;

  ${(props) => {
    if (props.selected) {
      return {
        backgroundColor: "#007bff",
        color: "#FFF",
        borderColor: "#007bff",
      };
    }

    if (!props.available) {
      return {
        backgroundColor: "#ddd",
        color: "#999",
        borderColor: "#999",
        cursor: "inherit",
      };
    }
  }}

  &:hover {
    border-width: 3px;
    border-width: ${(props) => (props.available ? "3px" : "1px")};
  }

  @media screen and ((min-width: 769px)) {
    width: 15%;
  }
`;
