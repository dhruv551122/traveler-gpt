import { HomePageQueryResult } from "@/sanity.types"
import HeroCarousel from "./heroCarousel"
import Link from "next/link"
import { formateDate } from "@/lib/utils"

const Herobanner = ({ data }: { data: NonNullable<HomePageQueryResult> }) => {
    return (
        <div className="max-width-container max-content-pannel py-6!">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div className="lg:col-span-7">
                    <HeroCarousel data={data.blogs} />
                </div>
                <div className="lg:col-start-9 lg:col-span-4 flex flex-col gap-8">
                    {
                        data.blogs.slice(3, 7).map(blog => (
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
    )
}

export default Herobanner