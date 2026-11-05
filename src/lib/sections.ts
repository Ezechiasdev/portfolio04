// Sections de la page principale, dans l'ordre du menu
export const sections = [
  "home",
  "about",
  "expertise",
  "projects",
  "experience",
  "contact",
] as const;

export type SectionId = (typeof sections)[number];
