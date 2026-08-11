import { NextResponse } from "next/server";
import { createServerApi } from "@/lib/server-axios";

export async function GET() {
    try {
        const api = await createServerApi();

        const { data } = await api.get("/api/dashboard");

        return NextResponse.json(data);
    } catch (error: any) {
        console.error("Dashboard API error:", error);

        return NextResponse.json(
            {
                message:
                    error.response?.data?.message ||
                    error.message ||
                    "Failed to load dashboard.",
                data: error.response?.data,
            },
            {
                status: error.response?.status ?? 500,
            }
        );
    }
}