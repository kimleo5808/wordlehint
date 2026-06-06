"use client";

import { useState } from "react";
import { Link as I18nLink } from "@/i18n/routing";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FooterItem {
  href: string;
  name: string;
  target?: string;
  rel?: string;
  useA?: boolean;
}
interface FooterGroup {
  title: string;
  links: FooterItem[];
}

/**
 * Footer link columns. On phones (< sm) each section is a tap-to-expand
 * accordion; on sm and up every section is a static, always-open column.
 */
export default function FooterSections({ groups }: { groups: FooterGroup[] }) {
  const [open, setOpen] = useState<Record<string, boolean>>({});

  return (
    <div className="grid flex-1 grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-3 sm:gap-y-8 lg:grid-cols-5">
      {groups.map((section) => {
        const isOpen = !!open[section.title];
        return (
          <div
            key={section.title}
            className="border-b border-slate-800 py-3 sm:border-0 sm:py-0"
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() =>
                setOpen((s) => ({ ...s, [section.title]: !s[section.title] }))
              }
              className="flex w-full items-center justify-between text-left sm:pointer-events-none sm:cursor-default"
            >
              <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-slate-200">
                {section.title}
              </h3>
              <ChevronDown
                aria-hidden="true"
                className={cn(
                  "h-4 w-4 text-slate-400 transition-transform sm:hidden",
                  isOpen && "rotate-180"
                )}
              />
            </button>

            <ul
              className={cn(
                "space-y-2 text-sm sm:!block sm:mt-4",
                isOpen ? "mt-4 block" : "hidden"
              )}
            >
              {section.links.map((link) => (
                <li key={link.href}>
                  {link.href.startsWith("/") && !link.useA ? (
                    <I18nLink
                      href={link.href}
                      title={link.name}
                      prefetch={false}
                      className="text-slate-400 transition-colors hover:text-primary"
                      target={link.target || undefined}
                      rel={link.rel || undefined}
                    >
                      {link.name}
                    </I18nLink>
                  ) : (
                    <Link
                      href={link.href}
                      title={link.name}
                      prefetch={false}
                      className="text-slate-400 transition-colors hover:text-primary"
                      target={link.target || undefined}
                      rel={link.rel || undefined}
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
