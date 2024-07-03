import parse from "html-react-parser";
import { MovieReview } from "./ReviewBox";
import { Button } from "./ui/button";
import { CalendarDays, Edit, Trash } from "lucide-react";
import Link from "next/link";
import deleteReview from "@/functions/deleteReview";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "./ui/use-toast";
import { FormEvent } from "react";
import { ReviewFormData } from "./ReviewInput";
import { useRouter } from "next/navigation";

interface ReviewParams {
  reviewData: MovieReview;
  editable: boolean;
  showProfileCard: boolean;
  reviewProfileData?: {
    username: string;
    bio: string;
    avatar_path: string;
    joined_date: string;
  };
  setEditing?: (
    setEditStatus: boolean,
    defaultInputData: ReviewFormData
  ) => void;
  showMovieName?: boolean;
}

export function formatDate(inputDate: string): string {
  const date = new Date(inputDate);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate;
}

function getPathColor(val: number): string {
  if (val > 75) {
    return "#86EFAC";
  } else if (val > 50 && val < 75) {
    return "#fde047";
  } else {
    return "#fca5a5";
  }
}

export default function Review({
  reviewData,
  editable,
  reviewProfileData,
  showProfileCard,
  setEditing,
  showMovieName
}: ReviewParams) {
  const router = useRouter();
  const { toast } = useToast();
  const parsedReview = parse(reviewData.review);
  const handleDelete = async (movieId: number) => {
    const deleteStatus: any = await deleteReview(movieId);
    if (deleteStatus["success"]) {
      toast({
        title: "Success!",
        description: "Review Deleted Successfully!",
      });
      const reviewResetData = {
        title: "",
        content: "",
        date: new Date(),
        rating: [0],
      };
      if (setEditing) {
        setEditing(false, reviewResetData);
      }
    }
  };
  const setEditStatus = (editStatus: boolean) => {
    const reviewInputData = {
      title: reviewData.title,
      content: reviewData.review,
      date: new Date(reviewData.created_at),
      rating: [+reviewData.rating.$numberDecimal * 10],
    };
    if (setEditing) {
      setEditing(editStatus, reviewInputData);
    }
  };
  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between mx-4">
        {showProfileCard && reviewProfileData && (
          <HoverCard>
            <div className="w-1/5 flex flex-col">
              <HoverCardTrigger>
                <Link
                  className="font-extrabold text-2xl float-left relative bg-gray-900 border p-2 rounded-md border-gray-700 flex flex-row content-center"
                  href={`/profile/${reviewProfileData.username}`}
                >
                  <Avatar className="p-1">
                    <AvatarImage
                      src={`${process.env.NEXT_PUBLIC_AVATARURL}${reviewProfileData.avatar_path}`}
                    />
                    <AvatarFallback className="text-black font-bold uppercase text-xl">
                      {reviewProfileData.username.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <h1 className="mx-4">{reviewProfileData.username}</h1>
                </Link>
              </HoverCardTrigger>
            </div>
            <HoverCardContent className="w-80 bg-gray-900 text-gray-300">
              <Link href={`/users/${reviewProfileData.username}`}>
                <div className="flex justify-between items-center space-x-4">
                  <Avatar>
                    <AvatarImage
                      src={`${process.env.NEXT_PUBLIC_AVATARURL}${reviewProfileData.avatar_path}`}
                    />
                    <AvatarFallback className="text-black font-bold uppercase">
                      {reviewProfileData.username.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-left border-b border-gray-700">
                      {reviewProfileData.username}
                    </h4>
                    <p className="text-sm text-left">
                      {reviewProfileData.bio.length === 0
                        ? "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia, nobis?"
                        : reviewProfileData.bio}
                    </p>
                    <div className="flex items-center pt-2">
                      <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                      <span className="text-xs text-muted-foreground">
                        Joined {formatDate(reviewProfileData.joined_date)}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </HoverCardContent>
          </HoverCard>
        )}
        {
          showMovieName && (
            <Link
                  className="font-extrabold text-2xl float-left relative bg-gray-900 border p-2 rounded-md border-gray-700 flex flex-row items-center justify-start w-1/2"
                  href={`/movies/${reviewData.movie_id}`}
                >
                  <h1 className="mx-4">{reviewData.movie_name}</h1>
                </Link>
          )
        }
        {editable && (
          <div className="w-full flex justify-end mr-8 mt-8" id="edit-review">
            <Button
              className="text-sky-300 bg-gray-900 hover:text-sky-600 hover:bg-gray-900"
              onClick={(e: FormEvent) => {
                e.preventDefault();
                if (setEditing) {
                  setEditStatus(true);
                } else {
                  router.replace(`/movies/${reviewData.movie_id}`, { scroll: false });
                }
              }}
            >
              <Edit />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="text-red-300 bg-gray-900 hover:text-red-600 hover:bg-gray-900">
                  <Trash />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-gray-900">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-gray-300">
                    Do you want to delete this review?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    <h1 className="text-gray-300">Title: {reviewData.title}</h1>
                    This action cannot be undone. The rating will be permanently
                    removed from our servers and from TMDB.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-gray-100 hover:bg-gray-400">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-red-600 hover:bg-red-700"
                    onClick={() => handleDelete(reviewData.movie_id)}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </div>
      <div className="flex flex-col max-h-screen p-4 m-4 bg-gray-900 border border-gray-700 rounded-md">
        <div className="h-1/5 w-full flex items-start justify-between">
          <h1 className="font-semibold text-4xl">{reviewData.title}</h1>
          <div className="font-extrabold w-[5%] relative top-1 right-1 flex flex-col items-center justify-center">
            <CircularProgressbar
              value={+reviewData.rating.$numberDecimal * 10}
              styles={buildStyles({
                pathColor: getPathColor(+reviewData.rating.$numberDecimal * 10),
                textColor: "#fff",
                trailColor: "#111827",
              })}
            />
              <h1 className="absolute text-xs md:text-sm">{+reviewData.rating.$numberDecimal * 10}%</h1>
          </div>
        </div>
        <div className="h-1/5 w-full flex justify-between items-center pb-4 border-b border-gray-700">
          <div className="bg-gray-900 flex flex-row items-center">
            <h1 className="font-thin text-sm -mt-4">
              {formatDate(reviewData.created_at)}
            </h1>
          </div>
        </div>
        <div className="h-3/5 w-full flex items-start mt-4 text-normal">
          {parsedReview}
        </div>
      </div>
    </div>
  );
}
