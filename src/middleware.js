import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export default async function middleware(req) {
  const pathname = req.nextUrl.pathname;
  const isLoggedIn = await getToken({req})

  const unprotectedPaths = ["/", "/contact", "/login", "/register"];
  if (!isLoggedIn && !unprotectedPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
  }
  const protectedPathsIfSession = ["/login", "/register"];
  if (isLoggedIn && protectedPathsIfSession.includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return null;
}

export const config = {
  matcher: [
    "/login",
    "/contact",
    "/jobs/:path*",
    "/companies/:path*",
    "/register",
    "/profile",
    "/",
  ],
};
