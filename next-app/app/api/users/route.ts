import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json(
        [
            {
                id: 1,
                name: "Chien Tran",
                email: "tranchien@example.com",
              },
            {
                id: 2,
                name: "John Doe",
                email: "johndoe@example.com",
            },
        ],
        { status: 200 }
    );
}