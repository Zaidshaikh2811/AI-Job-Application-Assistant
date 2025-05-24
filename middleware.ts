import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;


    const protectedPaths = ["/dashboard", "/profile", "/admin"];
    const { pathname } = request.nextUrl;

    // If accessing a protected route without a token, redirect to login
    if (protectedPaths.some((path) => pathname.startsWith(path)) && !token) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirect", pathname); // optionally redirect back after login
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}
