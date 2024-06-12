import { MovieReview } from "@/components/ReviewBox";

type returnParams = MovieReview | undefined;

export default function reviewExists(
  movieId: string,
  reviewed_movies: MovieReview[]
): returnParams {
  return reviewed_movies.find((review) => review.movie_id === +movieId);
}
