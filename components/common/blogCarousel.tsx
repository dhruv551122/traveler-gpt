import { Span } from "next/dist/trace";
import { SanityImage } from "./sanityImage";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { HomePageQueryResult } from "@/sanity.types";

const BlogCarousel = async ({
  blogs,
}: {
  blogs: NonNullable<HomePageQueryResult>["blogs"];
}) => {
  return (
    <Carousel>
      <CarouselContent>
        {blogs.map((blog) => (
          <CarouselItem
            key={blog._id}
            className="basis-3/4 md:basis-3/5 lg:basis-1/3 h-full"
          >
            <div className="flex flex-col gap-4">
              <SanityImage
                src={blog.heroImage}
                alt={blog.heroImage.asset?.altText}
                width={100}
                height={100}
                className="w-full h-[250px] object-cover"
              />
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap gap-2">
                  {blog.categories.map((category) => (
                    <span
                      key={category._id}
                      className="py-2 px-3 rounded-full text-xs bg-deep-bright-red text-white"
                    >
                      {category.label}
                    </span>
                  ))}
                </div>
                <p className="text-[22px] font-bold">{blog.title}</p>
                <p>{blog.description}</p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default BlogCarousel;
