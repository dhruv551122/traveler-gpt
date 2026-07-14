import { redis } from "@/lib/redis";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { id } = await req.json();

  const cookieStore = await cookies();

  const cookieName = `viewed-${id}`;

  const alreadyViewed = cookieStore.get(cookieName);

  if (!alreadyViewed) {
    await redis.zincrby("blog:views", 1, id);

    cookieStore.set(cookieName, "true", {
      maxAge: 60 * 60 * 2, // 24 hours
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });
  }

  const views = (await redis.zscore("blog:views", id)) ?? 0;

  return NextResponse.json({ views });
}
