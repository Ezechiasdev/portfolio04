"use client";

import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const t = useTranslations("theme");
  const isDark = resolvedTheme !== "light";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      // Le libellé dépend du thème, connu seulement dans le navigateur
      aria-label={isDark ? t("toLight") : t("toDark")}
      suppressHydrationWarning
      className="grid size-9 place-items-center rounded-md border border-line text-fg transition-colors hover:border-cyan hover:text-cyan"
    >
      {/* Les deux icônes sont rendues ; le CSS affiche la bonne, sans décalage au chargement */}
      <Sun className="hidden size-4 dark:block" aria-hidden />
      <Moon className="size-4 dark:hidden" aria-hidden />
    </button>
  );
}
