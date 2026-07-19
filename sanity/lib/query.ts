import { groq } from "next-sanity";

export const settingsQuery = groq`
    *[ _type == "settings" && _id == "settings"][0]{
        ...,
        "blogTags": *[ _type == "blogTag" ]{
            ...,
        },
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
    "blogs": *[ _type == 'blog'][0...7] | order(coalesce(uploadedAt, _createdAt) desc) {
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
            "blogs": *[ _type == "blog" && ^._id in tags[]->_id ] | order(coalesce(uplodedAt, _createdAt) desc)[0...4]{
                    _id,
                    _createdAt,
                    _updatedAt,
                    title,
                    slug,
                    description,
                    heroImage,
                    author->{
                        _id,
                        authorName
                    },
                    tags[]->{
                        _id,
                        label,
                    },
                    uplodedAt
                }    
        }
    },
    tagWiseBlogs2{
        ...,
        tags[]->{
            ...,
                "blogs": *[ _type == "blog" && ^._id in tags[]->_id ] | order(coalesce(uplodedAt, _createdAt) desc)[0...7]{
                    _id,
                    _createdAt,
                    _updatedAt,
                    title,
                    slug,
                    description,
                    heroImage,
                    author->{
                        _id,
                        authorName
                    },
                    tags[]->{
                        _id,
                        label,
                    },
                    uplodedAt
                }
        }
    },
     
}
`;

export const blogsByTitleSearch = groq`
    *[_type == 'blog' && title match $searchPrefix && (
    count($selectedTags) == 0 ||
    count(tags[@._ref in $selectedTags]) > 0
  )][$start...$end] | order(score desc){
        _id,
        _updatedAt,
        uplodedAt,
        title,
        description,
        tags[]->,
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

export const mostPopularBlogsQuery = groq`
    *[ _type == "blog" && _id in $id]{
        _id,
        _createdAt,
        _updatedAt,
        title,
        slug,
        description,
        heroImage,
        author->{
            _id,
            authorName
        },
        tags[]->{
            _id,
            label,
        },
        uplodedAt,
    }
`;
