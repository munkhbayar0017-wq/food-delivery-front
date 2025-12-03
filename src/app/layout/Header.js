"use client";

import LogoIcon from "../Icons/LogoIcon";
import { useRouter } from "next/navigation";
import CartIcon from "../Icons/CartIcon";
import UserIcon from "../Icons/UserIcon";
import { AddDeliveryAddress } from "../_components/AddDeliveryAddress";
import { OrderDetail } from "../_components/OrderDetail";
import { useState } from "react";

export function Header({ orderItems }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
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
          <AddDeliveryAddress />
          <OrderDetail setOpen={setOpen} open={open} />
          <div className="w-9 h-9 rounded-full flex items-center justify-center bg-[#EF4444] cursor-pointer hover:bg-red-600 transition-colors duration-200">
            <UserIcon />
          </div>
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
