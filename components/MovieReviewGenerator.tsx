import Review from "./Review";

export interface UserDetails {
  username: string;
  avatar_path: string;
  bio: string;
  joined_date: string;
}

interface Rating {
  $numberDecimal: string;
}

export interface Review {
  username: string;
  title: string;
  review: string;
  created_at: string;
  rating: Rating;
}

interface Reviews {
  movie_id: number;
  movie_name: string;
  release_date: string;
  avg_rating: number;
  review_list: Review[];
}

export interface GenerationParams {
  userDetails: UserDetails[];
  reviews: Reviews;
}



export default function generateReviews({
  userDetails,
  reviews,
}: GenerationParams): JSX.Element[] {
  const { review_list } = reviews;
  return review_list.map((reviewData: Review) => (
    <div className="text-center bg-gray-900 text-gray-300 px-16 py-8 text-xl ">
      <Review
        key={reviewData.created_at}
        reviewData={{ ...reviewData, movie_id: reviews.movie_id, movie_name : reviews.movie_name }}
        editable={false}
        showProfileCard={true}
        reviewProfileData={getUserProfile(userDetails, reviewData.username)}
      />
    </div>
  ));
}

function getUserProfile(userDetails: UserDetails[], username: string) {
  return (
    userDetails.find((user) => user.username === username) || {
      username: "",
      bio: "",
      avatar_path: "",
      joined_date: "",
    }
  );
}
