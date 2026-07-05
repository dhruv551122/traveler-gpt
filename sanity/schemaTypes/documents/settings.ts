import { Settings } from "lucide-react";
import { defineField, defineType } from "sanity";

export const settings = defineType({
  name: "settings",
  title: "Settings",
  type: "document",
  icon: Settings,
  groups: [
    { name: "header", title: "Header" },
    { name: "footer", title: "Footer" },
  ],
  fields: [
    defineField({
      name: "headerLogo",
      title: "Header Logo",
      type: "image",
      options: {
        hotspot: true,
      },
      group: "header",
      validation: (Rule) => Rule.required().assetRequired(),
    }),
    defineField({
      name: "headerLinks",
      title: "Header Links",
      type: "array",
      of: [{ type: "link", validation: (Rule) => Rule.required() }],
      group: "header",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "footerLogo",
      title: "Footer Logo",
      type: "image",
      options: {
        hotspot: true,
      },
      group: "footer",
      validation: (Rule) => Rule.required().assetRequired(),
    }),
    defineField({
      name: "footerLinks",
      title: "Footer Links",
      type: "array",
      of: [{ type: "link", validation: (Rule) => Rule.required() }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "footerText",
      title: "Footer Text",
      type: "blockContent",
      group: "footer",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "facebookUrl",
      title: "Facebook Url",
      type: "url",
      group: "header",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram Url",
      type: "url",
      group: "header",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare: () => {
      return { title: "Settings" };
    },
  },
});
