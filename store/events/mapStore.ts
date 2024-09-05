import { create } from 'zustand';

interface MapState {
  placeName: string;
  coordinates: { lat: number; lng: number } | null;
  setPlaceName: (name: string) => void;
  setCoordinates: (coords: { lat: number; lng: number }) => void;
}

const useMapStore = create<MapState>((set) => ({
  placeName: '',
  coordinates: null,
  setPlaceName: (name: string) => set({ placeName: name }),
  setCoordinates: (coords: { lat: number; lng: number }) => set({ coordinates: coords }),
}));

export default useMapStore;
