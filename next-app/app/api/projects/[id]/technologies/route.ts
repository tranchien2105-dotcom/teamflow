import { NextRequest, NextResponse } from "next/server";

import { createServerApi } from "@/lib/server-axios";

type RouteContext = {
    params: Promise<{
        id: string;
    }>;
};

export async function PUT(
    request: NextRequest,
    context: RouteContext
) {
    try {
        const { id } = await context.params;

        const body = await request.json();

        const api = await createServerApi();

        const { data } = await api.put(
            `/api/projects/${id}/technologies`,
            body
        );

        return NextResponse.json(data);
    } catch (error: any) {
        console.error(
            "PUT /api/projects/[id]/technologies error:",
            error?.response?.data ?? error
        );

        return NextResponse.json(
            {
                message:
                    error?.response?.data?.message ??
                    "Failed to update project technologies.",

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