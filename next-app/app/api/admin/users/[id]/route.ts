import { NextResponse } from "next/server";
import { createServerApi } from "@/lib/server-axios";

interface RouteContext {
    params: Promise<{
        id: string;
    }>;
}

export async function GET(
    _request: Request,
    { params }: RouteContext
) {
    try {
        const { id } = await params;

        const api = await createServerApi();

        const { data } = await api.get(
            `/api/admin/users/${id}`
        );

        return NextResponse.json(data);
    } catch (error: any) {
        console.error(error);

        return NextResponse.json(
            {
                message:
                    error?.response?.data?.message ||
                    error?.message ||
                    "Failed to load user.",
                data: error?.response?.data,
            },
            {
                status:
                    error?.response?.status ?? 500,
            }
        );
    }
}

export async function PATCH(
    request: Request,
    { params }: RouteContext
) {
    try {
        const { id } = await params;

        const body = await request.json();

        const api = await createServerApi();

        const { data } = await api.patch(
            `/api/admin/users/${id}/role`,
            body
        );

        return NextResponse.json(data);
    } catch (error: any) {
        console.error(error);

        return NextResponse.json(
            {
                message:
                    error?.response?.data?.message ||
                    error?.message ||
                    "Failed to update user role.",
                data: error?.response?.data,
            },
            {
                status:
                    error?.response?.status ?? 500,
            }
        );
    }
}
