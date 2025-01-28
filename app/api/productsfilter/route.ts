import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const products = await prisma.product.findMany({
            where: {
                attributes: {
                    some: {
                        attributeValue: {
                            attributeId: 2,
                            valueString: "100А",
                        },
                    },
                },
            },
            include: {
                attributes: {
                    include: {
                        attributeValue: true,
                    },
                },
            },
        });

        return NextResponse.json({ products });
    } catch (error) {
        return error;
    }
}
