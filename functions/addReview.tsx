import { Token } from "./getUsername";

interface ReviewParams {
  token: Token;
  title: string;
  content: string;
  date: Date;
  rating: number[];
  movieId: string;
  movieData: {
    movieName: string;
    avgRating: number;
    movieDate: string;
  };
}

const addReviewURL = `${process.env.NEXT_PUBLIC_BACKENDURL}addReview`;

export default async function addReview({
  token,
  title,
  content,
  date,
  rating,
  movieId,
  movieData,
}: ReviewParams) {
  try {
    const { movieName, avgRating, movieDate } = movieData;
    const addReviewOPT = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        movieId,
        title,
        review: content,
        rating: rating[0] / 10,
        createdAt: date,
        movieName,
        avgRating,
        movieDate,
      }),
    };

    const addReviewStatus = await fetch(addReviewURL, addReviewOPT);
    const addReviewData = await addReviewStatus.json();
    if (addReviewStatus.ok) {
      if (addReviewData.success) {
        return addReviewData;
      }
    } else {
      console.error("API request failed", addReviewData.error);
      return { error: "adding review Unsuccessful!" };
    }
  } catch (error) {
    console.error(error);
    return { error: error };
  }
}
