import FooterSections from "@/components/footer/FooterSections";
import SocialShare from "@/components/footer/SocialShare";
import { siteConfig } from "@/config/site";
import { FooterLink } from "@/types/common";
import { getTranslations } from "next-intl/server";

export default async function Footer() {
  const t = await getTranslations("Home");
  const tFooter = await getTranslations("Footer");
  const footerLinks: FooterLink[] = tFooter.raw("Links.groups");

  return (
    <footer className="mt-12 w-full border-t border-slate-800 bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:flex lg:gap-10 lg:px-8">
        {/* About column */}
        <div className="mb-10 lg:mb-0 lg:w-72 lg:shrink-0">
          <h2 className="font-heading text-xl font-bold text-white">
            {siteConfig.name}
          </h2>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">
            {t("description")}
          </p>
          <SocialShare />
        </div>

        {/* Footer link groups (accordion on mobile, columns on sm+) */}
        <FooterSections groups={footerLinks} />
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-4 py-6 text-sm text-slate-500 sm:px-6 md:flex-row lg:px-8">
          <p>
            {tFooter("Copyright", {
              year: new Date().getFullYear(),
              name: siteConfig.name,
            })}
          </p>
          <p className="text-xs text-slate-600">
            Not affiliated with The New York Times. Wordle is a trademark of The New York Times Company.
          </p>
        </div>
      </div>
    </footer>
  );
}
