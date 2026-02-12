import SocialShare from "@/components/footer/SocialShare";
import { siteConfig } from "@/config/site";
import { Link as I18nLink } from "@/i18n/routing";
import { FooterLink } from "@/types/common";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function Footer() {
  const t = await getTranslations("Home");
  const tFooter = await getTranslations("Footer");

  const footerLinks: FooterLink[] = tFooter.raw("Links.groups");

  return (
    <footer className="mt-12 w-full border-t border-purple-100 bg-zinc-950 text-zinc-300 dark:border-purple-900/40">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-5 lg:px-8">
        <div className="lg:col-span-2">
          <h2 className="font-heading text-2xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
            {siteConfig.name}
          </h2>
          <p className="mt-3 max-w-md text-sm leading-6 text-zinc-400">
            {t("description")}
          </p>
          <SocialShare />
        </div>

        {footerLinks.map((section) => (
          <div key={section.title}>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-zinc-200">
              {section.title}
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {section.links.map((link) => (
                <li key={link.href}>
                  {link.href.startsWith("/") && !link.useA ? (
                    <I18nLink
                      href={link.href}
                      title={link.name}
                      prefetch={false}
                      className="text-zinc-400 transition-colors hover:text-white"
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
                      className="text-zinc-400 transition-colors hover:text-white"
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
        ))}
      </div>

      <div className="border-t border-zinc-800">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-4 py-6 text-sm text-zinc-500 sm:px-6 md:flex-row lg:px-8">
          <p>
            {tFooter("Copyright", {
              year: new Date().getFullYear(),
              name: siteConfig.name,
            })}
          </p>
          <p className="text-xs text-zinc-600">
            Not affiliated with The New York Times. NYT Connections is a trademark of The New York Times Company.
          </p>
        </div>
      </div>
    </footer>
  );
}
