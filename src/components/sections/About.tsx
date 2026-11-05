import { Download } from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { site } from "@content/site";

function Keyword({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="font-bold uppercase underline decoration-cyan decoration-2 underline-offset-4 transition-colors hover:text-cyan"
    >
      {children}
    </a>
  );
}

// Disque qui tourne avec un texte circulaire
function SpinningDisc({ text }: { text: string }) {
  return (
    <div className="absolute -top-8 -left-3 size-24 sm:-top-10 sm:-left-10 sm:size-36" aria-hidden>
      <svg viewBox="0 0 200 200" className="animate-spin-slow size-full">
        <defs>
          <path id="disc-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <circle cx="100" cy="100" r="98" className="fill-bg stroke-line" strokeWidth="2" />
        <text className="fill-fg font-mono text-[15px] font-semibold tracking-[0.18em]">
          <textPath href="#disc-circle">{text.repeat(2)}</textPath>
        </text>
      </svg>
      <span className="absolute inset-0 m-auto grid size-10 place-items-center rounded-full bg-violet text-lg text-white shadow-[0_0_24px_rgba(124,77,255,0.6)] sm:size-12">
        ✦
      </span>
    </div>
  );
}

export async function About() {
  const t = await getTranslations("about");
  const tNav = await getTranslations("nav");

  const rich = {
    web: (chunks: ReactNode) => <Keyword href="#projects">{chunks}</Keyword>,
    mobile: (chunks: ReactNode) => <Keyword href="#expertise">{chunks}</Keyword>,
    contact: (chunks: ReactNode) => <Keyword href="#contact">{chunks}</Keyword>,
  };

  return (
    <section id="about" className="relative scroll-mt-16 py-20 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:gap-12 xl:gap-20">
        <Reveal>
          <SectionLabel index="02" label={tNav("about")} />
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-[0.04em] uppercase min-[400px]:text-4xl sm:text-5xl">
            {t("title")}
            <span className="text-violet">.</span>
          </h2>
          <hr className="my-8 w-full border-line" />
          <div className="space-y-5 text-sm leading-7 text-muted sm:text-base sm:leading-8">
            <p>{t.rich("text", rich)}</p>
            <p>{t.rich("text2", rich)}</p>
          </div>
          <a
            href={site.cvUrl}
            download
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-fg transition-colors hover:text-cyan"
          >
            <Download className="size-4" aria-hidden />
            {t("cv")}
          </a>
        </Reveal>

        <Reveal y={40} delay={0.1} className="mx-auto w-full max-w-[18rem] sm:max-w-sm lg:max-w-none">
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border border-line bg-bg-elevated">
              <Image
                src={site.photo}
                alt={t("photoAlt")}
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover"
                unoptimized={site.photo.endsWith(".svg")}
              />
            </div>
            {site.available && <SpinningDisc text={t("disc")} />}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
