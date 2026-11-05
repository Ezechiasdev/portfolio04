// ─────────────────────────────────────────────────────────────
//  TES PROJETS
//  Pour ajouter un projet : copie un bloc { ... } et modifie-le.
//  - slug : identifiant unique, utilisé dans l'adresse /projets/<slug>
//  - category : "web" | "mobile" | "ecommerce" | "demo"
//  - featured : true pour le projet phare (un seul de préférence)
//  - image : capture dans public/images/projets/
// ─────────────────────────────────────────────────────────────
import type { Localized } from "./types";

export type ProjectCategory = "web" | "mobile" | "ecommerce" | "demo";

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  year: string;
  client: Localized;
  short: Localized;
  technologies: string[];
  image: string;
  // Lien vers le site ou l'appli en ligne (laisser vide si aucun)
  link: string;
  featured: boolean;
  caseStudy: {
    problem: Localized;
    solution: Localized;
    result: Localized;
    // Captures supplémentaires affichées dans l'étude de cas
    gallery: string[];
  };
};

export const projects: Project[] = [
  {
    slug: "projet-1",
    title: "[NOM DU PROJET 1]",
    category: "web",
    year: "[ANNÉE]",
    client: { fr: "[NOM DU CLIENT]", en: "[CLIENT NAME]" },
    short: {
      fr: "[Le client, son besoin, ce que tu as livré et le résultat.]",
      en: "[The client, their need, what you delivered and the result.]",
    },
    technologies: ["Next.js", "Tailwind", "[TECHNO]"],
    image: "/images/projets/projet-1.svg",
    link: "",
    featured: false,
    caseStudy: {
      problem: {
        fr: "[Quel était le problème du client ? Ex. : aucun site, peu de demandes, image vieillissante.]",
        en: "[What was the client's problem? E.g. no website, few enquiries, outdated image.]",
      },
      solution: {
        fr: "[Ce que tu as conçu et développé, et pourquoi ces choix.]",
        en: "[What you designed and built, and why.]",
      },
      result: {
        fr: "[Le résultat concret : plus de demandes, ventes, temps gagné…]",
        en: "[The concrete result: more enquiries, sales, time saved…]",
      },
      gallery: ["/images/projets/projet-1.svg"],
    },
  },
  {
    slug: "projet-2",
    title: "[NOM DU PROJET 2]",
    category: "mobile",
    year: "[ANNÉE]",
    client: { fr: "[NOM DU CLIENT]", en: "[CLIENT NAME]" },
    short: {
      fr: "[Le client, son besoin, ce que tu as livré et le résultat.]",
      en: "[The client, their need, what you delivered and the result.]",
    },
    technologies: ["[TECHNO MOBILE]", "Firebase"],
    image: "/images/projets/projet-2.svg",
    link: "",
    featured: true,
    caseStudy: {
      problem: {
        fr: "[Quel était le problème du client ?]",
        en: "[What was the client's problem?]",
      },
      solution: {
        fr: "[Ce que tu as conçu et développé, et pourquoi ces choix.]",
        en: "[What you designed and built, and why.]",
      },
      result: {
        fr: "[Le résultat concret.]",
        en: "[The concrete result.]",
      },
      gallery: ["/images/projets/projet-2.svg"],
    },
  },
  {
    slug: "projet-3",
    title: "[NOM DU PROJET 3]",
    category: "ecommerce",
    year: "[ANNÉE]",
    client: { fr: "[NOM DU CLIENT]", en: "[CLIENT NAME]" },
    short: {
      fr: "[Boutique en ligne : produits, paiement mobile money, résultat.]",
      en: "[Online store: products, mobile money payment, result.]",
    },
    technologies: ["React", "Mobile money", "[TECHNO]"],
    image: "/images/projets/projet-3.svg",
    link: "",
    featured: false,
    caseStudy: {
      problem: {
        fr: "[Quel était le problème du client ?]",
        en: "[What was the client's problem?]",
      },
      solution: {
        fr: "[Ce que tu as conçu et développé, et pourquoi ces choix.]",
        en: "[What you designed and built, and why.]",
      },
      result: {
        fr: "[Le résultat concret.]",
        en: "[The concrete result.]",
      },
      gallery: ["/images/projets/projet-3.svg"],
    },
  },
  {
    slug: "projet-4",
    title: "[NOM DU PROJET 4]",
    category: "demo",
    year: "[ANNÉE]",
    client: { fr: "Projet personnel", en: "Personal project" },
    short: {
      fr: "[Projet de démonstration, présenté comme tel : ce qu'il montre de ton savoir-faire.]",
      en: "[Demo project, presented as such: what it shows about your skills.]",
    },
    technologies: ["Next.js", "[TECHNO]"],
    image: "/images/projets/projet-4.svg",
    link: "",
    featured: false,
    caseStudy: {
      problem: {
        fr: "[Quelle idée ou quel besoin ce projet de démonstration illustre-t-il ?]",
        en: "[What idea or need does this demo project illustrate?]",
      },
      solution: {
        fr: "[Ce que tu as conçu et développé.]",
        en: "[What you designed and built.]",
      },
      result: {
        fr: "[Ce que tu as appris ou démontré.]",
        en: "[What you learned or demonstrated.]",
      },
      gallery: ["/images/projets/projet-4.svg"],
    },
  },
];

export const projectCategories: ProjectCategory[] = [
  "web",
  "mobile",
  "ecommerce",
  "demo",
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProject() {
  return projects.find((p) => p.featured) ?? projects[0];
}
