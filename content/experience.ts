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
    period: { fr: "[ANNÉE] — aujourd'hui", en: "[YEAR] — present" },
    role: { fr: "Développeur freelance", en: "Freelance developer" },
    organization: { fr: "À mon compte", en: "Self-employed" },
    description: {
      fr: "Sites web et applications mobiles pour PME, commerçants et porteurs de projets.",
      en: "Websites and mobile apps for small businesses, shop owners and entrepreneurs.",
    },
    kind: "work",
  },
  {
    period: { fr: "[ANNÉE] — [ANNÉE]", en: "[YEAR] — [YEAR]" },
    role: { fr: "[TON POSTE]", en: "[YOUR ROLE]" },
    organization: { fr: "[ENTREPRISE]", en: "[COMPANY]" },
    description: {
      fr: "[Ce que tu y as fait en une phrase.]",
      en: "[What you did there in one sentence.]",
    },
    kind: "work",
  },
  {
    period: { fr: "[ANNÉE] — [ANNÉE]", en: "[YEAR] — [YEAR]" },
    role: { fr: "[TA FORMATION]", en: "[YOUR DEGREE]" },
    organization: { fr: "[ÉCOLE OU UNIVERSITÉ]", en: "[SCHOOL OR UNIVERSITY]" },
    description: {
      fr: "[École ou université, diplôme obtenu.]",
      en: "[School or university, degree obtained.]",
    },
    kind: "education",
  },
  {
    period: { fr: "[ANNÉE]", en: "[YEAR]" },
    role: { fr: "[PROCHAINE ÉTAPE]", en: "[NEXT STEP]" },
    organization: { fr: "", en: "" },
    description: {
      fr: "Apparaît quand la ligne l'atteint. Peut-être votre projet ?",
      en: "Appears when the line reaches it. Maybe your project?",
    },
    kind: "next",
  },
];
