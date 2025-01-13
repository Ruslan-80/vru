import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
    const products = await prisma.product.findMany({ take: 10 });
    return NextResponse.json({ products }, { status: 200 });
}

// export async function POST(req: NextRequest) {
//     const data = await req.json();

//     const user = await prisma.user.create({ data });
//     return NextResponse.json({ user }, { status: 201 });
// }
