"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { RangeSlider } from "./range-slider";
import { CheckboxFiltersGroup } from "@/components/shared";
import { Input } from "../ui/input";
import { useQueryFilters, useAttributes, useFilters } from "@/hooks";

interface Props {
    className?: string;
}
export const Filters: React.FC<Props> = ({ className }) => {
    const { attributes, loading } = useAttributes();
    const filters = useFilters();

    useQueryFilters(filters);

    const items = attributes.map(item => ({
        id: item.id,
        name: item.name,
        slug: item.slug,
        values: item.values,
    }));

    const updatePrices = (prices: number[]) => {
        filters.setPrices("priceFrom", prices[0]);
        filters.setPrices("priceTo", prices[1]);
    };

    return (
        <div className={cn("", className)}>
            <h2 className="mb-5 font-bold">Фильтрация</h2>
            <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
                <p className="mb-3 font-bold">Цена от и до:</p>
                <div className="flex gap-3 mb-5">
                    <Input
                        type="number"
                        placeholder="0"
                        min={0}
                        max={5000}
                        value={String(filters.prices.priceFrom)}
                        onChange={e =>
                            filters.setPrices(
                                "priceFrom",
                                Number(e.target.value)
                            )
                        }
                    />
                    <Input
                        type="number"
                        placeholder="5000"
                        min={0}
                        max={5000}
                        value={String(filters.prices.priceTo)}
                        onChange={e =>
                            filters.setPrices("priceTo", Number(e.target.value))
                        }
                    />
                </div>
                <RangeSlider
                    min={0}
                    max={5000}
                    step={100}
                    value={[
                        filters.prices.priceFrom || 0,
                        filters.prices.priceTo || 5000,
                    ]}
                    onValueChange={updatePrices}
                />
            </div>
            {items.length > 0 && (
                <CheckboxFiltersGroup
                    title="Характеристики"
                    className="mt-5"
                    limit={5}
                    defaultItems={items.slice(0, 5)}
                    items={items}
                    loading={loading}
                    onClickCheckbox={filters.setSelectedValues}
                    selectedValues={filters.selectedValues}
                />
            )}
        </div>
    );
};
