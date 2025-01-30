import { TopBar, Container, ProductsGroupList } from "@/components/shared";
import { Filters } from "@/components/shared/filters";
import { findProduct, GetSerchParams } from "@/lib/find-products";

export default async function Home({
    searchParams,
}: {
    searchParams: GetSerchParams;
}) {
    const { categories } = await findProduct(searchParams);

    return (
        <>
            <Container className="mt-10">
                <h1 style={{ fontSize: "35px" }} className="font-extrabold">
                    Главная
                </h1>
                <a
                    className="flex items-center font-bold h-11 rounded-2xl px-5"
                    href={`/catalog`}
                    key={1}
                >
                    <button>Catalog</button>
                </a>
            </Container>
            <TopBar />
            <Container className="mt-10 pb-14">
                <div className="flex gap-[80px]">
                    <div className="w-[250px]">
                        <Filters />
                    </div>
                    <div className="flex-1">
                        <div className="flex flex-col gap-16">
                            {categories.map(category =>
                                category.products.length > 0 ? (
                                    <ProductsGroupList
                                        key={category.id}
                                        title={category.name}
                                        categoryId={category.id}
                                        items={category.products}
                                    />
                                ) : (
                                    <p>Загрузка категорий...</p>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}
