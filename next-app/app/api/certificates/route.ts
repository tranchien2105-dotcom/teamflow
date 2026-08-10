import { NextResponse } from "next/server";
import { createServerApi } from "@/lib/server-axios";

export async function GET() {
    try {
        const api = await createServerApi();

        const { data } = await api.get(
            "/api/certificates"
        );

        return NextResponse.json(data);
    } catch (error: any) {
        console.error(
            "Failed to get certificates:",
            error
        );

        return NextResponse.json(
            {
                message: error.message,
                data: error.response?.data,
            },
            {
                status:
                    error.response?.status ?? 500,
            }
        );
    }
}

export async function POST(
    request: Request
) {
    try {
        const api = await createServerApi();

        const body = await request.json();

        const { data } = await api.post(
            "/api/certificates",
            body
        );

        return NextResponse.json(data);
    } catch (error: any) {
        console.error(
            "Failed to create certificate:",
            error
        );

        return NextResponse.json(
            {
                message: error.message,
                data: error.response?.data,
            },
            {
                status:
                    error.response?.status ?? 500,
            }
        );
    }
}
