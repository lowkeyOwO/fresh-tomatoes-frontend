"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";
import Iconimg from "@/public/Images/icon.png";
import { imageLoader } from "@/functions/imageLoader";
import generateUserProfileReviews from "@/components/UserProfileReviewGenerator";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/components/Review";
import { CalendarDays } from "lucide-react";
import { useUsernameData } from "./layout";
import getUsername from "@/functions/getUsername";
import { getCookie } from "cookies-next";
import Loading from "./loading";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import Link from "next/link";

interface UserDetails {
  imageData: string[];
  userDetails: {
    userExists: {
      username: string;
      favorite_movies: number[];
      avatar_path: string;
      reviewed_movies: any[];
      bio: string;
      joined_date: string;
    };
  };
  favMovies: any[];
}

type UserDetail = UserDetails | undefined;

interface Username {
  params: {
    profile_name: string;
  };
}

export default function Profile({ params }: Username) {
  const usernameData = useUsernameData();
  const [currentUser, setCurrentUser] = useState<boolean>(false);
  const [imageIndex, setImageIndex] = useState<number>(0);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (params.profile_name === usernameData) {
      setCurrentUser(true);
    }
  }, [params.profile_name, usernameData]);

  const { data, isLoading } = useQuery<any>({
    queryKey: [`profileData_${params.profile_name}`],
    queryFn: () =>
      getUsername(
        getCookie(process.env.NEXT_PUBLIC_FTATOKEN || "error"),
        params.profile_name
      ),
    enabled: !currentUser, // only execute this query if it's not the current user's profile
  });

  const userProfileData: UserDetail = currentUser
    ? queryClient.getQueryData(["profileData"])
    : data;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setImageIndex(
        (prevIndex) =>
          (prevIndex + 1) % (userProfileData?.imageData.length || 1)
      );
    }, 4000);

    return () => clearInterval(intervalId);
  }, [userProfileData]);

  if (isLoading || !userProfileData) {
    return <Loading />;
  }

  const imageList = userProfileData.imageData;
  const avatarPath = userProfileData.userDetails.userExists.avatar_path;
  const username = userProfileData.userDetails.userExists.username;
  const bio = userProfileData.userDetails.userExists.bio;
  const joined_date = userProfileData.userDetails.userExists.joined_date;
  const favoriteMovieObj = userProfileData.favMovies;
  const reviewedMovies = userProfileData.userDetails.userExists.reviewed_movies;
  const generatedReviews = generateUserProfileReviews({
    reviews: reviewedMovies,
    editable: currentUser,
  });

  const bgImage = imageList[imageIndex];
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
        <div className="absolute h-full w-full inset-0 bg-gradient-to-b from-black via-transparent to-black flex flex-row items-center justify-center">
          <h1 className="absolute font-extrabold text-gray-300 drop-shadow-[0_4.8px_9.6px_rgba(0,0,0,1)] text-4xl md:text-9xl scale-125">
            {username}
          </h1>
        </div>
      </div>
      <div className="relative flex flex-row justify-center bg-gray-900">
        <div className="relative h-64 w-64 z-60 -mt-32 mb-16">
          {avatarPath === "" ? (
            <div className="p-4 h-64 w-64 rounded-full text-white text-center font-bold uppercase text-9xl content-center bg-gray-900 shadow-md shadow-gray-200/40">
              {username?.substring(0, 2) || "FT"}
            </div>
          ) : (
            <Image 
              className="p-4 rounded-full shadow-md shadow-gray-200/40"
              loader={imageLoader}
              src={avatarPath}
              layout="fill"
              alt={"FT"}
            />
          )}
        </div>
      </div>
      <div className="bg-gray-900">
        <h1 className="text-center text-gray-400 text-md flex items-center justify-center flex-row gap-4">
          <CalendarDays className="text-green-300" />
          Joined {formatDate(joined_date || "")}
        </h1>
        <h1 className="text-center text-gray-300 px-16 py-8 text-xl">
          {bio}
          <Separator className="mt-16" />
        </h1>
      </div>

      <div className="bg-gray-900">
            <div className="text-center text-gray-300 px-16 py-8 text-xl ">
              <Carousel className="w-full">
                <CarouselContent className="-ml-1">
                  {favoriteMovieObj.map((movie: any, index: number) => {
                    return (
                      <CarouselItem
                        key={index}
                        className="pl-4 md:basis-1/2 lg:basis-1/4 hover:scale-105 transition-all duration-500 ease-in-out"
                      >
                        <Link href={`/movies/${movie.id}`}>
                          <div className="p-4">
                            <div className="flex aspect-square relative">
                              {movie.poster_path != null ? (
                                <Image 
                                  src={movie["poster_path"]}
                                  alt={movie.title}
                                  loader={imageLoader}
                                  fill
                                  className="rounded-md"
                                />
                              ) : (
                                <img
                                src={"https://fresh-tomatoes.onrender.com/Images/missing.png"}
                                  alt={movie.title}
                                  className="rounded-md"
                                />
                              )}
                            </div>
                            <h1 className="text-lg font-bold mt-4">
                              {movie.title}
                            </h1>
                          </div>
                        </Link>
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
      {generatedReviews.length > 0 ? (
        <div className="bg-gray-900">
          <div className="h-1/2 flex items-center justify-center">
            <svg
              className="inline-block fill-current w-full h-auto bg-gray-900 text-green-300"
              viewBox="0 0 1440 450"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1189.2 169.2H421H253.8C159.8 169.2 69.1 203.1 0 262.6V449.8C30.5 349.9 131.3 276.7 252 276.7H424.1H1187.4C1280.9 276.7 1371 243.2 1440 184.3V0C1408.1 97.9 1308.3 169.2 1189.2 169.2Z"></path>
            </svg>
            <h1 className="text-2xl md:text-6xl text-center text-gray-900 font-extrabold uppercase absolute">
              Reviews
            </h1>
          </div>
          {generatedReviews}
        </div>
      ) : (
        <div className="relative h-1/5 w-full bg-gray-900 flex items-center justify-center">
          <h1 className="text-2xl md:text-6xl text-center text-gray-300 font-extrabold absolute drop-shadow-[0_4.8px_9.6px_rgba(0,0,0,1)]">
            Fresh tomatoes awaits your review!
            <h6 className="text-sm mt-2">
              a small step for a human, a giant leap for the review-kind
            </h6>
          </h1>
          <svg id="patternId" width="100%" height="100%">
            <defs>
              <pattern
                id="a"
                patternUnits="userSpaceOnUse"
                width="80px"
                height="80px"
                patternTransform="scale(1) rotate(0)"
              >
                <rect
                  x="0"
                  y="0"
                  width="100%"
                  height="100%"
                  fill="rgb(17 24 39)"
                />
                <path
                  d="M-20.133 4.568C-13.178 4.932-6.452 7.376 0 10c6.452 2.624 13.036 5.072 20 5 6.967-.072 13.56-2.341 20-5 6.44-2.659 13.033-4.928 20-5 6.964-.072 13.548 2.376 20 5s13.178 5.068 20.133 5.432"
                  stroke-width="1"
                  stroke="rgb(134 239 172)"
                  fill="none"
                />
                <path
                  d="M-20.133 24.568C-13.178 24.932-6.452 27.376 0 30c6.452 2.624 13.036 5.072 20 5 6.967-.072 13.56-2.341 20-5 6.44-2.659 13.033-4.928 20-5 6.964-.072 13.548 2.376 20 5s13.178 5.068 20.133 5.432"
                  stroke-width="1"
                  stroke="rgb(134 239 172)"
                  fill="none"
                />
                <path
                  d="M-20.133 44.568C-13.178 44.932-6.452 47.376 0 50c6.452 2.624 13.036 5.072 20 5 6.967-.072 13.56-2.341 20-5 6.44-2.659 13.033-4.928 20-5 6.964-.072 13.548 2.376 20 5s13.178 5.068 20.133 5.432"
                  stroke-width="1"
                  stroke="rgb(134 239 172)"
                  fill="none"
                />
                <path
                  d="M-20.133 64.568C-13.178 64.932-6.452 67.376 0 70c6.452 2.624 13.036 5.072 20 5 6.967-.072 13.56-2.341 20-5 6.44-2.659 13.033-4.928 20-5 6.964-.072 13.548 2.376 20 5s13.178 5.068 20.133 5.432"
                  stroke-width="1"
                  stroke="rgb(134 239 172)"
                  fill="none"
                />
              </pattern>
            </defs>
            <rect
              width="800%"
              height="800%"
              transform="translate(-219,0)"
              fill="url(#a)"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
