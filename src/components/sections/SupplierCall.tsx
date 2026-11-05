import Image from 'next/image';
import Link from 'next/link';

import { Reveal } from '@/components/motion/Reveal';
import { supplierCall } from '@/content/business';
import { localePath, t, type Locale } from '@/lib/i18n';

/**
 * 新規の仕入先を探しています — the live site's supplier panel (home and
 * Ikegami Store): the head-office tower at dusk, inset from the page edges,
 * bold white copy on the left and a black CONTACT button.
 */
export function SupplierCall({ locale }: { locale: Locale }) {
  return (
    <section className="px-0 py-14 md:px-[1.875rem] md:py-20">
      <div className="relative isolate overflow-hidden">
        <Image src="/images/business/supplier.webp" alt="" fill sizes="100vw" className="-z-10 object-cover object-[72%_center]" />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-[#1b2c55]/55 via-[#1b2c55]/15 to-transparent max-md:bg-[#1b2c55]/55" />

        <div className="flex min-h-[26rem] items-center px-6 py-14 md:min-h-[27rem] md:px-10">
          <Reveal className="max-w-[37.5rem]">
            <h2 className="text-[clamp(1.4rem,2vw,1.75rem)] font-bold text-white">{t(supplierCall.title, locale)}</h2>
            <p className="mt-5 text-[0.9375rem] leading-[1.75] whitespace-pre-line text-white md:text-base">
              {t(supplierCall.body, locale)}
            </p>
            <Link
              href={localePath(locale, '/contact')}
              className="mt-8 inline-flex rounded-md bg-black px-5 py-2.5 text-[0.8125rem] font-bold text-white transition-opacity hover:opacity-80"
            >
              CONTACT
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
