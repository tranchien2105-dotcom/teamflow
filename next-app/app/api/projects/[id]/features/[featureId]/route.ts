import { NextRequest, NextResponse } from "next/server";
import { createServerApi } from "@/lib/server-axios";

type RouteContext = {
    params: Promise<{
        id: string;
        featureId: string;
    }>;
};

export async function PUT(
    request: NextRequest,
    context: RouteContext
) {
    try {
        const { id, featureId } =
            await context.params;

        const body = await request.json();

        const api = await createServerApi();

        const { data } = await api.put(
            `/api/projects/${id}/features/${featureId}`,
            body
        );

        return NextResponse.json(data);
    } catch (error: any) {
        console.error(
            "PUT /api/projects/[id]/features/[featureId] error:",
            error?.response?.data ?? error
        );

        return NextResponse.json(
            {
                message:
                    error?.response?.data?.message ??
                    "Failed to update project feature.",

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

export async function DELETE(
    request: NextRequest,
    context: RouteContext
) {
    try {
        const { id, featureId } =
            await context.params;

        const api = await createServerApi();

        const { data } = await api.delete(
            `/api/projects/${id}/features/${featureId}`
        );

        return NextResponse.json(data);
    } catch (error: any) {
        console.error(
            "DELETE /api/projects/[id]/features/[featureId] error:",
            error?.response?.data ?? error
        );

        return NextResponse.json(
            {
                message:
                    error?.response?.data?.message ??
                    "Failed to delete project feature.",
            },
            {
                status:
                    error?.response?.status ?? 500,
            }
        );
    }
}