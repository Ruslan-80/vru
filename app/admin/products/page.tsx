"use client";
import { Container } from "@/components/shared";
import { MyNav } from "@/components/shared/my-nav";
import { Button } from "@/components/ui";
import axios from "axios";
import { useEffect, useState } from "react";

interface Product {
    id: number;
    categoryId: number;
    article: string;
    name: string;
    slug: string;
    description: string;
    basePrice: string;
    manufacturingTime: string;
    stock: number;
    visibility: boolean;
    attributes: ProductAttributes[];
}
interface ProductAttributes {
    name: string;
    value: string;
}
interface Category {
    id: number;
    name: string;
}
export default function ProductsAdmin() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [name, setName] = useState("");
    const [categoryId, setCategoryId] = useState<number | null>(null);
    const [article, setArticle] = useState("");
    const [slug, setSlug] = useState("");
    const [description, setDescription] = useState("");
    const [basePrice, setBasePrice] = useState("");
    const [manufacturingTime, setManufacturingTime] = useState("");
    const [stock, setStock] = useState<number | null>(null);
    const [visibility, setVisibility] = useState(true);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [productId, setProductId] = useState<number | null>(null);
    const [productAttributes, setProductAttributes] = useState<
        { name: string; value: string }[]
    >([]);

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get("/api/admin/products");
            const { products } = response.data;
            setProducts(products);
        } catch (error) {
            console.error("Ошибка при получении товаров:", error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get("/api/catalog");
            const { category } = response.data;
            setCategories(category);
        } catch (error) {
            console.error("Ошибка при получении категорий:", error);
        }
    };

    const handleAddProduct = async () => {
        try {
            await axios.post("/api/admin/products", {
                name,
                categoryId,
                article,
                slug,
                description,
                basePrice,
                manufacturingTime,
                stock,
                visibility,
                attributes: productAttributes,
            });
            resetForm();
            fetchProducts();
        } catch (error) {
            console.error("Ошибка при добавлении товара:", error);
        }
    };

    const handleEditProduct = async () => {
        if (productId === null) return;
        try {
            await axios.put("/api/admin/products", {
                id: productId,
                name,
                categoryId,
                article,
                slug,
                description,
                basePrice,
                manufacturingTime,
                stock,
                visibility,
                attributes: productAttributes,
            });
            resetForm();
            fetchProducts();
        } catch (error) {
            console.error("Ошибка при изменении товара:", error);
        }
    };

    const handleDeleteProduct = async (slug: string) => {
        try {
            await axios.delete("/api/admin/products", {
                data: { slug },
            });
            fetchProducts();
        } catch (error) {
            console.error("Ошибка при удалении товара:", error);
        }
    };

    const resetForm = () => {
        setName("");
        setCategoryId(null);
        setArticle("");
        setSlug("");
        setDescription("");
        setBasePrice("");
        setManufacturingTime("");
        setStock(null);
        setVisibility(true);
        setProductAttributes([]);
        setIsFormVisible(false);
        setIsEditing(false);
        setProductId(null);
    };

    const handleEditClick = (product: Product) => {
        setName(product.name);
        setCategoryId(product.categoryId);
        setArticle(product.article);
        setSlug(product.slug);
        setDescription(product.description);
        setBasePrice(product.basePrice);
        setManufacturingTime(product.manufacturingTime);
        setStock(product.stock);
        setVisibility(product.visibility);
        setProductAttributes(
            product.attributes.map(attribute => ({
                name: attribute.name,
                value: attribute.value,
            }))
        );
        setProductId(product.id);
        setIsEditing(true);
        setIsFormVisible(true);
    };

    return (
        <Container className="container">
            <MyNav />
            <div className="flex justify-end mb-3">
                <Button onClick={() => setIsFormVisible(!isFormVisible)}>
                    {isFormVisible ? "Скрыть форму" : "Добавить товар"}
                </Button>
            </div>
            <hr />
            {isFormVisible && (
                <div>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Название товара"
                    />
                    <select
                        value={categoryId || ""}
                        onChange={e =>
                            setCategoryId(Number(e.target.value) || null)
                        }
                    >
                        <option value="">Выберите категорию</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        value={article}
                        onChange={e => setArticle(e.target.value)}
                        placeholder="Артикул товара"
                    />
                    <input
                        type="text"
                        value={slug}
                        onChange={e => setSlug(e.target.value)}
                        placeholder="Slug товара"
                    />
                    <input
                        type="text"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Описание товара"
                    />
                    <input
                        type="text"
                        value={basePrice}
                        onChange={e => setBasePrice(e.target.value)}
                        placeholder="Базовая цена"
                    />
                    <input
                        type="text"
                        value={manufacturingTime}
                        onChange={e => setManufacturingTime(e.target.value)}
                        placeholder="Время изготовления"
                    />
                    <input
                        type="number"
                        value={stock || ""}
                        onChange={e => setStock(Number(e.target.value) || null)}
                        placeholder="Количество на складе"
                    />
                    <label>
                        Видимость:
                        <input
                            type="checkbox"
                            checked={visibility}
                            onChange={e => setVisibility(e.target.checked)}
                        />
                    </label>
                    <div>
                        <h3>Характеристики товара</h3>

                        {productAttributes.map((attribute, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2"
                            >
                                <input
                                    type="text"
                                    value={attribute.name}
                                    onChange={e =>
                                        setProductAttributes(
                                            productAttributes.map((attr, i) =>
                                                i === index
                                                    ? {
                                                          ...attr,
                                                          name: e.target.value,
                                                      }
                                                    : attr
                                            )
                                        )
                                    }
                                    placeholder="Название характеристики"
                                />
                                <input
                                    type="text"
                                    value={attribute.value}
                                    onChange={e =>
                                        setProductAttributes(
                                            productAttributes.map((attr, i) =>
                                                i === index
                                                    ? {
                                                          ...attr,
                                                          value: e.target.value,
                                                      }
                                                    : attr
                                            )
                                        )
                                    }
                                    placeholder="Значение характеристики"
                                />
                            </div>
                        ))}
                        <Button
                        // onClick={setAttributes}
                        >
                            Добавить характеристику
                        </Button>
                    </div>
                    <Button
                        onClick={
                            isEditing ? handleEditProduct : handleAddProduct
                        }
                    >
                        {isEditing ? "Изменить товар" : "Сохранить товар"}
                    </Button>
                </div>
            )}
            <ul className="mt-4 mb-4">
                {products &&
                    products.map(product => (
                        <div
                            key={product.id}
                            className="mb-4 text-sm text-gray-600"
                        >
                            <li className="flex justify-between mb-2">
                                <div
                                    key={product.id}
                                    className="mr-5 min-w-[25rem]"
                                >
                                    <div>{product.name}</div>

                                    {product.attributes.map((attr, index) => (
                                        <div key={index} className="flex  mt-2">
                                            <span className="mr-2">
                                                {attr.name}
                                            </span>
                                            <span className="text-red-600">
                                                {attr.value}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mr-4 min-w-[10rem]">
                                    {product.article}
                                </div>
                                <div className="mr-4  min-w-[3rem]">
                                    (ID: {product.id})
                                </div>
                                <div className="mr-4 min-w-[7rem]">
                                    {product.slug}
                                </div>
                                <div className="mr-4">
                                    {product.description}
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        variant={"outline"}
                                        onClick={() => handleEditClick(product)}
                                    >
                                        Редактировать
                                    </Button>
                                    <Button
                                        onClick={() =>
                                            handleDeleteProduct(product.slug)
                                        }
                                    >
                                        Удалить
                                    </Button>
                                </div>
                            </li>
                            <hr />
                        </div>
                    ))}
            </ul>
        </Container>
    );
}
