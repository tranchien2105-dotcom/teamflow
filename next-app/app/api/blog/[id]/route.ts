import { NextResponse } from "next/server";
import { createServerApi } from "@/lib/server-axios";

interface RouteParams {
    params: Promise<{
        id: string;
    }>;
}

export async function GET(
    _request: Request,
    { params }: RouteParams
) {
    try {
        const { id } = await params;

        const api = await createServerApi();

        const { data } = await api.get(
            `/api/blog-posts/${id}`
        );

        return NextResponse.json(data);
    } catch (error: any) {
        console.error(error);

        return NextResponse.json(
            {
                message: error.message,
                data: error.response?.data,
                stack: error.stack,
            },
            {
                status:
                    error.response?.status ?? 500,
            }
        );
    }
}

export async function PUT(
    request: Request,
    { params }: RouteParams
) {
    try {
        const { id } = await params;

        const api = await createServerApi();

        const body = await request.json();

        const { data } = await api.put(
            `/api/blog-posts/${id}`,
            body
        );

        return NextResponse.json(data);
    } catch (error: any) {
        console.error(error);

        return NextResponse.json(
            {
                message: error.message,
                data: error.response?.data,
                stack: error.stack,
            },
            {
                status:
                    error.response?.status ?? 500,
            }
        );
    }
}

export async function DELETE(
    _request: Request,
    { params }: RouteParams
) {
    try {
        const { id } = await params;

        const api = await createServerApi();

        const { data } = await api.delete(
            `/api/blog-posts/${id}`
        );

        return NextResponse.json(data);
    } catch (error: any) {
        console.error(error);

        return NextResponse.json(
            {
                message: error.message,
                data: error.response?.data,
                stack: error.stack,
            },
            {
                status:
                    error.response?.status ?? 500,
            }
        );
    }
}
