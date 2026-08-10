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
            `/api/technologies/${id}`
        );

        return NextResponse.json(data);
    } catch (error: any) {
        console.error(
            "GET /api/technologies/[id] error:",
            error?.response?.data ?? error
        );

        return NextResponse.json(
            {
                message:
                    error?.response?.data?.message ??
                    "Failed to fetch technology.",
            },
            {
                status:
                    error?.response?.status ?? 500,
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
            `/api/technologies/${id}`,
            body
        );

        return NextResponse.json(data);
    } catch (error: any) {
        console.error(
            "PUT /api/technologies/[id] error:",
            error?.response?.data ?? error
        );

        return NextResponse.json(
            {
                message:
                    error?.response?.data?.message ??
                    "Failed to update technology.",

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
        const { id } = await context.params;

        const api = await createServerApi();

        const { data } = await api.delete(
            `/api/technologies/${id}`
        );

        return NextResponse.json(data);
    } catch (error: any) {
        console.error(
            "DELETE /api/technologies/[id] error:",
            error?.response?.data ?? error
        );

        return NextResponse.json(
            {
                message:
                    error?.response?.data?.message ??
                    "Failed to delete technology.",
            },
            {
                status:
                    error?.response?.status ?? 500,
            }
        );
    }
}