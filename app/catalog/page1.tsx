import { Container } from "@/components/shared";
import { prisma } from "@/prisma/prisma-client";
import Link from "next/link";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";

export default async function CatalogPage() {
    const categories = await prisma.category.findMany({});

    const filters = await prisma.attribute.findMany({
        include: {
            values: {
                distinct: ["valueString", "valueNumber"],
                orderBy: { createdAt: "asc" },
                select: {
                    id: true,
                    valueString: true,
                    valueNumber: true,
                },
            },
        },
        orderBy: { slug: "asc" },
    });

    return (
        <Container>
            <h1 className="font-semibold mt-10">Категории</h1>
            {categories.map(category => (
                <div key={category.id} className="flex flex-col mt-10">
                    <Link href={`/catalog/${category.slug}`}>
                        <div className="text-blue-600 hover:underline">
                            {category.name}
                        </div>
                    </Link>
                </div>
            ))}

            <h2 className="font-semibold mt-10">Фильтры</h2>
            {filters.map(filter => (
                <div key={filter.slug} className="mt-6">
                    <h3 className="font-medium mb-2">{filter.name}</h3>
                    <div className="flex flex-col gap-2">
                        {filter.values.map(value => (
                            <div
                                key={value.id}
                                className="flex items-center gap-2"
                            >
                                <Checkbox.Root
                                    className="flex h-4 w-4 items-center justify-center rounded border bg-white"
                                    id={value.id}
                                >
                                    <Checkbox.Indicator className="text-blue-600">
                                        <CheckIcon className="h-3 w-3" />
                                    </Checkbox.Indicator>
                                </Checkbox.Root>
                                <label
                                    className="text-gray-600 text-sm"
                                    htmlFor={value.id}
                                >
                                    {value.valueString ?? value.valueNumber}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </Container>
    );
}
