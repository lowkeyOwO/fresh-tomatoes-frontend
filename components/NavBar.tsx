"use client";
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
import { Home, Search, Settings, User2 } from "lucide-react";
import Link from "next/link";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "./ui/separator";
import searchForData from "@/functions/searchForData";
import {
  generateSearchMovies,
  generateSearchPeople,
  generateSearchUsers,
} from "./ui/searchBarGenerators";

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
  const [isSearching, setSearching] = useState<boolean>(false);
  const [resultData, setResultData] = useState<any>(null);
  const searchData = async (searchValue: string) => {
    setDropdownOpen(true);
    const searchResults = await searchForData(
      searchValue || "",
      getCookie("fresh_tomatoes_auth_token") || ""
    );
    if (!searchResults) {
      setSearching(true);
    } else {
      setSearching(false);
      setResultData(searchResults);
    }
  };
  const [searchValue, setSearchValue] = useState<string>("");
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);

  return (
    <nav
      className={`w-full p-2 flex flex-row items-center justify-between top-0 z-50 absolute pb-0`}
    >
      <div onClick={() => router.replace("/home")}>
        <img
          src={"https://fresh-tomatoes.onrender.com/Images/icon.png"}
          alt="FRESH TOMATOES"
          className="w-32 py-4 left-0"
        />
      </div>
      <div className="flex flex-row items-center justify-between p-4 gap-16">
        <div className="flex flex-row items-center justify-end">
          <Input
            id="search"
            type="text"
            placeholder="Develop your film roll"
            className="hidden md:block mr-0 mt-0 w-80 text-black font-bold"
            onChange={(e) => setSearchValue(e.target.value)}
          ></Input>
          <button
            onClick={() => {
              if (searchValue === "") {
                alert("Search cannot be empty!");
              } else {
                searchData(searchValue);
              }
            }}
            className="text-black absolute mr-2 hidden md:block z-50"
          >
            <Search />
          </button>
          <DropdownMenu open={isDropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger className="opacity-0" />
            <DropdownMenuContent className="mr-48 mt-8 bg-gray-900 hidden md:block">
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <Tabs
                  defaultValue="users"
                  className="w-96 bg-gray-900 text-gray-300"
                >
                  <TabsList className="flex items-center justify-between bg-gray-900 text-gray-300">
                    <TabsTrigger className="w-full" value="users">
                      Users
                    </TabsTrigger>
                    <TabsTrigger className="w-full" value="movies">
                      Movies
                    </TabsTrigger>
                    <TabsTrigger className="w-full" value="people">
                      People
                    </TabsTrigger>
                  </TabsList>
                  <Separator className="mt-1" />
                  <TabsContent value="users">
                    {isSearching && resultData == null ? (
                      <p>still searching...</p>
                    ) : (
                      generateSearchUsers(resultData?.users)
                    )}
                  </TabsContent>
                  <TabsContent value="movies">
                    {isSearching && resultData == null ? (
                      <p>still searching...</p>
                    ) : (
                      generateSearchMovies(resultData?.movies)
                    )}
                  </TabsContent>
                  <TabsContent value="people">
                    {isSearching && resultData == null ? (
                      <p>still searching...</p>
                    ) : (
                      generateSearchPeople(resultData?.people)
                    )}
                  </TabsContent>
                </Tabs>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
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
            <div className="flex flex-row items-center justify-end">
              <Input
                id="search"
                type="text"
                placeholder="Develop your film roll"
                className="block md:hidden w-72 text-black font-bold mx-0"
                onChange={(e) => setSearchValue(e.target.value)}
              ></Input>
              <button
                onClick={() => {
                  if (searchValue === "") {
                    alert("Search cannot be empty!");
                  } else {
                    searchData(searchValue);
                  }
                }}
                className="text-black absolute mr-2 md:hidden block z-50"
              >
                <Search />
              </button>
              <DropdownMenu
                open={isDropdownOpen}
                onOpenChange={setDropdownOpen}
              >
                <DropdownMenuTrigger className="opacity-0" />
                <DropdownMenuContent className="mt-8 bg-gray-900 block md:hidden max-w-xs">
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <Tabs
                      defaultValue="users"
                      className="bg-gray-900 text-gray-300 w-80"
                    >
                      <TabsList className="flex items-center justify-between max-w-xs bg-gray-900 text-gray-300">
                        <TabsTrigger className="w-full" value="users">
                          Users
                        </TabsTrigger>
                        <TabsTrigger className="w-full" value="movies">
                          Movies
                        </TabsTrigger>
                        <TabsTrigger className="w-full" value="people">
                          People
                        </TabsTrigger>
                      </TabsList>
                      <Separator className="mt-1" />
                      <TabsContent value="users">
                        {isSearching && resultData == null ? (
                          <p>still searching...</p>
                        ) : (
                          generateSearchUsers(resultData?.users)
                        )}
                      </TabsContent>
                      <TabsContent value="movies">
                        {isSearching && resultData == null ? (
                          <p>still searching...</p>
                        ) : (
                          generateSearchMovies(resultData?.movies)
                        )}
                      </TabsContent>
                      <TabsContent value="people">
                        {isSearching && resultData == null ? (
                          <p>still searching...</p>
                        ) : (
                          generateSearchPeople(resultData?.people)
                        )}
                      </TabsContent>
                    </Tabs>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Link
              href={`/home`}
              className="flex flex-row gap-8 text-2xl items-center justify-center font-semibold  hover:bg-green-300 w-full p-1 rounded-md hover:text-gray-900 py-4 transition-all duration-500 ease-in-out hover:scale-105"
            >
              <Home className="h-8 w-8" />
              Home
            </Link>
            <Link
              href={`/profile/${params.username}`}
              className="flex flex-row gap-8 text-2xl items-center justify-center font-semibold  hover:bg-green-300 w-full p-1 rounded-md hover:text-gray-900 py-4 transition-all duration-500 ease-in-out hover:scale-105"
            >
              <User2 className="h-8 w-8" /> Profile
            </Link>
            <Link
              href={`/settings`}
              className="flex flex-row gap-8 text-2xl items-center justify-center font-semibold  hover:bg-green-300 w-full p-1 rounded-md hover:text-gray-900 py-4 transition-all duration-500 ease-in-out hover:scale-105"
            >
              <Settings className="h-8 w-8" /> Settings
            </Link>
            <SheetFooter className="h-full w-full flex items-end">
              <SheetClose asChild>
                <Button
                  onClick={Logout}
                  className="bg-red-600 hover:bg-red-700 w-full transition-all duration-500 ease-in-out hover:scale-105"
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
