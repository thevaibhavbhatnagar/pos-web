// middleware.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { getToken } from "next-auth/jwt";

const PUBLIC_ROUTES = [
  "/",
  "/auth/login",
  "/auth/silent-logout",
  "/unauthorized",
];

export async function middleware(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname;

    // Ignore NextAuth internal routes
    if (pathname.startsWith("/api/auth")) {
      return NextResponse.next();
    }

    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    const isAuthenticated = !!token;

    const isPublicRoute = PUBLIC_ROUTES.some((route) =>
      route === "/" ? pathname === "/" : pathname.startsWith(route),
    );

    // Logged in user visiting auth pages
    if (
      isAuthenticated &&
      pathname.startsWith("/auth") &&
      pathname !== "/auth/silent-logout"
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // Unauthenticated user visiting protected page
    if (!isAuthenticated && !isPublicRoute) {
      const loginUrl = new URL("/auth/login", request.url);

      // Optional callback URL support
      loginUrl.searchParams.set("callbackUrl", pathname);

      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  } catch (error) {
    console.error("MIDDLEWARE ERROR:", error);

    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes
     * - next static files
     * - images
     * - favicon
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
