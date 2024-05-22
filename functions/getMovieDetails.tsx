import { Token } from "./getUsername";

interface MovieData {
  movieDetails: object;
}

export default async function getMovieDetails(
  token: Token,
  movieId: number
): Promise<MovieData> {
  try {
    const movieDataURL = "http://localhost:4000/api/getMovieDetails";
    const movieDataOPT = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, movieId }),
    };
    const movieStatus = await fetch(movieDataURL, movieDataOPT);

    if (!movieStatus.ok) {
      throw new Error("Failed to fetch movie data");
    }

    const movieData: MovieData = await movieStatus.json();
    return movieData;
  } catch (error) {
    console.error("Error fetching movie data:", error);
    throw error;
  }
}
