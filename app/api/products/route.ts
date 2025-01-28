import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const filters = searchParams.getAll("filters");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    const products = await prisma.product.findMany({
        where:
            filters.length > 0
                ? {
                      AND: [
                          {
                              attributes: {
                                  some: {
                                      attributeValue: {
                                          OR: [
                                              { valueString: { in: filters } },
                                              {
                                                  valueNumber: {
                                                      in: filters.map(Number),
                                                  },
                                              },
                                          ],
                                      },
                                  },
                              },
                          },
                          {
                              basePrice: {
                                  gte: Number(minPrice) || 0,
                                  lte: Number(maxPrice) || 10000,
                              },
                          },
                      ],
                  }
                : {},
        include: {
            attributes: {
                include: {
                    attributeValue: true, // Включаем связанную модель
                },
            },
        },
    });

    return NextResponse.json({ products });
}
