import { MostPopularBlogsQueryResult } from "@/sanity.types"
import { SanityImage } from "./sanityImage"
import { formateDate } from "@/lib/utils"
import Link from "next/link"

const BlogListLayout = ({ blogs, title }: { blogs: NonNullable<MostPopularBlogsQueryResult>, title?: string }) => {
    return (
        <div></div>
    )
}

export default BlogListLayout