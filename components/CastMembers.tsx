import { imageLoader } from "@/functions/imageLoader";
import Image from "next/image";
interface CastDetails {
  details: {
    adult : boolean
    gender: 2,
    "id": 130111,
    "known_for_department": "Acting",
    "name": "Nassar",
    "original_name": "Nassar",
    "popularity": 27.196,
    "profile_path": "/ix6L5OdJ9eQMPW4MF4OkIdeOnlo.jpg",
    "cast_id": 3,
    "character": "Kandasamy Padayachi",
    "credit_id": "52fe4520c3a368484e04a0bb",
    "order": 2
}
}

export default function CastMember({ details }: CastDetails) {
    console.log(details);
  return (
    <>
      
    </>
  );
}
