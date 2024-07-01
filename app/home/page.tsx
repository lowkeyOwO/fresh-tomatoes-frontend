"use client";
import getHomepage from "@/functions/getHomepage";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import Loading from "./loading";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import Image from "next/image";
import { imageLoader } from "@/functions/imageLoader";
import missingImg from "@/public/Images/missing.png";

export default function Home() {
  const { data: homepageData, isLoading: homepageLoading } = useQuery<any>({
    queryKey: ["homepage"],
    queryFn: () =>
      getHomepage(getCookie(process.env.NEXT_PUBLIC_FTATOKEN || "error")),
  });
  if (!homepageData || homepageLoading) {
    return <Loading />;
  } else {
    console.log(homepageData);
    return (
      <div className="bg-gray-900 w-screen mt-32">
        <div className="text-center text-gray-300 py-8 text-xl px-16">
          <h1>Now Playing</h1>
          <Carousel className="w-full">
            <CarouselContent className="-ml-1">
              {homepageData?.now_playing?.results.map(
                (movie: any, index: number) => {
                  return (
                    <CarouselItem
                      key={index}
                      className="pl-4 md:basis-1/2 lg:basis-1/4 hover:scale-105 transition-all duration-500 ease-in-out"
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
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <div className="text-center text-gray-300 py-8 text-xl px-16">
          <h1>Upcoming Movies</h1>
          <Carousel className="w-full">
            <CarouselContent className="-ml-1">
              {homepageData?.upcoming?.results.map(
                (movie: any, index: number) => {
                  return (
                    <CarouselItem
                      key={index}
                      className="pl-4 md:basis-1/2 lg:basis-1/4 hover:scale-105 transition-all duration-500 ease-in-out"
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
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <div className="text-center text-gray-300 py-8 text-xl px-16">
          <h1>Popular Movies</h1>
          <Carousel className="w-full">
            <CarouselContent className="-ml-1">
              {homepageData?.popular_movies?.results.map(
                (movie: any, index: number) => {
                  return (
                    <CarouselItem
                      key={index}
                      className="pl-4 md:basis-1/2 lg:basis-1/4 hover:scale-105 transition-all duration-500 ease-in-out"
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
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <div className="text-center text-gray-300 py-8 text-xl px-16">
          <h1>Top Rated</h1>
          <Carousel className="w-full">
            <CarouselContent className="-ml-1">
              {homepageData?.top_rated?.results.map(
                (movie: any, index: number) => {
                  return (
                    <CarouselItem
                      key={index}
                      className="pl-4 md:basis-1/2 lg:basis-1/4 hover:scale-105 transition-all duration-500 ease-in-out"
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
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    );
  }
}
