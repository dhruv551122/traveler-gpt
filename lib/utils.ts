import { BlockContent } from "@/sanity.types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTitleCase = (name: string) => {
  const titleTemp = name.replace(/([A-Z])/g, " $1");
  return titleTemp.charAt(0).toUpperCase() + titleTemp.slice(1);
};

export const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

export const extractTableContentData = (content: BlockContent) => {
  return content
    .filter((block) => block._type === "block" && block.style === "h2")
    .map((block: BlockContent[number]) => {
      if (block._type === "block") {
        const title = block.children?.map((child) => child.text).join("") ?? "";
        return {
          title,
          id: slugify(title),
        };
      }
    })
    .filter((block) => typeof block !== "undefined");
};

export const formateDate = (date: string) => {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return formattedDate;
};
