// Validation du formulaire, partagée par le navigateur et le serveur.
// Écrite à la main (sans bibliothèque) pour garder le site léger.

export const projectTypes = ["showcase", "store", "mobile", "other"] as const;
export type ProjectType = (typeof projectTypes)[number];

export type ContactInput = {
  name: string;
  contact: string;
  type: ProjectType;
  message: string;
};
export type ContactField = keyof ContactInput;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Numéro : chiffres, espaces, +, tirets, points, parenthèses ; 8 chiffres minimum
const phonePattern = /^\+?[\d\s().-]{8,20}$/;

export function isEmail(value: string) {
  return emailPattern.test(value);
}

function isPhone(value: string) {
  return phonePattern.test(value) && value.replace(/\D/g, "").length >= 8;
}

const text = (value: unknown) => (typeof value === "string" ? value.trim() : "");

// Les champs en erreur servent de clés de traduction (contact.form.errors.*)
export function validateContact(
  input: Record<string, unknown>,
): { ok: true; data: ContactInput } | { ok: false; errors: ContactField[] } {
  const data = {
    name: text(input.name),
    contact: text(input.contact),
    type: text(input.type) as ProjectType,
    message: text(input.message),
  };

  const errors: ContactField[] = [];
  if (data.name.length < 2 || data.name.length > 100) errors.push("name");
  if (data.contact.length > 120 || !(isEmail(data.contact) || isPhone(data.contact))) errors.push("contact");
  if (!projectTypes.includes(data.type)) errors.push("type");
  if (data.message.length < 10 || data.message.length > 5000) errors.push("message");

  return errors.length ? { ok: false, errors } : { ok: true, data };
}
