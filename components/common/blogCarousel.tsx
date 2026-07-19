import { SanityImage } from "./sanityImage";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { HomePageQueryResult } from "@/sanity.types";
import { formateDate } from "@/lib/utils";
import Link from "next/link";

const BlogCarousel = async ({
  blogs,
  title
}: {
  blogs: NonNullable<HomePageQueryResult>["blogs"];
  title?: string;
}) => {
  return (
    <Carousel className="flex flex-col gap-6">
      <div className="flex items-center w-full justify-between gap-4">
        {title && <h2 className="title">{title}</h2>}
        <div className="flex w-full items-center justify-end gap-4">
          <CarouselPrevious className="relative translate-y-0 left-0" />
          <CarouselNext className="relative translate-y-0 right-0" />
        </div>
      </div>
      <CarouselContent>
        {blogs.map((blog) => (
          <CarouselItem
            key={blog._id}
            className="basis-3/4 md:basis-3/5 lg:basis-1/3 h-full"
          >
            <Link href={`/blogs/${blog.slug.current}`} className="group flex flex-col gap-4">
              <div className="w-full h-[250px] group overflow-hidden">
                <SanityImage
                  src={blog.heroImage}
                  alt={blog.heroImage.asset?.altText}
                  width={100}
                  height={100}
                  className="group-hover:scale-105 w-full h-full duration-300 object-cover"
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center flex-wrap gap-2">
                  {blog.tags.map((tag) => (
                    <span
                      key={tag._id}
                      className="py-2 px-3 note rounded-full text-xs bg-deep-bright-red text-white"
                    >
                      {tag.label}
                    </span>
                  ))}
                  <span className="text-stone-500">•</span>
                  <span className="text-stone-500 text-sm">{formateDate(blog.uplodedAt || blog._updatedAt)}</span>
                </div>
                <h3 className="group-hover:text-deep-bright-red duration-300 subtitle-2 min-h-[2lh] line-clamp-2">{blog.title}</h3>
                <p className="line-clamp-3 description">{blog.description}</p>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>

    </Carousel>
  );
};

export default BlogCarousel;
