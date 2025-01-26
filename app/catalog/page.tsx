import { Container } from "@/components/shared";

import { prisma } from "@/prisma/prisma-client";
import Link from "next/link";

export default async function CatalogPage() {
    const categories = await prisma.category.findMany({});
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
    console.log(filters);

    return (
        <Container>
            <h1 className="font-semibold mt-10">Категории</h1>
            {categories.map(category => (
                <div key={category.id} className="flex flex-col mt-10">
                    <Link
                        key={category.name}
                        href={`/catalog/${category.slug}`}
                    >
                        <div>{category.name}</div>
                    </Link>
                </div>
            ))}
            <div>Фильтры</div>
            {filters.map(filter => (
                <div key={filter.id} className="flex flex-col mt-10">
                    <div>{filter.name}</div>
                    {filter.values.map(value => (
                        <div key={value.id}>
                            <div>{value.valueString}</div>
                            <div>{value.valueNumber}</div>
                        </div>
                    ))}
                </div>
            ))}
        </Container>
    );
}
