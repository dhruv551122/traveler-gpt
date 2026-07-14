import { MostPopularBlogsQueryResult } from "@/sanity.types"
import Link from "next/link"

const MostPopularBlogs = ({ popularBlogs }: { popularBlogs: NonNullable<MostPopularBlogsQueryResult> }) => {
    return (
        <div className="max-width-container max-content-pannel">
            <h2 className="subtitle mb-10">Most Popular</h2>
            <div className="grid lg:grid-cols-2 gap-4 lg:gap-8">
                {
                    popularBlogs.map((blog, index) => <Link href={`/blogs/${blog.slug.current}`} key={blog._id} className="flex w-fit group gap-4 ">
                        <span className="p-1 shrink-0 border size-10 flex items-center justify-center text-center font-signika-negative rounded-full group-hover:text-deep-bright-red duration-300 group-hover:border-deep-bright-red border-gunmetal-black subtitle-2">{index + 1}</span>
                        <h4 className="subtitle-2 pt-1 group-hover:text-deep-bright-red duration-300">{blog.title}</h4>
                    </Link>)
                }
            </div>
        </div>
    )
}

export default MostPopularBlogs