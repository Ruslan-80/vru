import React from "react";
import { Button } from "../ui";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { CartDrawer } from "./cart-drawer";

interface Props {
    className?: string;
}

export const CartButton: React.FC<Props> = ({ className }) => {
    return (
        <CartDrawer>
            <Button
                variant="outline"
                className={cn("group relative", className)}
            >
                <b>520 P</b>
                <span className="h-full w-[1px] bg-black/30 mx-3" />
                <div className="flex items-center gap-1  transition duration-300 group-hover:opacity-0">
                    <ShoppingCart
                        size={16}
                        className="relative"
                        strokeWidth={2}
                    />
                    <b>3</b>
                </div>
                <ArrowRight
                    size={20}
                    className="absolute opacity-0 right-5 transition duration-300 -translate-x-2  group-hover:opacity-100 group-hover:translate-x-0"
                />
            </Button>
        </CartDrawer>
    );
};
