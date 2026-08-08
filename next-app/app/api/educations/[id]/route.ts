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
            `/api/educations/${id}`
        );

        return NextResponse.json(data);
    } catch (error: any) {
        console.error(
            "GET /api/educations/[id] error:",
            error?.response?.data ?? error
        );

        return NextResponse.json(
            {
                message:
                    error?.response?.data?.message ??
                    "Failed to fetch education.",
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
            `/api/educations/${id}`,
            body
        );

        return NextResponse.json(data);
    } catch (error: any) {
        console.error(
            "PUT /api/educations/[id] error:",
            error?.response?.data ?? error
        );

        return NextResponse.json(
            {
                message:
                    error?.response?.data?.message ??
                    "Failed to update education.",

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
            `/api/educations/${id}`
        );

        return NextResponse.json(data);
    } catch (error: any) {
        console.error(
            "DELETE /api/educations/[id] error:",
            error?.response?.data ?? error
        );

        return NextResponse.json(
            {
                message:
                    error?.response?.data?.message ??
                    "Failed to delete education.",
            },
            {
                status:
                    error?.response?.status ?? 500,
            }
        );
    }
}