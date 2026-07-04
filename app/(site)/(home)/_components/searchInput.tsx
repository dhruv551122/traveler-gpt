"use client";

import { SanityImage } from "@/components/common/sanityImage";
import { Input } from "@/components/ui/input";
import { BlogsByTitleSearchResult } from "@/sanity.types";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const SearchInput = () => {
  const [searchPrefix, setSearchPrefix] = useState<string>("");
  const [blogList, setBlogList] = useState<
    NonNullable<BlogsByTitleSearchResult>
  >([]);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const searchResultBoxRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  // useEffect(() => {
  //   const handleOutsideClick = (event: MouseEvent) => {
  //     if (
  //       searchResultBoxRef.current &&
  //       !searchResultBoxRef.current.contains(event.target as Node) &&
  //       isOpen
  //     ) {
  //       setIsOpen(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleOutsideClick);

  //   return () => {
  //     document.removeEventListener("mousedown", handleOutsideClick);
  //   };
  // }, [isOpen]);

  useEffect(() => {
    if (!searchPrefix) return;

    const fetchBlogs = async () => {
      try {
        const res = await fetch(
          `/api/blogsByTitle?q=${encodeURIComponent(searchPrefix)}`,
        );

        const result = await res.json();
        setBlogList(result.data);
        setIsOpen(true);
      } catch (err) {
        console.error(err);
      }
    };
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(fetchBlogs, 500);

    return () => clearTimeout(timeoutRef.current);
  }, [searchPrefix]);
  return (
    <div className="w-full flex justify-center" ref={searchResultBoxRef}>
      <div
        className={cn(
          "md:w-1/2 w-full relative bg-white  shadow-[0_4px_20px_rgba(0,0,0,0.08)]",
          isOpen ? "rounded-t-[10px]" : "rounded-[10px]",
        )}
      >
        <div className="relative w-full">
          <SearchIcon className="absolute top-1/2 left-5 text-muted-foreground -translate-y-1/2 pointer-events-none size-5" />
          <Input
            className="bg-white pl-12 py-2 h-auto text-xl border-none! focus-visible:ring-0"
            placeholder="Search here...."
            onChange={(e) => setSearchPrefix(e.target.value.trim())}
            onFocus={() => blogList.length > 0 && setIsOpen(true)}
            onBlur={() => isOpen && setIsOpen(false)}
          />
        </div>
        <div
          className={cn(
            "absolute z-10 w-full bg-white rounded-b-[10px] max-h-0 no-scrollbar overflow-y-scroll flex flex-col gap-4",
            blogList.length > 0 && isOpen && searchPrefix && "p-4 max-h-70",
          )}
        >
          {blogList.map((blog) => (
            <div key={blog._id} className="grid grid-cols-12 gap-4">
              <div className="col-span-4">
                <SanityImage
                  src={blog.heroImage}
                  alt={blog.heroImage.asset?.altText}
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="col-span-8 flex flex-col gap-2">
                <p className="text-xl font-semibold">{blog.title}</p>
                <p className="text-base">{blog.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
