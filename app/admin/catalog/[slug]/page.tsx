import { Container } from "@/components/shared";
import { Input } from "@/components/ui";
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
                {categories && (
                    <>
                        <h1
                            style={{ fontSize: "35px" }}
                            className=" font-extrabold"
                        >
                            {categories.name}
                        </h1>

                        <div className="flex gap-[80px]">
                            <div>CategoryId - </div>
                            <Input
                                type="text"
                                defaultValue={categories.id}
                                disabled
                            />
                        </div>
                        <div className="flex gap-[80px]">
                            <div>CategoryName - </div>
                            <Input type="text" defaultValue={categories.name} />
                        </div>
                        <div className="flex gap-[80px]">
                            <div>CategoryParentId - </div>
                            <Input
                                type="text"
                                defaultValue={categories.parentId?.toString()}
                            />
                        </div>
                        <div className="flex gap-[80px]">
                            <div>CategorySlug - </div>
                            <Input type="text" defaultValue={categories.slug} />
                        </div>
                        <div className="flex gap-[80px]">
                            <div>CategoryDescription -</div>
                            <Input
                                type="text"
                                placeholder={categories.description?.toString()}
                            />
                        </div>
                        <div className="flex gap-[80px]">
                            <div>CategoryImage -</div>
                            <Input type="file" />
                        </div>

                        <div>
                            CategoryCreate - {String(categories.createdAt)}
                        </div>
                        <div>
                            CategoryUpdate - {String(categories.updatedAt)}
                        </div>
                    </>
                )}
            </Container>
            <Container className="mt-10 pb-14">
                <div className="flex gap-[80px]">
                    {products && (
                        <ul className="flex flex-col gap-5">
                            {products.map(product => (
                                <li key={product.id} className="flex gap-5">
                                    <div>{product.id}</div>
                                    <div>{product.name}</div>
                                    <div>{product.slug}</div>
                                    <div>{product.categoryId}</div>
                                    <div>{product.article}</div>
                                    <div>{product.description}</div>
                                    <div>{Number(product.basePrice)}</div>
                                    <div>{product.manufacturingTime}</div>
                                    <div>{product.stock}</div>
                                    <div>{product.visibility}</div>
                                    {/* <div>{String(product.createdAt)}</div> */}
                                    {/* <div>{String(product.updatedAt)}</div> */}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </Container>
        </>
    );
}
