"use client";

import { usePathname } from "next/navigation";
import Cart from "./Cart";
import MobileSidebar from "./mobile-sidebar";
import { cn } from "@/lib/utils";
import { generateNavigation } from "@/lib/functions";
import Logo from "@/components/LogoLong";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = generateNavigation(pathname);

  const linkClassName = (path: string) =>
    `inline-flex items-center border-b-2 px-1 pt-1 text-xl font-medium ${
      pathname === path
        ? "border-main-500 text-gray-900"
        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
    } ${
      pathname === "/"
        ? "border-main-500 text-gray-900"
        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
    }
    ${pathname === path && pathname === "/" && "hidden"}
    `;
  // const linkClassName = (path: string) =>
  //   `inline-flex items-center border-b-2 px-1 pt-1 text-xl font-medium ${
  //     pathname === path
  //       ? "border-main-500 text-gray-900"
  //       : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
  //   } ${
  //     pathname === "/"
  //       ? "inline-flex text-white items-center border-b-2 px-1 pt-1 text-xl font-medium "
  //       : "inline-flex items-center border-b-2 px-1 pt-1 text-xl font-medium "
  //   }
  //   ${pathname === path && pathname === "/" && "hidden"}
  //   `;

  return (
    <div
      className={cn(
        "absolute z-50 w-screen bg-secondary-500 "
        // pathname !== "/" && "bg-secondary-500"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
        <div className="flex justify-between ">
          <Logo className="w-32" />

          <div className="ml-6 flex items-center gap-4">
            <div className="md:flex gap-2 hidden">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={linkClassName(link.href)}
                >
                  {link.name}
                </a>
              ))}
            </div>
            <MobileSidebar />
            <Cart />
          </div>
        </div>
      </div>
    </div>
  );
}
