// import {
//   BookOpen,
//   CalendarIcon,
//   File,
//   LucideIcon,
//   TagIcon,
//   User,
// } from "lucide-react";
// import {
//   multiTypes,
//   SchemaType,
//   singletonType,
//   SingletonType,
//   MultiType,
// } from "./schemaTypes";
// import { documents } from "./schemaTypes/documents";
// import {
//   StructureBuilder,
//   StructureResolver,
//   StructureResolverContext,
// } from "sanity/structure";
// import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
// import { getTitleCase } from "@/lib/utils";

// type Base<T = SchemaType> = {
//   id?: string;
//   type: T;
//   preview?: boolean;
//   title?: string;
//   icon?: LucideIcon;
// };

// type CreateSingleTon = {
//   S: StructureBuilder;
// } & Base<SingletonType>;

// const getSchemaIcon = (type: string): LucideIcon | undefined =>
//   documents.find((doc) => doc.name === type)?.icon as LucideIcon | undefined;

// const getSchemaTitle = (type: string): string | undefined =>
//   documents.find((doc) => doc.name === type)?.title;

// const createSingleTon = ({ S, type, title, icon }: CreateSingleTon) => {
//   const schemaTitle = getSchemaTitle(type);
//   const schemaIcon = getSchemaIcon(type);
//   const newTitle = title ?? schemaTitle ?? getTitleCase(type);

//   return S.listItem()
//     .title(newTitle)
//     .icon(icon ?? schemaIcon ?? File)
//     .child(S.document().schemaType(type).documentId(type));
// };

// const blogsByCategory = (
//   S: StructureBuilder,
//   context: StructureResolverContext,
// ) => {
//   return S.listItem()
//     .title("Blogs By category")
//     .icon(BookOpen)
//     .child(
//       S.documentTypeList("blogCategory")
//         .title("Categories")
//         .child((categoryId) =>
//           S.list()
//             .title("Blogs")
//             .items([
//               orderableDocumentListDeskItem({
//                 S,
//                 context,
//                 type: "blog",
//                 title: "Blog",
//                 filter: "_type == 'blog' && $categoryId in categories[]._ref",
//                 params: { categoryId },
//               }),
//             ]),
//         ),
//     );
// };

// type CreateMultiType = {
//   S: StructureBuilder;
//   context: StructureResolverContext;
// } & Base<MultiType>;

// const createMultiType = ({
//   S,
//   type,
//   id,
//   title,
//   icon,
//   context,
// }: CreateMultiType) => {
//   const schemaTitle = getSchemaTitle(type);
//   const schemaIcon = getSchemaIcon(type);
//   const newTitle = title ?? schemaTitle ?? getTitleCase(type);

//   return orderableDocumentListDeskItem({
//     S,
//     context,
//     type,
//     title: newTitle,
//     id: id ?? type,
//     icon: icon ?? schemaIcon ?? File,
//   });
// };

// export const structure: StructureResolver = (S, context) =>
//   S.list()
//     .title("Content Management")
//     .items([
//       ...singletonType.map((type) => createSingleTon({ S, type })),
//       S.divider(),
//       S.listItem()
//         .title("Blogs")
//         .child(
//           S.list()
//             .title("Blogs")
//             .items([
//               S.documentTypeListItem("blogCategory")
//                 .title("Blog Category")
//                 .icon(TagIcon),
//               S.documentTypeListItem("blog").title("Blogs").icon(CalendarIcon),
//               S.documentTypeListItem("blogAuthor")
//                 .title("Blog Author")
//                 .icon(User),
//               blogsByCategory(S, context),
//             ]),
//         ),
//       S.divider(),
//       ...multiTypes.map((type) => createMultiType({ S, type, context })),
//     ]);

import { File, LucideIcon } from "lucide-react";
import type {
  ListItem,
  ListItemBuilder,
  StructureBuilder,
  StructureResolver,
  StructureResolverContext,
} from "sanity/structure";
import { structureList, documents } from "./schemaTypes/documents";
import { StructureChild } from "./schemaTypes";
import { getTitleCase } from "@/lib/utils";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";

const getSchemaIcon = (type: string): LucideIcon | undefined =>
  documents.find((doc) => doc.name === type)?.icon as LucideIcon | undefined;

const getSchemaTitle = (type: string): string | undefined =>
  documents.find((doc) => doc.name === type)?.title;

type StructureListItem = ListItemBuilder | ListItem;

// function getTodayDateString(): string {
//   return new Date().toISOString().split("T")[0];
// }

// function buildCourseDetailByEndDateListItem(
//   S: StructureBuilder,
//   title: string,
//   icon: LucideIcon,
// ): ListItemBuilder {
//   const today = getTodayDateString();

//   return S.listItem()
//     .title(title)
//     .icon(icon)
//     .child(
//       S.list()
//         .title(title)
//         .items([
//           S.listItem()
//             .title("Current Courses")
//             .child(
//               S.documentList()
//                 .title("Current Courses")
//                 .schemaType("courseDetail")
//                 .apiVersion(apiVersion)
//                 .filter('_type == "courseDetail" && courseEndDate >= $today')
//                 .params({ today }),
//             ),
//           S.listItem()
//             .title("Expired Courses")
//             .child(
//               S.documentList()
//                 .title("Expired Courses")
//                 .schemaType("courseDetail")
//                 .apiVersion(apiVersion)
//                 .filter('_type == "courseDetail" && courseEndDate < $today')
//                 .params({ today }),
//             ),
//         ]),
//     );
// }

function buildStructureItem(
  item: StructureChild,
  S: StructureBuilder,
  context: StructureResolverContext,
): StructureListItem {
  const type = item.name;
  const title = getSchemaTitle(type) || getTitleCase(type);
  const icon = item.icon ?? getSchemaIcon(type) ?? File;

  if (item.children?.length) {
    const items = item.children.map((child) =>
      buildStructureItem(child, S, context),
    );
    return S.listItem()
      .title(title)
      .icon(icon)
      .child(S.list().title(title).items(items));
  }

  if (item.orderable) {
    return orderableDocumentListDeskItem({
      type,
      title,
      S,
      context,
      icon,
    });
  }

  if (item.singleton) {
    return S.listItem()
      .title(title)
      .icon(icon)
      .child(S.document().schemaType(type).documentId(type));
  }

  // if (item.groupByEndDate) {
  //   return buildCourseDetailByEndDateListItem(S, title, icon);
  // }

  return S.documentTypeListItem(type).id(type).title(title).icon(icon);
}

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Content Management")
    .items([
      ...structureList.map((item) => buildStructureItem(item, S, context)),
    ]);
