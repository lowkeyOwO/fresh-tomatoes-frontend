import Image from "next/image";
import preloader from "@/public/preloader.gif";

export default async function Loading() {
  return (
    <img
      src={"https://fresh-tomatoes.onrender.com/preloader.gif"}
      alt="Fresh Tomatoes"
      className="h-screen w-screen"
    />
  );
}
