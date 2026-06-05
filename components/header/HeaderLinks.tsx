"use client";

import { Link as I18nLink, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

type MenuItem = { name: string; href: string };
type Menu = { name: string; items: MenuItem[] };

const HeaderLinks = () => {
  const tHeader = useTranslations("Header");
  const pathname = usePathname();

  const menus: Menu[] = tHeader.raw("menus");

  return (
    <nav className="hidden flex-row items-center gap-x-1 text-sm font-medium md:flex">
      {menus.map((menu) => {
        const active = menu.items.some((it) => it.href === pathname);
        return (
          <DropdownMenu key={menu.name}>
            <DropdownMenuTrigger
              className={cn(
                "flex items-center gap-x-1 rounded-lg px-3 py-2 text-slate-300 outline-none transition-colors hover:bg-slate-800 hover:text-white data-[state=open]:bg-slate-800 data-[state=open]:text-white",
                active && "bg-slate-800 text-white"
              )}
            >
              {menu.name}
              <ChevronDown className="h-3.5 w-3.5 opacity-70" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              {menu.items.map((it) => (
                <DropdownMenuItem key={it.href} asChild>
                  <I18nLink
                    href={it.href}
                    title={it.name}
                    className={cn(
                      "w-full cursor-pointer",
                      pathname === it.href && "font-semibold text-cta"
                    )}
                  >
                    {it.name}
                  </I18nLink>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      })}
    </nav>
  );
};

export default HeaderLinks;
