import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const filters = await prisma.attribute.findMany({
            include: {
                values: {
                    distinct: ["valueString", "valueNumber"], // Уникальные значения
                    orderBy: { createdAt: "asc" },
                    select: {
                        id: true,
                        valueString: true,
                        valueNumber: true,
                    },
                },
            },
            orderBy: { name: "asc" },
        });

        return NextResponse.json({ filters });
    } catch (error) {
        return error;
    }
}
