import { NextResponse } from "next/server";

function getLaravelApiBaseUrl() {
    const baseUrl = process.env.LARAVEL_API_URL || process.env.NEXT_PUBLIC_API_URL || "http://host.docker.internal:8080";
    return baseUrl.replace(/\/$/, "");
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const url = `${getLaravelApiBaseUrl()}/api/api-login`;

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


        // lưu token vào HttpOnly Cookie
        res.cookies.set(
            "token",
            data.token,
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 60 * 60 * 24 * 7, // 7 ngày
                path: "/",
            }
        );


        return res;


    } catch (error: any) {

        return NextResponse.json(
            {
                message: error.message
            },
            {
                status: 500
            }
        );
    }
}