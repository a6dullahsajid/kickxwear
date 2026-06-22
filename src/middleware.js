import { NextResponse } from "next/server";

export function middleware(request) {
    const token =
        request.cookies.get("adminToken")?.value;

    const pathname =
        request.nextUrl.pathname;

    // Logged-in user visiting login page
    if (pathname === "/admin/login") {
        if (token) {
            return NextResponse.redirect(
                new URL("/admin", request.url)
            );
        }

        return NextResponse.next();
    }

    // Protect admin routes
    if (pathname.startsWith("/admin")) {
        if (!token) {
            return NextResponse.redirect(
                new URL(
                    "/admin/login",
                    request.url
                )
            );
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};