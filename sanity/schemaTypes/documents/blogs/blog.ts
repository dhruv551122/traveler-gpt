import { orderRankField } from "@sanity/orderable-document-list";
import { BookOpen } from "lucide-react";
import { defineField, defineType } from "sanity";

const blog = defineType({
  name: "blog",
  title: "Blog",
  type: "document",
  icon: BookOpen,
  groups: [
    { name: "seo", title: "Seo" },
    { name: "blog", title: "Blog" },
  ],
  fields: [
    defineField({
      name: "seo",
      type: "seo",
      title: "Seo",
      group: "seo",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "blog",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      group: "blog",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: {
        hotspot: true,
      },
      group: "blog",
      validation: (Rule) => Rule.required().assetRequired(),
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "blockContent",
      group: "blog",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      group: "blog",
      to: [{ type: "blogAuthor" }],
      validation: (Rule) => Rule.required(),
    }),
    // defineField({
    //   name: "categories",
    //   title: "Categories",
    //   type: "array",
    //   group: "blog",
    //   of: [{ type: "reference", to: { type: "blogCategory" } }],
    //   validation: (Rule) => Rule.required(),
    // }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      group: "blog",
      of: [{ type: "reference", to: { type: "blogTag" } }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "uplodedAt",
      title: "Uploaded At",
      type: "datetime",
      group: "blog",
    }),
    orderRankField({ type: "blog" }),
  ],
  preview: {
    select: {
      title: "title",
      media: "heroImage",
      tags0: "tags.0.label",
      tags1: "tags.1.label",
      tags2: "tags.2.label",
      tags3: "tags.3.label",
      uplodedAt: "uplodedAt",
      _updatedAt: "_updatedAt",
    },
    prepare(selection) {
      const { title, media, tags0, tags1, tags2, tags3 } = selection;
      const tags = [tags0, tags1, tags2].filter(Boolean);
      const subTitle = tags.join(" | ");
      const hasMoreTags = Boolean(tags3);
      return {
        title: title,
        subtitle: hasMoreTags ? subTitle + " | ..." : subTitle,
        media: media,
      };
    },
  },
});

export default blog;
