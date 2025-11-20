import { Badge } from "@/components/ui/badge";
import PlusIcon from "@/app/Icons/PlusIcon";
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
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import FileIcon from "@/app/Icons/FileIcon";

export default function Foods() {
  return (
    <div className="flex flex-col w-full border rounded-xl p-6 gap-4 bg-[#FFFFFF]">
      <div className="text-[#09090B] font-inter text-[20px] font-semibold leading-7 tracking-[-0.5px]">
        Appetizers (6)
      </div>

      <Dialog>
        <form>
          <DialogTrigger asChild>
            <div className="w-[270px] h-[241px] border border-dashed border-red-500 rounded-xl flex flex-col gap-6 items-center justify-center">
              <Badge
                className="h-9 w-9 rounded-full flex items-center justify-center"
                variant="destructive"
              >
                <PlusIcon />
              </Badge>
              <div className="w-[145px] text-[#18181B] text-center font-inter text-[14px] font-medium leading-5">
                Add new Dish to Appetizers
              </div>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add new Dish to Appetizers</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="flex gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="name-1">Food name</Label>
                  <Input id="name-1" name="name" placeholder="Type food name" />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="name-1">Food price</Label>
                  <Input id="name-1" name="name" placeholder="Enter price..." />
                </div>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="username-1">Ingredients</Label>
                <Input
                  id="username-1"
                  name="username"
                  placeholder="List ingredients..."
                  className="h-[90px] pt-2 text-start placeholder:text-start"
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="image">Food image</Label>
                <label
                  htmlFor="image"
                  className="h-[200px] border-2 border-dashed border-[#2563EB]/50 bg-[#2563EB]/20 rounded-lg flex flex-col items-center justify-center gap-3 cursor-pointer"
                >
                  <div className="w-8 h-8 flex items-center bg-[#FFFFFF] rounded-full justify-center">
                    <FileIcon />
                  </div>
                  <p className="text-gray-600 text-center">
                    Choose a file or drag & drop it here
                  </p>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                  />
                </label>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Add Dish</Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}
