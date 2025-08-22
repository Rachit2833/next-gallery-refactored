"use client";

import { useState } from "react";
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
    const response = await fetch("https://next-gallery-by-rachit2833.vercel.app/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
      }),
      credentials: "include", // Important to receive HTTP-only cookie
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to sign up");
    }

    return data;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
}

export default function SignUpForm() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPending(true);
    setError("");

    const formData = new FormData(e.target);

    try {
      const data = await signUpUser(formData);
      if (data) {
        // Store user ID locally
        localStorage.setItem("userId", data.user._id);
        // Redirect to home page
        router.push("/");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setPending(false);
    }
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
        <Button variant="default" type="submit" disabled={pending}>
          {pending ? (
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
