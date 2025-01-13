import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import createSlug from "@/lib/transliteration";

const prisma = new PrismaClient();

type ProductData = {
    categoryId: number;
    article: string;
    name: string;
    slug: string;
    description?: string;
    basePrice: number;
    manufacturingTime: string;
    stock: number;
    visibility: boolean;
    variations: {
        sku: string;
        variationValue: string;
        price: number;
        stock: number;
        isDefault: boolean;
    }[];
    attributes: {
        attributeName: string;
        attributeValue: number | string;
    }[];
    mediaFiles: {
        fileType: string;
        fileUrl: string;
    }[];
};

export async function GET() {
    const attributes = await prisma.product.findUnique({
        where: {
            id: 1,
        },
        select: {
            attributes: true,
        },
    });
    return NextResponse.json({ attributes }, { status: 200 });
}

export async function POST(req: NextRequest) {
    const productData: ProductData = await req.json();
    for (const attribute of productData.attributes) {
        const slug = createSlug(attribute.attributeName);
        const existingAttribute = await prisma.attribute.findUnique({
            where: {
                slug,
            },
        });
        if (existingAttribute) {
            console.log(
                `Attribute with slug "${slug}" already exists. Skipping creation.`
            );
            continue;
        }
        await prisma.attribute.create({
            data: {
                name: attribute.attributeName,
                slug,
            },
        });
        return NextResponse.json(
            {
                message: `Created attribute: ${attribute.attributeName} with slug: ${slug}`,
            },
            { status: 201 }
        );
    }
    return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
    );
}
export async function DELETE(req: NextRequest) {
    if (req.nextUrl.searchParams.has("all")) {
        await prisma.attribute.deleteMany({});
        return NextResponse.json(
            { message: "All attributes deleted successfully" },
            { status: 200 }
        );
    }
    const id = Number(req.nextUrl.searchParams.get("id"));
    if (!id) {
        return NextResponse.json(
            { message: "Invalid product id" },
            { status: 400 }
        );
    }
    await prisma.attribute.delete({
        where: {
            id,
        },
    });
    console.log("Attribute deleted successfully", id);
}
