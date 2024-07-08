import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken");
  const refreshToken = cookieStore.get("refreshToken");
  if (!token || !refreshToken) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/users/:path*", "/sources/:path*", "/admins/:path*", "/roles/:path*"],
};
