import React from "react";
import { Button } from "../ui";
import { CircleUser } from "lucide-react";
import Link from "next/link";

interface Props {
    onClickSignIn?: () => void;
    className?: string;
}

export const ProfileButton: React.FC<Props> = ({ className }) => {
    return (
        <div className={className}>
            <Link href="/profile">
                <Button variant="secondary" className="flex items-center gap-2">
                    <CircleUser size={18} />
                    Профиль
                </Button>
            </Link>
        </div>
    );
};
