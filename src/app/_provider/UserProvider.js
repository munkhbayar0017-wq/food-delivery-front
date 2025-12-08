"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useContext, createContext } from "react";

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
  //   const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setToken(token);
    // setLoading(true);
  }, [router]);

  //   if (loading) return <div>...loading</div>;

  return (
    <UserContext.Provider value={{ token }}>{children}</UserContext.Provider>
  );
}
