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
  ],
  fields: [
    defineField({
      name: "herobannerTitle",
      title: "Herobanner Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "herobannerImage",
      title: "Herobanner Image",
      type: "image",
      validation: (Rule) => Rule.required().assetRequired(),
      options: {
        hotspot: true,
      },
    }),
  ],
});
