"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useContext, createContext } from "react";
import { Header } from "../layout/Header";
import { Skeleton } from "@/components/ui/skeleton";
import { Footer } from "../layout/Footer";

const AdminContext = createContext(null);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used inside <AdminProvider>");
  }
  return context;
};

export default function AdminProvider({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("");

  useEffect(() => {
    const role = localStorage.getItem("role");
    // console.log("role", role);
    const isAdmin = role === "ADMIN";

    if (!isAdmin) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRole(role);
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="flex flex-col">
        <Header />
        <div className="w-screen bg-[#404040] flex flex-col items-center justify-center">
          <Skeleton className="w-[1440px] h-[570px]" />
          <div className="flex flex-col gap-[54px] p-22">
            <Skeleton className="w-[250px] h-9 rounded-full" />
            <div className="grid grid-cols-3 gap-13 ">
              <div className="flex flex-col space-y-3">
                <Skeleton className="h-[210px] w-[365px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
              <div className="flex flex-col space-y-3">
                <Skeleton className="h-[210px] w-[365px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
              <div className="flex flex-col space-y-3">
                <Skeleton className="h-[210px] w-[365px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[54px] p-22">
            <Skeleton className="w-[250px] h-9 rounded-full" />
            <div className="grid grid-cols-3 gap-13 ">
              <div className="flex flex-col space-y-3">
                <Skeleton className="h-[210px] w-[365px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
              <div className="flex flex-col space-y-3">
                <Skeleton className="h-[210px] w-[365px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
              <div className="flex flex-col space-y-3">
                <Skeleton className="h-[210px] w-[365px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[54px] p-22">
            <Skeleton className="w-[250px] h-9 rounded-full" />
            <div className="grid grid-cols-3 gap-13 ">
              <div className="flex flex-col space-y-3">
                <Skeleton className="h-[210px] w-[365px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
              <div className="flex flex-col space-y-3">
                <Skeleton className="h-[210px] w-[365px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
              <div className="flex flex-col space-y-3">
                <Skeleton className="h-[210px] w-[365px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <AdminContext.Provider value={{ role }}>{children}</AdminContext.Provider>
  );
}
