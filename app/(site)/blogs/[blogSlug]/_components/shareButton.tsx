'use client'

import { cn } from "@/lib/utils"
import { Share } from "lucide-react"
import type { HTMLProps } from "react"

const ShareButton = ({ className, title, text, url }: { className?: HTMLProps<HTMLElement>['className']; title: string; text: string; url: string }) => {
    const shareData = {
        title,
        text,
        url
    };

    return (
        <div role='button' onClick={() => navigator.share(shareData)} className={cn("note self-end flex gap-1 items-center text-stone-500 cursor-pointer", className)}><span>Share</span><Share className="size-4" /></div>
    )
}

export default ShareButton