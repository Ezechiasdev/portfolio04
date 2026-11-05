// Un texte disponible en français et en anglais
export type Localized = { fr: string; en: string };

export type Lang = keyof Localized;

export function tr(text: Localized, lang: string): string {
  return lang === "en" ? text.en : text.fr;
}
