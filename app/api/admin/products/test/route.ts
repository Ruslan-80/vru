// app/api/admin/products/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";

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
        attributeId: number;
        attributeValueId: number;
    }[];
    mediaFiles: {
        fileType: string;
        fileUrl: string;
    }[];
};

export async function POST(req: NextRequest) {
    try {
        const productData: ProductData = await req.json();
        // console.log("Products received:", JSON.stringify(productData, null, 2));

        // Проверка наличия обязательных полей
        if (
            !productData.categoryId ||
            !productData.article ||
            !productData.name ||
            !productData.slug ||
            !productData.basePrice ||
            !productData.manufacturingTime ||
            !productData.stock ||
            !productData.visibility
        ) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }
        console.log("Все поля заполнены");

        // Проверка медиа-файлов

        // Проверка вариаций
        if (productData.variations && productData.variations.length > 0) {
            for (const variation of productData.variations) {
                if (
                    !variation.sku ||
                    !variation.variationValue ||
                    !variation.price ||
                    !variation.stock ||
                    variation.isDefault === undefined
                ) {
                    return NextResponse.json(
                        { message: "Invalid variation data" },
                        { status: 400 }
                    );
                }
            }
        }
        console.log("Все вариации заполнены");

        // Проверка атрибутов
        if (productData.attributes && productData.attributes.length > 0) {
            for (const attribute of productData.attributes) {
                if (!attribute.attributeId || !attribute.attributeValueId) {
                    return NextResponse.json(
                        { message: "Invalid attribute data" },
                        { status: 400 }
                    );
                }
            }
        }
        console.log("Все атрибуты заполнены");

        // Начало транзакции
        const result = await prisma.$transaction(async prisma => {
            // Создание продукта
            const product = await prisma.product.create({
                data: {
                    categoryId: productData.categoryId,
                    article: productData.article,
                    name: productData.name,
                    slug: productData.slug,
                    description: productData.description,
                    basePrice: productData.basePrice,
                    manufacturingTime: productData.manufacturingTime,
                    stock: productData.stock,
                    visibility: productData.visibility,
                    variations: {
                        create: productData.variations.map(variation => ({
                            sku: variation.sku,
                            variationValue: variation.variationValue,
                            price: variation.price,
                            stock: variation.stock,
                            isDefault: variation.isDefault,
                        })),
                    },
                    attributes: {
                        create: productData.attributes.map(attribute => ({
                            attributeId: attribute.attributeId,
                            attributeValueId: attribute.attributeValueId,
                        })),
                    },
                    mediaFiles: {
                        create: productData.mediaFiles.map(mediaFile => ({
                            fileType: mediaFile.fileType,
                            fileUrl: mediaFile.fileUrl,
                        })),
                    },
                },
            });

            return product;
        });

        return NextResponse.json(result, { status: 201 });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            // Обработка известных ошибок Prisma
            if (error.code === "P2002") {
                return NextResponse.json(
                    { message: "Unique constraint failedВВ" },
                    { status: 400 }
                );
            }
        }
        console.error("Error occurred:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}
