import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const PUBLIC_ROUTES = ["/", "/auth/login","/auth/sign-up", "/auth/forgot-password", "/auth/silent-logout", "/unauthorized"];

export async function proxy(request: NextRequest) {

    const pathname = request.nextUrl.pathname;

    // NextAuth session token (NOT your accessToken cookie)
    const sessionToken = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });

    const isAuthenticated = !!sessionToken;

    const isPublicRoute = PUBLIC_ROUTES.some((path) =>
        path === "/" ? pathname === "/" : pathname.startsWith(path)
    );

    // If logged in and tries public page → dashboard
    if (isAuthenticated && pathname.startsWith("/auth")) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // If not logged in and tries private page → login
    if (!isAuthenticated && !isPublicRoute) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    // 🔑 Skip permission check for public pages
    if (isPublicRoute) {
        return NextResponse.next();
    }

    return NextResponse.next();
}

// Apply middleware to all routes except specific public routes like login and forgot password
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|auth/silent-logout).*)"],
};
