"use client";
import { useStoreCategory, useStoreProduct } from "@/store/store";
import {
    TopBar,
    Container,
    ProductsGroupList,
    Filters,
} from "@/components/shared";

import { useEffect } from "react";

export default function Home() {
    const catalogData = useStoreCategory(state => state.catalogData);
    const fetchCatalog = useStoreCategory(state => state.fetchCatalog);
    const productData = useStoreProduct(state => state.productData);
    const fetchProduct = useStoreProduct(state => state.fetchProduct);

    useEffect(() => {
        fetchCatalog();
        fetchProduct();
    }, [fetchCatalog, fetchProduct]);

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
                            {catalogData ? (
                                catalogData.map(category => (
                                    <ProductsGroupList
                                        key={category.id}
                                        title={category.name}
                                        items={
                                            productData?.filter(
                                                product =>
                                                    product.categoryId ===
                                                    category.id
                                            ) || []
                                        }
                                        categoryId={category.id}
                                    />
                                ))
                            ) : (
                                <p>Загрузка категорий...</p>
                            )}
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}
