import styled from "styled-components";
import type { AvailableTimeSlots } from "../types/slots.type";
import { convertTimeIntToItsCorrespondingSlotFormat } from "../utils/convert-slots";
import { TimeSlotInfo } from "../utils/slots";

interface IProps {
  availableSlots: AvailableTimeSlots;
  destinationTimezoneOffset: string;
  selectedTimeSlot: TimeSlotInfo;
  onSlotChange: (slot: TimeSlotInfo) => void;
}

/** */
const AvailableTimeSlotsList = ({
  availableSlots,
  destinationTimezoneOffset,
  selectedTimeSlot,
  onSlotChange,
}: IProps) => {
  // const [selectedSlot, setSelectedSlot] = useState<TimeSlot>();

  /** */
  const selectSlotHandler = (_selectedSlot: TimeSlotInfo) => {
    // setSelectedSlot(_selectedSlot.slot);
    onSlotChange(_selectedSlot);
  };

  return (
    <SlotsContainer>
      {availableSlots.slotsInfo.map((record) => (
        <TimeItem
          key={record.slot}
          isSelected={selectedTimeSlot.slot === record.slot}
          isAvailable={record.isAvailable}
          onClick={() => selectSlotHandler(record)}
          title={record.isAvailable ? "Available" : "Not Available"}
        >
          {convertTimeIntToItsCorrespondingSlotFormat(
            record.slot,
            destinationTimezoneOffset,
          )}
        </TimeItem>
      ))}
    </SlotsContainer>
  );
};

export default AvailableTimeSlotsList;

const SlotsContainer = styled.div`
  max-height: 22rem;
  overflow-y: auto;
  scroll-behavior: smooth;
  padding-right: 2rem;

  @media screen and ((min-width: 769px)) {
    margin-left: 3rem;
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

const TimeItem = styled.button<{ isSelected: boolean; isAvailable: boolean }>`
  width: 10rem;
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
    if (props.isSelected) {
      return {
        backgroundColor: "#007bff",
        color: "#FFF",
        borderColor: "#007bff",
      };
    }

    if (!props.isAvailable) {
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
    border-width: ${(props) => (props.isAvailable ? "3px" : "1px")};
  }
`;
