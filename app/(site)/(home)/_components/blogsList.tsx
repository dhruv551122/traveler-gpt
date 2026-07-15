import BlogCarousel from "@/components/common/blogCarousel";
import { HomePageQueryResult } from "@/sanity.types";

const BlogList = ({ data }: {
  data: NonNullable<HomePageQueryResult>
}) => {
  return (
    <div className="max-content-pannel">
      <div className="flex flex-col gap-6">
        <BlogCarousel blogs={data.trendingBlogs.blogs} title={data.trendingBlogs.title} />
      </div>
    </div>
  );
};

export default BlogList;
