// ─────────────────────────────────────────────────────────────
//  TES INFORMATIONS PERSONNELLES
//  Remplace les valeurs entre crochets [ ... ] par les tiennes.
// ─────────────────────────────────────────────────────────────
import type { Localized } from "./types";

export const site = {
  // Nom affiché en grand dans l'accueil et dans le logo
  name: "Ezéchias",
  // Nom complet (utilisé pour le référencement et le copyright)
  fullName: "[TON NOM COMPLET]",

  title: {
    fr: "Développeur web & mobile freelance",
    en: "Freelance web & mobile developer",
  } satisfies Localized,

  // Phrase d'accroche sous ton nom
  tagline: {
    fr: "Je crée des sites et des applications qui aident les entreprises à trouver plus de clients. Basé au Bénin, disponible partout.",
    en: "I build websites and apps that help businesses win more customers. Based in Benin, available worldwide.",
  } satisfies Localized,

  // Adresse du site en ligne : à définir dans .env.local (NEXT_PUBLIC_SITE_URL)
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  // Numéro WhatsApp au format international, ex. "+229 01 23 45 67 89"
  whatsapp: "[TON NUMÉRO]",
  // Message pré-rempli quand un client clique sur un bouton WhatsApp
  whatsappMessage: {
    fr: "Bonjour Ezéchias, j'ai vu votre portfolio et j'aimerais parler d'un projet.",
    en: "Hello Ezéchias, I saw your portfolio and would like to discuss a project.",
  } satisfies Localized,

  email: "[TON E-MAIL]",

  location: {
    fr: "Bénin · à distance partout",
    en: "Benin · remote worldwide",
  } satisfies Localized,

  socials: {
    github: "https://github.com/[TON-PSEUDO]",
    linkedin: "https://www.linkedin.com/in/[TON-PSEUDO]",
    facebook: "https://www.facebook.com/[TON-PSEUDO]",
    instagram: "https://www.instagram.com/[TON-PSEUDO]",
  },

  // Mets ton CV dans public/cv.pdf (ou change ce chemin)
  cvUrl: "/cv.pdf",

  // Ta photo : remplace public/images/photo.svg par ta photo (ex. photo.jpg) et change ce chemin
  photo: "/images/photo.svg",

  // Affiché dans le badge de l'accueil et le disque tournant
  available: true,

  // Chiffres affichés dans la section Projets
  stats: {
    projects: "[X]",
    clients: "[X]",
  },
};

export type SocialKey = keyof typeof site.socials;
