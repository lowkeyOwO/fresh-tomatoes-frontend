"use client";

import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import Loading from "./loading";
import getMovieDetails from "@/functions/getMovieDetails";
import Image from "next/image";
import { imageLoader } from "@/functions/imageLoader";
import Iconimg from "@/public/Images/icon.png";
import Genres from "@/components/Genres";
import { CalendarDays, Clock8, Languages } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Rating from "@/components/Rating";
import getUserReview from "@/functions/getUserReview";
import ReviewBox from "@/components/ReviewBox";
import { useProfileData } from "./layout";

interface MovieID {
  params: { movieId: string };
}

export default function Movie({ params }: MovieID) {
  const profileData = useProfileData();
  const { data: movieData, isLoading: movieLoading } = useQuery<any>({
    queryKey: [`movieData_${params.movieId}`],
    queryFn: () =>
      getMovieDetails(
        getCookie(process.env.NEXT_PUBLIC_FTATOKEN || "error"),
        +params.movieId
      ),
  });
  const { data: userData, isLoading: userLoading } = useQuery<any>({
    queryKey: [`userReviewData_${params.movieId}`],
    queryFn: () =>
      getUserReview(
        getCookie(process.env.NEXT_PUBLIC_FTATOKEN || "error"),
        +params.movieId
      ),
  });
  const displayNames = new Intl.DisplayNames(["en"], { type: "language" });
  if (movieLoading || !movieData || userLoading || !userData) {
    return <Loading />;
  } else {
    document.title =  movieData.title;
    return (
      <>
        <div className="h-screen relative">
          <div className="relative w-full h-full">
            <Image
              loader={imageLoader}
              layout="fill"
              src={movieData.backdrop_path}
              objectFit="fill"
              objectPosition="top"
              alt="Background Image"
            />
            <div className="absolute h-full w-full inset-0 bg-gradient-to-b from-black via-transparent to-black centered justify-center">
              <h1 className="absolute font-extrabold text-white drop-shadow-[0_4.8px_9.6px_rgba(0,0,0,1)] text-6xl text-center p-4">
                {movieData.title}
              </h1>
            </div>
          </div>
          <div className="relative centered justify-center bg-gray-900">
            <div className="relative h-96 w-72 z-60 -mt-48 mb-16">
              <Image
                className="rounded-md"
                loader={imageLoader}
                src={movieData.poster_path || Iconimg}
                layout="fill"
                alt={movieData.title?.substring(0, 2) || "FT"}
              />
            </div>
          </div>
          <div className="bg-gray-900">
            <div className="centered justify-center p-4">
              <Genres selection={movieData.genres}></Genres>
            </div>
            <h1 className="text-center text-gray-300 px-16 py-8 text-xl">
              {movieData.overview}
              <Separator className="mt-16" />
            </h1>
          </div>
          <div className="bg-gray-900 centered text-gray-300 justify-between p-16">
            <div className="">
              <div className="centered m-4 gap-8 text-4xl font-extrabold pb-4">
                <div className=" text-green-300">
                  <CalendarDays size={48}></CalendarDays>
                </div>
                {new Date(movieData.release_date).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </div>
              <div className="centered m-4 gap-8 text-4xl font-extrabold  pb-4">
                <div className="text-green-300">
                  <Clock8 size={48}></Clock8>
                </div>
                {`${Math.floor(movieData.runtime / 60)}h ${
                  movieData.runtime % 60
                }m`}
              </div>
              <div className="centered m-4 gap-8 text-4xl font-extrabold  pb-4">
                <div className=" text-green-300">
                  <Languages size={48}></Languages>
                </div>
                {displayNames.of(movieData.original_language)}
              </div>
            </div>
            <div className="">
              <Rating
                avgRating={movieData.vote_average}
                ratingCount={movieData.vote_count}
              />
            </div>
          </div>
          <div className="bg-gray-900">
            <div className="text-center text-gray-300 px-16 py-8 text-xl">
              <Separator className="mt-4 mb-8" />
              {userData["reviews"].length === 0 ? (
                <ReviewBox profileData={profileData} />
              ) : (
                <h1>REVIEW</h1>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}
