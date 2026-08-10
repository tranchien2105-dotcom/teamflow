import { NextRequest, NextResponse } from "next/server";
import { createServerApi } from "@/lib/server-axios";

type RouteContext = {
    params: Promise<{
        id: string;
        linkId: string;
    }>;
};

/*
|--------------------------------------------------------------------------
| GET /api/projects/[id]/links/[linkId]
|--------------------------------------------------------------------------
*/

export async function GET(
    request: NextRequest,
    context: RouteContext
) {
    try {
        const { id, linkId } = await context.params;

        const api = await createServerApi();

        const { data } = await api.get(
            `/api/projects/${id}/links/${linkId}`
        );

        return NextResponse.json(data);
    } catch (error: any) {
        console.error(
            "GET /api/projects/[id]/links/[linkId] error:",
            error?.response?.data ?? error
        );

        return NextResponse.json(
            {
                message:
                    error?.response?.data?.message ??
                    "Failed to load project link.",

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
| PUT /api/projects/[id]/links/[linkId]
|--------------------------------------------------------------------------
*/

export async function PUT(
    request: NextRequest,
    context: RouteContext
) {
    try {
        const { id, linkId } = await context.params;

        const body = await request.json();

        const api = await createServerApi();

        const { data } = await api.put(
            `/api/projects/${id}/links/${linkId}`,
            body
        );

        return NextResponse.json(data);
    } catch (error: any) {
        console.error(
            "PUT /api/projects/[id]/links/[linkId] error:",
            error?.response?.data ?? error
        );

        return NextResponse.json(
            {
                message:
                    error?.response?.data?.message ??
                    "Failed to update project link.",

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
| DELETE /api/projects/[id]/links/[linkId]
|--------------------------------------------------------------------------
*/

export async function DELETE(
    request: NextRequest,
    context: RouteContext
) {
    try {
        const { id, linkId } = await context.params;

        const api = await createServerApi();

        const { data } = await api.delete(
            `/api/projects/${id}/links/${linkId}`
        );

        return NextResponse.json(data);
    } catch (error: any) {
        console.error(
            "DELETE /api/projects/[id]/links/[linkId] error:",
            error?.response?.data ?? error
        );

        return NextResponse.json(
            {
                message:
                    error?.response?.data?.message ??
                    "Failed to delete project link.",

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