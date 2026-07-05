import { groq } from "next-sanity";

export const settingsQuery = groq`
    *[ _type == "settings" && _id == "settings"][0]{
        ...,
        "blogCategories": *[ _type == "blogCategory" ]{
            ...,
        },
        "blogs": *[ _type == "blog"]{
            ...,
            heroImage{
                ...,
                asset->
            },
            categories[]->,
            author->,
        }
    }
`;

export const homePageQuery = groq`*[ _type == 'homePage' && _id == 'homePage'][0]{
    ...,
    herobannerImage{
            ...,
            asset->
        },
    "blogs": *[ _type == 'blog']{
        ...,
        heroImage{
            ...,
            asset->
        },
        author->,
        categories[]->,
    },
    "categories": *[ _type == 'blogCategory' ]{
        ...,
    }
}
`;

export const blogsByTitleSearch = groq`
    *[_type == 'blog' && title match $searchPrefix] | order(score desc){
        _id,
        title,
        description,
        categories->,
        "slug": slug.current,
        heroImage{
            ...,
            asset->
        },
    }
`;

export const blogBySlugQuery = groq`
    *[ _type == "blog" && slug.current == $blogSlug][0]{
        ...,
        heroImage{
            ...,
            asset->
        },
        author->,
        categories[]->,
    }
`;
