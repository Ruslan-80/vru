import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
    const category = await prisma.category.findMany({});
    return NextResponse.json({ category }, { status: 200 });
}
