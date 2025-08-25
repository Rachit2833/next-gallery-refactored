'use client';

import { useTransition, useState } from "react";
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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react"; // spinner icon

async function loginUser(formData) {
  try {
    const res = await fetch(`/api/login`, {
      method: "POST",
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.error || "Login failed");
    }

    return await res.json();
  } catch (err) {
    console.error(err);
    return { error: err.message };
  }
}

function LoginForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const data = await loginUser(formData);

      if (data.error) {
        setError(data.error);
        return;
      }

      localStorage.setItem("userId", data.user.id);
      router.push("/services/");
    });
  };

  return (
    <Card className="w-full max-w-md md:shadow-lg md:rounded-2xl border">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>We missed you, welcome back!</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-4">
            <Input
              name="email"
              type="text"
              placeholder="Email"
              className="border border-input p-2 rounded-lg"
              required
            />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              className="border border-input p-2 rounded-lg"
              required
            />
            <p className="text-sm text-muted-foreground">
              Don’t have an account?{" "}
              <Link className="text-blue-500 hover:underline" href="/sign-up">
                Sign up
              </Link>
            </p>
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </CardContent>

        <CardFooter className="flex justify-end gap-4">
          <Button variant="outline" type="button">
            Cancel
          </Button>

          <Button type="submit" disabled={isPending} className="flex items-center gap-2">
            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            {isPending ? "Please wait..." : "Login"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

export default LoginForm;
