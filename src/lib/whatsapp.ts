// Lien wa.me avec message pré-rempli.
// Sans numéro valide (ex. "[TON NUMÉRO]"), WhatsApp propose de choisir le destinataire.
export function whatsappLink(number: string, message: string) {
  const digits = number.replace(/\D/g, "");
  const text = encodeURIComponent(message);
  return digits
    ? `https://wa.me/${digits}?text=${text}`
    : `https://wa.me/?text=${text}`;
}
