import { Redis } from "@upstash/redis";

export const redis = Redis.fromEnv();

export async function getViews(id: string) {
  return (await redis.zscore("blog:views", id)) ?? 0;
}

export async function getPopularBLogsId() {
  const popularBlogIds = await redis.zrange("blog:views", 0, 10, {
    rev: true,
  });

  return popularBlogIds;
}
