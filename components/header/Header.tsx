import HeaderLinks from "@/components/header/HeaderLinks";
import MobileMenu from "@/components/header/MobileMenu";
import { ThemeToggle } from "@/components/ThemeToggle";
import { siteConfig } from "@/config/site";
import { Link as I18nLink } from "@/i18n/routing";
import { useTranslations } from "next-intl";

const Header = () => {
  const t = useTranslations("Home");

  return (
    <header className="py-2 px-6 backdrop-blur-md bg-white/80 dark:bg-zinc-950/80 border-b border-purple-100 dark:border-purple-900/40 sticky top-0 z-50">
      <nav className="flex justify-between items-center w-full max-w-6xl mx-auto">
        <div className="flex items-center space-x-6 md:space-x-12">
          <I18nLink
            href="/"
            prefetch={false}
            className="flex items-center space-x-2 font-bold"
          >
            <span className="text-lg font-heading font-bold bg-gradient-to-r from-purple-600 to-violet-500 bg-clip-text text-transparent">
              {siteConfig.name}
            </span>
          </I18nLink>
          <HeaderLinks />
        </div>

        <div className="flex items-center gap-x-2 md:gap-x-4 lg:gap-x-6 flex-1 justify-end">
          {/* PC */}
          <div className="hidden md:flex items-center gap-x-4">
            <ThemeToggle />
          </div>

          {/* Mobile */}
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
};

export default Header;
