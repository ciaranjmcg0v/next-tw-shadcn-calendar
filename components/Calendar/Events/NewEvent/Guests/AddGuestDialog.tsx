import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useEventStore } from "@/store/events/eventStore";
import { useEffect } from "react";

function AddGuestDialog({ email }: { email: string }) {
  const GuestProfileImage =
    "https://onedrive.live.com/embed?resid=6E65D15292C05867%212516807&authkey=%21AF80oeZfAUYcuTM&height=2208&width=1242";

  const { setGuestEmail, setGuestPhoto, guestList, setGuestList } =
    useEventStore();

  useEffect(() => {
    console.log(`Updated guest list: ${JSON.stringify(guestList)}`);
  }, [guestList]);

  const handleAddGuestToEvent = () => {
    // Set guest email and photo
    setGuestEmail(email);
    setGuestPhoto(GuestProfileImage);

    // Create a guest object
    const newGuest = {
      email: email,
      photo: GuestProfileImage,
    };

    // Add the guest to the guest list
    setGuestList(newGuest);

    // Log the new guest (not the guestList) since guestList state update is asynchronous
    console.log(`guest added: ${JSON.stringify(newGuest)}`);
  };

  return (
    <Dialog>
        <DialogTrigger className="bg-gray-500 text-white dark:bg-gray-300 dark:text-black rounded-md px-2">
          Add
        </DialogTrigger>
        <DialogContent className="bg-white">
          <DialogDescription id="dialog-description">
            This dialog allows you to add a Guest to the event.
          </DialogDescription>
          <DialogHeader>
            <DialogTitle className="mb-6">Confirm Guest to Add</DialogTitle>
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-start space-x-4">
                <Avatar>
                  <AvatarImage src={GuestProfileImage} />
                  <AvatarFallback>{email.slice(0, 1)}</AvatarFallback>
                </Avatar>
                <Label>{email}</Label>
              </div>
              <div>
                <Button onClick={handleAddGuestToEvent}>Add</Button>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
  );
}

export default AddGuestDialog;
