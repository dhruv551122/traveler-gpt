import { HomePageQueryResult } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/live";
import { homePageQuery } from "@/sanity/lib/query";
import BlogList from "./_components/blogsList";
import Herobanner from "./_components/herobanner";
import { notFound } from "next/navigation";

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
  return (
    <div>
      <Herobanner data={homePage} />
      <BlogList data={homePage} />
    </div>
  );
};

export default HomePage;
