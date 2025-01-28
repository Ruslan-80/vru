"use client"; // Важно: делаем компонент клиентским

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";

export function Filters({
    attributes,
}: {
    attributes: Array<{
        id: number;
        name: string;
        slug: string;
        values: Array<{
            id: number;
            valueString: string;
            valueNumber?: number | null;
        }>;
    }>;
}) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [selectedFilters, setSelectedFilters] = useState<Set<string>>(
        new Set(searchParams.getAll("filters"))
    );

    const handleFilterChange = (value: string) => {
        const newFilters = new Set(selectedFilters);

        if (newFilters.has(value)) {
            newFilters.delete(value);
        } else {
            newFilters.add(value);
        }

        // Обновляем URL параметры
        const params = new URLSearchParams(searchParams);
        params.delete("filters");
        newFilters.forEach(v => params.append("filters", v));

        router.replace(`?${params.toString()}`, { scroll: false });
        setSelectedFilters(newFilters);
    };

    return (
        <div className="space-y-6">
            {attributes.map(attr => (
                <div key={attr.slug}>
                    <h3 className="mb-2 font-medium">{attr.name}</h3>
                    <div className="space-y-2">
                        {attr.values.map(value => (
                            <div
                                key={value.id}
                                className="flex items-center gap-2"
                            >
                                <Checkbox.Root
                                    className="flex h-4 w-4 items-center justify-center rounded border bg-white"
                                    checked={selectedFilters.has(
                                        value.valueString
                                    )}
                                    onCheckedChange={() =>
                                        handleFilterChange(value.valueString)
                                    }
                                >
                                    <Checkbox.Indicator className="text-blue-600">
                                        <CheckIcon className="h-3 w-3" />
                                    </Checkbox.Indicator>
                                </Checkbox.Root>
                                <label className="text-sm">
                                    {value.valueString || value.valueNumber}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
