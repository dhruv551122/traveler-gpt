import { Redis } from "@upstash/redis";

export const redis = Redis.fromEnv();

export async function getViews(slug: string) {
  return (await redis.get<number>(`views:${slug}`)) ?? 0;
}
