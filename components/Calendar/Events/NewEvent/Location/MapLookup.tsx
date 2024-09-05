import {
  AdvancedMarker,
  APIProvider,
  Map,
  // MapCameraChangedEvent,
  Pin,
} from "@vis.gl/react-google-maps";

interface GeocodingResult {
  name: string;
  lat?: number;
  lng?: number;
  //   placeId: string;
}

type Poi = { key: string; location: google.maps.LatLngLiteral };

export default function MapLookup({ lat, lng, name }: GeocodingResult) {
  const locations: Poi[] = [{ key: name, location: { lat: lat!, lng: lng! } }];

  const PoiMarkers = (props: { pois: Poi[] }) => {
    return (
      <>
        {props.pois.map((poi: Poi) => (
          <AdvancedMarker key={poi.key} position={poi.location}>
            <Pin
              background={"#FBBC04"}
              glyphColor={"#000"}
              borderColor={"#000"}
            />
          </AdvancedMarker>
        ))}
      </>
    );
  };

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <div className="h-56">
        <Map
          defaultZoom={15}
          defaultCenter={{ lat: lat!, lng: lng! }}
          mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID!}
          // onCameraChanged={(ev: MapCameraChangedEvent) =>
          //   console.log(
          //     "camera changed:",
          //     ev.detail.center,
          //     "zoom:",
          //     ev.detail.zoom
          //   )
          // }
        >
          <PoiMarkers pois={locations} />
        </Map>
      </div>
    </APIProvider>
  );
}
