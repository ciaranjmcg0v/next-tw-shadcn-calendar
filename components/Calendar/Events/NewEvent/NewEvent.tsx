import DateTimeDuration from "./DateTimeDuration";
import Guests from "./Guests/Guests";
import Location from "./Location/Location";
import NameAndDescription from "./NameAndDescription";
import NotifyAndRemind from "./NotifyAndRemind";
import SubmitEventAction from "./SubmitEventAction";
import TitleSection from "./TitleSection";
import UploadAttachments from "./UploadAttachments";

function NewEvent() {
  return (
    <div className="w-full max-w-xl h-fit flex flex-col items-center justify-between bg-white rounded-lg p-4">
      <TitleSection />
      <NameAndDescription />
      <DateTimeDuration />
      <Location />
      {/* Guests is not displaying guestList properly when a guest is added, otherwise, everything works fine! */}
      <Guests /> 
      <NotifyAndRemind />
      <UploadAttachments />
      <SubmitEventAction />
    </div>
  );
}
export default NewEvent;
