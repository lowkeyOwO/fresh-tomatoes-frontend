import {
  Swords,
  Map,
  Baby,
  Laugh,
  Search,
  ScrollText,
  Drama,
  Users2,
  ShieldHalf,
  BookX,
  Ghost,
  Music4,
  FileQuestion,
  Heart,
  Glasses,
  Activity,
  Tv,
  Ship,
  Mountain,
} from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

interface SelectionParams {
  id: number;
  name: string;
}

interface SelectionProps {
  selection: SelectionParams[];
}

const GenreColor: { [key: string]: string } = {
  action: "#FF8C00", // dark-orange
  adventure: "#6B8E23", // olive-drab
  animation: "#6495ED", // cornflower-blue
  comedy: "#FFD700", // gold
  crime: "#8B0000", // dark-red
  documentary: "#483D8B", // dark-slate-blue
  drama: "#9932CC", // dark-orchid
  family: "#FF1493", // deep-pink
  fantasy: "#8A2BE2", // blue-violet
  history: "#008080", // teal
  horror: "#FF6347", // tomato
  music: "#4682B4", // steel-blue
  mystery: "#4B0082", // indigo
  romance: "#FF69B4", // hot-pink
  sciencefiction: "#87CEEB", // sky-blue
  thriller: "#DC143C", // crimson
  tvmovie: "#FFD700", // gold
  war: "#800000", // maroon
  western: "#CD853F", // peru
};




const GenreIcon: { [key: string]: ReactNode } = {
  action: <Swords />, // coral
  adventure: <Map />, // olive-drab
  animation: <Baby />, // blue
  comedy: <Laugh />, // gold
  crime: <Search />, // maroon
  documentary: <ScrollText />, // indigo
  drama: <Drama />, // dark-magenta
  family: <Users2 />, // hot-pink
  fantasy: <ShieldHalf />, // rebecca-purple
  history: <BookX />, // teal
  horror: <Ghost />, // orangered
  music: <Music4 />, // salmon
  mystery: <FileQuestion />, // purple
  romance: <Heart />, // deep-pink
  sciencefiction: <Glasses />, // lime
  thriller: <Activity />, // crimson
  tvmovie: <Tv />, // gold
  war: <Ship />, // fire-brick
  western: <Mountain />, // goldenrod
};

export default function Genres({ selection }: SelectionProps) {
  let genreList = selection.map((genre: SelectionParams) => {
    return (
      <div key={genre.id}>
        <div
          className="rounded-xl flex items-center justify-center  drop-shadow-[0_4.8px_9.6px_rgba(0,0,0,1)] py-2 px-4 mx-2"
          style={{
            backgroundColor:
              GenreColor[genre.name.replace(" ", "").toLowerCase()],
          }}
        >
          {GenreIcon[genre.name.replace(" ", "").toLowerCase()]}
          <h1 className="mx-4 text-gray-900 text-center font-bold text-lg">
            {genre.name}
          </h1>
        </div>
      </div>
    );
  });
  return <>{genreList}</>;
}
/**/
