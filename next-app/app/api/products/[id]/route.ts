import { NextResponse } from "next/server";
import { products } from "../data";

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    const index = products.findIndex(
        product => product.id === Number(id)
    );

    if (index === -1) {
        return NextResponse.json(
            {
                success: false,
                message: "Không tìm thấy sản phẩm",
            },
            {
                status: 404,
            }
        );
    }

    products.splice(index, 1);

    return NextResponse.json({
        success: true,
        message: "Xóa thành công",
        data: products,
    });
}