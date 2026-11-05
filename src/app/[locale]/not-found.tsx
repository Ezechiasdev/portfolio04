import { useTranslations } from "next-intl";
import { Watermark } from "@/components/ui/Watermark";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <section className="relative isolate flex min-h-[70dvh] flex-col items-center justify-center overflow-hidden px-4 py-24 text-center">
      <Watermark text="404" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[38vw] sm:text-[20rem]" />
      <h1 className="font-mono text-xl font-semibold text-cyan sm:text-2xl">{t("title")}</h1>
      <p className="mt-4 text-sm text-muted">{t("text")}</p>
      <Link
        href="/"
        className="mt-8 rounded-md bg-violet px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110"
      >
        {t("back")}
      </Link>
    </section>
  );
}
