import { Button, Dialog } from "@/components/ui";
import { DialogContent } from "@/components/ui/dialog";
import { signIn } from "next-auth/react";
import Image from "next/image";
import React from "react";

const githubIcon = "https://github.githubassets.com/favicons/favicon.svg";
const googlIcon =
    "https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg";

interface Props {
    open: boolean;
    onClose: () => void;
}

export const AuthModal: React.FC<Props> = ({ open, onClose }) => {
    const handleClose = () => {
        onClose();
    };
    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="w-[450px] bg-white p-10">
                FORM
                <hr />
                <div className="flex gap-2">
                    <Button
                        variant="secondary"
                        onClick={() =>
                            signIn("github", {
                                callbackUrl: "/",
                                redirect: true,
                            })
                        }
                        type="button"
                        className="gap-2 h-12 p-2 flex-1"
                    >
                        <Image
                            width={6}
                            height={6}
                            src={githubIcon}
                            alt={"githubIcon"}
                        />
                        GitHub
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() =>
                            signIn("google", {
                                callbackUrl: "/",
                                redirect: true,
                            })
                        }
                        type="button"
                        className="gap-2 h-12 p-2 flex-1"
                    >
                        <Image
                            width={6}
                            height={6}
                            src={googlIcon}
                            alt="googlIcon"
                        />
                        Google
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
