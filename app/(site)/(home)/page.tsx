import { HomePageQueryResult, MostPopularBlogsQueryResult } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/live";
import { homePageQuery, mostPopularBlogsQuery } from "@/sanity/lib/query";
import BlogList from "./_components/blogsList";
import Herobanner from "./_components/herobanner";
import { notFound } from "next/navigation";
import { getPopularBLogsId } from "@/lib/redis";
import MostPopularBlogs from "./_components/mostPopularBlogs";
import TagWiseBlogs1 from "./_components/tagWiseBlogs1";
import TagWiseBlogs2 from "./_components/tagWiseBlogs2";

export const generateMetada = async () => {
  const { data } = await sanityFetch<NonNullable<HomePageQueryResult>>({ query: homePageQuery })

  if (!data) {
    notFound()
  }

  return {
    title: data.seo.seoTitle,
    description: data.seo.seoDescription,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_DOMAIN_URL}`,
    },
    openGraph: {
      title: data.seo.seoTitle,
      description: data.seo.seoDescription,
      images: [data.seo.seoImage.asset?.url],
    },
  }
}

const HomePage = async () => {
  const { data: homePage } = await sanityFetch<
    NonNullable<HomePageQueryResult>
  >({ query: homePageQuery });
  const popularBlogsId = await getPopularBLogsId()
  const { data: popularBlogs } = await sanityFetch<NonNullable<MostPopularBlogsQueryResult>>({ query: mostPopularBlogsQuery, params: { id: popularBlogsId } })

  return (
    <div>
      <Herobanner data={homePage} />
      <BlogList data={homePage} />
      <TagWiseBlogs1 tagWiseBlogs1={homePage.tagWiseBlogs1} />
      <MostPopularBlogs popularBlogs={popularBlogs} />
      <TagWiseBlogs2 tagWiseBlogs2={homePage.tagWiseBlogs2} />
    </div>
  );
};

export default HomePage;
