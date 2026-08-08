import { NextResponse } from "next/server";
import { createServerApi } from "@/lib/server-axios";

export async function GET() {
    try {
        const api = await createServerApi();

        const { data } = await api.get("/api/schools");

        return NextResponse.json(data);
    } catch (error: any) {
        console.error(
            "GET /api/schools error:",
            error?.response?.data ?? error
        );

        return NextResponse.json(
            {
                message:
                    error?.response?.data?.message ??
                    "Failed to fetch schools.",
            },
            {
                status:
                    error?.response?.status ?? 500,
            }
        );
    }
}