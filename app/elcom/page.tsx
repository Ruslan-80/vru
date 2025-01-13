"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface Product {
    id: number;
    name: string;
    brand: string;
    article: string;
    contractPrice: string;
    defaultPrice: string;
    stocks: number;
    image: string;
}

export default function Elcom() {
    const [elproducts, setElproducts] = useState<Product[]>([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get("/api/elcom");
            const { data } = await response.data;
            setElproducts(data);

            return data;
        } catch (error) {
            console.error("Ошибка при получении товаров:", error);
        }
    };
    return (
        <>
            <div className="p-10">
                <h1>Elcom</h1>
                {!elproducts ? (
                    <p>Нет доступных товаров.</p>
                ) : (
                    elproducts.map(product => (
                        <div key={product.id} className="flex justify-between">
                            <img
                                className="w-[60px] h-[60px]"
                                src={`https://b2b.el-com.ru${product.image}`}
                                alt={product.name}
                            />

                            <div>{product.article}</div>
                            <div className="flex-1 min-w-10">
                                {product.name}
                            </div>
                            <div>{product.brand}</div>
                            <div>{product.stocks}</div>
                            <div className="flex-1">
                                {product.contractPrice}
                            </div>
                            <div>{product.defaultPrice}</div>
                        </div>
                    ))
                )}
            </div>
        </>
    );
}
