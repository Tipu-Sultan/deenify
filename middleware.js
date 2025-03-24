import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request) {
  // Extract the session token and decode user details
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  // If no token exists, redirect to login only if the user is not already there
  if (token && request.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Check if the user is an admin
  const isAdmin = token?.isAdmin;

  // If the user is not an admin and tries to access /admin routes, redirect to home
  if (!isAdmin && request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Apply middleware to admin routes only
export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"], // You can add other protected routes
};
