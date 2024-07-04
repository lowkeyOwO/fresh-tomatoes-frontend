import Image from "next/image";
import preloader from "@/public/preloader.gif";

export default function Loading() {
  return <Image unoptimized src={preloader} alt="Fresh Tomatoes" className="h-screen w-screen"/>;
}
