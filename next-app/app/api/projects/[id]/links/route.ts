import { NextRequest, NextResponse } from "next/server";
import { createServerApi } from "@/lib/server-axios";

type RouteContext = {
    params: Promise<{
        id: string;
    }>;
};

/*
|--------------------------------------------------------------------------
| GET /api/projects/[id]/links
|--------------------------------------------------------------------------
*/

export async function GET(
    request: NextRequest,
    context: RouteContext
) {
    try {
        const { id } = await context.params;

        const api = await createServerApi();

        const { data } = await api.get(
            `/api/projects/${id}/links`
        );

        return NextResponse.json(data);
    } catch (error: any) {
        console.error(
            "GET /api/projects/[id]/links error:",
            error?.response?.data ?? error
        );

        return NextResponse.json(
            {
                message:
                    error?.response?.data?.message ??
                    "Failed to load project links.",

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

/*
|--------------------------------------------------------------------------
| POST /api/projects/[id]/links
|--------------------------------------------------------------------------
*/

export async function POST(
    request: NextRequest,
    context: RouteContext
) {
    try {
        const { id } = await context.params;

        const body = await request.json();

        const api = await createServerApi();

        const { data } = await api.post(
            `/api/projects/${id}/links`,
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
            "POST /api/projects/[id]/links error:",
            error?.response?.data ?? error
        );

        return NextResponse.json(
            {
                message:
                    error?.response?.data?.message ??
                    "Failed to create project link.",

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