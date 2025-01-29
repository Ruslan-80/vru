import React from "react";
import { Filters } from "./use-filters";
import { useRouter } from "next/navigation";
import qs from "qs";

export const useQueryFilters = (filters: Filters) => {
    const router = useRouter();

    React.useEffect(() => {
        const params = {
            ...filters.prices,
            attributes: Array.from(filters.selectedValues),
        };

        const query = qs.stringify(params, { arrayFormat: "comma" });

        router.push(`?${query}`, { scroll: false });
    }, [filters.prices, filters.selectedValues, router]);
};
