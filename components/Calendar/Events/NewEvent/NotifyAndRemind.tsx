"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { generateTimeIntervals } from "@/lib/events/generateTimeIntervals";
import { useEventStore } from "@/store/events/eventStore";
import { CheckCircle2, Trash2Icon } from "lucide-react";

function NotifyAndRemind() {
  const intervals = generateTimeIntervals();
  const {
    selectedReminderTime,
    selectedReminderMethod,
    setReminderTime,
    setReminderMethod,
    hasTimeAndMethod,
    reminderConfirmed,
    setReminderConfirmed,
  } = useEventStore();

  // console.log(hasTimeAndMethod, selectedReminderTime, selectedReminderMethod);

  const handleRemoveReminder = () => {
    setReminderConfirmed(false);
    setReminderTime("");
    setReminderMethod("");
  };

  return (
    <div className="mt-4 w-full flex flex-col items-center justify-start space-x-4">
      <div className="w-full flex items-center justify-between space-x-4">
        {/* Notification */}
        <div className="flex flex-col">
          <span className="text-sm">Notification</span>
          <Tabs defaultValue="email">
            <TabsList>
              <TabsTrigger
                value="email"
                onClick={() => setReminderMethod("Email")}
              >
                Email
              </TabsTrigger>
              <TabsTrigger value="sms" onClick={() => setReminderMethod("SMS")}>
                SMS
              </TabsTrigger>
              <TabsTrigger
                value="discord"
                onClick={() => setReminderMethod("Discord")}
              >
                Discord
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Set Reminder */}
        <div className="flex flex-col">
          <span className="text-sm">Set Reminder</span>
          <Select onValueChange={(value) => setReminderTime(value)}>
            <SelectTrigger className="flex items-center bg-gray-100 space-x-4">
              <SelectValue placeholder="Set Reminder" />
            </SelectTrigger>
            <SelectContent>
              {intervals.map((interval, index) =>
                interval.value ? (
                  <SelectItem
                    key={index}
                    value={interval.value}
                    className="cursor-pointer my-1"
                  >
                    <span>{interval.label}</span>
                  </SelectItem>
                ) : (
                  <div key={index} className="select-header p-1 cursor-pointer">
                    {interval.label}
                  </div>
                )
              )}
            </SelectContent>
          </Select>
        </div>

        {/* Reminder Confirmation */}
        {hasTimeAndMethod && (
          <div className="flex flex-col">
            <span className="text-xs">Confirm Reminder</span>
            <div className="flex items-center space-x-4">
              <CheckCircle2
                className={`w-5 h-5 cursor-pointer ${
                  reminderConfirmed ? "text-green-500" : "text-gray-200"
                }`}
                onClick={() => setReminderConfirmed(true)}
              />
              {reminderConfirmed && (
                <Trash2Icon
                  className="w-5 h-5 cursor-pointer text-red-600"
                  onClick={handleRemoveReminder}
                />
              )}
            </div>
          </div>
        )}
      </div>

      {hasTimeAndMethod && (
        <span className="w-full text-left text-xs mt-2">
          You will be notified{" "}
          <span className="text-indigo-600 font-semibold">
            {selectedReminderMethod === "Email" && "by email, "}
          </span>
          <span className="text-indigo-600 font-semibold">
            {selectedReminderMethod === "SMS" && "via SMS, "}
          </span>
          <span className="text-indigo-600 font-semibold">
            {selectedReminderMethod === "Discord" && "on Discord, "}{" "}
          </span>
          <span className="font-bold">{selectedReminderTime}</span> before the
          event is due to start. Please confirm above.
        </span>
      )}
    </div>
  );
}
export default NotifyAndRemind;
