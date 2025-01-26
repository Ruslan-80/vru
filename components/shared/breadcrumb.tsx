"use client";
import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Fragment } from "react";
import { Container } from "./container";

const MAX_BREADCRUMB_LENGTH: number = 3;

const BreadcrumbLogic = () => {
    const paths: string = usePathname();
    const separator: string = "/";
    const pathNames: string[] = paths
        .split(separator)
        .filter(path => path !== "");

    return (
        <Container>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/">Home</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    {pathNames.length > MAX_BREADCRUMB_LENGTH && (
                        <BreadcrumbEllipsis />
                    )}
                    {pathNames
                        .slice(-MAX_BREADCRUMB_LENGTH)
                        .map((link, index) => {
                            const href: string = `/${pathNames
                                .slice(0, -MAX_BREADCRUMB_LENGTH + index + 1)
                                .join("/")}`;
                            const linkName: string =
                                link[0].toUpperCase() + link.slice(1);
                            const isLastPath: boolean =
                                pathNames.length === index + 1;

                            return (
                                <Fragment key={index}>
                                    <BreadcrumbSeparator>
                                        &gt;
                                    </BreadcrumbSeparator>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink asChild>
                                            {!isLastPath ? (
                                                <Link href={href}>
                                                    {linkName}
                                                </Link>
                                            ) : (
                                                <span>{linkName}</span>
                                            )}
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                </Fragment>
                            );
                        })}
                </BreadcrumbList>
            </Breadcrumb>
        </Container>
    );
};

export default BreadcrumbLogic;
