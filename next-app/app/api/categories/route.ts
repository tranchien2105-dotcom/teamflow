import { NextResponse } from "next/server";
import { createServerApi } from "@/lib/server-axios";

export async function GET() {
    try {
        const api = await createServerApi();

        const { data } = await api.get("/api/categories");

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
                status: error.response?.status ?? 500,
            }
        );
    }
}