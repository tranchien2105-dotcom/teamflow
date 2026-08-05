import { NextRequest, NextResponse } from "next/server";
import { createServerApi } from "@/lib/server-axios";

export async function GET(request: NextRequest) {
    try {

        const searchParams = request.nextUrl.searchParams;

        const api = await createServerApi();
        console.log("api------------------------------", api);
        const { data } = await api.get("/api/products", {
            params: {
                page: searchParams.get("page"),
                per_page: searchParams.get("per_page"),
                search: searchParams.get("search"),
                sort_by: searchParams.get("sort_by"),
            },
        });

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