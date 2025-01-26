"use client";

import { cn } from "@/lib/utils";
import { useCategoryStore } from "@/store/category";
import { Category } from "@prisma/client";

interface Props {
    className?: string;
    catalogData: Category[] | null;
}

export const Categoryes: React.FC<Props> = ({ className, catalogData }) => {
    const categoryActiveId = useCategoryStore(state => state.activeId);

    return (
        <div
            className={cn(
                "inline-flex gap-1 bg-gray-50 p-1 rounded-2xl",
                className
            )}
        >
            {catalogData &&
                catalogData.map(({ name, id }) => (
                    <a
                        className={cn(
                            "flex items-center font-bold h-11 rounded-2xl px-5",
                            categoryActiveId === id &&
                                "bg-white shadow-gray-200 text-primary"
                        )}
                        href={`/#${name}`}
                        key={id}
                    >
                        <button>{name}</button>
                    </a>
                ))}
        </div>
    );
};
