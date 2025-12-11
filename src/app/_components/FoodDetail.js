import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import RedPlusIcon from "../Icons/RedPlusIcon";
import MinusIcon from "../Icons/MinusIcon";
import BlackPlusIcon from "../Icons/BlackPlusIcon";
import { useState, useEffect } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import CheckedIcon from "../Icons/CheckedIcon";

export function FoodDetail({
  foodName,
  price,
  ingredients,
  image,
  foodId,
  orderItems,
  setOrderItems,
  fetchAllFoods,
}) {
  const [count, setCount] = useState(1);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const exists = orders.some((item) => item.food === foodId);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsChecked(exists);
    // fetchAllFoods();
  }, [fetchAllFoods, foodId]);

  const handleClickMinusButton = () => {
    if (count === 1) {
      return;
    }
    setCount(count - 1);
  };

  const handleClickPlusButton = () => {
    setCount(count + 1);
  };

  const handleClickAddToCartButton = () => {
    setOrderItems((prev) => [...prev, { food: foodId, quantity: count }]);
    localStorage.setItem(
      "orders",
      JSON.stringify([...orderItems, { food: foodId, quantity: count }])
    );
    setIsChecked(true);
    toast.success("Food is being added to the cart!");
  };

  return (
    <Dialog
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          setCount(1);
        }
      }}
    >
      <form>
        {isChecked ? (
          <div className="absolute flex items-center justify-center rounded-full z-10 h-11 w-11 bg-[#18181B] cursor-pointer">
            <CheckedIcon />
          </div>
        ) : (
          <DialogTrigger asChild>
            <div className="absolute flex items-center justify-center rounded-full z-10 h-11 w-11 bg-[#FFFFFF] cursor-pointer">
              <RedPlusIcon />
            </div>
          </DialogTrigger>
        )}

        <DialogContent className="flex gap-6 w-[826px] h-[412px]">
          <div className="relative w-[377px] h-[364px] rounded-xl">
            <Image
              src={image}
              alt={foodName}
              fill
              className="object-cover rounded-xl"
            />
          </div>
          <div className="flex flex-col justify-between pt-7">
            <DialogHeader className="flex flex-col gap-3">
              <DialogTitle className="text-red-500 font-inter text-[24px] font-semibold leading-8 tracking-[-0.6px]">
                {foodName}
              </DialogTitle>
              <DialogDescription className="text-[#09090B] font-inter text-sm font-normal leading-5 max-w-[377px]">
                {ingredients}
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-6">
              <div className="flex justify-between">
                <div>
                  <div>Total price</div>
                  <div className="text-[#09090B] font-inter text-[24px] font-semibold leading-7">
                    {price}₮
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    className={`flex items-center justify-center w-11 h-11 rounded-full border cursor-pointer transition${
                      count === 1
                        ? "bg-white border-[#D4D4D8] cursor-not-allowed"
                        : "bg-white border-[#09090B] hover:bg-[#F4F4F5]"
                    }`}
                    onClick={handleClickMinusButton}
                    disabled={count === 1}
                  >
                    <MinusIcon />
                  </button>
                  <div className="text-[#09090B] font-inter text-[18px] font-semibold leading-7 flex items-center justify-center">
                    {count}
                  </div>
                  <button
                    className="flex items-center justify-center w-11 h-11 bg-white border border-[#09090B] cursor-pointer rounded-full hover:bg-[#F4F4F5] transition"
                    onClick={handleClickPlusButton}
                  >
                    <BlackPlusIcon />
                  </button>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    type="submit"
                    className="w-[377px] h-11 rounded-full cursor-pointer"
                    onClick={handleClickAddToCartButton}
                  >
                    Add to cart
                  </Button>
                </DialogClose>
              </DialogFooter>
            </div>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
}
