import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PhoneMockup } from "@/components/ui/PhoneMockup";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { getFeaturedProject, projectCategories, projects } from "@content/projects";
import { site } from "@content/site";
import { tr } from "@content/types";
import { ProjectsGrid, type ProjectCardData } from "./ProjectsGrid";

export async function Projects() {
  const t = await getTranslations("projects");
  const tNav = await getTranslations("nav");
  const locale = await getLocale();
  const featured = getFeaturedProject();

  const cards: ProjectCardData[] = projects.map((p) => ({
    slug: p.slug,
    title: p.title,
    category: p.category,
    short: tr(p.short, locale),
    technologies: p.technologies,
    image: p.image,
  }));

  return (
    <section id="projects" className="scroll-mt-16 overflow-x-clip py-20 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionLabel index="04" label={tNav("projects")} />

        <div className="mt-8 grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-3xl font-bold min-[400px]:text-4xl sm:text-5xl">{t("title")}</h2>
            <p className="mt-6 max-w-md text-sm leading-7 font-bold">
              {t("intro", { projects: site.stats.projects, clients: site.stats.clients })}
            </p>
          </Reveal>

          {featured && (
            <Reveal delay={0.1} className="flex items-center justify-between gap-4 sm:justify-start sm:gap-12">
              <div className="min-w-0">
                <p className="font-display text-sm font-semibold">{t("featured")}</p>
                <p className="mt-2 text-lg sm:text-xl">{featured.title}</p>
                <Link
                  href={`/projets/${featured.slug}`}
                  className="mt-5 inline-flex rounded-md bg-violet px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
                >
                  {t("viewProject")}
                </Link>
              </div>
              <PhoneMockup src={featured.image} alt={t("screenshotOf", { title: featured.title })} />
            </Reveal>
          )}
        </div>

        <ProjectsGrid projects={cards} categories={projectCategories} />
      </div>
    </section>
  );
}
