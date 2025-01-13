"use client";
import { Container } from "@/components/shared";
import { Button } from "@/components/ui";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Category {
    id: number;
    name: string;
    parentId: number | null;
    slug: string;
    description: string;
}

export default function CategoriesAdmin() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [name, setName] = useState("");
    const [parentId, setParentId] = useState<number | null>(null);
    const [slug, setSlug] = useState("");
    const [description, setDescription] = useState("");
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [categoryId, setCategoryId] = useState<number | null>(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get("/api/admin/catalog");
            // Извлекаем поле category из ответа
            const { category } = response.data;

            if (Array.isArray(category)) {
                setCategories(category);
            } else {
                console.error(
                    "Ожидался массив категорий, но получен другой формат:",
                    response.data
                );
            }
        } catch (error) {
            console.error("Ошибка при получении категорий:", error);
        }
    };

    const handleAddCategory = async () => {
        try {
            await axios.post("/api/admin/catalog", {
                name,
                parentId,
                slug,
                description,
            });
            resetForm();
            fetchCategories();
        } catch (error) {
            console.error("Ошибка при добавлении категории:", error);
        }
    };

    const handleEditCategory = async () => {
        if (categoryId === null) return;
        try {
            await axios.put("/api/admin/catalog", {
                id: categoryId,
                name,
                parentId,
                slug,
                description,
            });
            resetForm();
            fetchCategories();
        } catch (error) {
            console.error("Ошибка при изменении категории:", error);
        }
    };

    const handleDeleteCategory = async (slug: string) => {
        try {
            await axios.delete("/api/admin/catalog", {
                data: { slug },
            });
            fetchCategories();
        } catch (error) {
            console.error("Ошибка при удалении категории:", error);
        }
    };

    const resetForm = () => {
        setName("");
        setParentId(null);
        setSlug("");
        setDescription("");
        setIsFormVisible(false);
        setIsEditing(false);
        setCategoryId(null);
    };

    const handleEditClick = (category: Category) => {
        setName(category.name);
        setParentId(category.parentId);
        setSlug(category.slug);
        setDescription(category.description);
        setCategoryId(category.id);
        setIsEditing(true);
        setIsFormVisible(true);
    };

    return (
        <Container className="container">
            <div className="flex gap-5 pb-10 pt-5 font-bold">
                <Link href="/admin/catalog">Категории</Link>
                <Link href="/admin/products">Товары</Link>
                <Link href="/admin/attributes">Характеристики</Link>
                <Link href="/admin/images">Картинки</Link>
                <Link href="/admin/users">Пользователи</Link>
                <Link href="/admin/cart">Корзины</Link>

                <div className="ml-auto">
                    <Button onClick={() => setIsFormVisible(!isFormVisible)}>
                        {isFormVisible ? "Скрыть форму" : "Добавить категорию"}
                    </Button>
                </div>
            </div>
            {isFormVisible && (
                <div className="flex gap-5 p-5 font-bold bg-red-100 ">
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Название категории"
                    />
                    <select
                        value={parentId || ""}
                        onChange={e =>
                            setParentId(
                                e.target.value ? Number(e.target.value) : null
                            )
                        }
                    >
                        <option value="">Нет родительской категории</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        value={slug}
                        onChange={e => setSlug(e.target.value)}
                        placeholder="Slug категории"
                    />
                    <input
                        type="text"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Описание категории"
                    />
                    <Button
                        onClick={
                            isEditing ? handleEditCategory : handleAddCategory
                        }
                    >
                        {isEditing
                            ? "Изменить категорию"
                            : "Сохранить категорию"}
                    </Button>
                </div>
            )}
            <ul className="mt-4 mb-4">
                {categories.map(category => (
                    <div key={category.id} className="mb-4">
                        <li className="flex justify-between mb-2">
                            <div className="mr-4 min-w-[10rem]">
                                {category.name}
                            </div>
                            <div className="mr-4 min-w-[3rem]">
                                (ID: {category.id})
                            </div>
                            <div className="mr-4 min-w-[3rem]">
                                {category.slug}
                            </div>
                            <div>{category.description}</div>
                            <div className="flex gap-2">
                                <Button
                                    variant={"outline"}
                                    onClick={() => handleEditClick(category)}
                                >
                                    Редактировать
                                </Button>
                                <Button
                                    onClick={() =>
                                        handleDeleteCategory(category.slug)
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
