"use client";

import { HTMLProps, useEffect, useState } from "react";

export default function BlogViews({
    id,
    className
}: {
    id: string;
    className?: HTMLProps<HTMLElement>['className']
}) {
    const [views, setViews] = useState(0);

    useEffect(() => {
        async function track() {
            const res = await fetch("/api/views", {
                method: "POST",
                body: JSON.stringify({ id }),
            });

            const data = await res.json();

            setViews(data.views);
        }

        track();
    }, [id]);

    return <span className={className}>{views} {views > 1 ? "views" : "view"}</span>;
}