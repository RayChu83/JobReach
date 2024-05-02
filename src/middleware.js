import { NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth((req) => {
  const pathname = req.nextUrl.pathname;
  const unprotectedPaths = ["/", "/contact", "/login", "/register"];
  if (!req.auth && !unprotectedPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  const protectedPathsIfSession = ["/login", "/register"];
  if (req.auth && protectedPathsIfSession.includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }
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
