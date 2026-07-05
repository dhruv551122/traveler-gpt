'use client'

import useActiveHeading from "@/hooks/useActiveHeading";
import { cn, extractTableContentData } from "@/lib/utils";
import { BlockContent, BlogBySlugQueryResult } from "@/sanity.types";
import type { HTMLProps } from "react";
import ShareButton from "./shareButton";

const TableOfContent = ({ data, className }: { data: NonNullable<BlogBySlugQueryResult>, className?: HTMLProps<HTMLElement>['className'] }) => {
    const tableOfContent = [{ id: "introduction", title: "Introduction" }, ...extractTableContentData(data.content)];

    const handleScroll = (id: string) => {
        const element = document.getElementById(id);
        if (!element) return null;
        const y = element?.getBoundingClientRect().top + window.scrollY - 80;
        scrollTo({ top: y, behavior: "smooth" });
    };

    const activeId = useActiveHeading(tableOfContent);
    return (
        <div className={className}>
            <div className="sm:sticky sm:top-8 flex flex-col gap-4">
                <ShareButton text={data.description} title={data.title} url={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/blogs/${data.slug}`} className="w-fit" />
                <div className="pb-2 border-b border-gray-300 ">
                    <h4 className="pb-2 mb-2 text-xl font-semibold border-b border-gray-300">
                        Table of Content
                    </h4>
                    <ul className="flex flex-col gap-2 py-1 ">
                        {tableOfContent.length > 0 &&
                            tableOfContent.map((tableIndex) => (
                                <li
                                    role="button"
                                    key={tableIndex.id}
                                    onClick={() => handleScroll(tableIndex.id)}
                                    className={cn(
                                        "duration-300 hover:text-deep-bright-red border-l border-transparent cursor-pointer font-medium line-clamp py-1 text-stone-700",
                                        activeId === tableIndex.id && "border-deep-bright-red shadow-[inset_12px_0_15px_-15px_#ab0101] rounded-[1px] py-3 pl-4 text-deep-bright-red",
                                    )}
                                >
                                    {tableIndex.title}
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default TableOfContent
