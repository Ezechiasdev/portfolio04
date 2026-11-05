"use client";

import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import type { ProjectCategory } from "@content/projects";

export type ProjectCardData = {
  slug: string;
  title: string;
  category: ProjectCategory;
  short: string;
  technologies: string[];
  image: string;
};

type Filter = "all" | ProjectCategory;

export function ProjectsGrid({
  projects,
  categories,
}: {
  projects: ProjectCardData[];
  categories: ProjectCategory[];
}) {
  const t = useTranslations("projects");
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<Filter>("all");
  // Les animations de position ne s'activent qu'au premier changement de filtre
  const [filtered, setFiltered] = useState(false);
  const animateLayout = !reduce && filtered;
  const visible = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  const filters: { value: Filter; label: string; count: number }[] = [
    { value: "all", label: t("all"), count: projects.length },
    ...categories.map((c) => ({
      value: c,
      label: t(`categories.${c}`),
      count: projects.filter((p) => p.category === c).length,
    })),
  ];

  return (
    <div className="mt-16">
      <div role="group" aria-label={t("filtersLabel")} className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm sm:gap-x-5">
        <span className="text-muted">{t("filterBy")}</span>
        {filters.map((f) => (
          <button
            key={f.value}
            type="button"
            aria-pressed={filter === f.value}
            onClick={() => {
              setFiltered(true);
              setFilter(f.value);
            }}
            className={`py-1 transition-colors ${
              filter === f.value
                ? "font-semibold text-cyan underline decoration-2 underline-offset-8"
                : "text-fg hover:text-cyan"
            }`}
          >
            {f.label}
            <sup className="ml-0.5 text-[0.6rem] text-violet-soft">{String(f.count).padStart(2, "0")}</sup>
          </button>
        ))}
      </div>

      <motion.ul layout={animateLayout} className="mt-8 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3" aria-live="polite">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((p) => (
            <motion.li
              key={p.slug}
              layout={animateLayout}
              initial={reduce ? false : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-bg-elevated transition-colors hover:border-cyan/50"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={p.image}
                  alt={t("screenshotOf", { title: p.title })}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  unoptimized={p.image.endsWith(".svg")}
                />
              </div>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <p className="text-[0.65rem] font-semibold tracking-[0.15em] text-cyan uppercase">
                  {t(`categoryLabel.${p.category}`)}
                </p>
                <h3 className="mt-2 text-base font-bold">{p.title}</h3>
                <p className="mt-2 text-xs leading-6 text-muted">{p.short}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {p.technologies.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full bg-cyan/10 px-3 py-1 text-[0.65rem] font-medium text-cyan"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/projets/${p.slug}`}
                  className="mt-auto inline-flex items-center gap-1 pt-6 text-sm font-semibold after:absolute after:inset-0 group-hover:text-cyan"
                >
                  {t("viewProject")}
                  <ArrowUpRight className="size-4" aria-hidden />
                  <span className="sr-only"> : {p.title}</span>
                </Link>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
      {visible.length === 0 && <p className="mt-8 text-sm text-muted">{t("empty")}</p>}
    </div>
  );
}
