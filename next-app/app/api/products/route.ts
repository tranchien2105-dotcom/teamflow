import { NextRequest, NextResponse } from "next/server";
import { createServerApi } from "@/lib/server-axios";

export async function GET(request: NextRequest) {
    try {

        const searchParams = request.nextUrl.searchParams;
        const forwardedParams = Object.fromEntries(
            Array.from(searchParams.entries()).filter(([, value]) => value !== "")
        );

        const api = await createServerApi();

        const { data } = await api.get("/api/products", {
            params: forwardedParams,
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

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const api = await createServerApi();

        const { data } = await api.post("/api/products", body);

        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json(
            {
                message: error.message,
                data: error.response?.data,
            },
            {
                status: error.response?.status ?? 500,
            }
        );
    }
}