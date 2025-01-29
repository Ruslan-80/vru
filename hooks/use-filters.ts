import React from "react";
import { useSet } from "react-use";
import { useSearchParams } from "next/navigation";

interface PriceProps {
    priceFrom?: number;
    priceTo?: number;
}
interface QueryFilters extends PriceProps {
    attributes: string;
}
export interface Filters {
    prices: PriceProps;
    selectedValues: Set<string>;
}
interface ReturnProps extends Filters {
    setPrices: (name: keyof PriceProps, value: number) => void;
    setSelectedValues: (value: string) => void;
}
export const useFilters = (): ReturnProps => {
    const searchParams = useSearchParams() as unknown as Map<
        keyof QueryFilters,
        string
    >;
    /* Фильтр аттрибутов */
    const [selectedValues, { toggle: toggleValues }] = useSet(
        new Set<string>(searchParams.get("attributes")?.split(","))
    );

    /* Фильтр цены */
    const [prices, setPrices] = React.useState<PriceProps>({
        priceFrom: Number(searchParams.get("priceFrom")) || undefined,
        priceTo: Number(searchParams.get("priceTo")) || undefined,
    });
    const updatePrice = (name: keyof PriceProps, value: number) => {
        setPrices(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    return {
        selectedValues,
        prices,
        setSelectedValues: toggleValues,
        setPrices: updatePrice,
    };
};
