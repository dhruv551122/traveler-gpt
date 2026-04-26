import { SanityImage } from "@/components/sanityImage";
import { Input } from "@/components/ui/input";
import { HomePageQueryResult } from "@/sanity.types";
import { SearchIcon } from "lucide-react";

const Herobanner = ({ data }: { data: NonNullable<HomePageQueryResult> }) => {
  return (
    <div className="max-width-container h-screen relative">
      <SanityImage
        src={data.herobannerImage}
        alt={data.herobannerImage.alt}
        fill
        className="object-cover brightness-75 -z-1"
      />
      <div className="max-content-pannel h-full flex flex-col gap-10 items-center justify-center">
        <h1 className="text-center text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-semibold">
          {data.herobannerTitle}
        </h1>
        <div className="relative w-1/2">
          <SearchIcon className="absolute top-1/2 left-5 text-muted-foreground -translate-y-1/2 pointer-events-none size-5" />
          <Input
            className="bg-white pl-12 py-2 h-auto rounded-full text-xl"
            placeholder="Search here...."
          />
        </div>
      </div>
    </div>
  );
};

export default Herobanner;
