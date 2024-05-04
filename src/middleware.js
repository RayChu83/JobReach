export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/jobs/:path*", "/companies/:path*", "/profile"],
};
