import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request) {
  // Extract the session token
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  // If user is logged in and tries to access /login, redirect to home
  if (token && request.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Check if the user is an admin
  const isAdmin = token?.isAdmin === true; // Ensure explicit check for true

  // If user is not an admin and tries to access /admin routes, redirect to home
  if (!isAdmin && request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Allow the request to proceed if no conditions are met
  return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
  matcher: ["/admin/:path*", "/login"], // Protect admin routes and login
};