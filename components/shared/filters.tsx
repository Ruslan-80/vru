"use client";
import { cn } from "@/lib/utils";
import {
    FilterCheckbox,
    RangeSlider,
    CheckboxFiltersGroup,
} from "@/components/shared";
import { Input } from "../ui/input";
import { useStoreCategory } from "@/store/store";
import { useFilterAttributes } from "@/hooks/useFilterAttributes";
import { useEffect } from "react";

interface Props {
    className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
    const catalogData = useStoreCategory(state => state.catalogData);
    const fetchCatalog = useStoreCategory(state => state.fetchCatalog);
    const { attributes } = useFilterAttributes();

    useEffect(() => {
        fetchCatalog();
    }, [fetchCatalog]);

    const items = attributes.map(item => ({
        value: String(item.id),
        text: item.name,
    }));

    return (
        <div className={cn("", className)}>
            <h2 className="mb-5 font-bold">Фильтрация</h2>
            {/* Верхние чекбоксы */}
            {catalogData &&
                catalogData.map(({ name, id }) => (
                    <FilterCheckbox key={id} text={name} value={String(id)} />
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
