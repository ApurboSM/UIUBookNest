import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://uiubooknest.bd"),
  title: {
    default: "UIUBookNest — The Smart Campus Bookstore for UIU Students",
    template: "%s · UIUBookNest",
  },
  description:
    "Curated textbooks, stationery, and exam supplies for United International University students. Pickup at the UIU Campus Store or delivery via Pathao & RedX. Pay with bKash, Nagad, or Cash on Delivery.",
  keywords: [
    "UIU",
    "United International University",
    "textbooks Bangladesh",
    "campus bookstore",
    "BookNest",
    "bKash bookstore",
    "BOPIS Dhaka",
  ],
  authors: [{ name: "MGT 3225 Group 07 Section B" }],
  openGraph: {
    title: "UIUBookNest — The Smart Campus Bookstore for UIU Students",
    description:
      "Textbooks, stationery, and exam supplies — pickup at UIU Campus or delivery across Dhaka.",
    type: "website",
    siteName: "UIUBookNest",
    locale: "en_BD",
  },
  twitter: {
    card: "summary_large_image",
    title: "UIUBookNest",
    description: "The smart campus bookstore for UIU students.",
  },
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <AnnouncementBar />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
