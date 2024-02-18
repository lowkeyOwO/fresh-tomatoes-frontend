"use client";

import icon from "@/public/Images/icon.png";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { Token } from "@/functions/getUsername";
import Logout from "@/functions/Logout";

interface TokenObj {
  username : Token
}
export default function NavBar(params : TokenObj) {
  if (params.username === undefined) {
      Logout();
  }
  const [searchValue, setSearchValue] = useState<String>("");
  return (
    <div className="w-full p-2 flex flex-row place-items-center justify-between">
      <div className="">
        <Image
          src={icon}
          alt="FRESH TOMATOES"
          className="h-20 w-20 left-0"
        ></Image>
      </div>
      <div className="flex flex-row justify-around mx-6 gap-12 place-items-center text-white">
        <h1>Home</h1>
        <Input
          id="search"
          type="text"
          placeholder="Develop your film roll"
          className="w-60"
          onChange={(e) => setSearchValue(e.target.value)}
        ></Input>
        <DropdownMenu>
          <DropdownMenuTrigger>
            {params.username}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator></DropdownMenuSeparator>
            <DropdownMenuItem className="text-red-500">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
