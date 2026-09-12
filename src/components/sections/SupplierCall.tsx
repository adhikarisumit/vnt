import Image from 'next/image';

import { Reveal } from '@/components/motion/Reveal';
import { SplitText } from '@/components/motion/SplitText';
import { ButtonLink } from '@/components/ui/ArrowLink';
import { supplierCall } from '@/content/business';
import { localePath, t, type Locale } from '@/lib/i18n';

/**
 * 新規の仕入先を探しています — the live site's shared supplier section (home and
 * Ikegami Store): the head-office photograph full-bleed, copy set over the
 * open evening sky on the left.
 */
export function SupplierCall({ locale }: { locale: Locale }) {
  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src="/images/business/supplier.webp"
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover object-[72%_center]"
      />
      {/* Deepens the sky under the copy on narrow screens, where the tower moves behind the text. */}
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-ink/45 via-ink/20 to-transparent max-md:bg-ink/45" />

      <div className="shell flex min-h-[34rem] items-center py-24 md:min-h-[42rem] md:py-32">
        <div className="max-w-xl">
          <Reveal>
            <p className="type-eyebrow text-brass-lit">Suppliers</p>
          </Reveal>
          <SplitText
            as="h2"
            text={t(supplierCall.title, locale)}
            delay={0.06}
            className="type-display mt-5 text-[clamp(1.5rem,3.2vw,2.5rem)] text-washi"
          />
          <Reveal delay={0.18}>
            <p className="mt-7 text-[0.9375rem] leading-[2.1] whitespace-pre-line text-washi/85">
              {t(supplierCall.body, locale)}
            </p>
          </Reveal>
          <Reveal delay={0.26} className="mt-10">
            <ButtonLink href={localePath(locale, '/contact')} variant="brass">
              CONTACT
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
