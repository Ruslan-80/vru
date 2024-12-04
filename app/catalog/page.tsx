import { Container } from "@/components/shared";
import { prisma } from "@/prisma/prisma-client";
import Link from "next/link";

export default async function CatalogPage() {
    const categories = await prisma.category.findMany({});

    return (
        <Container>
            {categories.map(category => (
                <Link key={category.name} href={`/catalog/${category.slug}`}>
                    <div>{category.name}</div>
                </Link>
            ))}
        </Container>
    );
}
