"use client";

import LogoIcon from "../Icons/LogoIcon";
import UserIcon from "../Icons/UserIcon";
import { AddDeliveryAddress } from "../_components/AddDeliveryAddress";
import { OrderDetail } from "../_components/OrderDetail";
import { useState, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";

export function Header() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const emailLS = localStorage.getItem("email");
    const tokenLS = localStorage.getItem("token");

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEmail(emailLS || "");
    setToken(tokenLS || "");
  }, []);

  const logOutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("location");
    localStorage.removeItem("orders");
    localStorage.removeItem("role");
    window.location.reload();
  };

  const logInUser = () => {
    router.push("/login");
  };

  const signUpUser = () => {
    router.push("/signup");
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
          <Popover>
            <PopoverTrigger asChild>
              <div className="w-9 h-9 rounded-full flex items-center justify-center bg-[#EF4444] cursor-pointer hover:bg-red-600 transition-colors duration-200">
                <UserIcon />
              </div>
            </PopoverTrigger>
            {token ? (
              <PopoverContent className="w-[188px] h-[104px] flex flex-col items-center justify-center gap-2">
                <div className="flex items-center truncate text-[#09090B] text-center font-inter text-[16px] font-semibold leading-7 tracking-[-0.5px] w-[156px]">
                  {email}
                </div>
                <div
                  onClick={logOutUser}
                  className="flex items-center justify-center bg-[#F4F4F5] rounded-full w-20 h-9 text-[#18181B] font-inter text-[14px] font-medium leading-5  hover:bg-gray-300 hover:text-black transition-colors duration-200 cursor-pointer"
                >
                  Sign out
                </div>
              </PopoverContent>
            ) : (
              <PopoverContent className="w-[100px] h-[104px] flex flex-col items-center justify-center gap-2">
                <div
                  onClick={logInUser}
                  className="flex items-center justify-center bg-[#F4F4F5] rounded-full w-20 h-9 text-[#18181B] font-inter text-[14px] font-medium leading-5  hover:bg-gray-300 hover:text-black transition-colors duration-200 cursor-pointer"
                >
                  Log in
                </div>
                <div
                  onClick={signUpUser}
                  className="flex items-center justify-center bg-[#F4F4F5] rounded-full w-20 h-9 text-[#18181B] font-inter text-[14px] font-medium leading-5  hover:bg-gray-300 hover:text-black transition-colors duration-200 cursor-pointer"
                >
                  Sign up
                </div>
              </PopoverContent>
            )}
          </Popover>
        </div>
      </div>
    </div>
  );
}
