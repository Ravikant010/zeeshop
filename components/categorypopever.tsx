"use client"
import React from 'react';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { category } from "@/lib/category";
import Link from "next/link";

type Props = { text: string }

export default function CategoryPopover({ text }: Props) {
    return (
        <HoverCard openDelay={100} closeDelay={200}>
            <HoverCardTrigger className="ml-4 cursor-pointer">{text}</HoverCardTrigger>
            <HoverCardContent className="w-[90vw] md:w-[70vw] lg:w-[50vw] max-h-[80vh] overflow-y-auto z-40 p-4">
                <h3 className="text-lg font-semibold mb-4">Categories</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {category && category.map((cat: string) => (
                        <Link
                            href={`/category/${cat.replace(/\s/g, "-")}`}
                            key={cat}
                            className="hover:text-red-500 transition-colors duration-200 text-sm"
                        >
                            {cat}
                        </Link>
                    ))}
                </div>
            </HoverCardContent>
        </HoverCard>
    )
}