import Link from "next/link";
import { Separator } from "./ui/separator";

interface SelectionParams {
  id: number;
  name: string;
}

interface SelectionProps {
  selection: SelectionParams[];
}

const GenreColor: { [key: string]: string } = {
    action: "#FF7F50",          // coral
    adventure: "#556B2F",       // olive-drab
    animation: "#0000FF",       // blue
    comedy: "#FFD700",          // gold
    crime: "#800000",           // maroon
    documentary: "#4B0082",     // indigo
    drama: "#8B008B",           // dark-magenta
    family: "#FF69B4",          // hot-pink
    fantasy: "#663399",         // rebecca-purple
    history: "#008080",         // teal
    horror: "#FF4500",          // orangered
    music: "#FA8072",           // salmon
    mystery: "#800080",         // purple
    romance: "#FF1493",         // deep-pink
    sciencefiction: "#87CEFA",  // lime
    thriller: "#DC143C",        // crimson
    tvmovie: "#FFD700",         // gold
    war: "#B22222",             // fire-brick
    western: "#DAA520"          // goldenrod
};

export default function Genres({ selection }: SelectionProps) {
  let genreList = selection.map((genre: SelectionParams) => {
    return (
        <Link href={`/genres/${genre.name.replace(" ","-")}`}>
      <div
        key={genre.id}
        className="rounded-full mx-2 hover:scale-105 hover:drop-shadow-[0_4.8px_9.6px_rgba(0,0,0,1)]"
        style={{
            backgroundColor : GenreColor[genre.name.replace(" ","").toLowerCase()]
        }}
      >
        <h1 className="p-1 mx-4 text-white text-center font-bold text-sm drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">{genre.name}</h1>
      </div>
      </Link>
    );
  });
  return <>{genreList}</>;
}
