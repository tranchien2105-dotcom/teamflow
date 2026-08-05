import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;

    const isLoginPage = request.nextUrl.pathname === "/login";

    // Chưa đăng nhập -> không cho vào dashboard
    if (!token && !isLoginPage) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // Đã đăng nhập -> không cho quay lại login
    if (token && isLoginPage) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/login",
    ],
};