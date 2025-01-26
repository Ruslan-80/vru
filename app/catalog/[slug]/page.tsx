import * as React from "react";
import { Container, Filters, ProductCard, TopBar } from "@/components/shared";
import { prisma } from "@/prisma/prisma-client";

type Params = { slug: string };
export default async function CatalogPageId(props: {
    params: Promise<Params>;
}) {
    const params = await props.params;
    const slug = params.slug;

    const categories = await prisma.category.findUnique({
        where: { slug: String(slug) },
    });

    if (!categories) {
        return (
            <Container>
                <h1 className="text-2xl text-center  mt-10">
                    Категория не найдена
                </h1>
            </Container>
        );
    }

    const productsData = await prisma.product.findMany({
        where: { categoryId: categories.id },
        include: {
            mediaFiles: true,
            attributes: {
                select: {
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

    const products = productsData.map(product => ({
        ...product,
        attributes: product.attributes
            .map(attr => ({
                name: attr.attribute.name,
                value:
                    attr.attributeValue.valueString ??
                    attr.attributeValue.valueNumber,
            }))
            .filter(attr => attr.value !== null), // Удаление атрибутов с null значением
    }));
    console.log(products);

    if (!products) {
        return;
        <Container>
            <h1 className="text-2xl text-center  mt-10">Товары не найдены</h1>
        </Container>;
    }

    return (
        <>
            <Container className="mt-10">
                <TopBar />
                {categories && (
                    <h1
                        style={{ fontSize: "35px" }}
                        className=" font-extrabold"
                    >
                        {categories.name}
                    </h1>
                )}
            </Container>
            <Container className="mt-10 pb-14">
                <div className="flex gap-[80px]">
                    <div className="w-[250px]">
                        <Filters />
                    </div>
                    <div className="flex-1">
                        <div className="grid grid-cols-3 gap-[50px]">
                            {products &&
                                products.map(product => (
                                    <ProductCard
                                        key={product.id}
                                        id={product.id}
                                        slug={product.slug}
                                        article={product.article}
                                        name={product.name}
                                        description={product.description}
                                        manufacturingTime={
                                            product.manufacturingTime
                                        }
                                        stock={product.stock}
                                        basePrice={product.basePrice}
                                        attributes={product.attributes}
                                        imageUrl="/images/vru1.png"
                                    />
                                ))}
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}
