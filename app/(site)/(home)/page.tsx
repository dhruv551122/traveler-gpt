import { HomePageQueryResult } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/live";
import { homePageQuery } from "@/sanity/lib/query";
import Herobanner from "./_components/herobanner";
import BlogList from "./_components/blogsList";

export const generateMetadata = async () => {};

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
