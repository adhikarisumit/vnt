import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import '../globals.css';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileActionBar } from '@/components/layout/MobileActionBar';
import PageTransition from '@/components/motion/PageTransition';
import SmoothScroll from '@/components/motion/SmoothScroll';
import { getDictionary } from '@/content/dictionary';
import { site } from '@/content/site';
import { isLocale, locales, t, type Locale } from '@/lib/i18n';

/**
 * Fonts come from Google Fonts at runtime (same as the live STUDIO site):
 * a build-time fetch through next/font/google crashes on Vercel's build
 * machines (Google answers there with extension-less font URLs). The CSS
 * variables are set in globals.css.
 */
const GOOGLE_FONTS_CSS =
  'https://fonts.googleapis.com/css2?family=Tenor+Sans&family=Shippori+Mincho:wght@400;500;600&family=Noto+Sans+JP:wght@300;400;500;700&family=Montserrat:wght@300;400&display=swap';
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const active: Locale = isLocale(locale) ? locale : 'ja';

  return {
    metadataBase: new URL(site.url),
    title: {
      default: `VNT GROUP | ${t(site.tagline, active)}`,
      template: '%s | VNT GROUP',
    },
    description: t(site.description, active),
    alternates: {
      canonical: `/${active}`,
      languages: { ja: '/ja' },
    },
    openGraph: {
      type: 'website',
      siteName: 'VNT GROUP',
      locale: 'ja_JP',
      title: `VNT GROUP | ${t(site.tagline, active)}`,
      description: t(site.description, active),
      images: ['/images/brand/hero-group.webp'],
    },
    twitter: { card: 'summary_large_image' },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);

  const organisation = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'VNT GROUP',
    legalName: site.legalName[locale],
    url: site.url,
    email: site.email,
    telephone: site.tel,
    faxNumber: site.fax,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'JP',
      addressRegion: 'Kanagawa',
      addressLocality: 'Yokohama',
      postalCode: site.address.postal.replace('〒', ''),
      streetAddress: locale === 'ja' ? site.address.ja : site.address.en,
    },
  };

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={GOOGLE_FONTS_CSS} />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisation) }}
        />

        <SmoothScroll />

        <Header
          locale={locale}
          labels={{
            menu: dict.common.menu,
            close: dict.common.close,
            reserve: dict.common.facilityReserve,
            contact: dict.common.contact,
          }}
        />

        <PageTransition>{children}</PageTransition>

        <Footer locale={locale} />

        <MobileActionBar
          locale={locale}
          labels={{ call: dict.common.groupDesk, reserve: dict.reservation.byForm }}
        />
      </body>
    </html>
  );
}
