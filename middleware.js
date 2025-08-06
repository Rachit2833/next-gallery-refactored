import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = req.cookies.get("session")?.value;
  const { pathname } = req.nextUrl;
  if (token) {
    try {
      // https://next-gallery-by-rachit2833.vercel.app/user/verify-user", {
      //   method: "POST",
      const authResponse = await fetch("https://next-gallery-by-rachit2833.vercel.app/user/verify-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // ✅ If token is valid
      if (authResponse.ok) {
        // Redirect logged-in user away from /login and /sign-up
        if (pathname === "/login" || pathname === "/sign-up") {
          console.log("Authenticated user trying to access auth page. Redirecting to /");
          return NextResponse.redirect(new URL("/", req.url));
        }

        return NextResponse.next(); // allow access to protected routes
      }

      // 🔴 Invalid token — redirect to login
      console.log("Invalid token, redirecting to /login");
      return NextResponse.redirect(new URL("/login", req.url));

    } catch (error) {
      console.error("Error verifying token:", error);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // 🔴 No token
  if (pathname !== "/login" && pathname !== "/sign-up") {
    console.log("No token and trying to access protected route. Redirecting to /login");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // ✅ No token, but accessing public route (login or sign-up)
  return NextResponse.next();
}


// ✅ Apply middleware only to protected routes (exclude /login and /sign-up)
export const config = {
  matcher: [
    "/",               
    "/albums",
    "/friends",
    "/people",
    "/favourites",
    "/memory-map",
    "/post",
    "/login",
    "/sign-up",
  ],
};
