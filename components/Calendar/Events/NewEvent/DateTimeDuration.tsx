'use client'

import { DatePicker } from "@/components/custom/Locale/DatePicker";
import DurationSelection from "@/components/custom/Locale/DurationSelect";
import TimeSelect from "@/components/custom/Locale/TimeSelect";
import { Label } from "@/components/ui/label";
import { useEventStore } from "@/store/events/eventStore";

function DateTimeDuration() {
  const { dateSelected, timeSelected, durationSelected } = useEventStore();

  const eventSummary = () => {
    // Format the date for better readability
    const formattedDate = dateSelected ? new Date(dateSelected).toDateString() : "";

    return `This event will take place on ${formattedDate}${timeSelected ? ` at ${timeSelected}` : ""}${durationSelected ? `, for ${durationSelected}` : ""}.`;
  };

  return (
    <div className="w-full flex flex-col justify-between">
      <div className="w-full flex items-center justify-between">
        {/* Date Picker */}
        <DatePicker />

        {/* Time Selection (24HR format) */}
        <TimeSelect />

        {/* Duration (HH:MM) */}
        <DurationSelection />
      </div>
      {dateSelected && (
        <Label className="font-medium text-sm text-gray-500 mt-2">
          {eventSummary()}
        </Label>
      )}
    </div>
  );
}

export default DateTimeDuration;
