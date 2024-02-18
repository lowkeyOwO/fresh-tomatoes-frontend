"use client";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import getUsername from "@/functions/getUsername";
import Loading from "./loading";
import { getCookie } from "cookies-next";
import GetFavoriteMovies from "@/components/GetFavoriteMovies";
export default function Layout({ children }: { children: React.ReactNode }) {
  const { data, isLoading } = useQuery<any>({
    queryKey: ["profileData"],
    queryFn: () => getUsername(getCookie("fresh_tomatoes_auth_token")),
  });
  if (isLoading || !data) {
    return <Loading />;
  } else {
    if (data.newUser === true) {
      return 
        <GetFavoriteMovies/>
    } else {
      return (
        <>
          <NavBar username={data.userExists.username} />
          <main>{children}</main>
          <Footer />
        </>
      );
    }
  }
}
