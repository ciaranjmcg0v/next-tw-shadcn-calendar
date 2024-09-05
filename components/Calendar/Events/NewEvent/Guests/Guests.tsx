"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEventStore } from "@/store/events/eventStore";
import { Minus, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import AddGuestDialog from "./AddGuestDialog";

function Guests() {
  const [emailToAdd, setEmailToAdd] = useState<string>("");
  const { guestList, clearGuestList } = useEventStore();

  useEffect(() => {
    console.log(`guestList: ${JSON.stringify(guestList)}`);
  }, [guestList]);

  const handleClearGuestList = () => {
    clearGuestList();
    console.log(`Clearing guest list, number of guests: ${guestList.length}`);
    setEmailToAdd("");
  };

  const handleRemoveGuest = () => {
    // TODO: Implement removing a guest from the list
    alert(`Removing guest ${emailToAdd}`);
  };

  return (
    <div className="w-full flex flex-col justify-between">
      <Label className="mb-2 ml-1 text-xs">Guests</Label>
      {/* Event Name Input with 'Has Guests' button */}
      <div className="relative">
        <Input
          type="text"
          className="bg-gray-100 outline-none border-none h-[2.5rem] text-xs"
          placeholder="contact@email.com"
          value={emailToAdd}
          onChange={(e) => setEmailToAdd(e.target.value)}
        />
        <div className="absolute top-0 bottom-0 right-2 h-[1.8rem] my-auto">
          <AddGuestDialog email={emailToAdd} />
        </div>
      </div>

      {/* Render Guest List if it contains guests */}
      {guestList.length > 0 ? (
        <div className="w-full flex flex-col my-4">
          <div className="flex items-center justify-between">
            {/* Map through all guests */}
            <div className="flex items-center justify-start space-x-2 ">
              {guestList.map((g, index) => (
                <div className="relative" key={index}>
                  <Avatar title={g.email} className="bg-gray-500">
                    {g.photo ? (
                      <AvatarImage src={g.photo} />
                    ) : (
                      <AvatarFallback>{g.email[0]}</AvatarFallback>
                    )}
                  </Avatar>

                  <div
                    title="Remove guest"
                    onClick={handleRemoveGuest}
                    className="absolute top-0 right-0 w-3 h-3 cursor-pointer rounded-full bg-gray-600 text-white hover:bg-red-800"
                  >
                    <XIcon className="w-3 h-3" />
                  </div>
                </div>
              ))}
            </div>
            <div title="Clear all guests">
              <Minus
                className="w-4 h-6 hover:text-red-600 cursor-pointer"
                onClick={handleClearGuestList}
              />
            </div>
          </div>
        </div>
      ) : (
        <span className="my-4 text-xs font-semibold">No guests added yet.</span> // Provide fallback text
      )}
    </div>
  );
}
export default Guests;
