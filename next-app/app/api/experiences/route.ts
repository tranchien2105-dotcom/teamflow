import { NextRequest, NextResponse } from "next/server";

import { createServerApi } from "@/lib/server-axios";

export async function GET() {
    try {
        const api = await createServerApi();

        const { data } = await api.get("/api/experiences");

        return NextResponse.json(data);
    } catch (error: any) {
        console.error(
            "GET /api/experiences failed:",
            error?.response?.data || error
        );

        return NextResponse.json(
            {
                message:
                    error?.response?.data?.message ||
                    "Failed to fetch experiences",
            },
            {
                status: error?.response?.status || 500,
            }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const api = await createServerApi();

        const { data } = await api.post(
            "/api/experiences",
            body
        );

        return NextResponse.json(data, {
            status: 201,
        });
    } catch (error: any) {
        console.error(
            "POST /api/experiences failed:",
            error?.response?.data || error
        );

        return NextResponse.json(
            {
                message:
                    error?.response?.data?.message ||
                    "Failed to create experience",
                errors:
                    error?.response?.data?.errors || null,
            },
            {
                status: error?.response?.status || 500,
            }
        );
    }
}