import { getCookie } from "cookies-next";
import { Token } from "./getUsername";

const deleteReviewURL = `${process.env.NEXT_PUBLIC_BACKENDURL}deleteReview`;

export default async function deleteReview( movieId : number) {
    const token : Token = getCookie(process.env.NEXT_PUBLIC_FTATOKEN || "error");
    try {
        const deleteReviewOPT = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token, movie_id : movieId }),
        };
        const deleteReviewStatus = await fetch(deleteReviewURL, deleteReviewOPT);
        if (!deleteReviewStatus.ok) {
          throw new Error("Failed to fetch deleteReview data");
        }
    
        const deleteReviewData= await deleteReviewStatus.json();
        return deleteReviewData;
      } catch (error) {
        console.error("Error fetching deleteReview data:", error);
        throw error;
      }
};
