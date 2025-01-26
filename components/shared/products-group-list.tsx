"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { useIntersection } from "react-use";
import { ProductCard } from "./product-card";
import { useCategoryStore } from "@/store/category";

interface Props {
    key: number;
    title: string;
    items: any[];
    categoryId: number;
    className?: string;
    ListClassName?: string;
}

export const ProductsGroupList: React.FC<Props> = ({
    title,
    items,
    categoryId,
    ListClassName,
    className,
}) => {
    const setActiveCategoryId = useCategoryStore(state => state.setActiveId);
    const IntersectionRef = React.useRef(null);
    const Intersection = useIntersection(IntersectionRef, {
        threshold: 0.4,
    });
    React.useEffect(() => {
        if (Intersection?.isIntersecting) {
            setActiveCategoryId(categoryId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoryId, Intersection?.isIntersecting, title]);
    return (
        <div className={className} id={title} ref={IntersectionRef}>
            <h2 className="font-extrabold mb-5">{title}</h2>
            <div className={cn("grid grid-cols-3 gap-[15px]", ListClassName)}>
                {items.map(product => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        basePrice={product.basePrice}
                        imageUrl="/images/vru1.png"
                        slug={product.slug}
                        attributes={product.attributes}
                        article={product.article}
                        description={product.description}
                        manufacturingTime={product.manufacturingTime}
                        stock={product.stock}
                    />
                ))}
            </div>
        </div>
    );
};
