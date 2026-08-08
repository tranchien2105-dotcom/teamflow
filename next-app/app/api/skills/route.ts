import { NextRequest, NextResponse } from "next/server";
import { createServerApi } from "@/lib/server-axios";

export async function GET() {
    try {
        const api = await createServerApi();

        const { data } = await api.get(
            "/api/skills"
        );

        return NextResponse.json(data);
    } catch (error: any) {
        console.error(
            "GET /api/skills error:",
            error?.response?.data ?? error
        );

        return NextResponse.json(
            {
                message:
                    error?.response?.data?.message ??
                    "Failed to fetch skills.",
            },
            {
                status:
                    error?.response?.status ?? 500,
            }
        );
    }
}

export async function POST(
    request: NextRequest
) {
    try {
        const body = await request.json();

        const api = await createServerApi();

        const { data } = await api.post(
            "/api/skills",
            body
        );

        return NextResponse.json(
            data,
            {
                status: 201,
            }
        );
    } catch (error: any) {
        console.error(
            "POST /api/skills error:",
            error?.response?.data ?? error
        );

        return NextResponse.json(
            {
                message:
                    error?.response?.data?.message ??
                    "Failed to create skill.",

                errors:
                    error?.response?.data?.errors ??
                    null,
            },
            {
                status:
                    error?.response?.status ?? 500,
            }
        );
    }
}