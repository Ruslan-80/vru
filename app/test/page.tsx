import React, { useEffect } from "react";
import { useStoreCategory, useStoreProduct } from "@/store/store";
import { prisma } from "@/prisma/prisma-client";

interface Props {
    className?: string;
}

export default async function Test({ className }: Props) {
    const result = await prisma.category.findMany({
        include: {
            products: {
                include: {
                    attributes: {
                        include: {
                            attribute: {
                                select: {
                                    name: true,
                                },
                            },
                            attributeValue: {
                                select: {
                                    valueString: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    });
    console.log(result);

    return (
        <>
            <div>Hello</div>
        </>
    );
}
