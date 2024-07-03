"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Authorize from "@/functions/authorization";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function LoginCard() {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const handleLogin = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      const result = await Authorize({ username, password });
      if (result.error) {
        throw new Error(result.error);
      }
      if (result.token !== undefined) {
        router.replace("/home");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Card className="w-4/5 bg-gray-900">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-semibold text-white">
          Login to TMDB
        </CardTitle>
        <CardDescription className="text-gray-100 opacity-60">
          We do not store your passwords.
        </CardDescription>
      </CardHeader>
      <form>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="Username" className="text-white">
              Username
            </Label>
            <Input
              id="Username"
              type="name"
              placeholder="John Doe"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password" className="text-white">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="********"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Label className="text-green-500 mt-6 hover:scale-105 z-60 mb-6">
            <Link href="https://www.themoviedb.org/signup">
              Don't have an Account?
            </Link>
          </Label>
          <Button
            className="text-gray-900 w-28 text-md bg-green-400 hover:bg-green-500 hover:scale-105 z-60"
            onClick={handleLogin}
            type="submit"
          >
            Login
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
