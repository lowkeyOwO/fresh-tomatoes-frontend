import { Token } from "./getUsername";

interface ReviewParams {
  token: Token;
  title: string;
  content: string;
  date: Date;
  rating: number[];
  movieId: string;
}

const editReviewURL = `${process.env.NEXT_PUBLIC_BACKENDURL}editReview`;

export default async function editReview({
  token,
  title,
  content,
  date,
  rating,
  movieId,
}: ReviewParams) {
  try {
    const editReviewOPT = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        movie_id: movieId,
        title,
        review: content,
        rating: rating[0] / 10,
        date: date,
      }),
    };

    const editReviewStatus = await fetch(editReviewURL, editReviewOPT);
    const editReviewData = await editReviewStatus.json();
    if (editReviewStatus.ok) {
      if (editReviewData.success) {
        return editReviewData;
      }
    } else {
      console.error("API request failed", editReviewData.error);
      return { error: "Editing review unsuccessful!" };
    }
  } catch (error) {
    console.error(error);
    return { error: error };
  }
}
