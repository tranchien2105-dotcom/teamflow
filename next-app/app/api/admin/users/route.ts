import { NextResponse } from "next/server";
import { createServerApi } from "@/lib/server-axios";

export async function GET(request: Request) {
    try {
        const api = await createServerApi();

        const { searchParams } = new URL(request.url);

        const page = searchParams.get("page") ?? "1";
        const perPage = searchParams.get("per_page") ?? "10";

        const { data } = await api.get("/api/admin/users", {
            params: {
                page,
                per_page: perPage,
            },
        });

        return NextResponse.json(data);
    } catch (error: any) {
        console.error(error);

        return NextResponse.json(
            {
                message:
                    error.response?.data?.message ||
                    error.message ||
                    "Failed to load users.",
                data: error.response?.data,
            },
            {
                status: error.response?.status ?? 500,
            }
        );
    }
}