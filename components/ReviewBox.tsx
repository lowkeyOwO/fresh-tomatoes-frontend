"use client";
import { useState } from "react";
import reviewExists from "@/functions/reviewExists";
import addReview from "@/functions/addReview";
import { getCookie } from "cookies-next";
import Review from "./Review";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "./ui/use-toast";
import ReviewInput, { ReviewFormData } from "./ReviewInput";
import editReview from "@/functions/editReview";

export interface MovieReview {
  movie_name : string;
  movie_id: number;
  title: string;
  review: string;
  rating: {
    $numberDecimal: string;
  };
  created_at: string;
}

export interface ProfileData {
  userDetails: {
    userExists: {
      username: string;
      bio: string;
      avatar_path: string;
      reviewed_movies: MovieReview[];
      joined_date: string;
    };
  };
}
interface ProfileProps {
  profileData: ProfileData | null;
  movieId: string;
  movieData: {
    movieName: string;
    avgRating: number;
    movieDate: string;
  };
  editable: boolean;
  showProfileCard: boolean;
}

export default function ReviewBox({
  profileData,
  movieId,
  movieData,
  editable,
  showProfileCard,
}: ProfileProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date(Date.now()));
  const [rating, setRating] = useState<number[]>([0]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [originalData, setOriginalData] = useState<ReviewFormData>({
    title: "",
    date: new Date(),
    rating: [],
    content: "",
  });
  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };
  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };
  const handleDateChange = (newDate: Date) => {
    setDate(newDate);
  };
  const handleRatingChange = (newRating: number[]) => {
    setRating(newRating);
  };
  const handleEditingChange = (
    editStatus: boolean,
    defaultInputData: ReviewFormData
  ) => {
    setOriginalData({
      title: defaultInputData.title,
      date: new Date(defaultInputData.date),
      rating: defaultInputData.rating,
      content: defaultInputData.content,
    });
    handleTitleChange(defaultInputData.title);
    handleContentChange(defaultInputData.content);
    handleDateChange(defaultInputData.date);
    handleRatingChange(defaultInputData.rating);
    setIsEditing(editStatus);
  };
  const handleSubmit = async () => {
    const token = getCookie(process.env.NEXT_PUBLIC_FTATOKEN || "error");
    if (isEditing) {
      if (
        originalData.title !== title ||
        originalData.content !== content ||
        originalData.date != date ||
        originalData.rating != rating
      ) {
        const editReviewData = await editReview({
          token,
          title,
          content,
          date,
          rating,
          movieId,
        });
        if (editReviewData.error) {
          toast({
            variant: "destructive",
            title: "Error",
            description: editReviewData.error,
          });
        } else {
          toast({
            variant: "success",
            title: "Success!",
            description: editReviewData.success,
          });
          queryClient.invalidateQueries({ queryKey: ["profileData"] });
        }
        setIsEditing(false);
      } else {
        setIsEditing(false);
      }
    } else {
      const addReviewData = await addReview({
        token,
        title,
        content,
        date,
        rating,
        movieId,
        movieData,
      });
      if (addReviewData.error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: addReviewData.error,
        });
      } else {
        toast({
          variant: "success",
          title: "Success!",
          description: addReviewData.success,
        });
        queryClient.invalidateQueries({ queryKey: ["profileData"] });
      }
    }
  };
  if (profileData) {
    if (profileData.userDetails.userExists.reviewed_movies) {
      const reviewData = reviewExists(
        movieId,
        profileData.userDetails.userExists.reviewed_movies
      );
      if (reviewData && !isEditing) {
        const reviewProfileData = {
          username: profileData.userDetails.userExists.username,
          bio: profileData.userDetails.userExists.bio,
          avatar_path: profileData.userDetails.userExists.avatar_path,
          joined_date: profileData.userDetails.userExists.joined_date,
        };
        return (
          <Review
            reviewData={reviewData}
            reviewProfileData={reviewProfileData}
            editable={editable}
            showProfileCard={showProfileCard}
            setEditing={handleEditingChange}
          />
        );
      } else {
        return (
          <ReviewInput
            handleSubmit={handleSubmit}
            handleTitleChange={handleTitleChange}
            handleDateChange={handleDateChange}
            handleRatingChange={handleRatingChange}
            handleContentChange={handleContentChange}
            reviewInputData={{ title, date, rating, content }}
            isEditing={isEditing}
          />
        );
      }
    }
  } else {
    return <h1>error</h1>;
  }
}
