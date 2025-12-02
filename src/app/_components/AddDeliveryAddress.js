import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import LocationIcon from "../Icons/LocationIcon";
import ChevronRightIcon from "../Icons/ChevronRightIcon";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export function AddDeliveryAddress() {
  const [location, setLocation] = useState("");

  useEffect(() => {
    const savedLocation = localStorage.getItem("location");
    if (savedLocation) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLocation(savedLocation);
    }
  }, []);

  const handleClickDeliverHereButton = () => {
    if (location.trim() !== "") {
      localStorage.setItem("location", location);
      toast.success("Delivery address saved!");
    }
  };
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <div className="bg-[#FFFFFF] rounded-full flex gap-1 items-center justify-center h-9 py-2 px-3 cursor-pointer hover:bg-gray-300 hover:text-black transition-colors duration-200">
            <LocationIcon />
            <div className="text-red-500 font-inter text-xs font-normal leading-4">
              Delivery address:
            </div>
            {location === "" ? (
              <div className="text-[#71717A] font-inter text-xs font-normal leading-4">
                Add Location
              </div>
            ) : (
              <div className="text-[#71717A] font-inter text-xs font-normal leading-4">
                {location}
              </div>
            )}
            <ChevronRightIcon />
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] ">
          <DialogHeader>
            <DialogTitle>Please write your delivery address!</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Input
                id="name-1"
                name="name"
                placeholder="Please share your complete address"
                className="h-20"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter className="flex justify-end">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit" onClick={handleClickDeliverHereButton}>
                Deliver Here
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
