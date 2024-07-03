import Image from "next/image";
import preloader from "@/public/preloader.gif";

export default async function Loading() {
  return <Image src={preloader} alt="Fresh Tomatoes" className="h-screen w-screen"/>;
}

