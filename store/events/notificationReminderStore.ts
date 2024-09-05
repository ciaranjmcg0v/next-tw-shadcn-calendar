import { create } from "zustand";

interface NotificationReminderState {
  selectedReminderMethod: string | null;
  setReminderMethod: (reminderMethod: string) => void;

  selectedReminderTime: string | null;
  setReminderTime: (reminderTime: string) => void;

  hasTimeAndMethod: boolean;
  reminderConfirmed: boolean;
  setReminderConfirmed: (confirmed: boolean) => void;
}

export const useNotificationReminderStore = create<NotificationReminderState>(
  (set) => ({
    selectedReminderMethod: null,
    setReminderMethod: (reminderMethod) =>
      set((state) => {
        const hasTimeAndMethod =
          !!reminderMethod && !!state.selectedReminderTime;
        return {
          selectedReminderMethod: reminderMethod,
          hasTimeAndMethod,
        };
      }),

    selectedReminderTime: null,
    setReminderTime: (reminderTime) =>
      set((state) => {
        const hasTimeAndMethod =
          !!state.selectedReminderMethod && !!reminderTime;
        return {
          selectedReminderTime: reminderTime,
          hasTimeAndMethod,
        };
      }),

    hasTimeAndMethod: false,
    reminderConfirmed: false,
    setReminderConfirmed: (confirmed) => set({ reminderConfirmed: confirmed }),
  })
);
