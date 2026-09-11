import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { PageHero } from '@/components/sections/PageHero';
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { SplitText } from '@/components/motion/SplitText';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { MapEmbed } from '@/components/ui/MapEmbed';
import { RevenueChart } from '@/components/company/RevenueChart';

import { businessScope, companyFacts, greeting, licenses, revenue } from '@/content/company';
import { getDictionary } from '@/content/dictionary';
import { site } from '@/content/site';
import { isLocale, t, type Locale } from '@/lib/i18n';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const ja = locale === 'ja';
  return {
    title: ja ? '会社概要' : 'Company',
    description: ja
      ? 'VNT株式会社の会社概要、代表挨拶、事業内容および許認可について。'
      : 'Company profile, message from the president, scope of business and licences held by VNT Co., Ltd.',
  };
}

export default async function CompanyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const active = locale as Locale;
  const dict = getDictionary(active);

  return (
    <>
      <PageHero
        eyebrow="Company"
        title={active === 'ja' ? '会社概要' : 'Company'}
        lead={t(site.tagline, active)}
        image="/images/brand/hero-main.webp"
      />

      {/* Greeting --------------------------------------------------------- */}
      <section className="relative py-24 md:py-32">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
            <div>
              <Reveal>
                <p className="type-eyebrow">Message</p>
              </Reveal>
              <SplitText
                as="h2"
                text={t(greeting.title, active)}
                delay={0.06}
                className="type-display mt-5 text-[clamp(1.4rem,3vw,2.25rem)] text-ink"
              />
            </div>

            <div>
              <Reveal delay={0.12}>
                <p className="type-mincho text-[0.95rem] leading-[2.2] whitespace-pre-line text-ink/80">
                  {t(greeting.body, active)}
                </p>
              </Reveal>
              <Reveal delay={0.24}>
                <p className="type-display mt-10 text-sm tracking-[0.18em] text-brass">
                  {t(greeting.signature, active)}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Facts ------------------------------------------------------------ */}
      <section className="relative border-t border-ink/10 py-24 md:py-32">
        <div className="shell">
          <SectionHeading eyebrow="Profile" title={active === 'ja' ? '会社概要' : 'Corporate profile'} />

          <RevealGroup as="ul" className="mt-14 divide-y divide-ink/10 border-y border-ink/10" stagger={0.05}>
            {companyFacts.map((fact, i) => (
              <RevealItem key={i} as="li" className="grid gap-2 py-5 md:grid-cols-[14rem_1fr] md:gap-6">
                <span className="text-[0.6875rem] tracking-[0.22em] text-stone uppercase">
                  {t(fact.label, active)}
                </span>
                <span className="text-sm leading-relaxed text-ink/85">{t(fact.value, active)}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Revenue ---------------------------------------------------------- */}
      <section className="relative border-t border-ink/10 py-24 md:py-32">
        <div className="shell">
          <SectionHeading
            eyebrow="Performance"
            title={active === 'ja' ? '売上実績' : 'Revenue'}
            lead={active === 'ja' ? '12月期決算・単位：百万円' : 'Fiscal year ending December, in millions of yen.'}
          />
          <div className="mt-14">
            <RevenueChart data={revenue.map((r) => ({ label: t(r.year, active), value: r.value }))} />
          </div>
        </div>
      </section>

      {/* Scope + licences ------------------------------------------------- */}
      <section className="relative border-t border-ink/10 py-24 md:py-32">
        <div className="shell grid gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading align="left" eyebrow="Scope" title={active === 'ja' ? '事業内容' : 'Scope of business'} />
            <RevealGroup as="ul" className="mt-10 space-y-4" stagger={0.04}>
              {businessScope.map((item, i) => (
                <RevealItem key={i} as="li" className="flex gap-4">
                  <span className="type-display shrink-0 text-[0.6875rem] tracking-[0.16em] text-brass/70">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[0.8125rem] leading-relaxed text-ink/70">{t(item, active)}</span>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          <div>
            <SectionHeading align="left" eyebrow="Licences" title={active === 'ja' ? '許認可等' : 'Licences & registrations'} />
            <RevealGroup as="ul" className="mt-10 space-y-5" stagger={0.06}>
              {licenses.map((item, i) => (
                <RevealItem key={i} as="li" className="border-l border-brass/40 pl-5">
                  <span className="text-[0.8125rem] leading-relaxed text-ink/70">{t(item, active)}</span>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* Access ----------------------------------------------------------- */}
      <section className="relative border-t border-ink/10">
        <div className="grid lg:grid-cols-2">
          <div className="flex items-center px-(--spacing-gutter) py-20 md:py-28">
            <div>
              <Reveal>
                <p className="type-eyebrow">Access</p>
              </Reveal>
              <SplitText
                as="h2"
                text={dict.common.access}
                delay={0.06}
                className="type-display mt-5 text-[clamp(1.4rem,3vw,2.25rem)] text-ink"
              />
              <Reveal delay={0.16}>
                <address className="mt-8 space-y-1 text-sm leading-relaxed text-ink/75 not-italic">
                  <p>{site.address.postal}</p>
                  <p>{active === 'ja' ? site.address.ja : site.address.en}</p>
                </address>
              </Reveal>
            </div>
          </div>

          <MapEmbed
            src={site.mapEmbed}
            title="VNT Co., Ltd."
            address={active === 'ja' ? site.address.ja : site.address.en}
            cta={dict.common.openInMaps}
            height="h-[24rem] lg:h-full lg:min-h-[30rem]"
          />
        </div>
      </section>
    </>
  );
}
