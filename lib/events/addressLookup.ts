"use server";

import axios from "axios";

interface GeocodingResult {
  name: string;
  lat?: number;
  lng?: number;
  placeId: string;
}

export async function lookupPlace(query: string) {
  if (!query) {
    return new Error("Search query is required");
  }

  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(query)}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data.predictions) {
      const places = data.predictions.map((prediction: any) => ({
        name: prediction.description,
        placeId: prediction.place_id,
      }));
      return places;
    } else {
      return new Error("No places found");
    }
  } catch (error) {
    console.error("Error fetching place data:", error);
    return new Error("Failed to fetch place data");
  }
}

export async function getCoordinates(placeId: string) {
  if (!placeId) {
    return new Error("placeId parameter is required");
  }

  const url = `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;

  try {
    const response = await axios.get(url);
    const data = response.data;
    // console.log(data);

    if (data.results && data.results[0]) {
      const coords = data.results[0].geometry.location;
      const formattedAddress = data.results[0].formatted_address;
      return { coords, formattedAddress };
    } else {
      return new Error("Coordinates not found");
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    return new Error("Failed to fetch coordinates");
  }
}
