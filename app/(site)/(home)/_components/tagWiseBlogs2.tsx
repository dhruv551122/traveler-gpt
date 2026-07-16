import { SanityImage } from "@/components/common/sanityImage"
import { formateDate } from "@/lib/utils"
import { HomePageQueryResult } from "@/sanity.types"
import Link from "next/link"
import { useMemo } from "react"

const TagWiseBlogs2 = ({ tagWiseBlogs2 }: { tagWiseBlogs2: NonNullable<HomePageQueryResult>['tagWiseBlogs2'] }) => {
    const uniqueBlogs = useMemo(() => {
        const map = new Map<
            string,
            NonNullable<HomePageQueryResult>["tagWiseBlogs2"]["tags"][number]["blogs"][number]
        >();

        tagWiseBlogs2.tags.forEach((tag) => {
            tag.blogs.forEach((blog) => {
                if (!map.has(blog._id)) {
                    map.set(blog._id, blog);
                }
            });
        });

        return [...map.values()];
    }, [tagWiseBlogs2]);

    if (uniqueBlogs.length === 0) {
        return null;
    }

    return <div className="max-content-pannel max-width-container">
        <h2 className="subtitle mb-10">{tagWiseBlogs2.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            <Link href={`/blogs/${uniqueBlogs[0].slug.current}`} className="flex flex-col gap-4 group">
                <div className="w-full grow h-auto max-h-100 overflow-hidden">
                    <SanityImage src={uniqueBlogs[0].heroImage} width={1000} height={1000} className="object-cover group-hover:scale-105 duration-300 w-full h-full" />
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex items-center flex-wrap gap-2">
                        {uniqueBlogs[0].tags.map((tag) => (
                            <span
                                key={tag._id}
                                className="py-2 px-3 rounded-full text-xs bg-deep-bright-red text-white"
                            >
                                {tag.label}
                            </span>
                        ))}
                        <span className="text-stone-500">•</span>
                        <span className="text-stone-500 text-sm">{formateDate(uniqueBlogs[0].uplodedAt || uniqueBlogs[0]._updatedAt)}</span>
                    </div>
                    <h3 className="group-hover:text-deep-bright-red subtitle-2 duration-300 md:min-h-[2lh] line-clamp-2">{uniqueBlogs[0].title}</h3>
                    <p className="line-clamp-3 description">{uniqueBlogs[0].description}</p>
                </div>
            </Link>
            <div className="xl:col-span-2 grid grid-cols-1 xl:grid-cols-2 gap-8">
                {
                    uniqueBlogs.slice(1).map(blog => (
                        <Link href={`/blogs/${blog.slug.current}`} key={blog._id} className="flex group flex-col gap-2">
                            <div className="flex flex-wrap items-center gap-2">
                                {blog.tags.map((tag) => (
                                    <span
                                        key={tag._id}
                                        className="py-2 px-3 rounded-full text-xs bg-deep-bright-red text-white"
                                    >
                                        {tag.label}
                                    </span>
                                ))}
                                <span className="text-stone-500">•</span>
                                <span className="text-stone-500 text-sm">{formateDate(blog.uplodedAt || blog._updatedAt)}</span>
                            </div>
                            <h3 className="subtitle-2 group-hover:text-deep-bright-red duration-300">{blog.title}</h3>
                            <p className="description">{blog.description}</p>
                        </Link>))
                }
            </div>
        </div>
    </div>
}

export default TagWiseBlogs2