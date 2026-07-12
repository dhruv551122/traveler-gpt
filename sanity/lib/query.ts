import { groq } from "next-sanity";

export const settingsQuery = groq`
    *[ _type == "settings" && _id == "settings"][0]{
        ...,
        "blogTags": *[ _type == "blogTag" ]{
            ...,
        },
        "blogs": *[ _type == "blog"]{
            ...,
            heroImage{
                ...,
                asset->
            },
            tags[]->,
            author->,
        }
    }
`;

export const homePageQuery = groq`*[ _type == 'homePage' && _id == 'homePage'][0]{
    ...,
    seo{
        ...,
        seoImage{
            ...,
            asset->
        }
    },
    herobannerImage{
            ...,
            asset->
        },
    "blogs": *[ _type == 'blog'] | order(coalesce(uploadedAt, _createdAt) desc) {
        ...,
        heroImage{
            ...,
            asset->
        },
        author->,
        tags[]->,
    },
    "tags": *[ _type == 'blogTag' ]{
        ...,
    },
    trendingBlogs{
        ...,
        blogs[]->{
            ...,
            heroImage{
            ...,
            asset->
        },
        author->,
        tags[]->,
        }
    },
    tagWiseBlogs1{
        ...,
        tags[]->{
            ...,
                "blogs": *[ _type == "blog" && tag._ref == ^._id ] | order(coalesce(uplodedAt, _createdAt) desc)[0...10]{
                    _id,
                    _createdAt,
                    _updated,
                    title,
                    slug,
                    description,
                    heroImage,
                    author->{
                        _id,
                        authorName
                    },
                    tag->{
                        _id,
                        label,
                    },
                    uplodedAt
                }
        }
    }
     
}
`;

export const blogsByTitleSearch = groq`
    *[_type == 'blog' && title match $searchPrefix] | order(score desc){
        _id,
        title,
        description,
        tags->,
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
        seo{
            ...,
            seoImage{
                ...,
                asset->
            }
        },
        heroImage{
            ...,
            asset->
        },
        author->,
        tags[]->,
    }
`;
