import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fr", "en"],
  defaultLocale: "fr",
  // Français sans préfixe (/), anglais sous /en
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
