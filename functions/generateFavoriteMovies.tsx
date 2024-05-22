import FavoriteMovieCard from "@/components/FavoriteMovieCard";
import GetFavoriteMovies from "@/components/GetFavoriteMovies";
import { ReactNode } from "react";

interface favMoviePack {
  favoriteMovieObj: any[];
  favMovieList: number[];
}

export default function generateFavoriteMovies({
  favoriteMovieObj,
  favMovieList,
}: favMoviePack): ReactNode[] {
  let favMovies: ReactNode[] = [];
  for (let favMovie of favoriteMovieObj) {
    if (favMovieList.includes(favMovie.id)) {
      favMovies.push(
        <FavoriteMovieCard
          movieId={favMovie.id}
          name={favMovie.title}
          imagePath={favMovie.poster_path}
        />
      );
    }
  }
  if (favMovies.length === 0) {
    favMovies.push(<GetFavoriteMovies key="getFavoriteMovies" />);
  }
  return favMovies;
}
