import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { PageHero } from '@/components/sections/PageHero';
import { Reveal } from '@/components/motion/Reveal';
import { SplitText } from '@/components/motion/SplitText';
import { Parallax } from '@/components/motion/Parallax';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ButtonLink } from '@/components/ui/ArrowLink';

import { ikegami, supplierCall } from '@/content/business';
import { getDictionary } from '@/content/dictionary';
import { isLocale, localePath, t, type Locale } from '@/lib/i18n';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const active: Locale = isLocale(locale) ? locale : 'ja';
  return { title: t(ikegami.name, active), description: t(ikegami.lede, active) };
}

export default async function RetailPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const active = locale as Locale;
  const dict = getDictionary(active);

  return (
    <>
      <PageHero
        eyebrow={active === 'ja' ? '東京・浅草 / 山梨・富士吉田' : 'Asakusa, Tokyo / Fujiyoshida, Yamanashi'}
        title={t(ikegami.name, active)}
        lead={active === 'ja' ? 'Tax free 対応のドラッグストア。' : 'A tax-free drugstore for visitors and locals alike.'}
        image={ikegami.image}
      />

      <section className="relative py-24 md:py-32">
        <div className="shell">
          <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            <Reveal>
              <p className="type-mincho text-[clamp(1rem,2vw,1.35rem)] leading-[2.1] text-ink/90">
                {t(ikegami.lede, active)}
              </p>
            </Reveal>

            <Parallax strength={8} className="aspect-4/3 w-full">
              <Image src={ikegami.image} alt="" fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" />
            </Parallax>
          </div>
        </div>
      </section>

      {/* Branches --------------------------------------------------------- */}
      <section className="relative border-t border-ink/10 py-20 md:py-28">
        <div className="shell">
          <SectionHeading eyebrow="Stores" title={dict.common.storeInformation} />

          <div className="mt-14 grid gap-10 md:grid-cols-2">
            {ikegami.branches.map((branch, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="h-full border border-ink/12 p-8 md:p-10">
                  <h3 className="type-display text-[1.125rem] text-ink">{t(branch.name, active)}</h3>
                  <dl className="mt-7 space-y-4 text-sm">
                    <div>
                      <dt className="text-[0.625rem] tracking-[0.24em] text-stone uppercase">{dict.common.address}</dt>
                      <dd className="mt-1.5 leading-relaxed text-ink/75">{t(branch.address, active)}</dd>
                    </div>
                    {'tel' in branch && branch.tel && (
                      <div>
                        <dt className="text-[0.625rem] tracking-[0.24em] text-stone uppercase">{dict.common.tel}</dt>
                        <dd className="mt-1.5">
                          <a href={`tel:${branch.tel.replace(/-/g, '')}`} className="text-ink/75 hover:text-brass">
                            {branch.tel}
                          </a>
                        </dd>
                      </div>
                    )}
                    {branch.hours && (
                      <div>
                        <dt className="text-[0.625rem] tracking-[0.24em] text-stone uppercase">{dict.common.hours}</dt>
                        <dd className="mt-1.5 text-ink/75">{t(branch.hours, active)}</dd>
                      </div>
                    )}
                  </dl>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Supplier call ---------------------------------------------------- */}
      <section className="relative border-t border-ink/10 bg-page-2 py-24 md:py-32">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <SplitText
              as="h2"
              text={t(supplierCall.title, active)}
              className="type-display text-[clamp(1.5rem,3.2vw,2.5rem)] text-ink"
            />
            <div>
              <Reveal delay={0.12}>
                <p className="type-body whitespace-pre-line">{t(supplierCall.body, active)}</p>
              </Reveal>
              <Reveal delay={0.22} className="mt-10">
                <ButtonLink href={localePath(active, '/contact')} variant="brass">
                  {dict.contact.title}
                </ButtonLink>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
