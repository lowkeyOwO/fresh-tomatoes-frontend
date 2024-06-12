"use client";

import icon from "@/public/Images/icon.png";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import {  useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Token } from "@/functions/getUsername";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronsUpDownIcon, MenuIcon, Search, XIcon } from "lucide-react";
import Link from "next/link";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

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
  const [resNav, toggleResNav] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  let resNavClasses = resNav
    ? "w-full h-fit bg-gray-200 fixed z-40 navbar-animation-open centered-col top-20 md:top-0"
    : "centered top-20 md:top-0 h-fit bg-gray-200 md:bg-gray-900 w-full md:relative md:h-auto md:flex";
  let resNavColor = resNav ? "bg-gray-200" : "bg-gray-900";
  return (
    <nav
      className={`bg-gray-200 md:bg-gray-900 w-full  flex flex-col md:flex-row place-items-center justify-between z-50 duration-700 ease-in-out ${resNavColor}`}
    >
      <div className="flex w-full place-items-center justify-between p-2 md:py-2 md:pr-0 md:pl-2">
        <div onClick={() => router.replace("/home")}>
          <Image
            src={icon}
            alt="FRESH TOMATOES"
            className="w-32 py-4 left-0"
          ></Image>
        </div>
        <div className="md:hidden">
          <button onClick={() => toggleResNav(!resNav)}>
            {resNav ? (
              <XIcon className="text-black bar-to-cross" size={48} />
            ) : (
              <MenuIcon className="text-white cross-to-bar" size={48} />
            )}
          </button>
        </div>
      </div>
      <div
        className={`md:flex-row pb-4 md:pb-0 md:justify-center md:ml-48 gap-6 md:gap-12 place-items-center text-white origin-top ${resNavClasses}`}
      >
        <Input
          id="search"
          type="text"
          placeholder="Develop your film roll"
          className="mt-1 mr-16 md:mr-0 md:mt-0 w-72 md:w-80 text-black font-bold "
          onChange={(e) => setSearchValue(e.target.value)}
          searchButton={
            <button
              onClick={() => searchMovie()}
              className="absolute text-black ml-44 mt-3 md:mt-0 md:ml-16"
            >
              <Search />
            </button>
          }
        ></Input>
        <DropdownMenu>
          <DropdownMenuTrigger className="ml-96 pl-12 md:ml-0 -mt-16 md:mt-0 md:pl-0 md:flex place-items-center gap-3">
            <Avatar className="mr-36 md:mr-0">
              <AvatarImage src={params.avatarURL} />
              <AvatarFallback className="text-black font-bold uppercase">
                {params.username?.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            <h1 className="hidden md:block text-black md:text-white -mt-8 md:mt-0 font-bold">
              {" "}
              {params.username}
            </h1>
            <ChevronsUpDownIcon className="hidden md:block text-black md:text-white ml-36 md:ml-0 -mt-6 md:mt-0 md:md-0" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <Link href={`/profile/${params.username}`}>
              <DropdownMenuItem>Profile</DropdownMenuItem>
            </Link>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator></DropdownMenuSeparator>
            <DropdownMenuItem className="text-red-500" onClick={Logout}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
