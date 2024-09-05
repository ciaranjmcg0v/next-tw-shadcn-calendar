import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEventStore } from "@/store/events/eventStore";
import { Clock } from "lucide-react";

/* Function to display all times of the day in 15-minute intervals (e.g. 00:15, 00:30... 21:30, 21:45) */

function TimeSelect() {
  const { timeSelected, setTimeSelected } = useEventStore();

  const GetTimesOfDay = () => {
    const times = [];
    for (let hour = 0; hour <= 23; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const formattedTime = `${hour < 10 ? "0" + hour : hour}:${minute < 10 ? "0" + minute : minute}`;
        times.push(formattedTime);
      }
    }
    return times;
  };

  return (
    <div className="flex flex-col justify-between my-4">
      <Label className="mb-2 text-xs">Time</Label>
      {/* Select input that maps through the 'times' function */}
      <div className="">
        <Select
          value={timeSelected}
          onValueChange={(selectedTime) => setTimeSelected(selectedTime)}
        >
          <SelectTrigger className="w-full border-none bg-gray-100 rounded-lg text-xs">
            <SelectValue placeholder="What time?" />
            <Clock className="ml-6 w-4 h-4 text-gray-500" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-gray-700 text-xs">
            {GetTimesOfDay().map((time, index) => (
              <SelectItem key={index} value={time}>
                {time}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
export default TimeSelect;
