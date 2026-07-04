"use client";

import { HTMLProps, useEffect, useState } from "react";

export default function BlogViews({
    slug,
    className
}: {
    slug: string;
    className?: HTMLProps<HTMLElement>['className']
}) {
    const [views, setViews] = useState(0);

    useEffect(() => {
        async function track() {
            const res = await fetch("/api/views", {
                method: "POST",
                body: JSON.stringify({ slug }),
            });

            const data = await res.json();

            setViews(data.views);
        }

        track();
    }, [slug]);

    return <span className={className}>{views} {views > 1 ? "views" : "view"}</span>;
}