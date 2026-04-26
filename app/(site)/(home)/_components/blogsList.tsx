import BlogCarousel from "@/components/common/blogCarousel";
import { HomePageQueryResult } from "@/sanity.types";

const BlogList = ({ data }: { data: NonNullable<HomePageQueryResult> }) => {
  return (
    <div className="max-content-pannel">
      <BlogCarousel blogs={data.blogs} />
    </div>
  );
};

export default BlogList;
