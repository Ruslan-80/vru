"use client";
import { cn } from "@/lib/utils";
import {
    FilterCheckbox,
    RangeSlider,
    CheckboxFiltersGroup,
} from "@/components/shared";
import { Input } from "../ui/input";
import { Category } from "@prisma/client";
import { useEffect, useState } from "react";
import { useFilterAttributes } from "@/hooks/useFilterAttributes";
import axios from "axios";

interface Props {
    className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const { attributes } = useFilterAttributes();

    const items = attributes.map(item => ({
        value: String(item.id),
        text: item.name,
    }));
    console.log(attributes);

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
        <div className={cn("", className)}>
            <h2 className="mb-5 font-bold">Фильтрация</h2>
            {/* Верхние чекбоксы */}
            {categories.map(category => (
                <FilterCheckbox
                    key={category.id}
                    text={category.name}
                    value={String(category.id)}
                />
            ))}
            <div>
                <FilterCheckbox text="Можно собирать" value="1" />
                <FilterCheckbox text="Новинки" value="2" />
            </div>
            {/* Цена */}
            <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
                <p className="mb-3 font-bold">Цена от и до:</p>
                <div className="flex gap-3 mb-5">
                    <Input
                        type="number"
                        placeholder="0"
                        min={0}
                        max={1000}
                        defaultValue={0}
                    />
                    <Input
                        type="number"
                        placeholder="1000"
                        min={100}
                        max={1000}
                        defaultValue={100}
                    />
                </div>
                <RangeSlider min={0} max={5000} step={10} value={[0, 5000]} />
            </div>
            {items.length > 0 && (
                <CheckboxFiltersGroup
                    title="Характеристики"
                    className="mt-5"
                    limit={5}
                    defaultItems={items.slice(0, 5)}
                    items={items}
                />
            )}
        </div>
    );
};
