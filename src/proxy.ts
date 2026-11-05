import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import { getProject } from "@content/projects";

const intl = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  // Projet inexistant : on renvoie vers une adresse inconnue pour obtenir un vrai code 404
  // (avec Cache Components, notFound() dans la page arrive trop tard pour changer le code)
  const match = request.nextUrl.pathname.match(/^(\/en)?\/projets\/([^/]+)\/?$/);
  if (match && !getProject(decodeURIComponent(match[2]))) {
    const locale = match[1] ? "en" : "fr";
    return NextResponse.rewrite(new URL(`/${locale}/introuvable`, request.url));
  }
  return intl(request);
}

export const config = {
  // Toutes les pages, sauf l'API, les fichiers internes de Next.js et les fichiers avec extension
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
