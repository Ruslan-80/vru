import { prisma } from "@/prisma/prisma-client";

export interface GetSerchParams {
    query?: string;
    sortBy?: string;
    attributes?: string;
    priceFrom?: string;
    priceTo?: string;
    limit?: string;
    page?: string;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 5000000;

export const findProduct = async (params: GetSerchParams) => {
    const attributesIdArr = params.attributes?.split(",").map(String);

    const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE;
    const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE;

    const categories = await prisma.category.findMany({
        include: {
            products: {
                orderBy: {
                    id: "desc",
                },
                where: {
                    AND: [
                        // Фильтр по цене
                        {
                            basePrice: {
                                gte: minPrice,
                                lte: maxPrice,
                            },
                        },
                        // Фильтр по атрибутам
                        {
                            attributes: {
                                some: {
                                    attributeValue: {
                                        valueString: {
                                            in: attributesIdArr, // Массив искомых значений
                                        },
                                    },
                                },
                            },
                        },
                    ],
                },
                include: {
                    attributes: {
                        include: {
                            attribute: { select: { name: true } },
                            attributeValue: { select: { valueString: true } },
                        },
                    },
                },
            },
        },
        orderBy: { slug: "desc" },
    });

    return { categories };
};
