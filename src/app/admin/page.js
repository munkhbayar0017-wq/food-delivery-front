"use client";

import TruckIcon from "../Icons/TruckIcon";
import LogoIcon from "../Icons/LogoIcon";
import MenuIcon from "../Icons/MenuIcon";
import { useState } from "react";
import { Order } from "./orders/Order";
import { cn } from "@/lib/utils";
import { Categories } from "./foodmenu/Category";
import { useRouter } from "next/navigation";

export default function Administrator() {
  const [orders, setOrders] = useState(false);
  const router = useRouter();
  const handleClickOrdersButton = () => {
    setOrders(true);
  };
  const handleClickFoodMenuButton = () => {
    setOrders(false);
  };
  const moveToHomePage = () => {
    router.push("/");
  };
  return (
    <div className="flex w-screen gap-6 items-start justify-start bg-[#F4F4F5]">
      <div className="w-[205px] h-screen sticky top-0 border flex flex-col items-center gap-10 px-5 py-9 bg-[#FFFFFF]">
        <div className="flex gap-2 cursor-pointer" onClick={moveToHomePage}>
          <LogoIcon />
          <div>
            <p className="text-[#09090B] font-inter text-[18px] font-semibold leading-7">
              NymNym
            </p>
            <p className="text-[#71717A] font-inter text-[12px] font-normal leading-4">
              Swift delivery
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <button
            className={cn(
              "w-[165px] h-10 flex gap-2.5 items-center justify-center rounded-full border cursor-pointer",
              !orders
                ? "bg-[#09090B] text-white"
                : "bg-white  text-[#09090B] border-none"
            )}
            onClick={handleClickFoodMenuButton}
          >
            <MenuIcon />
            <p className="font-inter text-[14px] font-medium leading-5 flex items-center justify-center">
              Food menu
            </p>
          </button>
          <button
            className={cn(
              "w-[165px] h-10 flex gap-2.5 items-center justify-center rounded-full border cursor-pointer",
              !orders
                ? "bg-white text-[#09090B] border-none"
                : "bg-[#09090B] text-white "
            )}
            onClick={handleClickOrdersButton}
          >
            <TruckIcon />
            <p className="font-inter text-[14px] font-medium leading-5">
              Orders
            </p>
          </button>
        </div>
      </div>
      <div className="py-15">
        {orders && <Order />}
        {!orders && <Categories />}
      </div>
    </div>
  );
}
