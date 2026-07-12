import { NewspaperIcon } from "lucide-react";
import blog from "./blogs/blog";
import blogAuthor from "./blogs/blogAuthor";
import blogCategory from "./blogs/blogCategory";
import { home } from "./home";
import { StructureChild } from "..";
import { settings } from "./settings";
import blogTag from "./blogs/blogTag";

export const singletons = [home, settings];
export const multiTypes = [blogCategory, blogAuthor, blog, blogTag];
export const documents = [...singletons, ...multiTypes];

export const structureList: StructureChild[] = [
  {
    name: "homePage",
    singleton: true,
  },
  {
    name: "Blog",
    icon: NewspaperIcon,
    singleton: true,
    children: [
      {
        name: "blog",
      },
      {
        name: "blogCategory",
      },
      {
        name: "blogTag",
      },
      {
        name: "blogAuthor",
      },
    ],
  },
  {
    name: "settings",
    singleton: true,
  },
];
