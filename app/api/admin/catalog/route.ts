import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import slugify from "slugify";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    try {
        const categories = await prisma.category.findMany();
        return NextResponse.json(categories, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                error: "Ошибка при получении категорий",
            },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    console.log(req.text);

    try {
        const { name, parentId, slug, description } = await req.json();

        if (!name || typeof name !== "string") {
            return NextResponse.json(
                { error: "Поле 'name' обязательно и должно быть строкой." },
                { status: 400 }
            );
        }

        // Если slug передан и является строкой, используем его, иначе генерируем на основе имени
        const categorySlug =
            slug && typeof slug === "string" && slug.trim() !== ""
                ? slug
                : slugify(name, { lower: true });

        const newCategory = await prisma.category.create({
            data: { name, parentId, slug: categorySlug, description },
        });

        return NextResponse.json(newCategory, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                error: "Ошибка при создании категории",
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

        const deletedCategory = await prisma.category.delete({
            where: { slug },
        });

        return NextResponse.json(deletedCategory, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                error: "Ошибка при удалении категории",
            },
            { status: 500 }
        );
    }
}
export async function PUT(req: NextRequest) {
    try {
        const { id, name, parentId, slug, description } = await req.json();

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

        // Если slug передан и является строкой, используем его, иначе генерируем на основе имени
        const categorySlug =
            slug && typeof slug === "string" && slug.trim() !== ""
                ? slug
                : slugify(name, { lower: true });

        const updatedCategory = await prisma.category.update({
            where: { id },
            data: { name, parentId, slug: categorySlug, description },
        });

        return NextResponse.json(updatedCategory, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                error: "Ошибка при обновлении категории",
            },
            { status: 500 }
        );
    }
}
