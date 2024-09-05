import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEventStore } from "@/store/events/eventStore";
import { Timer } from "lucide-react";

function DurationSelection() {
  const { durationSelected, setDurationSelected } = useEventStore();

  /* Function to generate duration options */
  const generateDurations = () => {
    const durations = [];

    // Minutes: 15, 30, 45
    for (let minute = 15; minute <= 45; minute += 15) {
      durations.push(`${minute} minute${minute > 1 ? "s" : ""}`);
    }

    // Hours: 1 to 24
    for (let hour = 1; hour <= 24; hour++) {
      durations.push(`${hour} hour${hour > 1 ? "s" : ""}`);
    }

    // Days: 1 to 7
    for (let day = 1; day <= 7; day++) {
      durations.push(`${day} day${day > 1 ? "s" : ""}`);
    }

    // Ongoing duration for anything longer than 7 days
    durations.push("Ongoing");

    return durations;
  };

  return (
    <div className="flex flex-col justify-between my-4">
      <Label className="mb-2 text-xs">Duration</Label>
      <div className="">
        <Select
          value={durationSelected}
          onValueChange={(selectedDuration) =>
            setDurationSelected(selectedDuration)
          }
        >
          <SelectTrigger className="w-full border-none bg-gray-100 rounded-lg text-xs">
            <SelectValue placeholder="Select duration" />
            <Timer className="ml-6 w-4 h-4 text-gray-500" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-gray-700">
            {generateDurations().map((duration, index) => (
              <SelectItem key={index} value={duration}>
                {duration}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default DurationSelection;
