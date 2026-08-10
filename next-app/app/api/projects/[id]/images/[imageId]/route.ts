import { NextRequest, NextResponse } from "next/server";
import { createServerApi } from "@/lib/server-axios";

type RouteContext = {
    params: Promise<{
        id: string;
        imageId: string;
    }>;
};

/*
|--------------------------------------------------------------------------
| PUT /api/projects/[id]/images/[imageId]
|--------------------------------------------------------------------------
*/

export async function PUT(
    request: NextRequest,
    context: RouteContext
) {
    try {
        const {
            id,
            imageId,
        } = await context.params;

        const body = await request.json();

        const api = await createServerApi();

        const { data } = await api.put(
            `/api/projects/${id}/images/${imageId}`,
            body
        );

        return NextResponse.json(data);
    } catch (error: any) {
        console.error(
            "PUT /api/projects/[id]/images/[imageId] error:",
            error?.response?.data ?? error
        );

        return NextResponse.json(
            {
                message:
                    error?.response?.data?.message ??
                    "Failed to update project image.",

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
| DELETE /api/projects/[id]/images/[imageId]
|--------------------------------------------------------------------------
*/

export async function DELETE(
    request: NextRequest,
    context: RouteContext
) {
    try {
        const {
            id,
            imageId,
        } = await context.params;

        const api = await createServerApi();

        const { data } = await api.delete(
            `/api/projects/${id}/images/${imageId}`
        );

        return NextResponse.json(data);
    } catch (error: any) {
        console.error(
            "DELETE /api/projects/[id]/images/[imageId] error:",
            error?.response?.data ?? error
        );

        return NextResponse.json(
            {
                message:
                    error?.response?.data?.message ??
                    "Failed to delete project image.",

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