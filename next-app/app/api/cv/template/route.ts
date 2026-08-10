import { NextRequest, NextResponse } from "next/server";
import { createServerApi } from "@/lib/server-axios";

export async function PUT(request: NextRequest) {
    try {
        const api = await createServerApi();

        const body = await request.json();

        const { data } = await api.put(
            "/api/cv/template",
            body
        );

        return NextResponse.json(data);
    } catch (error: any) {
        console.error(
            "Failed to update CV template:",
            error
        );

        return NextResponse.json(
            {
                message: error.message,
                data: error.response?.data,
            },
            {
                status:
                    error.response?.status ?? 500,
            }
        );
    }
}

