import type { Metadata, Viewport } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { locale as rootLocale } from "next/root-params";
import { BackToTop } from "@/components/layout/BackToTop";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MouseHalo } from "@/components/layout/MouseHalo";
import { SkipLink } from "@/components/layout/SkipLink";
import { SocialRail } from "@/components/layout/SocialRail";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { routing } from "@/i18n/routing";
import { site } from "@content/site";
import { jetbrainsMono, poppins } from "../fonts";
import "../globals.css";

const clientNamespaces = ["a11y", "theme", "language", "nav", "projects", "contact"] as const;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#0b0d12",
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");
  const locale = await rootLocale();

  return {
    metadataBase: new URL(site.url),
    title: { default: t("title"), template: `%s — ${site.name}` },
    description: t("description"),
    applicationName: site.name,
    authors: [{ name: site.fullName }],
    alternates: {
      canonical: locale === "en" ? "/en" : "/",
      languages: { fr: "/", en: "/en", "x-default": "/" },
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: t("title"),
      description: t("description"),
      locale: locale === "en" ? "en_US" : "fr_FR",
      alternateLocale: locale === "en" ? "fr_FR" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/[locale]">) {
  const locale = await rootLocale();
  if (!hasLocale(routing.locales, locale)) notFound();

  // Seuls les textes utilisés par les composants du navigateur sont envoyés
  const messages = await getMessages();
  const clientMessages = Object.fromEntries(
    clientNamespaces.map((key) => [key, messages[key]]),
  );

  return (
    <html
      lang={locale}
      // next-themes ajoute la classe du thème avant l'hydratation
      suppressHydrationWarning
      className={`${poppins.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="min-h-dvh">
        <ThemeProvider>
          <NextIntlClientProvider messages={clientMessages}>
            <div aria-hidden className="bg-grid" />
            <MouseHalo />
            <SkipLink />
            <Header />
            <main id="main" tabIndex={-1} className="outline-none">
              {children}
            </main>
            <Footer />
            <SocialRail />
            <BackToTop />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
