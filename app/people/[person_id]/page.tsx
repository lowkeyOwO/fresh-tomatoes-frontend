"use client";

import getPersonDetails from "@/functions/getPersonDetails";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import Loading from "./loading";
import Image from "next/image";
import { imageLoader } from "@/functions/imageLoader";
import missingImg from "@/public/Images/missing.png";
import { useEffect, useState } from "react";
import { Cake, MapPin } from "lucide-react";
import { formatDate } from "@/components/Review";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";

interface PersonID {
  params: {
    person_id: string;
  };
}

export default function Person({ params }: PersonID) {
  const { data: peopleData, isLoading: peopleLoading } = useQuery<any>({
    queryKey: [`peopleData_${params.person_id}`],
    queryFn: () =>
      getPersonDetails(
        getCookie(process.env.NEXT_PUBLIC_FTATOKEN || "error"),
        +params.person_id
      ),
  });
  const [imageIndex, setImageIndex] = useState<number>(0);

  useEffect(() => {
    if (
      peopleData?.personCreditDetails?.backdropPaths &&
      peopleData.personCreditDetails.backdropPaths.length > 0
    ) {
      const intervalId = setInterval(() => {
        setImageIndex(
          (prevIndex) =>
            (prevIndex + 1) %
            peopleData.personCreditDetails.backdropPaths.length
        );
      }, 4000);

      return () => clearInterval(intervalId);
    }
  }, [peopleData]);
  if (peopleLoading || !peopleData) {
    return <Loading />;
  } else {
    const bgImage = peopleData?.personCreditDetails?.backdropPaths[imageIndex];
    return (
      <>
        <div className="h-screen relative">
          <div className="relative w-full h-full">
            {peopleData?.personCreditDetails?.backdropPaths.length > 0 ? (
              <Image
                loader={imageLoader}
                layout="fill"
                src={bgImage}
                objectFit="fill"
                objectPosition="top"
                alt="Background Image"
              />
            ) : (
              <img
                src={"https://fresh-tomatoes.onrender.com/Images/missing.png"}
                alt="Background Image"
              />
            )}

            <div className="absolute h-full w-full inset-0 bg-gradient-to-b from-black via-transparent to-black flex flex-row items-center justify-center">
              <h1 className="absolute font-extrabold text-white drop-shadow-[0_4.8px_9.6px_rgba(0,0,0,1)] text-6xl text-center p-4">
                {peopleData?.personDetails?.name}
              </h1>
            </div>
          </div>
          <div className="relative flex flex-row items-center justify-center bg-gray-900">
            <div className="relative h-96 w-72 z-60 -mt-48 mb-16">
              {peopleData?.personDetails?.profile_path != "" ? (
                <Image
                  className="rounded-md"
                  loader={imageLoader}
                  src={peopleData?.personDetails?.profile_path}
                  layout="fill"
                  alt={peopleData?.personDetails?.name?.substring(0, 3) || "FT"}
                />
              ) : (
                <img
                  src={"https://fresh-tomatoes.onrender.com/Images/missing.png"}
                  alt={peopleData?.personDetails?.name?.substring(0, 3) || "FT"}
                  className="rounded-md"
                />
              )}
            </div>
          </div>
          <div className="bg-gray-900">
            <h1 className="text-center text-gray-400 text-md flex items-center justify-center flex-row gap-4 pb-8">
              <Cake className="text-green-300" />
              {formatDate(peopleData?.personDetails?.birthday || "")}
            </h1>
            <h1 className="text-center text-gray-400 text-md flex items-center justify-center flex-row gap-4  pb-8">
              <MapPin className="text-green-300" />
              {peopleData?.personDetails?.place_of_birth}
            </h1>
            <Dialog>
              <DialogTrigger className="w-full">
                <h1 className="max-w-full truncate text-center text-gray-300 px-16 py-8">
                  {peopleData?.personDetails?.biography}
                </h1>
              </DialogTrigger>
              <DialogContent className="bg-gray-900 text-gray-300 p-0 m-0">
                <DialogHeader>
                  <DialogTitle className="font-semibold p-8 pb-4">
                    Biography
                  </DialogTitle>
                  <DialogDescription className="">
                    <ScrollArea className="h-[200px] w-full p-8 pt-0 text-gray-300">
                      {peopleData?.personDetails?.biography}
                    </ScrollArea>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
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
                Credits
              </h1>
            </div>
            <div className="text-center text-gray-300 py-8 text-xl px-16">
              <Carousel className="w-full">
                <CarouselContent className="-ml-1">
                  {peopleData?.personCreditDetails?.castData.map(
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
                                  <img
                                    src={
                                      "https://fresh-tomatoes.onrender.com/Images/missing.png"
                                    }
                                    alt={movie.name}
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
                {peopleData?.personCreditDetails?.castData.length > 4 ? (
                  <>
                    <CarouselPrevious />
                    <CarouselNext />
                  </>
                ) : null}
              </Carousel>
            </div>
          </div>
        </div>
      </>
    );
  }
}
