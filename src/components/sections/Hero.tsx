import { getLocale, getTranslations } from "next-intl/server";
import { HeroBackdrop } from "@/components/three/HeroBackdrop";
import { Watermark } from "@/components/ui/Watermark";
import { WhatsappButton } from "@/components/ui/WhatsappButton";
import { site } from "@content/site";
import { tr } from "@content/types";

export async function Hero() {
  const t = await getTranslations("hero");
  const locale = await getLocale();

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[calc(100dvh-4rem)] items-center overflow-hidden"
    >
      <HeroBackdrop />
      <Watermark text="EZ." className="absolute bottom-[6%] -left-[2%] text-[28vw] sm:text-[18rem]" />

      <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-4 py-16 text-center sm:py-24 [@media(max-height:500px)]:py-10">
        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/5 px-4 py-1.5 text-xs text-cyan">
          <span className="relative flex size-2" aria-hidden>
            {site.available && (
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-whatsapp opacity-70" />
            )}
            <span
              className={`relative inline-flex size-2 rounded-full ${
                site.available ? "bg-whatsapp shadow-[0_0_8px_#25d366]" : "bg-orange"
              }`}
            />
          </span>
          {site.available ? t("available") : t("unavailable")}
        </p>

        <h1 className="font-display text-[clamp(2.4rem,13vw,9.5rem)] leading-none font-extrabold tracking-[0.04em] uppercase sm:tracking-[0.06em]">
          {site.name}
        </h1>

        <p className="mt-6 text-xs font-medium tracking-[0.2em] uppercase sm:text-base sm:tracking-[0.3em]">
          {tr(site.title, locale)}.
        </p>

        <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
          {tr(site.tagline, locale)}
        </p>

        <div className="mt-9 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          <WhatsappButton />
          <a
            href="#projects"
            className="inline-flex items-center justify-center rounded-md bg-violet px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110"
          >
            {t("projects")}
          </a>
        </div>
      </div>

      <a
        href="#about"
        aria-label={t("scroll")}
        className="absolute bottom-6 left-1/2 hidden h-9 w-6 -translate-x-1/2 justify-center rounded-full border-2 border-muted/70 pt-1.5 sm:flex [@media(max-height:600px)]:hidden"
      >
        <span className="animate-scroll-dot block h-2 w-1 rounded-full bg-muted" aria-hidden />
      </a>
    </section>
  );
}
