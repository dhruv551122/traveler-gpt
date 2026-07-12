import { BlogBySlugQueryResult } from "@/sanity.types"
import { Eye } from "lucide-react"
import BlogViews from "./blogViews"
import { SanityImage } from "@/components/common/sanityImage"
import TableOfContent from "./tableOfContent"
import RichText from "@/components/common/rich-text"
import { formateDate } from "@/lib/utils"

const BlogDetail = ({ data }: { data: NonNullable<BlogBySlugQueryResult> }) => {

    return (<div className="max-width-container max-content-pannel">
        <div className="flex flex-col gap-8 items-center justify-center">
            <div className="flex flex-col gap-4 items-center justify-center max-w-4xl text-center">
                <div className="flex note gap-2 flex-wrap items-center justify-center w-full">
                    <span className="text-stone-500">{formateDate(data.uplodedAt || data._updatedAt)}</span> <span className="text-stone-500">•</span>
                    {data.tags.map(tag => <span key={tag._id} className="py-1 px-2 bg-deep-bright-red text-white  rounded-[5px]">{tag.label}</span>)}
                </div>
                <h1 id="introduction" className="title">{data.title}</h1>
                <div className="flex gap-2 items-center flex-wrap justify-center note w-full text-stone-500">
                    <span>by {data.author.authorName}</span> |
                    <span className="flex items-center gap-1"><Eye className='size-4' /> <BlogViews slug={data.slug.current} /></span>
                </div>
            </div>
            <div className="flex flex-col w-full gap-2 my-4">

                <SanityImage className="w-full h-auto object-contain" src={data.heroImage} alt={data.heroImage.asset?.altText || ''} width={1000} height={1000} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 w-full">
                <TableOfContent data={data} className="lg:col-span-4 lg:col-start-9 lg:order-2" />
                <div className="lg:col-span-7 lg:order-1 flex flex-col gap-8">
                    <h4 className="pl-4 border-l-3 py-2 border-deep-bright-red text-xl">{data.description}</h4>
                    <RichText content={data.content} />
                </div>
            </div>
        </div>
    </div>)
}

export default BlogDetail