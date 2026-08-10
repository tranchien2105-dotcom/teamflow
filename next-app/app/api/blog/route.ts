import { NextResponse } from "next/server";
import { createServerApi } from "@/lib/server-axios";

export async function GET() {
    try {
        const api = await createServerApi();

        const { data } = await api.get(
            "/api/blog-posts"
        );

        return NextResponse.json(data);
    } catch (error: any) {
        console.error(error);

        return NextResponse.json(
            {
                message: error.message,
                data: error.response?.data,
                stack: error.stack,
            },
            {
                status:
                    error.response?.status ?? 500,
            }
        );
    }
}

export async function POST(
    request: Request
) {
    try {
        const api = await createServerApi();

        const body = await request.json();

        const { data } = await api.post(
            "/api/blog-posts",
            body
        );

        return NextResponse.json(data, {
            status: 201,
        });
    } catch (error: any) {
        console.error(error);

        return NextResponse.json(
            {
                message: error.message,
                data: error.response?.data,
                stack: error.stack,
            },
            {
                status:
                    error.response?.status ?? 500,
            }
        );
    }
}
