import { create } from 'zustand';

interface LocaleState {
  dateSelected: Date | undefined;
  timeSelected: string | undefined;
  durationSelected: string | undefined;
  setDateSelected: (date: Date) => void;
  setTimeSelected: (time: string) => void;
  setDurationSelected: (duration: string) => void;
}

const useLocaleStore = create<LocaleState>((set) => ({
  dateSelected: undefined,
  timeSelected: undefined,
  durationSelected: undefined,
  setDateSelected: (date: Date) => set({ dateSelected: date }),
  setTimeSelected: (time: string) => set({ timeSelected: time }),
  setDurationSelected: (duration: string) =>
    set({ durationSelected: duration }),
}));

export default useLocaleStore;
