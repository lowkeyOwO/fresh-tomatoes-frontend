"use client";

import { createContext, useContext } from "react";
import NavBar from "@/components/NavBar";
import { useQuery } from "@tanstack/react-query";
import getUsername from "@/functions/getUsername";
import Loading from "./loading";
import { getCookie } from "cookies-next";

const ProfileDataContext = createContext(null);

export const useProfileData = () => {
  return useContext(ProfileDataContext);
};
export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: profileData, isLoading } = useQuery<any>({
    queryKey: ["profileData"],
    queryFn: () =>
      getUsername(getCookie(process.env.NEXT_PUBLIC_FTATOKEN || "error")),
  });

  if (
    isLoading ||
    !profileData ||
    !profileData.userDetails ||
    !profileData.userDetails.userExists
  ) {
    return <Loading />;
  } else {
    return (
      <>
        <NavBar
          username={profileData.userDetails.userExists.username}
          avatarURL={
            process.env.NEXT_PUBLIC_AVATARURL +
            profileData.userDetails.userExists.avatar_path
          }
        />
        <ProfileDataContext.Provider value={profileData}>
          <div className="w-full">{children}</div>
        </ProfileDataContext.Provider>
      </>
    );
  }
}
