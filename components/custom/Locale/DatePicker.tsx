"use client";

import { Label } from "@/components/ui/label";
import { useEventStore } from "@/store/events/eventStore";

export function DatePicker() {
  const { dateSelected, setDateSelected } = useEventStore();

  return (
    <div className="flex flex-col justify-between my-4">
      <Label className="mb-2 text-xs">Date</Label>
      <input
        type="date"
        className="w-fit border-none bg-gray-100 rounded-lg p-1"
        onChange={(e) => setDateSelected(new Date(e.target.value))}
      />
    </div>
  );
}
