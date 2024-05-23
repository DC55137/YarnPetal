type NavigationItem = {
  name: string;
  href: string;
  current: boolean;
  children?: NavigationItem[]; // The '?' means this property is optional
};

import { PATH_PAGE } from "@/routes/paths";

export function generateNavigation(pathname: string): NavigationItem[] {
  const navigation = [
    {
      name: NAV_CONTENT.home,
      href: `${PATH_PAGE.root}`,
      current: pathname === `/`,
    },
    {
      name: NAV_CONTENT.bundles,
      href: `${PATH_PAGE.bundles}`,
      current: pathname.startsWith(`${PATH_PAGE.bundles}`),
    },
    {
      name: NAV_CONTENT.checkout,
      href: `${PATH_PAGE.checkout}`,
      current: pathname.startsWith(`${PATH_PAGE.checkout}`),
    },
  ];

  return navigation;
}

type NavContent = {
  home: string;
  bundles: string;
  about: string;
  contact: string;
  checkout: string;
};

const NAV_CONTENT: NavContent = {
  home: "Home",
  bundles: "Bundles",
  about: "About Us",
  contact: "Contact Us",
  checkout: "Checkout",
};
