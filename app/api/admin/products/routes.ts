import { prisma } from "@/prisma/prisma-client";
// import { Prisma } from "@prisma/client";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { products } = await req.json();

        if (!Array.isArray(products) || products.length === 0) {
            return NextResponse.json(
                { message: "Invalid products data" },
                { status: 400 }
            );
        }

        console.log("Products received:", JSON.stringify(products, null, 2));

        const createProductsData = products.map((product: any) => {
            const variations = Array.isArray(product.variations)
                ? product.variations
                : [];
            const mediaFiles = Array.isArray(product.mediaFiles)
                ? product.mediaFiles
                : [];
            const attributes = Array.isArray(product.attributes)
                ? product.attributes
                : [];

            return {
                article: product.article,
                name: product.name,
                slug: product.slug,
                description: product.description,
                basePrice: product.basePrice.toString(),
                manufacturingTime: product.manufacturingTime,
                stock: product.stock,
                visibility: product.visibility,
                category: {
                    connect: { id: product.categoryId },
                },
                variations: {
                    create: variations.map((variation: any) => ({
                        sku: variation.sku,
                        variationValue: variation.variationValue,
                        price: variation.price.toString(),
                        stock: variation.stock,
                        isDefault: variation.isDefault || false,
                    })),
                },
                mediaFiles: {
                    create: mediaFiles.map((mediaFile: any) => ({
                        fileType: mediaFile.fileType,
                        fileUrl: mediaFile.fileUrl,
                    })),
                },
                attributes: {
                    create: attributes.map((attribute: any) => ({
                        attribute: {
                            connectOrCreate: {
                                where: { name: attribute.name },
                                create: {
                                    name: attribute.name,
                                    slug: attribute.slug,
                                },
                            },
                        },
                        attributeValue: {
                            connectOrCreate: {
                                where: { value: attribute.value },
                                create: {
                                    value: attribute.value,
                                },
                            },
                        },
                    })),
                },
            };
        });

        for (const productData of createProductsData) {
            await prisma.product.create({
                data: productData,
            });
        }

        return NextResponse.json(
            { message: "Products created successfully" },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating products:", error);
        const errorMessage =
            error instanceof Error && error.message
                ? error.message
                : "Unknown error";
        return NextResponse.json(
            { message: "Internal server error", error: errorMessage },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const products = await prisma.product.findMany({
            include: {
                variations: true,
                mediaFiles: true,
                attributes: {
                    include: {
                        attribute: true,
                        attributeValue: true,
                    },
                },
            },
        });
        return NextResponse.json(products, { status: 200 });
    } catch (error) {
        console.error("Error fetching products:", error);
        const errorMessage =
            error instanceof Error && error.message
                ? error.message
                : "Unknown error";
        return NextResponse.json(
            { message: "Internal server error", error: errorMessage },
            { status: 500 }
        );
    }
}

export async function PUT(req: NextRequest) {
    try {
        const { id, data } = await req.json();
        if (!id || !data) {
            return NextResponse.json(
                { message: "Invalid data" },
                { status: 400 }
            );
        }

        const updatedProduct = await prisma.product.update({
            where: { id },
            data: {
                ...data,
                updatedAt: new Date(),
            },
        });

        return NextResponse.json(
            { message: "Product updated successfully", updatedProduct },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating product:", error);
        const errorMessage =
            error instanceof Error && error.message
                ? error.message
                : "Unknown error";
        return NextResponse.json(
            { message: "Internal server error", error: errorMessage },
            { status: 500 }
        );
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { id } = await req.json();
        if (!id) {
            return NextResponse.json(
                { message: "Invalid product id" },
                { status: 400 }
            );
        }

        await prisma.product.delete({
            where: { id },
        });

        return NextResponse.json(
            { message: "Product deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting product:", error);
        const errorMessage =
            error instanceof Error && error.message
                ? error.message
                : "Unknown error";
        return NextResponse.json(
            { message: "Internal server error", error: errorMessage },
            { status: 500 }
        );
    }
}
