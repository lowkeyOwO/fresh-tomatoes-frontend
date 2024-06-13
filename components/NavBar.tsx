"use client";

import icon from "@/public/Images/icon.png";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Token } from "@/functions/getUsername";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Home, MenuIcon, Search, Settings, User2 } from "lucide-react";
import Link from "next/link";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

interface TokenObj {
  username: Token;
  avatarURL: string;
}
export default function NavBar(params: TokenObj) {
  const router = useRouter();
  const Logout = () => {
    deleteCookie("fresh_tomatoes_auth_token");
    router.replace("/");
  };
  if (params.username === undefined) {
    Logout();
  }

  const searchMovie = () => {
    router.push("/search");
  };
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <nav
      className={`w-full p-2 flex flex-row items-center justify-between top-0 z-50 absolute pb-0`}
    >
      <div onClick={() => router.replace("/home")}>
        <Image
          src={icon}
          alt="FRESH TOMATOES"
          className="w-32 py-4 left-0"
        ></Image>
      </div>
      <div className="flex flex-row items-center justify-between p-4 gap-16">
        <Input
          id="search"
          type="text"
          placeholder="Develop your film roll"
          className="hidden md:block mr-0 mt-0 w-80 text-black font-bold"
          onChange={(e) => setSearchValue(e.target.value)}
          searchButton={
            <button
              onClick={() => searchMovie()}
              className="absolute text-black mr-2 hidden md:block"
            >
              <Search />
            </button>
          }
        ></Input>
        <Sheet>
          <SheetTrigger asChild>
            <div className="flex flex-row items-center gap-4">
              <Avatar className="mr-0 md:mr-0">
                <AvatarImage src={params.avatarURL} />
                <AvatarFallback className="text-black font-bold uppercase">
                  {params.username?.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <h1 className="hidden md:block text-black md:text-white -mt-8 md:mt-0 font-bold">
                {params.username}
              </h1>
            </div>
          </SheetTrigger>
          <SheetContent className="w-screen md:w-[20%] bg-gray-900 border-l border-gray-900 text-gray-300 flex flex-col pt-16 gap-4  items-center">
            <Input
              id="search"
              type="text"
              placeholder="Develop your film roll"
              className="block md:hidden text-black font-bold"
              onChange={(e) => setSearchValue(e.target.value)}
              searchButton={
                <button
                  onClick={() => searchMovie()}
                  className="block md:hidden text-black absolute mr-4"
                >
                  <Search />
                </button>
              }
            ></Input>
            <Link
              href={`/home`}
              className="flex flex-row gap-8 text-2xl items-center justify-center font-semibold  hover:bg-green-300 w-full p-1 rounded-md hover:text-gray-900 py-4"
            >
              <Home className="h-8 w-8" />
              Home
            </Link>
            <Link
              href={`/profile/${params.username}`}
              className="flex flex-row gap-8 text-2xl items-center justify-center font-semibold  hover:bg-green-300 w-full p-1 rounded-md hover:text-gray-900 py-4"
            >
              <User2 className="h-8 w-8" /> Profile
            </Link>
            <Link
              href={`/settings`}
              className="flex flex-row gap-8 text-2xl items-center justify-center font-semibold  hover:bg-green-300 w-full p-1 rounded-md hover:text-gray-900 py-4"
            >
              <Settings className="h-8 w-8" /> Settings
            </Link>
            <SheetFooter className="h-full w-full flex items-end">
              <SheetClose asChild>
                <Button
                  onClick={Logout}
                  className="bg-red-600 hover:bg-red-700 w-full"
                >
                  Logout
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
