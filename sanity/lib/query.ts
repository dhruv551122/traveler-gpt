import { groq } from "next-sanity";

export const homePageQuery = groq`*[ _type == 'homePage' && _id == 'homePage'][0]{
    ...,
    "blogs": *[ _type == 'blog']{
        ...,
        author->,
        categories[]->,
    }
}
`;
