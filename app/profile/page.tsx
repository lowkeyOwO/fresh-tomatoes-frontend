"use client";

import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";
import Iconimg from "@/public/Images/icon.png";
import generateFavoriteMovies from "@/functions/generateFavoriteMovies";
import { imageLoader } from "@/functions/imageLoader";

interface UserDetails {
  imageData: string[];
  userDetails: {
    userExists: {
      username: string;
      favorite_movies: number[];
      avatar_path: string;
    };
  };
  favMovies: { results: any[] };
}
type UserDetail = UserDetails | undefined;

export default function Profile() {
  const queryClient = useQueryClient();
  const cachedData: UserDetail = queryClient.getQueryData(["profileData"]);
  const imageList = cachedData?.imageData || [];
  const avatarPath = cachedData?.userDetails?.userExists?.avatar_path;
  const username = cachedData?.userDetails?.userExists?.username;
  const favoriteMovieObj = cachedData?.favMovies?.results || [];
  const favMovieList =
    cachedData?.userDetails?.userExists?.favorite_movies || [];
  const favoriteMovies = generateFavoriteMovies({
    favoriteMovieObj,
    favMovieList,
  });

  const [imageIndex, setImageIndex] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % imageList.length);
    }, 4000);

    return () => clearInterval(intervalId);
  }, [imageList]);

  let bgImage = imageList[imageIndex];
  document.title = username || "profile";
  return (
    <div className="h-screen relative">
      <div className="relative w-full h-full">
        <Image
          loader={imageLoader}
          layout="fill"
          src={bgImage}
          objectFit="fill"
          objectPosition="top"
          alt="Background Image"
        />
        <div className="absolute h-full w-full inset-0 bg-gradient-to-b from-black via-transparent to-black centered justify-center">
          <h1 className="absolute font-extrabold text-gray-300 drop-shadow-[0_4.8px_9.6px_rgba(0,0,0,1)] text-9xl scale-125">
            {username}
          </h1>
        </div>
      </div>
      <div className="relative centered justify-center bg-gray-900">
        <div className="relative h-64 w-64 z-60 -mt-32 mb-16">
          {avatarPath === "" ? (
            <div className="p-4 h-64 w-64 rounded-full text-white text-center font-bold uppercase text-9xl content-center bg-gray-900 shadow-md shadow-gray-200/40">
              {username?.substring(0, 2) || "FT"}
            </div>
          ) : (
            <Image
              className="p-4 rounded-full shadow-md shadow-gray-200/40"
              loader={imageLoader}
              src={avatarPath || Iconimg}
              layout="fill"
              alt={"FT"}
            />
          )}
        </div>
      </div>
      <div className="relative bg-gray-900 h-5/6 centered justify-center">
        {favoriteMovies}
      </div>
    </div>
  );
}
