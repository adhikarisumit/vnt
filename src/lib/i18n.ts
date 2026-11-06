/**
 * The site is Japanese only (Boss, 6 Nov 2026): the /en locale was removed.
 * The URL prefix /ja stays so nothing else had to move; /en redirects to /ja
 * in next.config.ts. Content objects may still carry an `en` string (kept as
 * notes for the client), but it is never served.
 */
export const locales = ['ja'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'ja';

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** A string in Japanese, optionally with an unused English note. */
export type L10n = { ja: string; en?: string };

/** Pull the active language out of an `L10n` value. */
export function t(value: L10n, _locale: Locale = 'ja'): string {
  return value.ja;
}

/** Prefix an app-relative path with the active locale. */
export function localePath(locale: Locale, path = '/'): string {
  const clean = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`;
  return `/${locale}${clean}`;
}
