import { NextRequest, NextResponse } from "next/server";
import { createServerApi } from "@/lib/server-axios";

type RouteContext = {
    params: Promise<{
        slug: string;
    }>;
};

/**
 * GET /api/public/projects/[slug]
 */
export async function GET(
    request: NextRequest,
    context: RouteContext
) {
    try {
        const { slug } = await context.params;

        const api = await createServerApi();

        const { data } = await api.get(
            `/api/portfolio/projects/${slug}`
        );

        return NextResponse.json(data);
    } catch (error: any) {
        console.error(
            "GET /api/public/projects/[slug] error:",
            error?.response?.data ?? error
        );

        return NextResponse.json(
            {
                message:
                    error?.response?.data?.message ??
                    "Failed to fetch project.",
            },
            {
                status: error?.response?.status ?? 500,
            }
        );
    }
}