import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
    const attributes = await prisma.attribute.findMany({ take: 10 });
    return NextResponse.json({ attributes }, { status: 200 });
}
