import { SanityImage } from "@/components/common/sanityImage";
import { HomePageQueryResult } from "@/sanity.types";
import Link from "next/link";
import SearchInput from "./searchInput";

const Herobanner = ({ data }: { data: NonNullable<HomePageQueryResult> }) => {
  return (
    <div className="max-width-container h-screen relative">
      <SanityImage
        src={data.herobannerImage}
        alt={data.herobannerImage.asset?.altText}
        fill
        className="object-cover brightness-75 -z-1"
      />
      <div className="max-content-pannel h-full flex flex-col gap-10 items-center justify-center">
        <h1 className="text-center text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-semibold">
          {data.herobannerTitle}
        </h1>
        <SearchInput />
        <div className="w-full md:w-1/2 grid grid-cols-2 gap-10">
          {data.herobannerOptions.map((option) => (
            <Link
              key={option._id}
              href={`/${option.slug.current}`}
              className="min-h-40 rounded-[10px] bg-white text-center border border-black flex items-center justify-center shadow-2xl hover:scale-105 hover:bg-deep-bright-red hover:text-white duration-300"
            >
              <span className="text-2xl font-semibold">{option.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Herobanner;
