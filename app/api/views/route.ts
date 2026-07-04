import { redis } from "@/lib/redis";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { slug } = await req.json();

  const cookieStore = await cookies();

  const cookieName = `viewed-${slug}`;

  const alreadyViewed = cookieStore.get(cookieName);

  if (!alreadyViewed) {
    await redis.incr(`views:${slug}`);

    cookieStore.set(cookieName, "true", {
      maxAge: 60 * 60 * 24, // 24 hours
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });
  }

  const views = (await redis.get<number>(`views:${slug}`)) ?? 0;

  return NextResponse.json({ views });
}
