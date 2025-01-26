import Link from "next/link";
import React from "react";
import { Button } from "../ui";
import { Plus } from "lucide-react";

interface Attribute {
    name: string;
    value: string | number | null;
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
    attributes: Attribute[];
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
                <div className="flex flex-col justify-center p-6 bg-secondary rounded-lg h-[450px]">
                    <img
                        className="w-[215px] h-[150px]"
                        src={imageUrl}
                        alt={name}
                    />
                    <p>{imageUrl}</p>
                    <h2 className="mb-3 mt-5 font-bold">{name}</h2>
                    <p className="text-sm text-gray-400">{description}</p>
                    <ul>
                        {attributes.map((attr, index) => (
                            <li key={index}>
                                {attr.name}: {attr.value}
                            </li>
                        ))}
                    </ul>
                    <p className="text-sm text-gray-400">
                        В наличии {stock} шт.
                    </p>
                    <p className="text-sm text-gray-400">
                        Срок изготовления:{manufacturingTime}
                    </p>
                    <div className="flex justify-between items-center mt-4">
                        <span className="text-[20px]">
                            от{" "}
                            <b>
                                {" "}
                                {Number(basePrice).toLocaleString("ru-RU")} ₽
                            </b>
                        </span>
                        <Button
                            variant="destructive"
                            className="text-base font-bold"
                        >
                            <Plus size={20} className="mr-1" /> Добавить
                        </Button>
                    </div>
                </div>
            </Link>
        </div>
    );
};
