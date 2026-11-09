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
    slug: "afri-swift",
    title: "AFRI-SWIFT",
    category: "demo",
    // Année du projet (laisser "" pour ne pas l'afficher)
    year: "",
    client: { fr: "Projet personnel", en: "Personal project" },
    short: {
      fr: "Preuve de concept de transferts d'argent entre comptes bancaires et mobile money en Afrique, via le Lightning Network (Bitcoin).",
      en: "Proof of concept for cross-border transfers between bank accounts and mobile money in Africa, over the Lightning Network (Bitcoin).",
    },
    technologies: ["Lightning Network", "LND", "Bitcoin", "Mobile money"],
    image: "/images/projets/afri-swift.svg",
    link: "",
    featured: true,
    caseStudy: {
      problem: {
        fr: "Envoyer de l'argent d'un pays africain à un autre reste lent et coûteux, surtout entre un compte bancaire et un portefeuille mobile money.",
        en: "Sending money from one African country to another is still slow and expensive, especially between a bank account and a mobile money wallet.",
      },
      solution: {
        fr: "Conception de l'architecture : un nœud Lightning (LND), un registre interne des comptes, la génération et le paiement automatisés des factures, le suivi et la réconciliation des transactions.",
        en: "Architecture design: a Lightning node (LND), an internal account ledger, automated invoice generation and payment, transaction tracking and reconciliation.",
      },
      result: {
        fr: "Une preuve de concept qui vise des frais minimes et un règlement quasi instantané des transferts transfrontaliers.",
        en: "A proof of concept aiming for minimal fees and near-instant settlement of cross-border transfers.",
      },
      gallery: ["/images/projets/afri-swift.svg"],
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
