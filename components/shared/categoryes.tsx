"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useCategoryStore } from "@/store/category";
import axios from "axios";
import { Category } from "@prisma/client";

interface Props {
    className?: string;
}

export const Categoryes: React.FC<Props> = ({ className }) => {
    const categoryActiveId = useCategoryStore(state => state.activeId);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        fetchCategories();
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

    return (
        <div
            className={cn(
                "inline-flex gap-1 bg-gray-50 p-1 rounded-2xl",
                className
            )}
        >
            {categories.map(({ name, id }, index) => (
                <a
                    className={cn(
                        "flex items-center font-bold h-11 rounded-2xl px-5",
                        categoryActiveId === id &&
                            "bg-white shadow-gray-200 text-primary"
                    )}
                    href={`/#${name}`}
                    key={index}
                >
                    <button>{name}</button>
                </a>
            ))}
        </div>
    );
};
