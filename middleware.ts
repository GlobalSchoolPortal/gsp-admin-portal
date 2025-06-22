import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Get token from cookies
  const token = request.cookies.get("token")?.value

  // Enhanced debug logging
  const timestamp = new Date().toISOString()
  console.log(`\n🔍 MIDDLEWARE [${timestamp}]`)
  console.log(`   Path: ${pathname}`)
  console.log(`   Token exists: ${!!token}`)
  console.log(`   User Agent: ${request.headers.get("user-agent")?.substring(0, 50)}...`)

  // Public routes that don't require authentication
  const publicRoutes = ["/login", "/"]
  const isPublicRoute = publicRoutes.includes(pathname)

  console.log(`   Is public route: ${isPublicRoute}`)

  // If user is not authenticated and trying to access protected route
  if (!token && !isPublicRoute) {
    console.log(`   ❌ REDIRECTING TO LOGIN (no token for protected route)`)
    const loginUrl = new URL("/login", request.url)
    return NextResponse.redirect(loginUrl)
  }

  // If user is authenticated and trying to access login page
  if (token && pathname === "/login") {
    console.log(`   ✅ USER HAS TOKEN, REDIRECTING FROM LOGIN`)

    // Try to get user data from a cookie or use a default redirect
    // Since we can't easily access sessionStorage in middleware, we'll use a cookie approach
    const userRole = request.cookies.get("userRole")?.value
    console.log(`   👤 User role from cookie: ${userRole}`)

    let redirectPath = "/admin/dashboard" // Default fallback

    // Determine redirect path based on user role
    switch (userRole) {
      case "ADMIN":
        redirectPath = "/admin/dashboard"
        break
      case "TEACHER":
        redirectPath = "/teacher/dashboard"
        break
      case "PARENT":
        redirectPath = "/parent/dashboard"
        break
      case "STUDENT":
        redirectPath = "/student/dashboard"
        break
      default:
        // If no role cookie found, redirect to admin dashboard as fallback
        redirectPath = "/admin/dashboard"
        console.log(`   ⚠️ No role cookie found, using default redirect`)
    }

    console.log(`   🎯 Redirecting to: ${redirectPath}`)
    const dashboardUrl = new URL(redirectPath, request.url)
    return NextResponse.redirect(dashboardUrl)
  }

  // Role-based route protection
  if (token) {
    const userRole = request.cookies.get("userRole")?.value
    console.log(`   🔐 Checking role-based access for: ${userRole}`)

    // Define role-based route access
    const roleRoutes = {
      ADMIN: ["/admin"],
      TEACHER: ["/teacher"],
      PARENT: ["/parent"],
      STUDENT: ["/student"],
    }

    // Check if user is trying to access a role-specific route
    for (const [role, routes] of Object.entries(roleRoutes)) {
      const isAccessingRoleRoute = routes.some((route) => pathname.startsWith(route))

      if (isAccessingRoleRoute && userRole !== role) {
        console.log(`   ❌ UNAUTHORIZED ACCESS: ${userRole} trying to access ${role} route`)

        // Redirect to their appropriate dashboard
        let correctPath = "/admin/dashboard" // Default fallback
        switch (userRole) {
          case "ADMIN":
            correctPath = "/admin/dashboard"
            break
          case "TEACHER":
            correctPath = "/teacher/dashboard"
            break
          case "PARENT":
            correctPath = "/parent/dashboard"
            break
          case "STUDENT":
            correctPath = "/student/dashboard"
            break
        }

        console.log(`   🔄 Redirecting to correct dashboard: ${correctPath}`)
        return NextResponse.redirect(new URL(correctPath, request.url))
      }
    }
  }

  console.log(`   ✅ ALLOWING REQUEST TO CONTINUE`)
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
