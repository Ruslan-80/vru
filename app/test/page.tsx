"use client";
import React, { useEffect } from "react";
import { useStoreCategory, useStoreProduct } from "@/store/store";

interface Props {
    className?: string;
}

export default function Test({ className }: Props) {
    const catalogData = useStoreCategory(state => state.catalogData);
    const fetchCatalog = useStoreCategory(state => state.fetchCatalog);
    const productData = useStoreProduct(state => state.productData);
    const fetchProduct = useStoreProduct(state => state.fetchProduct);

    useEffect(() => {
        fetchCatalog();
        fetchProduct();
    }, [fetchCatalog, fetchProduct]);

    if (!catalogData) {
        return <div>Loading...</div>;
    }

    console.log(catalogData);
    return (
        <div className={className}>
            <title>Page</title>
            <div>Category</div>
            {catalogData &&
                catalogData.map(({ name, id }) => (
                    <div key={id}>
                        <p>{name}</p>
                    </div>
                ))}
            <div>Products</div>
            {productData &&
                productData.map(({ name, id, basePrice }) => (
                    <div key={id}>
                        <p>{name}</p> <p>{basePrice.toString()}</p>
                    </div>
                ))}
        </div>
    );
}
