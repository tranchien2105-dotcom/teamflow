import { NextResponse } from "next/server";

function getLaravelApiBaseUrl() {
    const baseUrl =
        process.env.LARAVEL_API_URL ||
        process.env.NEXT_PUBLIC_API_URL ||
        "http://laravel:8000";

    return baseUrl.replace(/\/$/, "");
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const url = `${getLaravelApiBaseUrl()}/api/login`;

        const response = await fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(data, {
                status: response.status,
            });
        }

        const res = NextResponse.json({
            user: data.user,
        });

        const appUrl = process.env.NEXT_PUBLIC_APP_URL || "";

        const isHttps = appUrl.startsWith("https://");

        // Lưu token vào HttpOnly Cookie
        res.cookies.set("token", data.token, {
            httpOnly: true,
            secure: isHttps,
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
        });

        return res;
    } catch (error: any) {
        return NextResponse.json(
            {
                message: error.message,
            },
            {
                status: 500,
            }
        );
    }
}