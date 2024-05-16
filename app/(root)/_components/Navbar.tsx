"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import Cart from "./Cart";
import MobileSidebar from "./mobile-sidebar";
import { cn } from "@/lib/utils";
import { generateNavigation } from "./functions";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = generateNavigation(pathname);

  const linkClassName = (path: string) =>
    `inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
      pathname === path
        ? "border-main-500 text-gray-900"
        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
    }`;

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <Image
                className="h-12 w-auto"
                src="https://res.cloudinary.com/dddxwdp7v/image/upload/v1713442449/YarnPetals/Logo1_suunci.png"
                alt="Your Company"
                width={50}
                height={50}
              />
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
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
          </div>

          <div className="ml-6 flex items-center gap-2">
            <a
              href={"/checkout"}
              className={cn(linkClassName("/checkout"), "hidden md:block")}
            >
              {"Checkout"}
            </a>
            <MobileSidebar />
            <Cart />
            {/* <button
              type="button"
              className="relative rounded-full p-1 text-main-800 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-main-500 focus:ring-offset-2"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View cart, {cartCount} items</span>
              <ShoppingBag className="h-6 w-6" aria-hidden="true" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-main-600 rounded-full">
                  {cartCount}
                </span>
              )}
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
}
