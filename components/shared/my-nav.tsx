import Link from "next/link";
import React from "react";

interface Props {
    className?: string;
}

export const MyNav: React.FC<Props> = ({}) => {
    return (
        <div className="flex gap-5 pb-10 pt-5 font-bold ">
            <Link href="/admin/catalog">Категории</Link>
            <Link href="/admin/products">Товары</Link>
            <Link href="/admin/attributes">Характеристики</Link>
            <Link href="/admin/images">Картинки</Link>
            <Link href="/admin/users">Пользователи</Link>
            <Link href="/admin/cart">Корзины</Link>
        </div>
    );
};
