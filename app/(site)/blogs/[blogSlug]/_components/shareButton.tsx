'use client'

import ShareIcon from "@/icons/shareIcon"
import { cn } from "@/lib/utils"
import type { HTMLProps } from "react"

const ShareButton = ({ className, title, text, url }: { className?: HTMLProps<HTMLElement>['className']; title: string; text: string; url: string }) => {
    const shareData = {
        title,
        text,
        url
    };

    return (
        <div role='button' onClick={() => navigator.share(shareData)} className={cn("note rounded-[5px] flex gap-1 items-center cursor-pointer py-2 px-4 bg-deep-bright-red text-white", className)}>
            <ShareIcon className="size-4 text-white " />
            <span>Share</span>
        </div>
    )
}

export default ShareButton