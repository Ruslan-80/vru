"use client";
import React from "react";
import { Input, Skeleton } from "../ui";
import { FilterCheckbox } from "@/components/shared";
import { FilterCheckboxProps } from "./filter-checkbox";

type Item = FilterCheckboxProps;

interface Props {
    title: string;
    items: Item[];
    defaultItems?: Item[];
    limit?: number;
    loading?: boolean;
    searchInputPlaceholder?: string;
    selectedValues?: Set<string>;
    onClickCheckbox?: (value: string) => void;
    defaultValue?: string[];
    className?: string;
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
    title,
    items,
    defaultItems = [],
    limit = 5,
    searchInputPlaceholder = "Поиск...",
    className,
    loading,
    selectedValues,
    onClickCheckbox,
}) => {
    const [showAll, setShowAll] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState("");
    const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    if (loading) {
        return (
            <div className={className}>
                <p className="mb-3 font-bold">{title}</p>
                {...Array(limit)
                    .fill(0)
                    .map((_, index) => (
                        <Skeleton
                            key={index}
                            className="h-6 w-full mb-4 rounded-[8px]"
                        />
                    ))}
            </div>
        );
    }
    const list = showAll
        ? items.filter(item =>
              item.name.toLowerCase().includes(searchValue.toLowerCase())
          )
        : (defaultItems || items).slice(0, limit);
    return (
        <div className={className}>
            <p className="mb-3 font-bold">{title}</p>
            {showAll && (
                <div className="mb-5">
                    <Input
                        onChange={onChangeSearchInput}
                        placeholder={searchInputPlaceholder}
                        className="bg-gray-50 border-none"
                    />
                </div>
            )}
            <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
                {list.map((item, index) => (
                    <FilterCheckbox
                        key={index}
                        name={item.name}
                        values={item.values}
                        value={item.value}
                        selectedValues={selectedValues}
                        endAdornment={item.endAdornment}
                        checked={true}
                        onClickCheckbox={id => onClickCheckbox?.(id)}
                    />
                ))}
            </div>

            {items.length > limit && (
                <div
                    className={
                        showAll ? "border-t border-t-neutral-100 mt-4" : ""
                    }
                >
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="text-primary mt-4"
                    >
                        {showAll ? "Скрыть" : "+ Показать все"}
                    </button>
                </div>
            )}
        </div>
    );
};
