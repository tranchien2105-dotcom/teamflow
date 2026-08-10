import { NextResponse } from "next/server";
import { createServerApi } from "@/lib/server-axios";

export async function GET() {
    try {
        const api = await createServerApi();

        const { data } = await api.get(
            "/api/cv"
        );

        return NextResponse.json(data);
    } catch (error: any) {
        console.error(
            "Failed to get CV:",
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