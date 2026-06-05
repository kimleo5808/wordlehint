"use client";

import { ThemeToggle } from "@/components/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { siteConfig } from "@/config/site";
import { Link as I18nLink } from "@/i18n/routing";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";

type MenuItem = { name: string; href: string };
type NavMenu = { name: string; items: MenuItem[] };

export default function MobileMenu() {
  const tHeader = useTranslations("Header");
  const menus: NavMenu[] = tHeader.raw("menus");

  return (
    <div className="flex items-center gap-1 md:hidden">
      <ThemeToggle />
      <DropdownMenu>
        <DropdownMenuTrigger className="p-2 text-slate-300 hover:text-white">
          <Menu className="h-5 w-5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="max-h-[80vh] w-64 overflow-y-auto">
          <DropdownMenuLabel>
            <I18nLink
              href="/"
              prefetch={true}
              className="flex items-center space-x-2 font-bold"
            >
              <span className="font-heading text-lg text-foreground">
                {siteConfig.name}
              </span>
            </I18nLink>
          </DropdownMenuLabel>
          {menus.map((menu) => (
            <DropdownMenuGroup key={menu.name}>
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="text-xs uppercase tracking-wider text-muted-foreground">
                {menu.name}
              </DropdownMenuLabel>
              {menu.items.map((it) => (
                <DropdownMenuItem key={it.href} asChild>
                  <I18nLink href={it.href} title={it.name} className="w-full cursor-pointer">
                    {it.name}
                  </I18nLink>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
