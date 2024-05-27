"use client";

import { pacifico } from "@/app/fonts";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import Logo from "./Logo";
import { generateNavigation } from "@/lib/functions";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="flex flex-col container">
      <TopLine />
      <BottomLine />
    </footer>
  );
}

const TopLine = () => {
  return (
    <div className="grid grid-cols-3 py-10 border-b-2 border-black">
      <div className="sm:col-span-1 col-span-3 sm:justify-start justify-center">
        <Logo />
      </div>
      <NavLinks />
      <SocialMediaLinks />
    </div>
  );
};

const SocialMediaLinks = () => {
  return (
    <div className="social-media-links flex gap-3 sm:col-span-1 col-span-3 my-4 sm:my-0 sm:justify-end justify-center">
      <Link href="https://www.instagram.com/yarn.petals.gc/">
        <Instagram />
      </Link>
      <Link href="https://www.facebook.com/profile.php?id=61555684613906&mibextid=LQQJ4d">
        <Facebook />
      </Link>
    </div>
  );
};

const NavLinks = () => {
  const pathname = usePathname();
  const navLinks = generateNavigation(pathname);
  const linkClassName = (path: string) =>
    `inline-flex items-center border-b-2 px-1 pt-1 text-xl font-medium ${
      pathname === path
        ? "border-main-500 text-gray-900"
        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
    } ${
      pathname === "/"
        ? "inline-flex text-main-600 items-center border-b-2 px-1 pt-1 text-xl font-medium "
        : "inline-flex items-center border-b-2 px-1 pt-1 text-xl font-medium "
    }
      ${pathname === path && pathname === "/" && "hidden"}
      `;
  return (
    <div className="flex gap-2 sm:col-span-1 col-span-3 justify-center my-4 sm:my-0">
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
  );
};

const BottomLine = () => {
  return (
    <div className="bottom-line flex sm:flex-row flex-col text-center gap-4 mx-auto my-4">
      <p>© 2021 All rights reserved. Designed by Colorlib</p>
      <a href="/privacypolicy">Privacy Policy</a>
      <a href="/termsofservice">Terms of Service</a>
    </div>
  );
};
