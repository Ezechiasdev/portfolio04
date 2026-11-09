// ─────────────────────────────────────────────────────────────
//  TES COMPÉTENCES ET LANGUES (affichées sous « Mon expertise »)
//  Pour ajouter une ligne : copie un bloc { ... } et modifie-le.
// ─────────────────────────────────────────────────────────────
import type { Localized } from "./types";

export type SkillGroup = {
  label: Localized;
  items: Localized[];
};

// Même texte en français et en anglais
const same = (text: string): Localized => ({ fr: text, en: text });

export const skills: SkillGroup[] = [
  {
    label: { fr: "Langages", en: "Languages" },
    items: ["JavaScript", "Python", "Java", "PHP", "SQL", "HTML/CSS"].map(same),
  },
  {
    label: { fr: "Web & mobile", en: "Web & mobile" },
    items: ["Node.js", "Bootstrap", "Expo (React Native)", "API REST"].map(same),
  },
  {
    label: { fr: "Données & IA", en: "Data & AI" },
    items: [
      { fr: "Machine learning avec Python", en: "Machine learning with Python" },
      same("Big Data"),
      { fr: "Bases SQL et NoSQL", en: "SQL and NoSQL databases" },
    ],
  },
  {
    label: { fr: "Systèmes & réseaux", en: "Systems & networks" },
    items: [
      { fr: "Architecture réseaux", en: "Network architecture" },
      { fr: "Sécurité et qualité de service des SI", en: "IS security and quality of service" },
      { fr: "Systèmes d'exploitation", en: "Operating systems" },
    ],
  },
  {
    label: { fr: "Méthodes & outils", en: "Methods & tools" },
    items: [
      same("Git"),
      same("UML"),
      { fr: "Gestion de projets numériques", en: "Digital project management" },
      { fr: "Support utilisateurs", en: "User support" },
    ],
  },
  {
    label: { fr: "Langues parlées", en: "Spoken languages" },
    items: [
      { fr: "Français (courant)", en: "French (fluent)" },
      {
        fr: "Anglais (avancé · IELTS/TOEFL en cours)",
        en: "English (advanced · IELTS/TOEFL in progress)",
      },
    ],
  },
];
