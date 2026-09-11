export const locales = ['ja', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'ja';

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** A string that exists in both languages. */
export type L10n = Record<Locale, string>;

/** Pull the active language out of an `L10n` value. */
export function t(value: L10n, locale: Locale): string {
  return value[locale] || value.ja;
}

/** Prefix an app-relative path with the active locale. */
export function localePath(locale: Locale, path = '/'): string {
  const clean = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`;
  return `/${locale}${clean}`;
}

export const localeLabels: Record<Locale, string> = {
  ja: '日本語',
  en: 'English',
};
