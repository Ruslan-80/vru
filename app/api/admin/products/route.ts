import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import slugify from "slugify";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const manyproducts = await prisma.product.findMany({
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
        // Форматирование для получения только attributeName и attributeValue
        const products = manyproducts.map(product => {
            return {
                ...product,
                attributes: product.attributes.map(attr => {
                    return {
                        name: attr.attribute.name,
                        value:
                            attr.attributeValue.valueString ||
                            attr.attributeValue.valueNumber,
                    };
                }),
            };
        });
        return NextResponse.json({ products }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                error: "Ошибка при получении товаров",
            },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const {
            name,
            categoryId,
            article,
            slug,
            description,
            basePrice,
            manufacturingTime,
            stock,
            visibility,
            attributes,
        } = await req.json();

        if (!name || typeof name !== "string") {
            return NextResponse.json(
                { error: "Поле 'name' обязательно и должно быть строкой." },
                { status: 400 }
            );
        }

        if (!article || typeof article !== "string") {
            return NextResponse.json(
                { error: "Поле 'article' обязательно и должно быть строкой." },
                { status: 400 }
            );
        }

        // Если slug передан и является строкой, используем его, иначе генерируем на основе имени
        const productSlug =
            slug && typeof slug === "string" && slug.trim() !== ""
                ? slug
                : slugify(name, { lower: true });

        const newProduct = await prisma.product.create({
            data: {
                name,
                categoryId,
                article,
                slug: productSlug,
                description,
                basePrice,
                manufacturingTime,
                stock,
                visibility,
            },
        });

        for (const attribute of attributes) {
            const attributeSlug = slugify(attribute.name, { lower: true });

            // Проверяем уникальность атрибута по slug
            let existingAttribute = await prisma.attribute.findUnique({
                where: { slug: attributeSlug },
            });

            // Если атрибут не существует, добавляем его в таблицу attribute
            if (!existingAttribute) {
                existingAttribute = await prisma.attribute.create({
                    data: {
                        name: attribute.name,
                        slug: attributeSlug,
                    },
                });
            }

            // Добавляем значение атрибута в таблицу attributeValue
            const attributeValue = await prisma.attributeValue.create({
                data: {
                    attributeId: existingAttribute.id,
                    valueString: attribute.value,
                },
            });

            // Добавляем связь товара с атрибутом в таблицу productAttribute
            await prisma.productAttribute.create({
                data: {
                    productId: newProduct.id,
                    attributeId: existingAttribute.id,
                    attributeValueId: attributeValue.id,
                },
            });
        }

        return NextResponse.json(newProduct, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                error: "Ошибка при создании товара",
            },
            { status: 500 }
        );
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { slug } = await req.json();

        if (!slug || typeof slug !== "string") {
            return NextResponse.json(
                { error: "Поле 'slug' обязательно и должно быть строкой." },
                { status: 400 }
            );
        }

        const deletedProduct = await prisma.product.delete({
            where: { slug },
        });

        return NextResponse.json(deletedProduct, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                error: "Ошибка при удалении товара",
            },
            { status: 500 }
        );
    }
}

export async function PUT(req: NextRequest) {
    try {
        const {
            id,
            name,
            categoryId,
            article,
            slug,
            description,
            basePrice,
            manufacturingTime,
            stock,
            visibility,
            attributes,
        } = await req.json();

        if (!id || typeof id !== "number") {
            return NextResponse.json(
                { error: "Поле 'id' обязательно и должно быть числом." },
                { status: 400 }
            );
        }

        if (!name || typeof name !== "string") {
            return NextResponse.json(
                { error: "Поле 'name' обязательно и должно быть строкой." },
                { status: 400 }
            );
        }

        if (!article || typeof article !== "string") {
            return NextResponse.json(
                { error: "Поле 'article' обязательно и должно быть строкой." },
                { status: 400 }
            );
        }

        // Если slug передан и является строкой, используем его, иначе генерируем на основе имени
        const productSlug =
            slug && typeof slug === "string" && slug.trim() !== ""
                ? slug
                : slugify(name, { lower: true });

        const updatedProduct = await prisma.product.update({
            where: { id },
            data: {
                name,
                categoryId,
                article,
                slug: productSlug,
                description,
                basePrice,
                manufacturingTime,
                stock,
                visibility,
            },
        });

        // Удаление всех существующих связей с атрибутами для этого товара
        await prisma.productAttribute.deleteMany({
            where: { productId: id },
        });

        for (const attribute of attributes) {
            const attributeSlug = slugify(attribute.name, { lower: true });

            // Проверяем уникальность атрибута по slug
            let existingAttribute = await prisma.attribute.findUnique({
                where: { slug: attributeSlug },
            });

            // Если атрибут не существует, добавляем его в таблицу attribute
            if (!existingAttribute) {
                existingAttribute = await prisma.attribute.create({
                    data: {
                        name: attribute.name,
                        slug: attributeSlug,
                    },
                });
            }

            // Добавляем значение атрибута в таблицу attributeValue
            let attributeValue;

            // Проверяем, если значение является числом или строкой
            if (!isNaN(attribute.value)) {
                attributeValue = await prisma.attributeValue.create({
                    data: {
                        attributeId: existingAttribute.id,
                        valueNumber: parseFloat(attribute.value),
                    },
                });
            } else {
                attributeValue = await prisma.attributeValue.create({
                    data: {
                        attributeId: existingAttribute.id,
                        valueString: attribute.value,
                    },
                });
            }

            // Добавляем связь товара с атрибутом в таблицу productAttribute
            await prisma.productAttribute.create({
                data: {
                    productId: updatedProduct.id,
                    attributeId: existingAttribute.id,
                    attributeValueId: attributeValue.id,
                },
            });
        }

        return NextResponse.json(updatedProduct, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                error: "Ошибка при обновлении товара",
            },
            { status: 500 }
        );
    }
}
