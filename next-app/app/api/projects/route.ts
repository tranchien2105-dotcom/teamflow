import { NextRequest, NextResponse } from "next/server";

import { createServerApi } from "@/lib/server-axios";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const api = await createServerApi();

        const { data, status } = await api.post(
            "/api/projects",
            body
        );

        return NextResponse.json(data, {
            status,
        });
    } catch (error: any) {
        const status =
            error.response?.status ?? 500;

        return NextResponse.json(
            error.response?.data ?? {
                message: "Something went wrong.",
            },
            {
                status,
            }
        );
    }
}
