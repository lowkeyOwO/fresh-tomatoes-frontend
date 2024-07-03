"use client";
import { useRouter } from "next/navigation";
import { useUsernameData } from "./layout";

export default function ProfileRedirector() {
  const usernameData = useUsernameData();
  const router = useRouter();
  router.replace(`/profile/${usernameData}`);
}
