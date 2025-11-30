"use client";

import LocationIcon from "../Icons/LocationIcon";
import LogoIcon from "../Icons/LogoIcon";
import { useRouter } from "next/navigation";
import ChevronRightIcon from "../Icons/ChevronRightIcon";
import CartIcon from "../Icons/CartIcon";

export function Header() {
  const router = useRouter();
  const handleClickSignupButton = () => {
    router.push("/signup");
  };

  const handleClickLoginButton = () => {
    router.push("/login");
  };

  return (
    <div className="w-screen bg-[#18181B] flex items-center justify-center">
      <div className="w-[1440px] bg-[#18181B] flex justify-between items-center py-3 px-[88px]">
        <div className="flex items-center gap-2">
          <LogoIcon />
          <div className="flex flex-col items-center">
            <p className="text-[#FAFAFA] font-inter text-[18px] font-semibold leading-7">
              NymNym
            </p>
            <p className="text-[#71717A] font-inter text-[12px] font-normal leading-4">
              Swift delivery
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="bg-[#FFFFFF] rounded-full flex gap-1 items-center justify-center h-9 py-2 px-3">
            <LocationIcon />
            <div className="text-red-500 font-inter text-xs font-normal leading-4">
              Delivery address:
            </div>
            <div className="text-[#71717A] font-inter text-xs font-normal leading-4">
              Add Location
            </div>
            <ChevronRightIcon />
          </div>
          <div>
            <CartIcon />
          </div>
          <div></div>
          {/* <button
            className="w-[75px] h-9 bg-[#F4F4F5] text-[#18181B] rounded-full font-inter text-[14px] font-medium leading-5 cursor-pointer hover:bg-gray-300 hover:text-black transition-colors duration-200"
            onClick={handleClickSignupButton}
          >
            Sign up
          </button>
          <button
            className="w-[65px] h-9 bg-[#EF4444] text-[#FAFAFA] rounded-full font-inter text-[14px] font-medium leading-5 cursor-pointer hover:bg-red-600 transition-colors duration-200"
            onClick={handleClickLoginButton}
          >
            Log in
          </button> */}
        </div>
      </div>
    </div>
  );
}
