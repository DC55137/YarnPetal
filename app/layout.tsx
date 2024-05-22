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
        <footer>
          <div className="bg-secondary-400">
            <div className="container mx-auto py-4">
              <p className="text-center text-accent-900">
                &copy; 2021 Yarn Petals. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
