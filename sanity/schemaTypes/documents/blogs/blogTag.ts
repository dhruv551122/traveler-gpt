import { orderRankField } from "@sanity/orderable-document-list";
import { NotebookTabs } from "lucide-react";
import { defineField, defineType } from "sanity";

const blogTag = defineType({
  name: "blogTag",
  title: "Blog Tag",
  type: "document",
  icon: NotebookTabs,
  fields: [
    defineField({
      name: "label",
      type: "string",
      title: "Label",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: {
        source: "label",
      },
      validation: (Rule) => Rule.required(),
    }),
    orderRankField({ type: "blogTag" }),
  ],
});

export default blogTag;
