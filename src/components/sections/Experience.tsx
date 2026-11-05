import { getLocale, getTranslations } from "next-intl/server";
import { experience } from "@content/experience";
import { tr } from "@content/types";
import { ExperienceTimeline, type TimelineItem } from "./ExperienceTimeline";

export async function Experience() {
  const t = await getTranslations("experience");
  const tNav = await getTranslations("nav");
  const locale = await getLocale();

  const items: TimelineItem[] = experience.map((e) => ({
    period: tr(e.period, locale),
    role: tr(e.role, locale),
    organization: tr(e.organization, locale),
    description: tr(e.description, locale),
    kind: e.kind,
  }));

  return (
    // Fond papier millimétré, identique en mode clair et sombre
    <section id="experience" className="paper-grid scroll-mt-16 bg-paper py-24 text-navy sm:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <p className="text-xs tracking-wide text-[#5b2fd6]">
          {"// 05 — "}
          {tNav("experience")}
        </p>
        <h2 className="mt-3 font-display text-3xl font-extrabold tracking-[0.03em] uppercase min-[400px]:text-4xl sm:text-5xl">
          {t("title")}
        </h2>
        <ExperienceTimeline items={items} />
      </div>
    </section>
  );
}
