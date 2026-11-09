// ─────────────────────────────────────────────────────────────
//  TON PARCOURS (du plus récent au plus ancien)
//  - kind : "work" (travail), "education" (formation) ou "next" (prochaine étape, en pointillés)
// ─────────────────────────────────────────────────────────────
import type { Localized } from "./types";

export type ExperienceKind = "work" | "education" | "next";

export type Experience = {
  period: Localized;
  role: Localized;
  organization: Localized;
  description: Localized;
  kind: ExperienceKind;
};

export const experience: Experience[] = [
  {
    period: { fr: "Février — août 2026", en: "February — August 2026" },
    role: {
      fr: "Assistant développeur web & support helpdesk",
      en: "Assistant web developer & helpdesk support",
    },
    organization: {
      fr: "BANGE BANK Bénin · Direction des Systèmes d'Information",
      en: "BANGE BANK Benin · IT Department",
    },
    description: {
      fr: "Support utilisateurs, projets web internes de l'analyse du besoin à la mise en service, documentation et guides utilisateurs.",
      en: "User support, internal web projects from requirements analysis to go-live, documentation and user guides.",
    },
    kind: "work",
  },
  {
    period: { fr: "Juin — juillet 2025", en: "June — July 2025" },
    role: {
      fr: "Formation intensive en machine learning",
      en: "Intensive machine learning programme",
    },
    organization: {
      fr: "West Los Angeles College × UNSTIM",
      en: "West Los Angeles College × UNSTIM",
    },
    description: {
      fr: "Python et science des données, avec la division Computer Science du West Los Angeles College.",
      en: "Python and data science, with the Computer Science division of West Los Angeles College.",
    },
    kind: "education",
  },
  {
    period: { fr: "Mars — juin 2025", en: "March — June 2025" },
    role: { fr: "Stagiaire développeur web & mobile", en: "Web & mobile developer intern" },
    organization: { fr: "Benilab Services, Lokossa", en: "Benilab Services, Lokossa" },
    description: {
      fr: "Applications web et mobiles (Node.js, PHP, Expo/React Native), bases SQL et NoSQL, suivi du code avec Git.",
      en: "Web and mobile apps (Node.js, PHP, Expo/React Native), SQL and NoSQL databases, code tracked with Git.",
    },
    kind: "work",
  },
  {
    period: { fr: "2021 — 2025", en: "2021 — 2025" },
    role: {
      fr: "Licence pro · Informatique et Télécommunications",
      en: "Bachelor's · Computer Science & Telecommunications",
    },
    organization: { fr: "INSTI Lokossa · UNSTIM Abomey", en: "INSTI Lokossa · UNSTIM Abomey" },
    description: {
      fr: "Génie électrique et informatique. Meilleures notes : stage et soutenance (16,40/20), intelligence artificielle (15,25/20).",
      en: "Electrical and computer engineering. Top grades: internship and defence (16.40/20), artificial intelligence (15.25/20).",
    },
    kind: "education",
  },
  {
    period: { fr: "Août — septembre 2023", en: "August — September 2023" },
    role: { fr: "Développeur junior (stage)", en: "Junior developer (internship)" },
    organization: { fr: "Digit", en: "Digit" },
    description: {
      fr: "Revues de code, tests d'intégration et travail avec l'équipe de support technique.",
      en: "Code reviews, integration testing and work with the technical support team.",
    },
    kind: "work",
  },
  {
    period: { fr: "Août — septembre 2022", en: "August — September 2022" },
    role: { fr: "Stagiaire technique", en: "Technical intern" },
    organization: {
      fr: "SBEE · Société Béninoise d'Énergie Électrique, Cotonou",
      en: "SBEE · Benin electricity company, Cotonou",
    },
    description: {
      fr: "Vérification d'installations électriques, pose et configuration de compteurs, analyse des délestages.",
      en: "Electrical installation checks, meter installation and setup, analysis of power cuts.",
    },
    kind: "work",
  },
  {
    period: { fr: "Et ensuite ?", en: "What's next?" },
    role: {
      fr: "Spécialisation en IA et science des données",
      en: "Specialising in AI and data science",
    },
    organization: { fr: "", en: "" },
    description: {
      fr: "Apparaît quand la ligne l'atteint. Peut-être votre projet ?",
      en: "Appears when the line reaches it. Maybe your project?",
    },
    kind: "next",
  },
];
