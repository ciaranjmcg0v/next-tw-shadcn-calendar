import { XCircleIcon } from "lucide-react"

  /* Title bar and Close Icon */
function TitleSection() {
  return (
    <div className="w-full flex items-center justify-between mb-4 pb-2 border-b">
      <h3 className="text-md">New Event</h3>
      <XCircleIcon className="h-4 w-4 hover:text-red-600 cursor-pointer" />
    </div>
  );
}
export default TitleSection;
