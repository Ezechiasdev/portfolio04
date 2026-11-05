import { Mail, MapPin } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { WhatsappIcon } from "@/components/ui/SocialIcons";
import { Watermark } from "@/components/ui/Watermark";
import { whatsappLink } from "@/lib/whatsapp";
import { site } from "@content/site";
import { tr } from "@content/types";
import { ContactForm } from "./ContactForm";

function Card({
  href,
  label,
  value,
  icon,
  labelClass = "text-muted",
  external,
}: {
  href?: string;
  label: string;
  value: string;
  icon: ReactNode;
  labelClass?: string;
  external?: boolean;
}) {
  const body = (
    <>
      <span className="flex items-center gap-2">
        {icon}
        <span className={`text-[0.7rem] ${labelClass}`}>{label}</span>
      </span>
      <span className="mt-2 block font-display text-base font-semibold break-words">{value}</span>
    </>
  );
  const className = "block min-w-0 rounded-xl border border-line bg-bg-elevated p-5";

  return href ? (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`${className} transition-colors hover:border-cyan`}
    >
      {body}
    </a>
  ) : (
    <div className={className}>{body}</div>
  );
}

export async function Contact() {
  const t = await getTranslations("contact");
  const tNav = await getTranslations("nav");
  const locale = await getLocale();

  return (
    <section id="contact" className="relative isolate scroll-mt-16 overflow-hidden py-20 sm:py-32">
      <Watermark text={t("watermark")} className="absolute top-4 -right-[2%] text-[26vw] sm:text-[14rem]" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionLabel index="06" label={tNav("contact")} />
          <h2 className="mt-3 font-display text-3xl leading-tight font-bold min-[400px]:text-4xl sm:text-5xl lg:text-6xl">
            {t("title")}
            <span className="block text-cyan">{t("titleAccent")}</span>
          </h2>
          <p className="mt-5 max-w-md text-sm leading-7 text-muted">{t("subtitle")}</p>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_18rem] lg:gap-12">
          <Reveal delay={0.05}>
            <ContactForm />
          </Reveal>
          <Reveal delay={0.15} className="grid gap-4 sm:grid-cols-3 lg:flex lg:flex-col">
            <Card
              href={whatsappLink(site.whatsapp, tr(site.whatsappMessage, locale))}
              external
              label={t("cards.whatsapp")}
              labelClass="text-whatsapp"
              value={site.whatsapp}
              icon={<WhatsappIcon className="size-4 text-whatsapp" />}
            />
            <Card
              href={`mailto:${site.email}`}
              label={t("cards.email")}
              labelClass="text-cyan"
              value={site.email}
              icon={<Mail className="size-4 text-cyan" aria-hidden />}
            />
            <Card
              label={t("cards.location")}
              value={tr(site.location, locale)}
              icon={<MapPin className="size-4 text-muted" aria-hidden />}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
