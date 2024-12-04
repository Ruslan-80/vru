import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import slugify from "slugify";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    try {
        const products = await prisma.product.findMany();
        return NextResponse.json(products, { status: 200 });
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
