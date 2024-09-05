import { create } from "zustand";

interface LocationState {
  openMap: boolean;
  videoMeeting: boolean;
  videoMeetingType: string;
  videoMeetingUrl: string;
  setOpenMap: (value: boolean) => void;
  setVideoMeeting: (value: boolean) => void;
  setVideoMeetingType: (value: string) => void;
  setVideoMeetingUrl: (url: string) => void;
}

const useLocationStore = create<LocationState>((set) => ({
  openMap: false,
  videoMeeting: false,
  videoMeetingType: "",
  videoMeetingUrl: "",
  setOpenMap: (value) => set({ openMap: value }),
  setVideoMeeting: (value) => set({ videoMeeting: value }),
  setVideoMeetingType: (value) => set({ videoMeetingType: value }),
  setVideoMeetingUrl: (url) => set({ videoMeetingUrl: url }),
}));

export default useLocationStore;
