"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEventStore } from "@/store/events/eventStore";
import { Minus } from "lucide-react";
import { useState } from "react";

/* Event Name and Description */

function NameAndDescription() {
  const { eventName, description, setEventName, setDescription } =
    useEventStore();
  const [addDescription, setAddDescription] = useState<boolean>(false);

  return (
    <div className="w-full flex flex-col justify-between">
      <Label className="mb-2 ml-1 text-xs">Event Name</Label>
      {/* Event Name Input with 'Add Description' button */}
      <div className="relative">
        <Input
          type="text"
          className="bg-gray-100 outline-none border-none h-[2.5rem]"
          placeholder="Enter event name"
          value={eventName || ""}
          onChange={(e) => setEventName(e.target.value)}
        />
        {!addDescription && (
          <Button
            className="absolute top-0 bottom-0 right-2 h-[1.8rem] my-auto bg-gray-500 text-white dark:bg-gray-300 dark:text-black"
            onClick={() => setAddDescription(true)}
          >
            Add Description
          </Button>
        )}
      </div>
      {addDescription && (
        <div className="w-full flex flex-col my-4">
          <div className="flex items-center justify-between">
            <Label className="mb-2 ml-1 text-xs">Description</Label>
            <Minus
              className="w-4 h-6 hover:text-red-600 cursor-pointer"
              onClick={() => setAddDescription(false)}
            />
          </div>
          {/* TODO: Open Dialog to allow for larger textarea input */}
          <Textarea
            cols={2}
            className="bg-gray-200 outline-none border-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      )}
    </div>
  );
}
export default NameAndDescription;
