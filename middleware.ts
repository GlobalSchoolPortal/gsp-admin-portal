import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get all possible token names
  const token = request.cookies.get("token")?.value ||
      request.cookies.get("auth-token")?.value ||
      request.cookies.get("jwt")?.value ||
      request.cookies.get("access_token")?.value;

  // Debug logging with timestamp
  console.log(`Middleware - [${new Date().toISOString()}] Path:`, pathname);
  console.log(`Middleware - [${new Date().toISOString()}] Token exists:`, !!token);
  console.log(`Middleware - [${new Date().toISOString()}] All cookies:`, request.cookies.getAll().map(c => `${c.name}=${c.value}`));

  // Public routes that don't require authentication
  const publicRoutes = ["/login", "/"];
  const isPublicRoute = publicRoutes.includes(pathname);

  // If user is not authenticated and trying to access protected route
  if (!token && !isPublicRoute) {
    console.log(`Middleware - [${new Date().toISOString()}] Redirecting to login (no token)`);
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If user is authenticated and trying to access login page
  console.log(token, pathname)
  if (token && pathname === "/login") {
    console.log(`Middleware - [${new Date().toISOString()}] Redirecting to dashboard (has token)`);
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  console.log(`Middleware - [${new Date().toISOString()}] Allowing request to continue for:`, pathname);
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
