import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth((req) => {
  const pathname = req.nextUrl.pathname
  const isLoggedIn = req.nextauth.token;
  const unprotectedPaths = ["/", "/contact", "/login", "/register"];
  if (!isLoggedIn && !unprotectedPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
  }
  const protectedPathsIfSession = ["/login", "/register"];
  if (isLoggedIn && protectedPathsIfSession.includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return null;
});

export const config = {
    matcher: [
      "/login",
      "/contact",
      "/jobs/:path*",
      "/companies/:path*",
      "/register",
      "/",
    ],
  };
