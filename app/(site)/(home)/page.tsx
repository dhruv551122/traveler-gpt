import { HomePageQueryResult } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/live";
import { homePageQuery } from "@/sanity/lib/query";
import BlogList from "./_components/blogsList";

export const generateMetadata = async () => { };

const HomePage = async () => {
  const { data: homePage } = await sanityFetch<
    NonNullable<HomePageQueryResult>
  >({ query: homePageQuery });
  return (
    <div>
      <BlogList data={homePage} />
    </div>
  );
};

export default HomePage;
