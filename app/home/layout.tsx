"use client";

import NavBar from "@/components/NavBar";
import { useQuery } from "@tanstack/react-query";
import getUsername from "@/functions/getUsername";
import Loading from "./loading";
import { getCookie } from "cookies-next";
export default function Layout({ children }: { children: React.ReactNode }) {
  const { data, isLoading } = useQuery<any>({
    queryKey: ["profileData"],
    queryFn: () => getUsername(getCookie("fresh_tomatoes_auth_token")),
  });
  if (isLoading || !data) {
    return <Loading />;
  }  else {
    if (data.newUser === true) {
      return <h1> HAVE TO GET DETAILS FROM USER OR SKIP</h1>
    } else {
      document.title = "Home";
      return (
        <>
          <NavBar
            username={data.userDetails.userExists.username}
            avatarURL={
              process.env.NEXT_PUBLIC_AVATARURL +
              data.userDetails.userExists.avatar_path
            }
          />
          <div>{children}</div>
        </>
      );
    }
  }
}
