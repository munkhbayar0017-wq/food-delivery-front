"use client";

import TruckIcon from "../Icons/TruckIcon";
import LogoIcon from "../Icons/LogoIcon";
import MenuIcon from "../Icons/MenuIcon";

export function SlideBar() {
  return (
    <div className="w-[205px] h-screen border flex flex-col items-center gap-10 px-5 py-9">
      <div className="flex gap-2">
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
        <button className="w-[165px] h-10  flex gap-2.5 items-center justify-center rounded-full border">
          <MenuIcon />
          <p className="text-[#09090B] font-inter text-[14px] font-medium leading-5 flex items-center justify-center">
            Food menu
          </p>
        </button>
        <button className="w-[165px] h-10 flex gap-2.5 items-center justify-center bg-[#09090B] rounded-full">
          <TruckIcon />
          <p className=" text-[#FAFAFA] font-inter text-[14px] font-medium leading-5">
            Orders
          </p>
        </button>
      </div>
    </div>
  );
}
