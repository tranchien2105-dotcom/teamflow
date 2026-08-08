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
            `/api/experiences/${id}`
        );

        return NextResponse.json(data);
    } catch (error: any) {
        console.error(
            "GET /api/experiences/:id failed:",
            error?.response?.data || error
        );

        return NextResponse.json(
            {
                message:
                    error?.response?.data?.message ||
                    "Failed to fetch experience",
            },
            {
                status: error?.response?.status || 500,
            }
        );
    }
}

export async function PUT(
    request: NextRequest,
    context: RouteContext
) {
    try {
        const { id } = await context.params;

        const body = await request.json();

        const api = await createServerApi();

        const { data } = await api.put(
            `/api/experiences/${id}`,
            body
        );

        return NextResponse.json(data);
    } catch (error: any) {
        console.error(
            "PUT /api/experiences/:id failed:",
            error?.response?.data || error
        );

        return NextResponse.json(
            {
                message:
                    error?.response?.data?.message ||
                    "Failed to update experience",
                errors:
                    error?.response?.data?.errors || null,
            },
            {
                status: error?.response?.status || 500,
            }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    context: RouteContext
) {
    try {
        const { id } = await context.params;

        const api = await createServerApi();

        const { data } = await api.delete(
            `/api/experiences/${id}`
        );

        return NextResponse.json(data);
    } catch (error: any) {
        console.error(
            "DELETE /api/experiences/:id failed:",
            error?.response?.data || error
        );

        return NextResponse.json(
            {
                message:
                    error?.response?.data?.message ||
                    "Failed to delete experience",
            },
            {
                status: error?.response?.status || 500,
            }
        );
    }
}