import type { Metadata } from "next";
import { inter } from "./fonts";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Yarn Petals",
  description: "Beautiful floral arrangements for any occasion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "bg-secondary-500")}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
