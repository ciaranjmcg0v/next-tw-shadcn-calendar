import { getCoordinates, lookupPlace } from "@/lib/events/addressLookup";
import useMapStore from "@/store/events/mapStore";
import { useState } from "react";

interface GeocodingResult {
  name: string;
  lat?: number;
  lng?: number;
  placeId: string;
}

const usePlaceSearch = () => {
  const [results, setResults] = useState<GeocodingResult[]>([]);

  const searchPlace = async (query: string) => {
    if (!query) {
      setResults([]);
      return;
    }

    try {
      const response = await lookupPlace(query);
      console.log(response);
      setResults(response);
    } catch (error) {
      console.error("Error fetching place data:", error);
    }
  };

  const selectPlace = async (place: string) => {
    try {
      const response = await getCoordinates(place);
      console.log(response);

      //   if (data.lat && data.lng) {
      //     setPlaceName(place.name);
      //     setCoordinates({ lat: data.lat, lng: data.lng });
      //   }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    } finally {
      setResults([]);
    }
  };

  return {
    results,
    searchPlace,
    selectPlace,
  };
};

export default usePlaceSearch;
