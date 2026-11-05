import { useTranslations } from "next-intl";

export function SkipLink() {
  const t = useTranslations("a11y");
  return (
    <a
      href="#main"
      className="fixed top-3 left-3 z-[100] -translate-y-20 rounded-md opacity-0 focus:opacity-100 bg-cyan px-4 py-2 text-sm font-semibold text-[#0b0d12] transition-transform focus:translate-y-0"
    >
      {t("skipToContent")}
    </a>
  );
}
