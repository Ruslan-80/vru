"use client";
import { useStoreCategory } from "@/store/store";
import { cn } from "@/lib/utils";
import React from "react";
import { Categoryes, SortPopup, Container } from "@/components/shared";

interface Props {
    className?: string;
}

export const TopBar: React.FC<Props> = ({ className }) => {
    const catalogData = useStoreCategory(state => state.catalogData);
    return (
        <div
            className={cn(
                "sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10",
                className
            )}
        >
            <Container className="flex items-center justify-between">
                <Categoryes catalogData={catalogData} />
                <SortPopup />
            </Container>
        </div>
    );
};
