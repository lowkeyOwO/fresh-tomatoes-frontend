import Review from "./Review";
import { MovieReview } from "./ReviewBox"

interface  ReviewParams {
  reviews : MovieReview[] | any[];
  editable : boolean
} 

export default function generateUserProfileReviews({reviews, editable} : ReviewParams) {
    return reviews.map(review => (<div className="text-center bg-gray-900 text-gray-300 px-16 py-4 text-xl">
    <Review
      key={review.created_at}
      reviewData={{ ...review, movie_id: review.movie_id }}
      editable={editable}
      showProfileCard={false}
      showMovieName={true}
    />
  </div>))
};
