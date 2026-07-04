import type { Metadata } from "next";
import { Google_Sans, Nunito_Sans } from "next/font/google";
import "./globals.css";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  preload: true,
});

const googleSans = Google_Sans({
  variable: "--font-google-sans",
  subsets: ["latin"],
  preload: true,
});



export const metadata: Metadata = {
  title: "Traveler GPT",
  description: "A travel blog featuring destination guides, itineraries, travel tips, hidden gems, adventure experiences, cultural insights, food recommendations, and budget travel advice to help you explore the world with confidence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunitoSans.variable} ${googleSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-google-sans">{children}</body>
    </html>
  );
}
