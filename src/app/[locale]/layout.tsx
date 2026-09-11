import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { Noto_Sans_JP, Shippori_Mincho, Tenor_Sans } from 'next/font/google';
import '../globals.css';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileActionBar } from '@/components/layout/MobileActionBar';
import Cursor from '@/components/motion/Cursor';
import PageTransition from '@/components/motion/PageTransition';
import Preloader from '@/components/motion/Preloader';
import SmoothScroll from '@/components/motion/SmoothScroll';
import { getDictionary } from '@/content/dictionary';
import { site } from '@/content/site';
import { isLocale, locales, t, type Locale } from '@/lib/i18n';

const tenor = Tenor_Sans({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-tenor',
});

const mincho = Shippori_Mincho({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-shippori',
});

const notoSans = Noto_Sans_JP({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-sans',
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: '#faf8f4',
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
      languages: { ja: '/ja', en: '/en' },
    },
    openGraph: {
      type: 'website',
      siteName: 'VNT GROUP',
      locale: active === 'ja' ? 'ja_JP' : 'en_US',
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
    <html lang={locale} className={`${tenor.variable} ${mincho.variable} ${notoSans.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisation) }}
        />

        <Preloader tagline={t(site.tagline, locale)} />
        <SmoothScroll />
        <Cursor />

        <Header
          locale={locale}
          labels={{ menu: dict.common.menu, close: dict.common.close, reserve: dict.common.reserve }}
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
