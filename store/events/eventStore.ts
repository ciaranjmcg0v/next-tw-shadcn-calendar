import { create } from "zustand";

interface EventState {
  // Event Name and Description
  eventName: string;
  description: string;
  setEventName: (name: string) => void;
  setDescription: (description: string) => void;

  // Event Date and Time
  dateSelected: Date | undefined;
  timeSelected: string | undefined;
  durationSelected: string | undefined;
  setDateSelected: (date: Date) => void;
  setTimeSelected: (time: string) => void;
  setDurationSelected: (duration: string) => void;

  // Location
  openMap: boolean;
  videoMeeting: boolean;
  videoMeetingType: string;
  videoMeetingUrl: string;
  setOpenMap: (value: boolean) => void;
  setVideoMeeting: (value: boolean) => void;
  setVideoMeetingType: (value: string) => void;
  setVideoMeetingUrl: (url: string) => void;

  // Map Location
  placeName: string;
  coordinates: { lat: number; lng: number } | null;
  setPlaceName: (name: string) => void;
  setCoordinates: (coords: { lat: number; lng: number }) => void;

  // Guests
  guestEmail: string | undefined;
  setGuestEmail: (email: string) => void;
  guestPhoto: string | undefined;
  setGuestPhoto: (photo: string) => void;
  guestList: Guest[]; // Update type from `[]` to `Guest[]` for more specificity
  setGuestList: (guest: Guest) => void; // Update to accept a single guest object
  clearGuestList: () => void; // Clear all guest

  // Notification And Reminders
  selectedReminderMethod: string | null;
  setReminderMethod: (reminderMethod: string) => void;

  selectedReminderTime: string | null;
  setReminderTime: (reminderTime: string) => void;

  hasTimeAndMethod: boolean;
  reminderConfirmed: boolean;
  setReminderConfirmed: (confirmed: boolean) => void;

  // Event Attachments (File Uploads etc...)
  attachments: File[];
  addAttachment: (file: File) => void;
  removeAttachment: (fileName: string) => void;
}

export const useEventStore = create<EventState>((set) => ({
  // Event Name and Description
  eventName: "",
  description: "",
  setEventName: (name) => set({ eventName: name }),
  setDescription: (description) => set({ description }),

  // Event Date and Time
  dateSelected: undefined,
  timeSelected: undefined,
  durationSelected: undefined,
  setDateSelected: (date: Date) => set({ dateSelected: date }),
  setTimeSelected: (time: string) => set({ timeSelected: time }),
  setDurationSelected: (duration: string) =>
    set({ durationSelected: duration }),

  // Location
  openMap: false,
  videoMeeting: false,
  videoMeetingType: "",
  videoMeetingUrl: "",
  setOpenMap: (value) => set({ openMap: value }),
  setVideoMeeting: (value) => set({ videoMeeting: value }),
  setVideoMeetingType: (value) => set({ videoMeetingType: value }),
  setVideoMeetingUrl: (url) => set({ videoMeetingUrl: url }),

  // Map Location
  placeName: "",
  coordinates: null,
  setPlaceName: (name: string) => set({ placeName: name }),
  setCoordinates: (coords: { lat: number; lng: number }) =>
    set({ coordinates: coords }),

  // Guests
  guestEmail: undefined,
  guestPhoto: undefined,
  guestList: [],
  setGuestPhoto: (photo: string) => set({ guestPhoto: photo }),
  setGuestEmail: (email: string) => set({ guestEmail: email }),
  setGuestList: (newGuest: Guest) =>
    set((state) => ({
      guestList: [...state.guestList, newGuest], // Properly append the new guest to the list
    })),
  clearGuestList: () => set({ guestList: [] }), // Clear the list of guests

  // Notification And Reminders
  selectedReminderMethod: null,
  setReminderMethod: (reminderMethod) =>
    set((state) => {
      const hasTimeAndMethod = !!reminderMethod && !!state.selectedReminderTime;
      return {
        selectedReminderMethod: reminderMethod,
        hasTimeAndMethod,
      };
    }),
  selectedReminderTime: null,
  setReminderTime: (reminderTime) =>
    set((state) => {
      const hasTimeAndMethod = !!state.selectedReminderMethod && !!reminderTime;
      return {
        selectedReminderTime: reminderTime,
        hasTimeAndMethod,
      };
    }),

  hasTimeAndMethod: false,
  reminderConfirmed: false,
  setReminderConfirmed: (confirmed) => set({ reminderConfirmed: confirmed }),

  // Event Attachments (File Uploads etc...)
  attachments: [],

  addAttachment: (file) =>
    set((state) => ({
      attachments: [...state.attachments, file],
    })),

  removeAttachment: (fileName) =>
    set((state) => ({
      attachments: state.attachments.filter((file) => file.name !== fileName),
    })),
}));
