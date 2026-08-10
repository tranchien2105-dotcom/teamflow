import { NextRequest, NextResponse } from "next/server";
import { createServerApi } from "@/lib/server-axios";

type RouteContext = {
    params: Promise<{
        id: string;
    }>;
};

export async function GET(
    request: NextRequest,
    context: RouteContext
) {
    try {
        const { id } = await context.params;

        const api = await createServerApi();

        const { data } = await api.get(
            `/api/projects/${id}/features`
        );

        return NextResponse.json(data);
    } catch (error: any) {
        console.error(
            "GET /api/projects/[id]/features error:",
            error?.response?.data ?? error
        );

        return NextResponse.json(
            {
                message:
                    error?.response?.data?.message ??
                    "Failed to fetch project features.",
            },
            {
                status:
                    error?.response?.status ?? 500,
            }
        );
    }
}

export async function POST(
    request: NextRequest,
    context: RouteContext
) {
    try {
        const { id } = await context.params;

        const body = await request.json();

        const api = await createServerApi();

        const { data } = await api.post(
            `/api/projects/${id}/features`,
            body
        );

        return NextResponse.json(data);
    } catch (error: any) {
        console.error(
            "POST /api/projects/[id]/features error:",
            error?.response?.data ?? error
        );

        return NextResponse.json(
            {
                message:
                    error?.response?.data?.message ??
                    "Failed to create project feature.",

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