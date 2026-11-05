import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { HomeHero } from '@/components/home/HomeHero';
import { BusinessCards } from '@/components/home/BusinessCards';
import { SupplierCall } from '@/components/sections/SupplierCall';
import { Reveal } from '@/components/motion/Reveal';

import { getDictionary } from '@/content/dictionary';
import { isLocale, localePath, type Locale } from '@/lib/i18n';
import { cn } from '@/lib/utils';

type Strip = { href: string; image: string; name: string; mincho?: boolean };

/**
 * The live home page, section for section: hero, BUSINESS, HOTEL, FOOD &
 * SHOP, then the supplier panel. Fixes over the live build: no "Type
 * Something" placeholder, a photo in the empty 商品企画 slot, and a real
 * photograph on the FUJI PREMIUM HOTEL tile (live shows a cropped logo).
 */
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  const hotelStrip: Strip[] = [
    { href: '/hotels/fuji', image: '/images/live/fuji/u6.jpg', name: 'FUJI PREMIUM HOTEL' },
    { href: '/hotels/nagoya', image: '/images/nagoya/castle-01.webp', name: 'NAGOYA PREMIUM HOTEL' },
    { href: '/hotels/toji', image: '/images/toji/toji-01.webp', name: 'PREMIUM TOJI' },
  ];

  const foodStrip: Strip[] = [
    { href: '/dining/geisyatei', image: '/images/geisya/geisya-01.webp', name: locale === 'ja' ? '芸者亭' : 'Geisha-tei', mincho: true },
    { href: '/dining', image: '/images/warakutei/yakiniku-01.webp', name: locale === 'ja' ? '和楽亭' : 'Warakutei', mincho: true },
    { href: '/retail', image: '/images/ikegami/store-01.webp', name: locale === 'ja' ? 'イケガミストア' : 'Ikegami Store', mincho: true },
  ];

  return (
    <>
      <HomeHero
        line1={dict.home.heroLine1}
        line2={dict.home.heroLine2}
        intro={dict.home.intro}
        cta={dict.home.heroCta}
        ctaHref={localePath(locale, '/contact')}
      />

      <section id="business" className="px-5 pt-20 pb-24 md:pt-24 md:pb-36">
        <SectionTitle>BUSINESS</SectionTitle>
        <div className="mt-12 md:mt-14">
          <BusinessCards locale={locale} viewMore={dict.common.viewMore} />
        </div>
      </section>

      <section id="hotel" className="pb-20 md:pb-28">
        <SectionTitle>HOTEL</SectionTitle>
        <PhotoStrip items={hotelStrip} locale={locale} />
        <GroupNote
          body={dict.home.groupHotel}
          more={{ href: localePath(locale, '/hotels'), label: dict.common.viewMore }}
          contact={{ href: localePath(locale, '/reservation'), label: dict.contact.title }}
        />
      </section>

      <section id="foodshop" className="pb-8 md:pb-12">
        <SectionTitle>FOOD &amp; SHOP</SectionTitle>
        <PhotoStrip items={foodStrip} locale={locale} />
        <GroupNote
          body={dict.home.groupDining}
          more={{ href: localePath(locale, '/dining/geisyatei'), label: dict.common.viewMore }}
          contact={{ href: localePath(locale, '/contact'), label: dict.contact.title }}
        />
      </section>

      <SupplierCall locale={locale} />
    </>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <Reveal>
      <h2 className="type-section text-center text-[clamp(1.9rem,2.3vw,2.25rem)] text-ink-mute">{children}</h2>
    </Reveal>
  );
}

/** Full-bleed row of photos with the name set in the middle, lifted on a soft shadow. */
function PhotoStrip({ items, locale }: { items: Strip[]; locale: Locale }) {
  return (
    <div className="mt-12 grid shadow-[0_24px_40px_-12px_rgba(0,0,0,0.25)] md:mt-14 md:grid-cols-3">
      {items.map((item) => (
        <Link
          key={item.href}
          href={localePath(locale, item.href)}
          className="group relative block h-[15rem] overflow-hidden border-white md:h-[min(25vw,22.5rem)] md:border-l first:md:border-l-0"
        >
          <Image src={item.image} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
          <span className="absolute inset-0 bg-black/25 transition-colors duration-500 group-hover:bg-black/40" />
          <span
            className={cn(
              'absolute inset-0 flex items-center justify-center px-4 text-center text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.4)]',
              item.mincho
                ? 'type-mincho text-[clamp(1.4rem,1.7vw,1.6rem)]'
                : 'font-[family-name:var(--font-tenor)] text-[clamp(1rem,1.25vw,1.2rem)] tracking-[0.12em]',
            )}
          >
            {item.name}
          </span>
        </Link>
      ))}
    </div>
  );
}

function GroupNote({
  body,
  more,
  contact,
}: {
  body: string;
  more: { href: string; label: string };
  contact: { href: string; label: string };
}) {
  return (
    <Reveal className="mx-auto mt-10 max-w-[76.25rem] px-5 md:mt-12">
      <p className="text-[0.875rem] leading-[1.75] whitespace-pre-line text-ink-mute">{body}</p>
      <div className="mt-6 flex justify-end gap-5">
        <Link href={more.href} className="btn-pill">
          {more.label}
        </Link>
        <Link href={contact.href} className="btn-pill">
          {contact.label}
        </Link>
      </div>
    </Reveal>
  );
}
