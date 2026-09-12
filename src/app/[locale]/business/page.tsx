import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { PageHero } from '@/components/sections/PageHero';
import { Reveal, RevealImage } from '@/components/motion/Reveal';
import { SplitText } from '@/components/motion/SplitText';
import { Parallax } from '@/components/motion/Parallax';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ArrowLink, ButtonLink } from '@/components/ui/ArrowLink';

import { businessAreas, hisano, supplierCall } from '@/content/business';
import { getDictionary } from '@/content/dictionary';
import { isLocale, localePath, t, type Locale } from '@/lib/i18n';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const ja = locale === 'ja';
  return {
    title: ja ? '事業内容' : 'Business',
    description: ja
      ? '商品企画・製造販売、ホテル、飲食、輸入出、海外進出支援、観光支援。VNTグループの六つの事業領域。'
      : 'Product planning, hotels, dining, trade, overseas expansion and tourism — the six fields the VNT Group works in.',
  };
}

export default async function BusinessPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const active = locale as Locale;
  const dict = getDictionary(active);

  return (
    <>
      <PageHero
        eyebrow="Business"
        title={active === 'ja' ? '事業内容' : 'Business'}
        image="/images/business/product-02.webp"
      />

      {/* Six areas -------------------------------------------------------- */}
      <section className="relative py-24 md:py-32">
        <div className="shell-wide space-y-24 md:space-y-36">
          {businessAreas.map((area, i) => (
            <div
              key={area.id}
              id={area.id}
              className={`grid scroll-mt-28 items-center gap-10 lg:gap-20 ${
                area.image ? 'lg:grid-cols-2' : ''
              } ${area.image && i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}
            >
              {/* One area has no photograph on the live site — that row runs
                  as a full-width statement instead of an empty frame. */}
              {area.image && (
                <Parallax strength={9} className="aspect-4/3 w-full">
                  <Image
                    src={area.image}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </Parallax>
              )}

              <div>
                <Reveal>
                  <p className="type-eyebrow">{`${area.no} — ${active === 'ja' ? '事業' : 'Field'}`}</p>
                </Reveal>
                <SplitText
                  as="h2"
                  text={t(area.title, active)}
                  delay={0.06}
                  className="type-display mt-5 text-[clamp(1.4rem,3.2vw,2.5rem)] text-ink"
                />
                <Reveal delay={0.18}>
                  <p className="type-body mt-7 max-w-xl">{t(area.summary, active)}</p>
                </Reveal>
                {area.href && area.href !== '/business' && (
                  <Reveal delay={0.26} className="mt-10">
                    <ArrowLink href={localePath(active, area.href)}>{dict.common.viewMore}</ArrowLink>
                  </Reveal>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HISANO ----------------------------------------------------------- */}
      <section className="relative border-t border-ink/10 bg-page-2 py-24 md:py-32">
        <div className="shell-wide">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div>
              <Reveal>
                <p className="type-eyebrow">Brand</p>
              </Reveal>
              <SplitText
                as="h2"
                text={hisano.brand}
                delay={0.06}
                className="type-display mt-5 text-[clamp(2rem,5vw,3.5rem)] tracking-[0.14em] text-ink"
              />
              <Reveal delay={0.16}>
                <p className="type-mincho mt-4 text-sm text-brass">{t(hisano.title, active)}</p>
              </Reveal>
              <Reveal delay={0.26} className="mt-10">
                <ButtonLink href={hisano.href} external variant="outline">
                  {active === 'ja' ? '公式サイトを見る' : 'Visit the brand site'}
                </ButtonLink>
              </Reveal>
            </div>

            <Reveal delay={0.12}>
              <p className="type-body whitespace-pre-line">{t(hisano.body, active)}</p>
            </Reveal>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-5 md:gap-6">
            {hisano.images.map((src, i) => (
              <RevealImage key={src} delay={i * 0.07}>
                <div className="relative aspect-3/4 w-full">
                  <Image src={src} alt="" fill sizes="(max-width: 768px) 50vw, 20vw" className="object-cover" />
                </div>
              </RevealImage>
            ))}
          </div>
        </div>
      </section>

      {/* Suppliers -------------------------------------------------------- */}
      <section className="relative border-t border-ink/10 py-24 md:py-32">
        <div className="shell">
          <SectionHeading eyebrow="Suppliers" title={t(supplierCall.title, active)} />
          <Reveal delay={0.16}>
            <p className="type-body mx-auto mt-8 max-w-3xl text-center whitespace-pre-line">{t(supplierCall.body, active)}</p>
          </Reveal>
          <Reveal delay={0.24} className="mt-10 text-center">
            <ButtonLink href={localePath(active, '/contact')} variant="brass">
              {dict.contact.title}
            </ButtonLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
