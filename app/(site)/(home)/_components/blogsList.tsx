import BlogCarousel from "@/components/common/blogCarousel";
import BlogListLayout from "@/components/common/blogListLayout";
import { HomePageQueryResult, MostPopularBlogsQueryResult } from "@/sanity.types";

const BlogList = ({ data, popularBlogs }: {
  data: NonNullable<HomePageQueryResult>, popularBlogs: NonNullable<MostPopularBlogsQueryResult
  >
}) => {
  return (
    <div className="max-content-pannel">
      <div className="flex flex-col gap-6">
        <BlogCarousel blogs={data.trendingBlogs.blogs} title={data.trendingBlogs.title} />
        <BlogListLayout blogs={popularBlogs} />
      </div>
    </div>
  );
};

export default BlogList;
