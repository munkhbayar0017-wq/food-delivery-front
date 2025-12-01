import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CartIcon from "../Icons/CartIcon";
import WhiteCartIcon from "../Icons/WhiteCartIcon";
import { useState, useEffect } from "react";
import axios from "axios";
import FoodsMap from "./FoodsMap";

export function OrderDetail({ orderItems }) {
  const [active, setActive] = useState("Cart");
  const [foods, setFoods] = useState([]);

  const handleClickOrderButton = () => {
    setActive("Order");
  };
  const handleClickCartButton = () => {
    setActive("Cart");
  };
  const fetchFoods = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:168/food/foodId/${id}`
      );
      setFoods(response.data);
      console.log("orderItems", orderItems);
      console.log("id", id);
      console.log("responseeeeee yaj harah ve", response.data);
      console.log("responseeeeee yaj harah ve", foods);
    } catch (error) {
      console.error("failed the fetch food", error);
    }
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchFoods();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foods]);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="w-9 h-9 rounded-full flex items-center justify-center bg-[#FFFFFF] cursor-pointer hover:bg-gray-300 hover:text-black transition-colors duration-200">
          <CartIcon />
        </div>
      </SheetTrigger>
      <SheetContent className="bg-[#404040] w-[535px] rounded-l-2xl p-8">
        <SheetHeader>
          <div className="flex gap-3 items-center">
            <WhiteCartIcon />
            <SheetTitle className="text-[#FAFAFA] font-inter text-[20px] font-semibold leading-7 tracking-[-0.5px]">
              Order detail
            </SheetTitle>
          </div>
        </SheetHeader>
        <div className="w-full h-11 bg-[#FFFFFF] rounded-full flex items-center justify-center gap-2 p-1">
          <div
            onClick={handleClickCartButton}
            className={`h-9 w-full rounded-full flex justify-center items-center font-inter text-[18px] font-normal leading-7 transition-colors duration-200 cursor-pointer ${
              active === "Cart"
                ? "bg-[#EF4444] text-white"
                : "text-[#09090B] bg-white"
            }`}
          >
            Cart
          </div>
          <div
            onClick={handleClickOrderButton}
            className={`h-9 w-full rounded-full flex justify-center items-center font-inter text-[18px] font-normal leading-7 transition-colors duration-200 cursor-pointer ${
              active === "Order"
                ? "bg-[#EF4444] text-white"
                : "text-[#09090B] bg-white"
            }`}
          >
            Order
          </div>
        </div>
        <div className="grid flex-1 auto-rows-min gap-6 px-4 bg-white rounded-[20px]">
          <SheetTitle className="text-[#71717A] font-inter text-[20px] font-semibold leading-7 tracking-[-0.5px]">
            My cart
          </SheetTitle>
          {foods.map((food) => (
            <FoodsMap
              key={food._id}
              food={food}
              categories={categories}
              onUpdated={fetchFoods}
              onDeleted={fetchFoods}
            />
          ))}
          <div className="grid gap-3">
            <Label
              htmlFor="sheet-demo-name"
              className="text-[#71717A] font-inter text-[20px] font-semibold leading-7 tracking-[-0.5px]"
            >
              Delivery location
            </Label>
            <Input
              id="sheet-demo-name"
              placeholder="Please share your complete address"
              className="h-20"
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Checkout</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
