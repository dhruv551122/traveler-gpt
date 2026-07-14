import { SanityImage } from "@/components/common/sanityImage"
import { formateDate } from "@/lib/utils"
import { HomePageQueryResult } from "@/sanity.types"
import Link from "next/link"

const TagWiseBlogs1 = ({ tagWiseBlogs1 }: { tagWiseBlogs1: NonNullable<HomePageQueryResult>['tagWiseBlogs1'] }) => {
    const blogs = tagWiseBlogs1.tags.flatMap(tag => tag.blogs)
    return (
        <div className="max-content-pannel max-width-container">
            <h2 className="subtitle">{tagWiseBlogs1.title}</h2>
            <div className="grid grid-cols-2 gap-8">
                <div className="flex flex-col gap-4">
                    <SanityImage src={blogs[0].heroImage} width={1000} height={1000} className="w-full grow max-h-[400px] object-cover" />
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center flex-wrap gap-2">
                            {blogs[0].tags.map((tag) => (
                                <span
                                    key={tag._id}
                                    className="py-2 px-3 rounded-full text-xs bg-deep-bright-red text-white"
                                >
                                    {tag.label}
                                </span>
                            ))}
                            <span className="text-stone-500">•</span>
                            <span className="text-stone-500 text-sm">{formateDate(blogs[0].uplodedAt || blogs[0]._updatedAt)}</span>
                        </div>
                        <h3 className="group-hover:text-deep-bright-red subtitle-2 min-h-[2lh] line-clamp-2">{blogs[0].title}</h3>
                        <p className="line-clamp-3">{blogs[0].description}</p>
                    </div>
                </div>
                <div className="flex flex-col justify-between gap-6">
                    {
                        blogs.slice(1, 4).map(blog => (
                            <Link href={`/blogs/${blog.slug.current}`} key={blog._id} className="group flex justify-between gap-4">
                                <div className="flex flex-col gap-2">
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
                                    <h3 className="subtitle-2 group-hover:text-deep-bright-red min-h-2lh line-clamp-2 duration-300">{blog.title}</h3>
                                    <p className="description line-clam-3">{blog.description}</p>
                                </div>
                                <SanityImage src={blog.heroImage} width={1000} height={1000} className="max-w-[200px] h-full object-cover" />
                            </Link>))
                    }
                </div>
            </div>
        </div>
    )
}

export default TagWiseBlogs1