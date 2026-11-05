import { Resend } from "resend";
import { isEmail, validateContact } from "@/lib/contact-schema";

const typeLabels: Record<string, string> = {
  showcase: "Site vitrine",
  store: "Boutique en ligne",
  mobile: "Application mobile",
  other: "Autre",
};

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Robot détecté (champ caché rempli ou envoi trop rapide) : on fait semblant d'accepter
  const elapsed = typeof body.elapsed === "number" ? body.elapsed : 0;
  if (body.company || elapsed < 3000) {
    return Response.json({ ok: true });
  }

  const parsed = validateContact(body);
  if (!parsed.ok) {
    return Response.json({ ok: false, error: "invalid_fields" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.error("[contact] RESEND_API_KEY ou CONTACT_TO_EMAIL manquant dans .env.local");
    return Response.json({ ok: false, error: "not_configured" }, { status: 500 });
  }

  const { name, contact, type, message } = parsed.data;
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
    to,
    replyTo: isEmail(contact) ? contact : undefined,
    subject: `Nouveau message du portfolio — ${name} (${typeLabels[type]})`,
    text: [
      `Nom : ${name}`,
      `Contact : ${contact}`,
      `Type de projet : ${typeLabels[type]}`,
      `Langue du site : ${body.locale === "en" ? "anglais" : "français"}`,
      "",
      message,
    ].join("\n"),
  });

  if (error) {
    console.error("[contact] Erreur Resend :", error);
    return Response.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
