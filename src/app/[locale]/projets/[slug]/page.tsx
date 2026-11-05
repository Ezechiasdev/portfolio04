import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { locale as rootLocale } from "next/root-params";
import { getTranslations } from "next-intl/server";
import { WhatsappButton } from "@/components/ui/WhatsappButton";
import { Link } from "@/i18n/navigation";
import { getProject, projects } from "@content/projects";
import { tr } from "@content/types";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/projets/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const locale = await rootLocale();
  const path = `/projets/${slug}`;

  return {
    title: project.title,
    description: tr(project.short, locale),
    alternates: {
      canonical: locale === "en" ? `/en${path}` : path,
      languages: { fr: path, en: `/en${path}`, "x-default": path },
    },
    openGraph: { title: project.title, description: tr(project.short, locale) },
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/[locale]/projets/[slug]">) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  const locale = await rootLocale();
  const t = await getTranslations("caseStudy");
  const tProjects = await getTranslations("projects");

  const facts = [
    { label: t("client"), value: tr(project.client, locale) },
    { label: t("year"), value: project.year },
    { label: t("category"), value: tProjects(`categoryLabel.${project.category}`) },
  ];

  const story = [
    { title: t("problem"), text: tr(project.caseStudy.problem, locale) },
    { title: t("solution"), text: tr(project.caseStudy.solution, locale) },
    { title: t("result"), text: tr(project.caseStudy.result, locale) },
  ];

  return (
    <article className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-24">
      <Link
        href="/#projects"
        className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-cyan"
      >
        <ArrowLeft className="size-4" aria-hidden />
        {t("back")}
      </Link>

      <p className="mt-10 text-xs font-semibold tracking-[0.15em] text-cyan uppercase">
        {tProjects(`categoryLabel.${project.category}`)}
      </p>
      <h1 className="mt-3 font-display text-3xl font-bold min-[400px]:text-4xl sm:text-5xl lg:text-6xl">{project.title}</h1>
      <p className="mt-5 max-w-2xl text-sm leading-7 text-muted sm:text-base">{tr(project.short, locale)}</p>

      <dl className="mt-10 grid gap-6 border-y border-line py-6 grid-cols-2 lg:grid-cols-4">
        {facts.map((f) => (
          <div key={f.label}>
            <dt className="text-xs text-muted">{f.label}</dt>
            <dd className="mt-1 text-sm font-semibold">{f.value}</dd>
          </div>
        ))}
        <div className="col-span-2 lg:col-span-1">
          <dt className="text-xs text-muted">{t("technologies")}</dt>
          <dd className="mt-2 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span key={tech} className="rounded-full bg-cyan/10 px-3 py-1 text-[0.65rem] font-medium text-cyan">
                {tech}
              </span>
            ))}
          </dd>
        </div>
      </dl>

      <div className="relative mt-12 aspect-[16/10] overflow-hidden rounded-2xl border border-line">
        <Image
          src={project.image}
          alt={tProjects("screenshotOf", { title: project.title })}
          fill
          priority
          sizes="(min-width: 1024px) 64rem, 100vw"
          className="object-cover"
          unoptimized={project.image.endsWith(".svg")}
        />
      </div>

      <div className="mt-12 grid gap-10 sm:mt-16 md:grid-cols-3 md:gap-8 lg:gap-12">
        {story.map((s, i) => (
          <section key={s.title}>
            <p className="text-xs text-violet">{String(i + 1).padStart(2, "0")}</p>
            <h2 className="mt-2 font-display text-xl font-bold">{s.title}</h2>
            <p className="mt-3 text-sm leading-7 text-muted">{s.text}</p>
          </section>
        ))}
      </div>

      {project.caseStudy.gallery.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-xl font-bold">{t("gallery")}</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {project.caseStudy.gallery.map((src, i) => (
              <div key={src + i} className="relative aspect-[16/10] overflow-hidden rounded-xl border border-line">
                <Image
                  src={src}
                  alt={`${tProjects("screenshotOf", { title: project.title })} (${i + 1})`}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                  unoptimized={src.endsWith(".svg")}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-12 inline-flex items-center gap-2 rounded-md border border-line px-5 py-3 text-sm font-semibold transition-colors hover:border-cyan hover:text-cyan"
        >
          {t("visit")}
          <ArrowUpRight className="size-4" aria-hidden />
        </a>
      )}

      <section className="mt-20 rounded-2xl border border-line bg-bg-elevated p-6 text-center sm:p-12">
        <h2 className="font-display text-2xl font-bold sm:text-3xl">{t("ctaTitle")}</h2>
        <p className="mt-3 text-sm text-muted">{t("ctaText")}</p>
        <WhatsappButton className="mt-6 w-full sm:w-auto" />
      </section>

      {next.slug !== project.slug && (
        <Link
          href={`/projets/${next.slug}`}
          className="group mt-12 flex items-center justify-between gap-4 border-t border-line pt-8"
        >
          <span>
            <span className="block text-xs text-muted">{t("next")}</span>
            <span className="mt-1 block font-display text-lg font-bold group-hover:text-cyan sm:text-xl">{next.title}</span>
          </span>
          <ArrowRight className="size-6 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden />
        </Link>
      )}
    </article>
  );
}
