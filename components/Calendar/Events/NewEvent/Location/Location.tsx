"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import generateVideoMeetingUrl from "@/lib/events/generateVideoMeetingUrl";
import { useEventStore } from "@/store/events/eventStore";
import { XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import AddressDialog from "./AddressDialog";

function Location() {
  const {
    videoMeeting,
    videoMeetingType,
    videoMeetingUrl,
    setVideoMeeting,
    setVideoMeetingType,
    setVideoMeetingUrl,
    placeName,
    setPlaceName,
  } = useEventStore();

  useEffect(() => {
    console.log(placeName);
  }, [placeName]);

  // const { searchPlace } = usePlaceSearch();
  // const [query] = useState("");

  const handleCreateMeeting = async (meetingType: string) => {
    setVideoMeetingType(meetingType);
    // Assume generateVideoMeetingUrl is a function that returns a promise with the meeting URL
    const url = await generateVideoMeetingUrl(meetingType);
    setVideoMeeting(true);
    setVideoMeetingUrl(url);
  };

  return (
    <div className="w-full flex flex-col justify-between my-2">
      <Label className="mb-2 ml-1 text-xs">Location</Label>
      {/* Event Location Input with 'Open Map' button */}
      <div className="relative">
        <Input
          type="text"
          className="bg-gray-100 outline-none border-none h-[2.5rem] text-xs"
          placeholder="Enter location"
          value={placeName ? placeName : ""}
          disabled={!placeName}
        />
        <div className="absolute top-0 bottom-0 right-2 flex items-center justify-between space-x-2">
          {!placeName && (
            <>
              <AddressDialog />
              {!videoMeeting && (
                <DropdownMenu>
                  <DropdownMenuTrigger className="h-[1.8rem] w-fit my-auto bg-gray-500 text-white dark:bg-gray-300 dark:text-black rounded-md px-1 text-xs">
                    Create Meeting
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white">
                    <DropdownMenuItem
                      className="flex items-center cursor-pointer text-sm hover:bg-gray-100"
                      onClick={() => handleCreateMeeting("Google Meet")}
                    >
                      <Image
                        width="16"
                        height="16"
                        src="https://img.icons8.com/color/16/google-meet--v1.png"
                        alt="google-meet--v1"
                      />{" "}
                      <span className="ml-4">Google Meet</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="flex items-center cursor-pointer text-sm hover:bg-gray-100"
                      onClick={() => handleCreateMeeting("Microsoft Teams")}
                    >
                      <Image
                        width="16"
                        height="16"
                        src="https://img.icons8.com/fluency/16/microsoft-teams-2019.png"
                        alt="microsoft-teams-2019"
                      />{" "}
                      <span className="ml-4">Teams</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="flex items-center cursor-pointer text-sm hover:bg-gray-100"
                      onClick={() => handleCreateMeeting("Zoom")}
                    >
                      <Image
                        width="16"
                        height="16"
                        src="https://img.icons8.com/color/16/zoom.png"
                        alt="zoom"
                      />{" "}
                      <span className="ml-4">Zoom</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="flex items-center cursor-pointer text-sm hover:bg-gray-100"
                      onClick={() => handleCreateMeeting("Skype")}
                    >
                      <Image
                        width="16"
                        height="16"
                        src="https://img.icons8.com/fluency/16/skype.png"
                        alt="skype"
                      />{" "}
                      <span className="ml-4">Skype</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="flex items-center cursor-pointer text-sm hover:bg-gray-100"
                      onClick={() => handleCreateMeeting("Test")}
                    >
                      <Image
                        width="16"
                        height="16"
                        src="https://img.icons8.com/fluency/16/000000/video-message.png"
                        alt="video-message"
                      />{" "}
                      <span className="ml-4">Test</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </>
          )}
          {placeName && (
            <div
              title="Clear and choose another location"
              onClick={() => setPlaceName("")}
            >
              <XIcon className="w-6 h-6 text-red-500 hover:text-red-700 cursor-pointer" />
            </div>
          )}
        </div>
      </div>

      {videoMeetingUrl && (
        <div className="flex items-center justify-between px-2">
          <span className="text-xs">
            {`A ${videoMeetingType} video meeting has been created and can be accessed here:`}{" "}
            <br />
            <Link
              href={videoMeetingUrl}
              target="_blank"
              className="text-xs font-semibold text-violet-800"
            >
              {videoMeetingUrl}
            </Link>
          </span>
          {videoMeetingUrl && (
            <XIcon
              className="w-4 h-4 hover:text-red-600 cursor-pointer"
              onClick={() => {
                setVideoMeeting(false);
                setVideoMeetingUrl("");
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default Location;
