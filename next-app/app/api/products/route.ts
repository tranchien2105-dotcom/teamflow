import { NextRequest, NextResponse } from "next/server";
import { Product, products } from "./data";

export async function GET() {
    return NextResponse.json({
        success: true,
        message: "Lấy danh sách sản phẩm thành công",
        data: products,
    });
}

export async function POST(request: NextRequest) {
    const body = await request.json();

    const newProduct: Product = {
        id: products.length + 1,
        name: body.name,
        price: body.price,
    };

    products.push(newProduct);


    return NextResponse.json({
        success: true,
        message: "Thêm sản phẩm thành công",
        data: newProduct, // Return the received product data
    });
}