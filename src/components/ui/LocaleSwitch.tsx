"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

export function LocaleSwitch() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("language");
  const target = locale === "fr" ? "en" : "fr";

  return (
    <Link
      href={pathname}
      locale={target}
      aria-label={t("switch")}
      className="grid h-9 min-w-9 place-items-center rounded-md border border-line px-2 text-xs font-medium text-fg transition-colors hover:border-cyan hover:text-cyan"
    >
      {t("short")}
    </Link>
  );
}
