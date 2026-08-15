import { NextRequest, NextResponse } from "next/server";

import { createServerApi } from "@/lib/server-axios";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();

        const api = await createServerApi();

        const { data, status } = await api.post(
            "/api/projects",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return NextResponse.json(data, {
            status,
        });
    } catch (error: any) {
        console.error(
            "POST /api/projects error:",
            error.response?.data ?? error
        );

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