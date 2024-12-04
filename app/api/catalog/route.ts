import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    console.log(req.nextUrl);

    const category = await prisma.category.findMany({});
    return NextResponse.json({ category }, { status: 200 });
}
