import { sanityFetch } from "@/sanity/lib/live"
import { blogBySlugQuery } from "@/sanity/lib/query"
import { BlogBySlugQueryResult } from "@/sanity.types"
import BlogDetail from "./_components/blogDetail"
import { notFound } from "next/navigation"

export const generateMetada = async ({ params }: { params: Promise<{ blogSlug: string }> }) => {
    const { blogSlug } = await params
    const { data } = await sanityFetch<NonNullable<BlogBySlugQueryResult>>({ query: blogBySlugQuery, params: { blogSlug } })

    if (!data) {
        notFound()
    }

    return {
        title: data.seo.seoTitle,
        description: data.seo.seoDescription,
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/blogs/${data.slug.current}`,
        },
        openGraph: {
            title: data.seo.seoTitle,
            description: data.seo.seoDescription,
            images: [data.seo.seoImage.asset?.url],
        },
    }
}

const BlogDetailPage = async ({ params }: { params: Promise<{ blogSlug: string }> }) => {
    const { blogSlug } = await params
    const { data } = await sanityFetch<NonNullable<BlogBySlugQueryResult>>({ query: blogBySlugQuery, params: { blogSlug } })
    return (<div>
        <BlogDetail data={data} />
    </div>)
}

export default BlogDetailPage