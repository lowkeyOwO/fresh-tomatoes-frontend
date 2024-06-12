import { Token } from "./getUsername";

interface ReviewData {
  reviewDetails: object;
}

export default async function getUserReview(
  token: Token,
  movieId: number
): Promise<ReviewData> {
  try {
    const movieDataURL = "http://localhost:4000/api/getMovieReviews";
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
    const movieData: ReviewData = await movieStatus.json();
    return movieData;
  } catch (error) {
    console.error("Error fetching movie data:", error);
    throw error;
  }
}
