"use client";

import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import Loading from "./loading";
import getMovieDetails from "@/functions/getMovieDetails";
import Image from "next/image";
import { imageLoader } from "@/functions/imageLoader";
import Iconimg from "@/public/Images/icon.png";
import loginimg from "@/public/Images/loginimg.jpg";
import Genres from "@/components/Genres";
import { CalendarDays, Clock8, Languages } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Rating from "@/components/Rating";
import getUserReview from "@/functions/getUserReview";
import ReviewBox from "@/components/ReviewBox";
import { useProfileData } from "./layout";
import Link from "next/link";
import emptyProfileImage from "@/public/Images/missing.png";
import generateReviews, {
  GenerationParams,
  Review,
  UserDetails,
} from "@/components/MovieReviewGenerator";

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
    document.title = movieData.title;
    let currentUsername = "";
    if (profileData) {
      currentUsername =
        profileData["userDetails"]["userExists"]["username"] || "";
    }
    let filteredUserDetails,
      filteredReviewList,
      filteredUserData: GenerationParams;
    let generatedReviews: any[] = [];
    console.log("userdata",userData);
    if (userData.userDetails.length > 0) {
      filteredUserDetails = userData.userDetails.filter(
        (user: UserDetails) => user.username !== currentUsername
      );

      filteredReviewList = userData.reviews.review_list.filter(
        (review: Review) => review.username !== currentUsername
      );

      filteredUserData = {
        userDetails: filteredUserDetails,
        reviews: {
          ...userData.reviews,
          review_list: filteredReviewList,
        },
      };
      generatedReviews = generateReviews(filteredUserData);
    }
    return (
      <>
        <div className="h-screen relative">
          <div className="relative w-full h-full">
            {movieData.backdrop_path != null ? (
              <Image 
                loader={imageLoader}
                layout="fill"
                src={movieData.backdrop_path}
                objectFit="fill"
                objectPosition="top"
                alt="Background Image"
              />
            ) : (
              <Image 
                layout="fill"
                src={loginimg}
                objectFit="fill"
                objectPosition="top"
                alt="Background Image"
              />
            )}

            <div className="absolute h-full w-full inset-0 bg-gradient-to-b from-black via-transparent to-black flex flex-row items-center justify-center">
              <h1 className="absolute font-extrabold text-white drop-shadow-[0_4.8px_9.6px_rgba(0,0,0,1)] text-6xl text-center p-4">
                {movieData.title}
              </h1>
            </div>
          </div>
          <div className="relative flex flex-row items-center justify-center bg-gray-900">
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
            <div className="flex flex-row items-center justify-center gap-4 p-4">
              <Genres selection={movieData.genres}></Genres>
            </div>
            <h1 className="text-center text-gray-300 px-16 py-8 text-xl">
              {movieData.overview}
              <Separator className="mt-16" />
            </h1>
          </div>
          <div className="bg-gray-900 flex flex-row items-center text-gray-300 justify-between md:p-16">
            <div className="">
              <div className="flex flex-row items-center m-4 gap-8 text-4xl font-extrabold pb-4">
                <div className=" text-green-300">
                  <CalendarDays size={48}></CalendarDays>
                </div>
                {new Date(movieData.release_date).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </div>
              <div className="flex flex-row items-center m-4 gap-8 text-4xl font-extrabold  pb-4">
                <div className="text-green-300">
                  <Clock8 size={48}></Clock8>
                </div>
                {`${Math.floor(movieData.runtime / 60)}h ${
                  movieData.runtime % 60
                }m`}
              </div>
              <div className="flex flex-row items-center m-4 gap-8 text-4xl font-extrabold  pb-4">
                <div className=" text-green-300">
                  <Languages size={48}></Languages>
                </div>
                {displayNames.of(movieData.original_language)}
              </div>
            </div>
            <Link href={`/people/${movieData.crew[0]["id"]}`}>
              <div className="flex items-center flex-col">
                <div className="w-48 h-48 relative">
                  {movieData.crew[0]["profile_path"] != null ? (
                    <Image 
                      src={movieData.crew[0]["profile_path"]}
                      alt={movieData.crew[0].name}
                      loader={imageLoader}
                      fill
                      className="rounded-md"
                    />
                  ) : (
                    <Image 
                      src={emptyProfileImage}
                      alt={movieData.crew[0].name}
                      fill
                      className="rounded-md"
                    />
                  )}
                </div>
                <div className="text-center">
                  <h1 className="text-4xl font-extrabold mt-8">
                    {movieData.crew[0]["name"]}
                  </h1>
                  <h1 className="text-2xl font-semibold mt-2">Director</h1>
                </div>
              </div>
            </Link>

            <div className="">
              <Rating
                avgRating={movieData.vote_average}
                ratingCount={movieData.vote_count}
              />
            </div>
          </div>
          <div className="bg-gray-900">
            <div className="text-center text-gray-300 px-16 py-8 text-xl ">
              <Carousel className="w-full">
                <CarouselContent className="-ml-1">
                  {movieData.cast.map((mem: any, index: number) => {
                    return (
                      <CarouselItem
                        key={index}
                        className="pl-4 md:basis-1/2 lg:basis-1/4 hover:scale-105 transition-all duration-500 ease-in-out"
                      >
                        <Link href={`/people/${mem.id}`}>
                          <div className="p-4">
                            <div className="flex aspect-square relative">
                              {mem["profile_path"] != null ? (
                                <Image 
                                  src={mem["profile_path"]}
                                  alt={mem.name}
                                  loader={imageLoader}
                                  fill
                                  className="rounded-md"
                                />
                              ) : (
                                <Image 
                                  src={emptyProfileImage}
                                  alt={mem.name}
                                  fill
                                  className="rounded-md"
                                />
                              )}
                            </div>
                            <h1 className="text-lg font-bold mt-4">
                              {mem.name}
                            </h1>
                            <h1 className="text-sm font-light mt-2">
                              {mem.character}
                            </h1>
                          </div>
                        </Link>
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
                {movieData.cast.length > 6 ? (
                  <>
                    <CarouselPrevious />
                    <CarouselNext />
                  </>
                ) : null}
              </Carousel>
            </div>
          </div>
          <div className="bg-gray-900">
            <div className="text-center text-gray-300 px-16 py-8 text-xl">
              <ReviewBox
                profileData={profileData}
                movieId={params.movieId}
                movieData={{
                  movieName: movieData.title,
                  avgRating: movieData.vote_average,
                  movieDate: movieData.release_date,
                }}
                editable={true}
                showProfileCard={false}
              />
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
              <div className="text-2xl md:text-6xl text-center text-gray-300 font-extrabold absolute drop-shadow-[0_4.8px_9.6px_rgba(0,0,0,1)]">
                Advancement made: How did we get here?
                <h6 className="text-sm mt-2">
                  a small step for a human, a giant leap for the review-kind
                </h6>
              </div>
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
                      strokeWidth="1"
                      stroke="rgb(134 239 172)"
                      fill="none"
                    />
                    <path
                      d="M-20.133 24.568C-13.178 24.932-6.452 27.376 0 30c6.452 2.624 13.036 5.072 20 5 6.967-.072 13.56-2.341 20-5 6.44-2.659 13.033-4.928 20-5 6.964-.072 13.548 2.376 20 5s13.178 5.068 20.133 5.432"
                      strokeWidth="1"
                      stroke="rgb(134 239 172)"
                      fill="none"
                    />
                    <path
                      d="M-20.133 44.568C-13.178 44.932-6.452 47.376 0 50c6.452 2.624 13.036 5.072 20 5 6.967-.072 13.56-2.341 20-5 6.44-2.659 13.033-4.928 20-5 6.964-.072 13.548 2.376 20 5s13.178 5.068 20.133 5.432"
                      strokeWidth="1"
                      stroke="rgb(134 239 172)"
                      fill="none"
                    />
                    <path
                      d="M-20.133 64.568C-13.178 64.932-6.452 67.376 0 70c6.452 2.624 13.036 5.072 20 5 6.967-.072 13.56-2.341 20-5 6.44-2.659 13.033-4.928 20-5 6.964-.072 13.548 2.376 20 5s13.178 5.068 20.133 5.432"
                      strokeWidth="1"
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
      </>
    );
  }
}
