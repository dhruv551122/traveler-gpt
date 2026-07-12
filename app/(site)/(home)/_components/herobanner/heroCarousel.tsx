'use client'

import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { useEffect, useMemo, useState } from "react"
import { HomePageQueryResult } from "@/sanity.types"
import { SanityImage } from "@/components/common/sanityImage"
import Autoplay from "embla-carousel-autoplay"
import Link from "next/link"
const DELAY = 5000;

const HeroCarousel = ({ data }: { data: NonNullable<HomePageQueryResult>['blogs'] }) => {
    const [progress, setProgress] = useState(0);
    const [api, setApi] = useState<CarouselApi>();

    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (!api) return;

        const onSelect = () => {
            setCurrent(api.selectedScrollSnap());
            setProgress(0);
        };

        api.on("select", onSelect);

        return () => {
            api.off("select", onSelect);
        };
    }, [api]);

    const autoplay = useMemo(
        () =>
            Autoplay({
                delay: 5000,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
            }),
        []
    );

    useEffect(() => {
        const interval = setInterval(() => {
            const remaining = autoplay.timeUntilNext();

            if (remaining !== null) {
                setProgress((DELAY - remaining) / DELAY);
            }
        }, 16);

        return () => clearInterval(interval);
    }, [autoplay]);

    return (
        <div className="max-w-full w-full flex gap-2 md:gap-4 items-center">
            <Carousel setApi={setApi} plugins={[autoplay]} opts={{ loop: true }} className="w-full">
                <CarouselContent className="w-full">
                    {
                        data.slice(0, 3).map(blog => <CarouselItem
                            key={blog._id}
                        // className="basis-3/4 md:basis-3/5 lg:basis-1/3 h-full"
                        >
                            <Link href={`/blogs/${blog.slug.current}`} className="flex flex-col gap-4 h-full">
                                <SanityImage
                                    src={blog.heroImage}
                                    alt={blog.heroImage.asset?.altText}
                                    width={100}
                                    height={100}
                                    className="w-full min-h-[450px] max-h-[450px] object-cover"
                                />
                                <h2 className="title line-clamp-2">{blog.title}</h2>
                            </Link>
                        </CarouselItem>)
                    }
                </CarouselContent>
            </Carousel>
            <div className="flex flex-col gap-2">
                {data.slice(0, 3).map((_, index) => (
                    <div key={index} role="button" onClick={() => {
                        setProgress(0);
                        api?.scrollTo(index);
                        autoplay.reset();
                    }} className="cursor-pointer h-20 w-0.5 bg-gray-300 rounded">
                        <div
                            className="h-full bg-red-500"
                            style={{
                                height:
                                    index < current
                                        ? "100%"
                                        : index === current
                                            ? `${progress * 100}%`
                                            : "0%",
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HeroCarousel