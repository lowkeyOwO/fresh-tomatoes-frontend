"use client";

import NavBar from "@/components/NavBar";
import { useQuery } from "@tanstack/react-query";
import getUsername from "@/functions/getUsername";
import Loading from "./loading";
import { getCookie } from "cookies-next";
import { createContext, useContext } from "react";

const UserNameContext = createContext(null);

export const useUsernameData = () => {
  return useContext(UserNameContext);
};
export default function Layout({ children }: { children: React.ReactNode }) {
  const { data, isLoading } = useQuery<any>({
    queryKey: ["profileData"],
    queryFn: () =>
      getUsername(getCookie(process.env.NEXT_PUBLIC_FTATOKEN || "error")),
  });
  if (isLoading || !data) {
    return <Loading />;
  } else {
    return (
      <>
        <NavBar
          username={data.userDetails.userExists.username}
          avatarURL={
            process.env.NEXT_PUBLIC_AVATARURL +
            data.userDetails.userExists.avatar_path
          }
        />
        <UserNameContext.Provider value={data.userDetails.userExists.username}>
          <div className="w-full">{children}</div>
        </UserNameContext.Provider>
      </>
    );
  }
}
