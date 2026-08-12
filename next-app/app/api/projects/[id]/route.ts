import { NextRequest, NextResponse } from "next/server";
import { createServerApi } from "@/lib/server-axios";

type RouteContext = {
    params: Promise<{
        id: string;
    }>;
};

/*
|--------------------------------------------------------------------------
| GET /api/projects/[id]
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
            `/api/projects/${id}`
        );

        return NextResponse.json(data);
    } catch (error: any) {
        console.error(
            "GET /api/projects/[id] error:",
            error?.response?.data ?? error
        );

        return NextResponse.json(
            {
                message:
                    error?.response?.data?.message ??
                    "Failed to fetch project.",
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
| PUT /api/projects/[id]
|--------------------------------------------------------------------------
*/

export async function PUT(
    request: NextRequest,
    context: RouteContext
) {
    try {
        const { id } = await context.params;

        /*
        |--------------------------------------------------------------------------
        | Read multipart/form-data
        |--------------------------------------------------------------------------
        */

        const formData = await request.formData();

        /*
        |--------------------------------------------------------------------------
        | Create server API client
        |--------------------------------------------------------------------------
        */

        const api = await createServerApi();

        /*
        |--------------------------------------------------------------------------
        | Forward FormData to Laravel
        |--------------------------------------------------------------------------
        */

        const { data } = await api.post(
            `/api/projects/${id}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return NextResponse.json(data);
    } catch (error: any) {
        console.error(
            "PUT /api/projects/[id] error:",
            error?.response?.data ?? error
        );

        return NextResponse.json(
            {
                message:
                    error?.response?.data?.message ??
                    "Failed to update project.",

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
| DELETE /api/projects/[id]
|--------------------------------------------------------------------------
*/

export async function DELETE(
    request: NextRequest,
    context: RouteContext
) {
    try {
        const { id } = await context.params;

        const api = await createServerApi();

        const { data } = await api.delete(
            `/api/projects/${id}`
        );

        return NextResponse.json(data);
    } catch (error: any) {
        console.error(
            "DELETE /api/projects/[id] error:",
            error?.response?.data ?? error
        );

        return NextResponse.json(
            {
                message:
                    error?.response?.data?.message ??
                    "Failed to delete project.",
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

        const formData = await request.formData();

        const api = await createServerApi();

        const { data } = await api.post(
            `/api/projects/${id}`,
            formData
        );

        return NextResponse.json(data);
    } catch (error: any) {
        console.error(
            "POST /api/projects/[id] error:",
            error?.response?.data ?? error
        );

        return NextResponse.json(
            {
                message:
                    error?.response?.data?.message ??
                    "Failed to update project.",
                errors:
                    error?.response?.data?.errors ?? null,
            },
            {
                status:
                    error?.response?.status ?? 500,
            }
        );
    }
}