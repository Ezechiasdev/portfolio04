import { getLocale, getTranslations } from "next-intl/server";
import { site } from "@content/site";
import { tr } from "@content/types";
import { SocialLinks } from "./SocialRail";

async function getYear() {
  "use cache";
  return new Date().getFullYear();
}

export async function Footer() {
  const t = await getTranslations("footer");
  const locale = await getLocale();
  const year = await getYear();

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-8 text-center text-xs text-muted sm:px-6 md:flex-row md:justify-between md:text-left xl:px-24">
        <p>
          © {year} {site.name} — {tr(site.title, locale)}. {t("rights")}
        </p>
        <SocialLinks className="flex flex-wrap justify-center gap-1 xl:hidden" />
        <p>{t("madeWith")}</p>
      </div>
    </footer>
  );
}
