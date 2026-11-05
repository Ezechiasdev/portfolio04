import type { MetadataRoute } from "next";
import { projects } from "@content/projects";
import { site } from "@content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: `${site.url}${path || "/"}`,
    changeFrequency: "monthly",
    priority,
    alternates: {
      languages: { fr: `${site.url}${path || "/"}`, en: `${site.url}/en${path}` },
    },
  });

  return [entry("", 1), ...projects.map((p) => entry(`/projets/${p.slug}`, 0.7))];
}
