import { useEventStore } from "@/store/events/eventStore";

export default function useEventData() {
  const {
    eventName,
    description,
    dateSelected,
    timeSelected,
    durationSelected,
    videoMeeting,
    videoMeetingType,
    videoMeetingUrl,
    placeName,
    guestList,
    selectedReminderTime,
    selectedReminderMethod,
    attachments,
  } = useEventStore();

  // Custom function to calculate and format the event start time
  const calculateStartTime = (): string => {
    if (!dateSelected) return "";

    const formattedDate = new Date(dateSelected).toDateString();
    const eventStart = `This event will take place on ${formattedDate}${
      timeSelected ? ` at ${timeSelected}` : ""
    }${durationSelected ? `, for ${durationSelected}` : ""}.`;
    return eventStart;
  };

  // Custom function to calculate the event end time based on start time and duration
  const calculateEndTime = (): string => {
    if (!dateSelected || !timeSelected || !durationSelected) return "";

    const [hours, minutes] = timeSelected.split(":").map(Number);
    const startTime = new Date(dateSelected);
    startTime.setHours(hours, minutes);

    const duration = parseInt(durationSelected, 10);
    if (isNaN(duration)) {
      throw new RangeError("Invalid duration value");
    }

    const endTime = new Date(startTime.getTime() + duration * 60000).toISOString();
    return endTime.slice(0, 19).replace("T", " ");
  };

  // Custom function to get location information
  const getLocationInfo = (): string => {
    if (videoMeeting) {
      return `Video Conference: ${videoMeetingType} - ${videoMeetingUrl}`;
    }
    return placeName || "";
  };

  // Custom function to get guest information
  const getGuestInfo = () => {
    return guestList
      ? guestList.map((guest) => ({
          email: guest.email,
          photo: guest.photo,
        }))
      : [];
  };

  // Calculate the event start and end times
  const eventStart = calculateStartTime();
  const eventEnd = calculateEndTime();

  // Check if a reminder is set
  const hasTimeAndMethod = Boolean(selectedReminderTime && selectedReminderMethod);

  // Get the event location
  const location = getLocationInfo();

  // Get the list of guests
  const guests = getGuestInfo();

  // Check for any attachments
  const hasAttachments = attachments.length > 0;

  // Construct the final event information object
  const eventInfo = {
    title: eventName || "",
    description: description || "",
    start: eventStart,
    end: eventEnd,
    allDay: durationSelected && durationSelected.length > 23,
    reminderSet: hasTimeAndMethod,
    location: location,
    guests: guests,
    attachments: hasAttachments,
  };

  return eventInfo;
}
