import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    const slug = req.nextUrl.pathname.split("/").pop();

    const productOne = await prisma.product.findUnique({
        where: {
            slug: slug ?? "",
        },
        include: {
            attributes: {
                include: {
                    attribute: {
                        select: {
                            name: true,
                        },
                    },
                    attributeValue: {
                        select: {
                            valueString: true,
                            valueNumber: true,
                        },
                    },
                },
            },
        },
    });

    if (!productOne) {
        return NextResponse.json(
            { error: "Product not found" },
            { status: 404 }
        );
    }

    const product = {
        ...productOne,
        attributes: productOne.attributes.map(attr => ({
            name: attr.attribute.name,
            value:
                attr.attributeValue.valueString ??
                attr.attributeValue.valueNumber,
        })),
    };

    return NextResponse.json(product, { status: 200 });
}
