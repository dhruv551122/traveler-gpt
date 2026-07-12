'use client'

import ShareIcon from "@/icons/shareIcon"
import { cn } from "@/lib/utils"
import type { HTMLProps } from "react"

const ShareButton = ({ className, title, text }: { className?: HTMLProps<HTMLElement>['className']; title: string; text: string; }) => {


    const handleShare = async () => {
        const shareData = {
            title,
            text,
            url: window.location.href,
        };

        // if (imageUrl) {
        //     try {
        //         const response = await fetch(imageUrl);
        //         const blob = await response.blob();

        //         const file = new File([blob], "share-preview.jpg", {
        //             type: blob.type,
        //         });

        //         if (navigator.canShare?.({ files: [file] })) {
        //             shareData.files = [file];
        //         }
        //     } catch (err) {
        //         console.error(err);
        //     }
        // }

        try {
            console.log(shareData)
            await navigator.share(shareData);
        } catch (err) {
            console.error(err);
        }
    };



    return (
        <div role='button' onClick={handleShare} className={cn("note rounded-[5px] flex gap-1 items-center cursor-pointer py-2 px-4 bg-deep-bright-red text-white", className)}>
            <ShareIcon className="size-4 text-white " />
            <span>Share</span>
        </div>
    )
}

export default ShareButton