import { notFound } from 'next/navigation';

import { HomeHero } from '@/components/home/HomeHero';
import { BusinessCards } from '@/components/home/BusinessCards';
import { SupplierCall } from '@/components/sections/SupplierCall';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PropertyCard } from '@/components/ui/PropertyCard';
import { ArrowLink, ButtonLink } from '@/components/ui/ArrowLink';

import { getDictionary } from '@/content/dictionary';
import { hotels } from '@/content/hotels';
import { isLocale, localePath, t } from '@/lib/i18n';

/**
 * Sections follow the live home page: hero, BUSINESS, HOTEL, FOOD & SHOP,
 * then the supplier call. Group-booking copy is the live site's own.
 */
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  // FOOD & SHOP cards as on the live site: 芸者亭, 和楽亭, イケガミストア.
  const foodCards = [
    { href: '/dining/geisyatei', image: '/images/geisya/geisya-01.webp', name: { ja: '芸者亭', en: 'Geisha-tei' } },
    { href: '/dining', image: '/images/warakutei/yakiniku-01.webp', name: { ja: '和楽亭', en: 'Warakutei' } },
    { href: '/retail', image: '/images/ikegami/store-01.webp', name: { ja: 'イケガミストア', en: 'Ikegami Store' } },
  ];

  return (
    <>
      <HomeHero
        line1={dict.home.heroLine1}
        line2={dict.home.heroLine2}
        intro={dict.home.intro}
        cta={dict.home.heroCta}
        ctaHref={localePath(locale, '/contact')}
        scrollLabel={dict.common.scroll}
      />

      {/* BUSINESS -------------------------------------------------------- */}
      <section id="business" className="relative py-24 md:py-32">
        <div className="shell">
          {/* Same 1220px block as the cards, so the centred heading sits over their middle. */}
          <div className="mx-auto max-w-[76.25rem]">
            <SectionHeading eyebrow="01 — Business" title={dict.home.businessTitle} />
            <div className="mt-16">
              <BusinessCards locale={locale} viewMore={dict.common.viewMore} />
            </div>
          </div>
        </div>
      </section>

      {/* HOTEL ----------------------------------------------------------- */}
      <section id="hotel" className="relative overflow-hidden border-t border-ink/10 py-24 md:py-32">
        <div className="shell-wide">
          <SectionHeading eyebrow="02 — Hotel" title={dict.home.hotelTitle} />

          <div className="mt-16 grid gap-5 md:grid-cols-3 md:gap-7">
            {hotels.map((hotel, i) => (
              <PropertyCard
                key={hotel.slug}
                index={i}
                href={localePath(locale, `/hotels/${hotel.slug}`)}
                image={hotel.cardImage}
                name={hotel.name}
                sub={t(hotel.tagline, locale)}
                meta={t(hotel.location, locale)}
                stars={hotel.stars}
              />
            ))}
          </div>

          <Reveal delay={0.15} className="mt-16">
            <div className="grid gap-8 border border-ink/12 p-8 md:grid-cols-[1.4fr_1fr] md:p-12">
              <p className="type-body whitespace-pre-line">{dict.home.groupHotel}</p>
              <div className="flex flex-wrap items-end justify-start gap-4 md:justify-end">
                <ArrowLink href={localePath(locale, '/hotels')}>{dict.common.viewMore}</ArrowLink>
                <ButtonLink href={localePath(locale, '/reservation')} variant="outline">
                  {dict.contact.title}
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOD & SHOP ----------------------------------------------------- */}
      <section id="foodshop" className="relative overflow-hidden border-t border-ink/10 py-24 md:py-32">
        <div className="shell-wide">
          <SectionHeading eyebrow="03 — Food & Shop" title={dict.home.diningTitle} />

          <div className="mt-16 grid gap-5 md:grid-cols-3 md:gap-7">
            {foodCards.map((card, i) => (
              <PropertyCard
                key={card.href}
                index={i}
                href={localePath(locale, card.href)}
                image={card.image}
                name={t(card.name, locale)}
              />
            ))}
          </div>

          <Reveal delay={0.15} className="mt-16">
            <div className="grid gap-8 border border-ink/12 p-8 md:grid-cols-[1.4fr_1fr] md:p-12">
              <p className="type-body whitespace-pre-line">{dict.home.groupDining}</p>
              <div className="flex flex-wrap items-end justify-start gap-4 md:justify-end">
                <ArrowLink href={localePath(locale, '/dining/geisyatei')}>{dict.common.viewMore}</ArrowLink>
                <ButtonLink href={localePath(locale, '/contact')} variant="outline">
                  {dict.contact.title}
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <SupplierCall locale={locale} />
    </>
  );
}
