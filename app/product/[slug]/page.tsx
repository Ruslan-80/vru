import { Container, ProductCardOne } from "@/components/shared";
import { prisma } from "@/prisma/prisma-client";

interface ProductPageProps {
    params: { slug: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { slug } = await params;
    const product = await prisma.product.findUnique({
        where: { slug: String(slug) },
    });

    if (!product) {
        return (
            <Container>
                <h1 className="text-2xl text-center  mt-10">Товар не найден</h1>
            </Container>
        );
    }
    return (
        <>
            {product && (
                <Container className="mt-10">
                    <div className="flex-1">
                        <div className="flex flex-col gap-16">
                            <ProductCardOne
                                id={product.id}
                                slug={product.slug}
                                article={product.article}
                                description={product.description}
                                manufacturingTime={product.manufacturingTime}
                                stock={product.stock}
                                name={product.name}
                                basePrice={product.basePrice}
                                imageUrl="https://msk.z-energo.com/upload/iblock/30d/vvodno_raspredelitel_noye-ustroystvo.jpg"
                            />
                        </div>
                    </div>
                </Container>
            )}
        </>
    );
}
