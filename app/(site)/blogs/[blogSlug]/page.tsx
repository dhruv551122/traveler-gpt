import { sanityFetch } from "@/sanity/lib/live"
import { blogBySlugQuery } from "@/sanity/lib/query"
import { BlogBySlugQueryResult } from "@/sanity.types"
import BlogDetail from "./_components/blogDetail"

const BlogDetailPage = async ({ params }: { params: Promise<{ blogSlug: string }> }) => {
    const { blogSlug } = await params
    const { data } = await sanityFetch<NonNullable<BlogBySlugQueryResult>>({ query: blogBySlugQuery, params: { blogSlug } })
    return (<div>
        <BlogDetail data={data} />
    </div>)
}

export default BlogDetailPage