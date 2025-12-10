"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { useEffect, useState, useContext, createContext } from "react";
import LogoIcon from "../Icons/LogoIcon";
import MenuIcon from "../Icons/MenuIcon";
import TruckIcon from "../Icons/TruckIcon";

const UserContext = createContext(null);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used inside <UserProvider>");
  }
  return context;
};

export default function UserProvider({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setToken(token);
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-screen">
        <div className="w-[205px] h-screen sticky top-0 border flex flex-col items-center gap-10 px-5 py-9 bg-[#FFFFFF]">
          <div className="flex gap-2 cursor-pointer">
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
            <button className="w-[165px] h-10 flex gap-2.5 items-center justify-center rounded-full border cursor-pointer bg-[#09090B] text-white">
              <MenuIcon />
              <p className="font-inter text-[14px] font-medium leading-5 flex items-center justify-center">
                Food menu
              </p>
            </button>
            <button className="w-[165px] h-10 flex gap-2.5 items-center justify-center rounded-full cursor-pointer text-[#09090B]">
              <TruckIcon />
              <p className="font-inter text-[14px] font-medium leading-5">
                Orders
              </p>
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center gap-6 p-5 py-15">
          <Skeleton className="w-[1178px] h-44" />
          <Skeleton className="w-[1178px] h-[335px]" />
          <Skeleton className="w-[1178px] h-[335px]" />
          <Skeleton className="w-[1178px] h-[335px]" />
        </div>
      </div>
    );
  }

  return (
    <UserContext.Provider value={{ token }}>{children}</UserContext.Provider>
  );
}
