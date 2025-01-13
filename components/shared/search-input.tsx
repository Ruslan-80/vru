"use client";

import { cn } from "@/lib/utils";
import { Api } from "@/services/api-client";
import { Product } from "@prisma/client";
import { Search } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useClickAway, useDebounce } from "react-use";

interface Props {
    className?: string;
}

export const SearchInput: React.FC<Props> = ({ className }) => {
    const [searchQuery, setSearchQuery] = React.useState("");
    const [focused, setFocused] = React.useState(false);
    const [products, setProducts] = React.useState<Product[]>([]);
    const ref = React.useRef(null);

    useClickAway(ref, () => {
        setFocused(false);
    });

    useDebounce(
        async () => {
            try {
                const response = await Api.products.search(searchQuery);
                setProducts(response);
            } catch (error) {
                console.error(error);
            }
        },
        250,
        [searchQuery]
    );

    const onClickItem = () => {
        setFocused(false);
        setSearchQuery("");
        setProducts([]);
    };

    return (
        <>
            {focused && (
                <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-20" />
            )}
            <div
                ref={ref}
                className={cn(
                    "flex rounded-2xl flex-1 justify-between relative h-11 z-30",
                    className
                )}
            >
                <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400 " />
                <input
                    className="rounded-2xl outline-none w-full bg-gray-100 pl-11"
                    type="text"
                    placeholder="Поиск..."
                    onFocus={() => setFocused(true)}
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />
                {products.length > 0 && (
                    <div
                        className={cn(
                            "absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opasity-0 z-30",
                            focused && "visible opasity-100 top-12"
                        )}
                    >
                        {products.map(product => (
                            <Link
                                key={product.id}
                                className="flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10 cursor-pointer"
                                href={`/catalog/product/${product.slug}`}
                                onClick={onClickItem}
                            >
                                <img
                                    className="h-16 w-16"
                                    src="https://msk.z-energo.com/upload/iblock/30d/vvodno_raspredelitel_noye-ustroystvo.jpg"
                                    alt={product.name}
                                />
                                <span className="rounded-sm h-8 w-full">
                                    {product.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};
