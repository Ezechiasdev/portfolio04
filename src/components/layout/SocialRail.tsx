import { useTranslations } from "next-intl";
import { site, type SocialKey } from "@content/site";
import { socialIcons, socialLabels } from "@/components/ui/SocialIcons";

const keys = Object.keys(site.socials) as SocialKey[];

export function SocialLinks({ className = "" }: { className?: string }) {
  const t = useTranslations("a11y");
  return (
    <ul className={className}>
      {keys.map((key) => {
        const Icon = socialIcons[key];
        return (
          <li key={key}>
            <a
              href={site.socials[key]}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${socialLabels[key]} ${t("newTab")}`}
              className="grid size-9 place-items-center text-muted transition hover:-translate-y-0.5 hover:text-cyan"
            >
              <Icon className="size-[1.1rem]" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}

// Colonne fixée en bas à gauche (à partir de 1280 px : en dessous, elle chevaucherait le contenu)
export function SocialRail() {
  const t = useTranslations("a11y");
  return (
    <aside
      aria-label={t("socials")}
      className="fixed bottom-0 left-6 z-30 hidden flex-col items-center gap-3 xl:flex"
    >
      <SocialLinks className="flex flex-col items-center gap-1" />
      <span className="h-24 w-px bg-muted/60" aria-hidden />
    </aside>
  );
}
