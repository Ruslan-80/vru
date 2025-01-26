"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Container } from "./container";
import { Box } from "lucide-react";
import Link from "next/link";
import {
    AuthModal,
    CartButton,
    ProfileButton,
    SearchInput,
} from "@/components/shared";

interface Props {
    className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
    const [openAuthModal, setOpenAuthModal] = React.useState(false);

    return (
        <header className={cn("border border-b", className)}>
            <Container className="flex items-center justify-between py-8">
                {/* Левая часть */}
                <Link href="/">
                    <div className="flex items-center gap-4">
                        <Box size={35} />
                        {/* <Image src="/logo.png" alt="logo" width={35} height={35} /> */}
                        <div>
                            <h1 className="text-2xl uppercase font-black">
                                Logo
                            </h1>
                            <p className="text-sm text-gray-400 leading-3">
                                its cool
                            </p>
                        </div>
                    </div>
                </Link>
                <div className="mx-10 flex-1">
                    <SearchInput />
                </div>
                {/* Правая часть */}
                <div className="flex items-center gap-3">
                    <AuthModal
                        open={openAuthModal}
                        onClose={() => setOpenAuthModal(false)}
                    />
                    <ProfileButton
                        onClickSignIn={() => setOpenAuthModal(true)}
                    />
                    <div>
                        <CartButton />
                    </div>
                </div>
            </Container>
        </header>
    );
};
