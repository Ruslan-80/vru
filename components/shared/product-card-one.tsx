import Link from "next/link";
import React from "react";
import { Button } from "../ui";
import { Plus } from "lucide-react";

interface Props {
    id: number;
    slug: string;
    article: string;
    name: string;
    description: any;
    manufacturingTime: string;
    basePrice: any;
    stock: number;
    imageUrl: string;
    className?: string;
}

export const ProductCardOne: React.FC<Props> = ({
    id,
    article,
    slug,
    name,
    description,
    manufacturingTime,
    stock,
    basePrice,
    imageUrl,
    className,
}) => {
    return (
        <div key={id} className={className}>
            <h1 className="mb-3 mt-3 text-3xl  font-bold">{name}</h1>
            <Link href={`/product/${slug}`}>
                <div className="flex justify-between p-3 bg-secondary rounded-lg h-[500px]">
                    <div className="w-[40%]">
                        <img
                            className="w-[500px] h-[450px]"
                            src={imageUrl}
                            alt={name}
                        />
                    </div>
                    <div className="flex flex-col w-[55%] ">
                        <div className="flex justify-between">
                            <button>Отложить</button>
                            <button>Сравнить</button>

                            <p className="text-sm mt-3 text-gray-600">
                                Артикул: {article}
                            </p>
                            <div className="text-sm mt-3 text-gray-600 text-center">
                                Сделано в России
                            </div>
                        </div>
                        <hr className="mt-5" />

                        <div className="flex justify-between items-center mt-4">
                            <span className="text-[36px]">
                                от{" "}
                                <b>
                                    {" "}
                                    {Number(basePrice).toLocaleString(
                                        "ru-RU"
                                    )}{" "}
                                    ₽
                                </b>
                            </span>
                        </div>
                        <p className="text-lg mt-3 text-gray-600">
                            {description}
                        </p>
                        {stock > 3 && (
                            <p className="text-lg mt-3 text-gray-600">
                                В наличии {stock} шт.
                            </p>
                        )}
                        <p className="text-lg mt-3 text-gray-600">
                            Срок изготовления:{manufacturingTime}
                        </p>

                        <Button
                            variant="destructive"
                            className="text-base font-bold mt-6"
                        >
                            <Plus size={20} className="mr-1" /> Добавить
                        </Button>
                    </div>
                </div>
            </Link>
        </div>
    );
};
