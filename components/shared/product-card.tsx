import Link from "next/link";
import React from "react";
import { Button } from "../ui";
import { Plus } from "lucide-react";

interface Attribute {
    attribute: {
        name: string;
    };
    attributeValue: {
        valueString: string;
    };
}
interface Props {
    id: number;
    slug: string;
    article: string;
    name: string;
    description: any;
    manufacturingTime: string;
    basePrice: any;
    stock: number;
    attributes?: Attribute[];
    imageUrl: string;
    className?: string;
}

export const ProductCard: React.FC<Props> = ({
    id,
    slug,
    name,
    description,
    manufacturingTime,
    stock,
    basePrice,
    attributes,
    imageUrl,
    className,
}) => {
    return (
        <div key={id} className={className}>
            <Link href={`/catalog/product/${slug}`}>
                <div className="flex flex-col justify-center p-6 bg-secondary rounded-lg h-[500px]">
                    <div className="relative w-full aspect-[4/3] mx-auto bg-gray-50 rounded-lg">
                        <img
                            className="w-full h-full object-contain p-2 transition-transform duration-300 hover:scale-105"
                            src={imageUrl || "/placeholder-image.jpg"}
                            alt={name}
                            onError={e => {
                                e.currentTarget.src = "/placeholder-image.jpg";
                            }}
                        />
                    </div>

                    <h2 className="mb-3 mt-5 font-bold line-clamp-2">{name}</h2>

                    <div className="flex-1">
                        <p className="text-sm text-gray-400 line-clamp-3">
                            {description}
                        </p>

                        {attributes && attributes.length > 0 && (
                            <ul className="mt-2 space-y-1">
                                {attributes.map((attr, index) => (
                                    <li
                                        key={index}
                                        className="text-sm text-gray-600 flex gap-1"
                                    >
                                        <span className="font-medium">
                                            {attr.attribute.name}:
                                        </span>
                                        <span>
                                            {attr.attributeValue.valueString}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="mt-4 space-y-2">
                        <p className="text-sm text-gray-400">
                            В наличии: {stock} шт.
                        </p>
                        <p className="text-sm text-gray-400">
                            Срок изготовления: {manufacturingTime}
                        </p>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                        <span className="text-[20px] font-semibold">
                            {Number(basePrice).toLocaleString("ru-RU", {
                                style: "currency",
                                currency: "RUB",
                                minimumFractionDigits: 0,
                            })}
                        </span>
                        <Button
                            variant="destructive"
                            className="text-base font-bold hover:bg-opacity-80 transition-opacity"
                            onClick={e => {
                                e.preventDefault();
                                // Логика добавления в корзину
                            }}
                        >
                            <Plus size={20} className="mr-1" />
                            Добавить
                        </Button>
                    </div>
                </div>
            </Link>
        </div>
    );
};
