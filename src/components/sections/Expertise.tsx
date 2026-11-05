import { Monitor, ShoppingCart, Smartphone, type LucideIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

const cards: { key: "web" | "mobile" | "ecommerce"; Icon: LucideIcon; highlight: string }[] = [
  { key: "web", Icon: Monitor, highlight: "var(--accent-cyan)" },
  { key: "mobile", Icon: Smartphone, highlight: "var(--accent-violet)" },
  { key: "ecommerce", Icon: ShoppingCart, highlight: "var(--accent-orange)" },
];

export async function Expertise() {
  const t = await getTranslations("expertise");
  const tNav = await getTranslations("nav");

  return (
    <section id="expertise" className="scroll-mt-16 py-20 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <SectionLabel index="03" label={tNav("expertise")} />
          <h2 className="mt-3 font-display text-3xl font-bold min-[400px]:text-4xl sm:text-5xl">{t("title")}</h2>
        </div>

        <div className="mt-14 grid overflow-hidden rounded-sm border border-fg/30 lg:grid-cols-3">
          {cards.map(({ key, Icon, highlight }, i) => (
            <Reveal
              key={key}
              x={-40}
              y={0}
              delay={i * 0.12}
              className="border-fg/30 p-6 not-last:border-b sm:p-9 lg:p-7 lg:not-last:border-r lg:not-last:border-b-0 xl:p-9"
            >
              <div className="flex items-start gap-4">
                <Icon className="mt-1 size-7 shrink-0" strokeWidth={1.5} aria-hidden />
                <h3 className="font-display text-xl leading-tight font-bold">
                  <span
                    className="bg-[length:100%_40%] bg-bottom bg-no-repeat px-0.5"
                    style={{
                      backgroundImage: `linear-gradient(color-mix(in srgb, ${highlight} 55%, transparent), color-mix(in srgb, ${highlight} 55%, transparent))`,
                    }}
                  >
                    {t(`${key}.title`)}
                  </span>
                  <span className="block">{t(`${key}.subtitle`)}</span>
                </h3>
              </div>
              <div className="mt-8 text-xs text-muted/70" aria-hidden>
                &lt;h3&gt;
              </div>
              <p className="my-2 ml-1 border-l border-line pl-5 text-sm leading-7">
                {t(`${key}.text`)}
              </p>
              <div className="text-xs text-muted/70" aria-hidden>
                &lt;/h3&gt;
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
