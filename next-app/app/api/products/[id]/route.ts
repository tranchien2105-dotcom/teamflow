import { NextRequest, NextResponse } from "next/server";
import { createServerApi } from "@/lib/server-axios";

type Params = {
    params: Promise<{
        id: string;
    }>;
};

export async function GET(
    request: NextRequest,
    { params }: Params
) {
    const { id } = await params;

    const api = await createServerApi();

    const { data } = await api.get(`/api/products/${id}`);

    return NextResponse.json(data);
}

export async function PUT(
    request: NextRequest,
    { params }: Params
) {
    const { id } = await params;

    const body = await request.json();

    const api = await createServerApi();

    const { data } = await api.put(`/api/products/${id}`, body);

    return NextResponse.json(data);
}

export async function DELETE(
    request: NextRequest,
    { params }: Params
) {
    const { id } = await params;

    const api = await createServerApi();

    await api.delete(`/api/products/${id}`);

    return NextResponse.json({
        message: "Deleted successfully",
    });
}