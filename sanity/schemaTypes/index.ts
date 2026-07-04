import {
  documents,
  multiTypes as multiTypesArray,
  singletons,
} from "./documents";
import blog from "./documents/blogs/blog";
import blogAuthor from "./documents/blogs/blogAuthor";
import blogCategory from "./documents/blogs/blogCategory";
import { objects } from "./objects";

export const schemaTypes = [
  ...documents,
  ...objects,
  blogCategory,
  blogAuthor,
  blog,
];

export const schemaNames = [...documents, ...objects].map((doc) => doc.name);

export type SchemaType = (typeof schemaNames)[number];

export const singletonType = singletons.map((doc) => doc.name);

export type SingletonType = (typeof singletonType)[number];

export const multiTypes = multiTypesArray.map(
  (doc: { name: string }) => doc.name,
);

export type MultiType = (typeof multiTypes)[number];
