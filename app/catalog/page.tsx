import { Container } from "@/components/shared";
import { prisma } from "@/prisma/prisma-client";
import Link from "next/link";

export default async function CatalogPage() {
    const categories = await prisma.category.findMany({});

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
        </Container>
    );
}
