import { sanityFetch } from "@/sanity/lib/live"
import { blogBySlugQuery } from "@/sanity/lib/query"
import { BlogBySlugQueryResult } from "@/sanity.types"
import BlogHeader from "./_components/blogHeader"

const BlogDetailPage = async ({ params }: { params: Promise<{ blogSlug: string }> }) => {
    const { blogSlug } = await params
    const { data } = await sanityFetch<NonNullable<BlogBySlugQueryResult>>({ query: blogBySlugQuery, params: { blogSlug } })
    return (<div>
        <BlogHeader data={data} />
    </div>)
}

export default BlogDetailPage