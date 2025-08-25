import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  console.log("hit");
  // forward request to your Express backend
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });

  // clone backend response
  const data = await response.json();
  const res = NextResponse.json(data, { status: response.status });

  // forward cookie if backend sends it
  const cookies = response.headers.get("set-cookie");
  if (cookies) {
    res.headers.set("set-cookie", cookies);
  }

  return res;
}
