import { NextResponse } from "next/server";
import { createServerApi } from "@/lib/server-axios";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const api = await createServerApi();

        const { data } = await api.post("/api/profile", body);

        return NextResponse.json(data, {
            status: 201,
        });
    } catch (error: any) {
        return NextResponse.json(
            {
                message:
                    error.response?.data?.message ||
                    "Failed to create profile.",
                errors: error.response?.data?.errors || null,
            },
            {
                status: error.response?.status || 500,
            }
        );
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();

        const api = await createServerApi();

        const { data } = await api.put("/api/profile", body);

        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json(
            {
                message:
                    error.response?.data?.message ||
                    "Failed to update profile.",
                errors: error.response?.data?.errors || null,
            },
            {
                status: error.response?.status || 500,
            }
        );
    }
}
