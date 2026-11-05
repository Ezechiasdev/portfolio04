import { useLocale, useTranslations } from "next-intl";
import { site } from "@content/site";
import { tr } from "@content/types";
import { whatsappLink } from "@/lib/whatsapp";
import { WhatsappIcon } from "./SocialIcons";

export function WhatsappButton({
  label,
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  const locale = useLocale();
  const t = useTranslations();

  return (
    <a
      href={whatsappLink(site.whatsapp, tr(site.whatsappMessage, locale))}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-md bg-whatsapp px-5 py-3 text-sm font-semibold text-[#0b0d12] transition hover:brightness-110 ${className}`}
    >
      <WhatsappIcon className="size-4" />
      {label ?? t("hero.whatsapp")}
      <span className="sr-only"> {t("a11y.newTab")}</span>
    </a>
  );
}
