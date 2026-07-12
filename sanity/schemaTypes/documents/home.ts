import { Home } from "lucide-react";
import { defineField, defineType } from "sanity";

export const home = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  icon: Home,
  groups: [
    { name: "seo", title: "Seo" },
    { name: "herobanner", title: "Herobanner" },
    { name: "pageContent", title: "Page Content" },
  ],
  fields: [
    defineField({
      name: "seo",
      title: "Seo",
      type: "seo",
      group: "seo",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "trendingBlogs",
      title: "Trending Blogs",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "blogs",
          title: "Blogs",
          type: "array",
          of: [
            {
              type: "reference",
              to: { type: "blog" },
              validation: (Rule) => Rule.required(),
            },
          ],
          validation: (Rule) => Rule.required(),
        }),
      ],
      group: "pageContent",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagWiseBlogs1",
      title: "Tag Wise Blog 1",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "tags",
          title: "Tags",
          type: "array",
          of: [
            {
              type: "reference",
              to: { type: "blogTag" },
              validation: (Rule) => Rule.required(),
            },
          ],
          validation: (Rule) => Rule.required(),
        }),
      ],
      group: "pageContent",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagWiseBlogs2",
      title: "Tag Wise Blog 2",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "tags",
          title: "Tags",
          type: "array",
          of: [
            {
              type: "reference",
              to: { type: "blogTag" },
              validation: (Rule) => Rule.required(),
            },
          ],
          validation: (Rule) => Rule.required(),
        }),
      ],
      group: "pageContent",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "seo.seoTitle",
      subtitle: "seo.seoDescription",
    },
  },
});
