import { imageLoader } from "@/functions/imageLoader";
import Image from "next/image";
import Link from "next/link";

interface cardParams {
  movieId: string | number;
  name: string;
  imagePath: string;
}



export default function FavoriteMovieCard({ movieId, name, imagePath }: cardParams) {
  
  return (
      <div className="h-full w-1/4 bg-gray-900 p-4">
        <Link href={`/movies/${movieId}`}>
        <div className="h-3/4 w-full relative">
          <Image
            loader={imageLoader}
            src={imagePath}
            alt="hello"
            layout="fill"
            className="rounded-xl"
          />
        </div>
        <h1 className="text-center p-4 font-extrabold text-white">{name}</h1>
        </Link>
      </div>
  );
}
