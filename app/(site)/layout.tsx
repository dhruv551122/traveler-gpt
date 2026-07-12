import { Header } from "@/components/common/header";
import { SettingsQueryResult } from "@/sanity.types";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { settingsQuery } from "@/sanity/lib/query";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data } = await sanityFetch<NonNullable<SettingsQueryResult>>({ query: settingsQuery })
  return (
    <main className="font-nunitoSans md:pt-[98.18px] pt-[73.64]">
      <Header data={data} />
      {children}
      <SanityLive />
    </main>
  );
}
