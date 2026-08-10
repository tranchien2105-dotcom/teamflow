import { NextRequest, NextResponse } from "next/server";
import { createServerApi } from "@/lib/server-axios";

export async function GET(request: NextRequest) {
    try {
        const api = await createServerApi();

        const { data } = await api.get("/api/technologies");

        return NextResponse.json(data);
    } catch (error: any) {
        console.error(
            "GET /api/technologies error:",
            error?.response?.data ?? error
        );

        return NextResponse.json(
            {
                message:
                    error?.response?.data?.message ??
                    "Failed to fetch technologies.",
            },
            {
                status: error?.response?.status ?? 500,
            }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const api = await createServerApi();

        const { data } = await api.post(
            "/api/technologies",
            body
        );

        return NextResponse.json(data, {
            status: 201,
        });
    } catch (error: any) {
        console.error(
            "POST /api/technologies error:",
            error?.response?.data ?? error
        );

        return NextResponse.json(
            {
                message:
                    error?.response?.data?.message ??
                    "Failed to create technology.",

                errors:
                    error?.response?.data?.errors ??
                    null,
            },
            {
                status: error?.response?.status ?? 500,
            }
        );
    }
}