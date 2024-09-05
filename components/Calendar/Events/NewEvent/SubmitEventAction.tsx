"use client";

import useEventData from "@/hooks/useEventData";

function SubmitEventAction() {
  const eventInfo = useEventData();

  const handleSubmitEvent = (event: React.FormEvent) => {
    event.preventDefault();

    console.log(eventInfo);
    alert(JSON.stringify(eventInfo));

    // TODO: Add your event submission logic
    //...
    // toast.success("Event added successfully!");
  };

  return (
    <div className="w-full flex items-center justify-between mt-4">
      <button
        className="text-white bg-green-600 hover:bg-green-800 w-full py-2 px-4 rounded-md"
        onClick={handleSubmitEvent}
      >
        Add Event
      </button>
      {/* Add more actions as needed */}
    </div>
  );
}
export default SubmitEventAction;
