import { Container, Filters, ProductCard, TopBar } from "@/components/shared";
import { prisma } from "@/prisma/prisma-client";

interface CatalogPageProps {
    params: { slug: string };
}
export default async function CatalogPageId({ params }: CatalogPageProps) {
    const { slug } = await params;

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

    const products = await prisma.product.findMany({
        where: { categoryId: categories.id },
    });

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
                                        imageUrl="https://msk.z-energo.com/upload/iblock/30d/vvodno_raspredelitel_noye-ustroystvo.jpg"
                                    />
                                ))}
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}
