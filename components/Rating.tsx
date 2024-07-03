import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface RatingProps {
  avgRating: number;
  ratingCount: number;
}

export default function Rating({ avgRating, ratingCount }: RatingProps) {
  return (
    <>
      <div className="h-3/5 w-3/5 flex flex-col justify-center items-center gap-8">
        <CircularProgressbar
          value={avgRating * 10}
          text={`${avgRating}`}
          styles={buildStyles({
            pathColor: `#86EFAC`,
            textColor: "#fff",
            trailColor: "#111827",
          })}
        />
      <h1 className="font-extrabold text-2xl">{ratingCount} votes</h1>
      </div>
    </>
  );
}
