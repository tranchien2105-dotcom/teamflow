import { NextResponse } from "next/server";
import { createServerApi } from "@/lib/server-axios";

export async function GET() {
    try {
        const api = await createServerApi();

        const { data } = await api.get("/api/me");

        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json(
            {
                message: "Unauthenticated",
            },
            {
                status: error.response?.status || 401,
            }
        );
    }
}