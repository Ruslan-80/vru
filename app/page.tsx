"use client";
import {
    TopBar,
    Container,
    Filters,
    ProductsGroupList,
} from "@/components/shared";
import axios from "axios";
import { Category, Product } from "@prisma/client";
import { useEffect, useState } from "react";

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        fetchCategories();
        fetchProducts();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get("/api/catalog");
            const { category } = response.data;
            setCategories(category);
        } catch (error) {
            console.error("Ошибка при получении категорий:", error);
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await axios.get("/api/products");
            const { products } = await response.data;
            setProducts(products);
            return products;
        } catch (error) {
            console.error("Ошибка при получении товаров:", error);
        }
    };

    return (
        <>
            <Container className="mt-10">
                <h1 style={{ fontSize: "35px" }} className=" font-extrabold">
                    Главная
                </h1>
                <a
                    className={
                        "flex items-center font-bold h-11 rounded-2xl px-5"
                    }
                    href={`/catalog`}
                    key={categories.length}
                >
                    <button>Catalog</button>
                </a>
            </Container>
            <TopBar />
            <Container className="mt-10 pb-14">
                <div className="flex gap-[80px]">
                    {/* Фильтрация */}
                    <div className="w-[250px]">
                        <Filters />
                    </div>
                    {/* Список товаров */}
                    <div className="flex-1">
                        <div className="flex flex-col gap-16">
                            {categories.map(category => (
                                <ProductsGroupList
                                    key={category.id}
                                    title={category.name}
                                    items={products.filter(
                                        product =>
                                            product.categoryId === category.id
                                    )}
                                    categoryId={0}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}
