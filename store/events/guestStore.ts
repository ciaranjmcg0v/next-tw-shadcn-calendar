import { create } from "zustand";

interface GuestState {
  guestEmail: string | undefined;
  setGuestEmail: (email: string) => void;
  guestPhoto: string | undefined;
  setGuestPhoto: (photo: string) => void;
  guestList: Guest[]; // Update type from `[]` to `Guest[]` for more specificity
  setGuestList: (guest: Guest) => void; // Update to accept a single guest object
  clearGuestList: () => void; // Clear all guest
}

const useGuestStore = create<GuestState>((set) => ({
  guestEmail: undefined,
  guestPhoto: undefined,
  guestList: [],
  setGuestPhoto: (photo: string) => set({ guestPhoto: photo }),
  setGuestEmail: (email: string) => set({ guestEmail: email }),
  setGuestList: (guest: Guest) =>
    set((state) => ({ guestList: [...state.guestList, guest] })), // Add the new guest to the list
  clearGuestList: () => set({ guestList: [] }) // Clear the list of guests
}));

export default useGuestStore;
