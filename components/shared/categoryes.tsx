"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { useCategoryStore } from "@/store/category";

interface Props {
    className?: string;
}

const cats = [
    { id: 1, name: "ВРУ-1" },
    { id: 2, name: "ВРУ-3" },
    { id: 3, name: "Закуски" },
    { id: 4, name: "Коктейли" },
    { id: 5, name: "Кофе" },
    { id: 6, name: "Напитки" },
    { id: 7, name: "Десерты" },
];

export const Categoryes: React.FC<Props> = ({ className }) => {
    const categoryActiveId = useCategoryStore(state => state.activeId);
    return (
        <div
            className={cn(
                "inline-flex gap-1 bg-gray-50 p-1 rounded-2xl",
                className
            )}
        >
            {cats.map(({ name, id }, index) => (
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
            <a
                className={cn(
                    "flex items-center font-bold h-11 rounded-2xl px-5"
                )}
                href={`/catalog`}
                key={cats.length}
            >
                <button>Catalog</button>
            </a>
        </div>
    );
};
