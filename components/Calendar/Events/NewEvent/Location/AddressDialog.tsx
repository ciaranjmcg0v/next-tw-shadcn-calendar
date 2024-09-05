import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import usePlaceSearch from "@/hooks/usePlaceSearch";
import { getCoordinates } from "@/lib/events/addressLookup";
import { useEventStore } from "@/store/events/eventStore";
import { useState } from "react";
import MapLookup from "./MapLookup";

function AddressDialog() {
  const { results, searchPlace } = usePlaceSearch();
  const {
    placeName,
    coordinates,
    setCoordinates,
    setPlaceName,
    openMap,
    setOpenMap,
  } = useEventStore();
  const [query, setQuery] = useState("");
  const [returnedAddress, setReturnedAddress] = useState<string>("");

  const handleSearch = () => {
    searchPlace(query);
  };

  const handleGetCoordinates = async (placeId: string) => {
    const result = await getCoordinates(placeId);

    if (result instanceof Error) {
      console.error(result.message);
      // Handle the error case appropriately here, maybe set an error state or show a message to the user
      return;
    }

    // Destructure only if result is not an Error
    const {
      coords: { lat, lng },
      formattedAddress,
    } = result;

    setReturnedAddress(formattedAddress);
    setCoordinates({ lat, lng });
    console.log({ lat, lng });
    setOpenMap(true);
  };

  const handleSetMapLocation = () => {
    setOpenMap(false);
    setPlaceName(returnedAddress);
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger className="h-[1.8rem] my-auto bg-gray-500 text-white dark:bg-gray-300 dark:text-black rounded-md px-2 text-xs">
          Open Map
        </DialogTrigger>
        <DialogContent className="bg-gray-100 h-fit">
          <DialogDescription id="dialog-description">
            This dialog allows you to select an address.
          </DialogDescription>
          <DialogHeader>
            <DialogTitle>Enter an address to search</DialogTitle>
            <div className="w-full h-fit flex flex-col">
              <div className="flex items-center justify-between space-x-2">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for a place"
                  className="w-full p-2 border rounded-md"
                />
                <Button
                  className="bg-gray-500 text-white dark:bg-gray-300 dark:text-black"
                  onClick={handleSearch}
                >
                  Search
                </Button>
              </div>
              {!openMap && results?.length > 0 && (
                <ul className="bg-white border rounded-md mt-2 shadow-lg">
                  {results.map((result, index) => (
                    <li
                      key={index}
                      className="p-2 cursor-pointer hover:bg-gray-200"
                      onClick={() => handleGetCoordinates(result.placeId)}
                    >
                      {result.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {openMap && (
              <MapLookup
                lat={coordinates?.lat}
                lng={coordinates?.lng}
                name={placeName}
              />
            )}
          </DialogHeader>
          {openMap && returnedAddress && (
            <div className="flex flex-col items-center justify-between">
              <div className="mt-4">
                <p className="text-sm text-gray-800">
                  Selected Place: {returnedAddress}
                </p>
              </div>
              <Button
                className="w-full mt-4 bg-green-600 text-white dark:bg-green-800 dark:text-gray-300 hover:bg-green-900"
                onClick={handleSetMapLocation}
              >
                Confirm Location
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default AddressDialog;
