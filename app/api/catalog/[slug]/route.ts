import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

// interface CatalogPageProps {
//     params: { slug: string };
// }
export async function GET(req: NextRequest) {
    const categoryName = String(req.nextUrl.pathname.split("/").pop());

    const products = await prisma.product.findMany({
        where: {
            category: {
                slug: categoryName,
            },
        },
    });
    return NextResponse.json({ products }, { status: 200 });
}
