import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { generateNavigation } from "../../../lib/functions";
import Logo from "@/components/Logo";

const MobileSidebar = ({}: {}) => {
  const pathname = usePathname();
  const navigation = generateNavigation(pathname);

  return (
    <Sheet>
      <SheetTrigger
        className={cn(
          "text-black",
          "pr-4 transition md:hidden hover:opacity-75"
        )}
      >
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white">
        <div className="flex flex-col justify-between h-full pb-10 mt-10">
          <Link href="/" className="mx-auto mb-20">
            <span className="sr-only">Steps English Academy</span>
            <Logo className="h-12 my-auto fill-main-500" />
          </Link>
          <div className="flex flex-col">
            {navigation.map((item) => (
              <Link
                href={item.href}
                key={item.href}
                className={cn(
                  "inline-flex mx-auto items-center px-1 pt-1 text-xl font-medium",
                  "text-gray-900",
                  item.current && "border-main-500 border-b-2 "
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div></div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
