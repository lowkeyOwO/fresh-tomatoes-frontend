"use client";
import getHomepage from "@/functions/getHomepage";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import Loading from "./loading";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Link from "next/link";
import Image from "next/image";
import { imageLoader } from "@/functions/imageLoader";
import missingImg from "@/public/Images/missing.png";
import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";

export default function Home() {
  const { data: homepageData, isLoading: homepageLoading } = useQuery<any>({
    queryKey: ["homepage"],
    queryFn: () =>
      getHomepage(getCookie(process.env.NEXT_PUBLIC_FTATOKEN || "error")),
  });
  const [imageIndex, setImageIndex] = useState<number>(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setImageIndex(
        (prevIndex) =>
          (prevIndex + 1) % (homepageData.now_playing.results.length || 1)
      );
    }, 10000);

    return () => clearInterval(intervalId);
  }, [homepageData]);

  if (!homepageData || homepageLoading) {
    return <Loading />;
  } else {
    const bgImage = homepageData.now_playing.results[imageIndex].backdrop_path;
    return (
      <div className="bg-gray-900 w-screen">
        <div className="relative w-screen h-screen">
          <Image 
            loader={imageLoader}
            layout="fill"
            src={bgImage}
            objectFit="fill"
            objectPosition="top"
            alt="Background Image"
          />
          <div className="absolute h-full w-full inset-0 bg-gradient-to-b from-black via-transparent to-black flex items-end">
            <div className="flex flex-col items-start justify-around gap-8 mx-16 relative w-3/5 my-16">
              <Link
                href={`/movies/${homepageData.now_playing.results[imageIndex].id}`}
                className="font-extrabold text-gray-300 drop-shadow-[0_4.8px_9.6px_rgba(0,0,0,1)] text-xl md:text-6xl hover:underline hover:underline-offset-8 relative bottom-8"
              >
                {homepageData.now_playing.results[imageIndex].title}
              </Link>
              <p className="font-normal text-gray-300 drop-shadow-[0_4.8px_9.6px_rgba(0,0,0,1)] text-xs md:text-xl w-full relative top-1/2 line-clamp-2">
                {homepageData.now_playing.results[imageIndex].overview}
              </p>
            </div>
          </div>
        </div>
        <div className="text-center text-gray-300 py-8 text-xl">
          <h1 className="my-8 text-8xl uppercase font-black font-outline rounded-xl text-green-300 add-bg mx-96">
            Upcoming
          </h1>
          <Carousel
            className="w-full  px-16"
            opts={{ loop: true }}
            plugins={[
              Autoplay({
                delay: 4000,
              }),
            ]}
          >
            <CarouselContent className="-ml-1">
              {homepageData?.upcoming?.results.map(
                (movie: any, index: number) => {
                  return (
                    <CarouselItem
                      key={index}
                      className="pl-4 basis:1 md:basis-1/2 lg:basis-1/3 hover:scale-105 transition-all duration-500 ease-in-out"
                    >
                      <Link href={`/movies/${movie.id}`}>
                        <div className="p-4">
                          <div className="flex aspect-square relative">
                            {movie["poster_path"] != null ? (
                              <Image 
                                src={movie["poster_path"]}
                                alt={movie.name}
                                loader={imageLoader}
                                fill
                                className="rounded-md"
                              />
                            ) : (
                              <Image 
                                src={missingImg}
                                alt={movie.name}
                                fill
                                className="rounded-md"
                              />
                            )}
                          </div>
                          <h1 className="text-lg font-bold mt-4">
                            {movie.title}
                          </h1>
                          <h1 className="text-sm font-light mt-2">
                            {movie.character}
                          </h1>
                        </div>
                      </Link>
                    </CarouselItem>
                  );
                }
              )}
            </CarouselContent>
          </Carousel>
        </div>
        <div className="text-center text-gray-300 py-8 text-xl">
        <h1 className="my-8 text-8xl uppercase font-black font-outline rounded-xl text-green-300 add-bg mx-96">

            Popular
          </h1>
          <Carousel
            className="w-full px-16"
            opts={{ loop: true }}
            plugins={[
              Autoplay({
                delay: 4500,
              }),
            ]}
          >
            <CarouselContent className="-ml-1">
              {homepageData?.popular_movies?.results.map(
                (movie: any, index: number) => {
                  return (
                    <CarouselItem
                      key={index}
                      className="pl-4 basis:1 md:basis-1/2 lg:basis-1/3 hover:scale-105 transition-all duration-500 ease-in-out"
                    >
                      <Link href={`/movies/${movie.id}`}>
                        <div className="p-4">
                          <div className="flex aspect-square relative">
                            {movie["poster_path"] != null ? (
                              <Image 
                                src={movie["poster_path"]}
                                alt={movie.name}
                                loader={imageLoader}
                                fill
                                className="rounded-md"
                              />
                            ) : (
                              <Image 
                                src={missingImg}
                                alt={movie.name}
                                fill
                                className="rounded-md"
                              />
                            )}
                          </div>
                          <h1 className="text-lg font-bold mt-4">
                            {movie.title}
                          </h1>
                          <h1 className="text-sm font-light mt-2">
                            {movie.character}
                          </h1>
                        </div>
                      </Link>
                    </CarouselItem>
                  );
                }
              )}
            </CarouselContent>
          </Carousel>
        </div>
        <div className="text-center text-gray-300 py-8 text-xl">
        <h1 className="my-8 text-8xl uppercase font-black font-outline rounded-xl text-green-300 add-bg mx-96">
            Top Rated
          </h1>
          <Carousel
            className="w-full px-16"
            opts={{ loop: true }}
            plugins={[
              Autoplay({
                delay: 3500,
              }),
            ]}
          >
            <CarouselContent className="-ml-1">
              {homepageData?.top_rated?.results.map(
                (movie: any, index: number) => {
                  return (
                    <CarouselItem
                      key={index}
                      className="pl-4 basis:1 md:basis-1/2 lg:basis-1/3 hover:scale-105 transition-all duration-500 ease-in-out"
                    >
                      <Link href={`/movies/${movie.id}`}>
                        <div className="p-4">
                          <div className="flex aspect-square relative">
                            {movie["poster_path"] != null ? (
                              <Image 
                                src={movie["poster_path"]}
                                alt={movie.name}
                                loader={imageLoader}
                                fill
                                className="rounded-md"
                              />
                            ) : (
                              <Image 
                                src={missingImg}
                                alt={movie.name}
                                fill
                                className="rounded-md"
                              />
                            )}
                          </div>
                          <h1 className="text-lg font-bold mt-4">
                            {movie.title}
                          </h1>
                          <h1 className="text-sm font-light mt-2">
                            {movie.character}
                          </h1>
                        </div>
                      </Link>
                    </CarouselItem>
                  );
                }
              )}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    );
  }
}
