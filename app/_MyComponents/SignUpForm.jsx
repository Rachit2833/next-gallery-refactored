"use client";

import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

async function signUpUser(formData) {
  try {
    const res = await fetch(`/api/sign-up`, {
      method: "POST",
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
      }),
      headers: { "Content-Type": "application/json" },
      credentials: "include", // ✅ crucial for cookies
    });

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.error || "Sign-up failed");
    }

    return await res.json();
  } catch (err) {
    console.error(err);
    return { error: err.message };
  }
}

export default function SignUpForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const data = await signUpUser(formData);

      if (data.error) {
        setError(data.error);
        return;
      }

      localStorage.setItem("userId", data.user.id);
      router.push("/services/");
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Welcome, let's get you started</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-4">
          <Input name="name" type="text" placeholder="Name" required />
          <Input name="email" type="email" placeholder="Email" required />
          <Input name="password" type="password" placeholder="Password" required />
          <p className="text-sm">
            Already have an account?{" "}
            <Link className="text-blue-500" href="/login">
              Login
            </Link>
          </p>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </CardContent>

      <CardFooter className="flex justify-end gap-4">
        <Button variant="outline" type="reset">
          Cancel
        </Button>
        <Button variant="default" type="submit" disabled={isPending}>
          {isPending ? (
            <div className="w-6 h-6 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
          ) : (
            <>
              Continue <ArrowRight className="inline-block ml-2" />
            </>
          )}
        </Button>
      </CardFooter>
    </form>
  );
}
