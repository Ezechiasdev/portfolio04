"use client";

import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { sections, type SectionId } from "@/lib/sections";
import { LocaleSwitch } from "@/components/ui/LocaleSwitch";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { site } from "@content/site";

// Section visible à l'écran (seulement sur la page principale)
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<SectionId | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId);
        }
      },
      // Une section est « en cours » quand elle traverse le milieu de l'écran
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [enabled]);

  return enabled ? active : null;
}

function NavLink({
  id,
  index,
  onHome,
  active,
  onNavigate,
  className,
}: {
  id: SectionId;
  index: number;
  onHome: boolean;
  active: boolean;
  onNavigate?: () => void;
  className: string;
}) {
  const t = useTranslations("nav");
  const content = (
    <>
      <span className="text-muted" aria-hidden>
        {"// "}
      </span>
      {t(id)}
      <sup className="ml-0.5 text-[0.6rem] text-violet-soft" aria-hidden>
        {String(index + 1).padStart(2, "0")}
      </sup>
    </>
  );
  const props = {
    className: `${className} ${active ? "text-cyan" : "text-fg hover:text-cyan"}`,
    "aria-current": active ? ("location" as const) : undefined,
    onClick: onNavigate,
  };

  // Sur la page principale : simple ancre ; ailleurs : retour à la page principale
  return onHome ? (
    <a href={`#${id}`} {...props}>
      {content}
    </a>
  ) : (
    <Link href={`/#${id}`} {...props}>
      {content}
    </Link>
  );
}

export function Header() {
  const t = useTranslations("a11y");
  const pathname = usePathname();
  const onHome = pathname === "/";
  const active = useActiveSection(onHome);
  const [open, setOpen] = useState(false);

  // Menu mobile : fermeture avec Échap et blocage du défilement derrière
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line bg-bg/75 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link
            href="/"
            aria-label={t("home")}
            className="shrink-0 font-mono text-base font-bold text-cyan sm:text-lg"
          >
            {site.name}.
            <span className="animate-blink text-violet" aria-hidden>
              _
            </span>
          </Link>

          <nav aria-label={t("mainNav")} className="hidden lg:block">
            <ul className="flex items-center gap-4 text-[0.75rem] xl:gap-6 xl:text-[0.8rem]">
              {sections.map((id, i) => (
                <li key={id}>
                  <NavLink
                    id={id}
                    index={i}
                    onHome={onHome}
                    active={active === id}
                    className="transition-colors"
                  />
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <LocaleSwitch />
            <ThemeToggle />
            <button
              type="button"
              className="grid size-9 place-items-center rounded-md border border-line text-fg lg:hidden"
              aria-label={open ? t("closeMenu") : t("openMenu")}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? (
                <X className="size-4" aria-hidden />
              ) : (
                <Menu className="size-4" aria-hidden />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hors de l'en-tête : son flou d'arrière-plan limiterait le menu à sa hauteur */}
      {open && (
        <nav
          id="mobile-menu"
          aria-label={t("mainNav")}
          className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto overscroll-contain border-t border-line bg-bg px-6 py-8 sm:py-10 lg:hidden"
        >
          {/* Téléphone à l'horizontale (peu de hauteur) : deux colonnes, texte plus petit */}
          <ul className="flex flex-col gap-4 text-xl sm:gap-6 sm:text-2xl [@media(max-height:500px)]:grid [@media(max-height:500px)]:grid-cols-2 [@media(max-height:500px)]:gap-3 [@media(max-height:500px)]:text-lg">
            {sections.map((id, i) => (
              <li key={id}>
                <NavLink
                  id={id}
                  index={i}
                  onHome={onHome}
                  active={active === id}
                  onNavigate={() => setOpen(false)}
                  className="block py-1"
                />
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
}
