import { Container, ProductCard } from "@/components/shared";
import { prisma } from "@/prisma/prisma-client";
import { Filters } from "@/components/shared/my-filters";

export default async function CatalogPage({
    searchParams,
}: {
    searchParams: { filters?: string | string[] };
}) {
    // Нормализация параметров
    const filterIds = Array.isArray(searchParams.filters)
        ? searchParams.filters
        : searchParams.filters?.split(",") || [];

    // Запрос для получения товаров
    const products = await prisma.product.findMany({
        where:
            filterIds.length > 0
                ? {
                      AND: filterIds.map(value => ({
                          attributes: {
                              some: {
                                  attributeValue: {
                                      valueString: value,
                                  },
                              },
                          },
                      })),
                  }
                : {}, // Если фильтров нет, возвращаем все товары
        include: {
            attributes: {
                include: {
                    attributeValue: true,
                },
            },
        },
    });

    // Получаем все доступные атрибуты для фильтров
    const attributes = await prisma.attribute.findMany({
        include: {
            values: {
                distinct: ["valueString", "valueNumber"],
                select: {
                    id: true,
                    valueString: true,
                    valueNumber: true,
                },
            },
        },
    });

    return (
        <Container className="mt-10 pb-14">
            <div className="flex gap-[80px]">
                {/* Блок фильтров */}
                <div className="w-[250px]">
                    <Filters attributes={attributes} />
                </div>
                <div className="grid grid-cols-3 gap-[15px]">
                    {products.map(product => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            basePrice={product.basePrice}
                            imageUrl="/images/vru1.png"
                            slug={product.slug}
                            article={product.article}
                            description={product.description}
                            manufacturingTime={product.manufacturingTime}
                            stock={product.stock}
                        />
                    ))}
                </div>
            </div>
        </Container>
    );
}
