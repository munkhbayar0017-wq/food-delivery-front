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

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useFoodCategory } from "@/app/_provider/FoodCategory";
import { toast } from "react-toastify";

export function ChangeDeliveryState({ selectedIds }) {
  const [selected, setSelected] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { updateOrderStatus, fetchOrders } = useFoodCategory();

  const getStatusStyle = (status) => {
    const base =
      "rounded-full w-full h-8 flex items-center justify-center text-[12px] font-medium leading-4 cursor-pointer transition-all";

    switch (status) {
      case "DELIVERED":
        return `${base} border border-green-500 bg-green-100 text-green-700`;
      case "PENDING":
        return `${base} border border-red-500 bg-red-100 text-red-700`;
      case "CANCELED":
        return `${base} border border-gray-500 bg-gray-100 text-gray-700`;
      default:
        return `${base} bg-[#F4F4F5] text-[#18181B] hover:bg-gray-200`;
    }
  };

  const handleSave = async () => {
    if (!selected) {
      toast.error("Please select a delivery state");
      return;
    }

    if (!selectedIds || selectedIds.length === 0) {
      toast.error("Please select at least one order");
      return;
    }

    setIsLoading(true);

    try {
      const updatePromises = selectedIds.map((id) =>
        updateOrderStatus(id, selected)
      );

      await Promise.all(updatePromises);

      toast.success(
        `${selectedIds.length} order${
          selectedIds.length > 1 ? "s" : ""
        } updated to ${selected}`
      );

      await fetchOrders();

      setSelected(null);
    } catch (error) {
      console.error("Failed to update orders:", error);
      toast.error("Failed to update some orders");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="ml-auto rounded-full bg-black text-white hover:bg-gray-800"
        >
          Change delivery state <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[364px] h-[200px]">
        <DialogHeader>
          <DialogTitle>
            Change delivery state
            {selectedIds && selectedIds.length > 0 && (
              <span className="text-sm font-normal text-gray-500 ml-2">
                ({selectedIds.length} selected)
              </span>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="flex items-center justify-center gap-4">
          <div
            onClick={() => setSelected("DELIVERED")}
            className={getStatusStyle(
              selected === "DELIVERED" ? "DELIVERED" : null
            )}
          >
            Delivered
          </div>

          <div
            onClick={() => setSelected("PENDING")}
            className={getStatusStyle(
              selected === "PENDING" ? "PENDING" : null
            )}
          >
            Pending
          </div>

          <div
            onClick={() => setSelected("CANCELED")}
            className={getStatusStyle(
              selected === "CANCELED" ? "CANCELED" : null
            )}
          >
            Cancelled
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              onClick={handleSave}
              className="w-full rounded-full"
              type="button"
              disabled={isLoading || !selected || !selectedIds?.length}
            >
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
