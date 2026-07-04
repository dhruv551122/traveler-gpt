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
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      group: "blog",
      of: [{ type: "reference", to: { type: "blogCategory" } }],
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
      category0: "categories.0.label",
      category1: "categories.1.label",
      category2: "categories.2.label",
      category3: "categories.3.label",
    },
    prepare(selection) {
      const { title, media, category0, category1, category2, category3 } =
        selection;
      const categories = [category0, category1, category2].filter(Boolean);
      const subTitle = categories.join(" | ");
      const hasMoreCategories = Boolean(category3);
      return {
        title: title,
        subtitle: hasMoreCategories ? subTitle + " | ..." : subTitle,
        media: media,
      };
    },
  },
});

export default blog;
