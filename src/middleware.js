import { NextResponse } from "next/server";

export function middleware(request) {
    const token =
        request.cookies.get("adminToken")?.value;

    const pathname =
        request.nextUrl.pathname;
    const method = request.method;

    // Allow access to the login page (avoid redirect loops when token is invalid)
    if (pathname === "/admin/login") {
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

    // Allow public storefront requests that are intentionally guest-accessible
    const isPublicOrderPost = pathname === "/api/orders" && method === "POST";
    const isPublicWhatsappClickPost =
        pathname === "/api/whatsapp-clicks" && method === "POST";

    // Protect mutating API routes with the same admin token logic
    if (
        pathname.startsWith("/api/") &&
        ["POST", "PATCH", "DELETE"].includes(method) &&
        pathname !== "/api/auth/login" &&
        !isPublicOrderPost &&
        !isPublicWhatsappClickPost
    ) {
        if (!token) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized",
                },
                { status: 401 }
            );
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/api/:path*"],
};