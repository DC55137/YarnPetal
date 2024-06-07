import type { Metadata } from "next";
import { inter } from "./fonts";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.yarnpetalsgc.com"),
  openGraph: {
    title: "Timeless Yarn Bouquets | Yarn Petals",
    siteName: "Yarn Petals",
    description:
      "At Yarn Petals, we craft eco-friendly, allergy-friendly yarn bouquets that create lasting memories. Celebrate life's special moments with our high-quality, sustainable floral arrangements.",
    type: "website",
    locale: "en_US",
    url: "https://www.yarnpetalsgc.com",
  },
  twitter: {
    title: "Yarn Petals | Timeless Yarn Bouquets",
    description:
      "Discover Yarn Petals' eco-friendly, allergy-friendly yarn bouquets. Perfect for celebrating life's special moments with sustainable, high-quality craftsmanship.",
    siteId: "@YarnPetals",
    creator: "@FounderDaniel",
  },
  robots: {
    index: true, // Allows indexing
    follow: true, // Allows following links
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(inter.className, "bg-secondary-500 min-h-with-footer")}
      >
        <Toaster />
        <Navbar />
        {children}
        <Analytics />

        <Footer />
      </body>
    </html>
  );
}
