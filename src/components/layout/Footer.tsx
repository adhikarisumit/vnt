import Link from 'next/link';
import type { ReactNode } from 'react';
import { footerNav, site, type FooterLink } from '@/content/site';
import { getDictionary } from '@/content/dictionary';
import { localePath, t, type Locale } from '@/lib/i18n';
import { Reveal } from '@/components/motion/Reveal';

/**
 * Mirrors the live site's footer item for item: VNT GROUP, PREMIUM HOTEL with
 * FOOD & SHOP beneath it, then the corporate links over the address block, and
 * the copyright centred at the foot.
 */
export function Footer({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <footer className="relative overflow-hidden border-t border-ink/10 bg-page">
      <div className="grain absolute inset-0" />

      {/* Extra bottom padding on mobile clears the fixed action bar. */}
      <div className="shell relative pt-20 pb-28 md:pt-24 md:pb-12">
        <div className="grid gap-14 md:grid-cols-3 md:gap-10">
          {/* VNT GROUP ------------------------------------------------------ */}
          <Reveal>
            <Heading>{footerNav.group.title}</Heading>
            <LinkList links={footerNav.group.links} locale={locale} />
          </Reveal>

          {/* PREMIUM HOTEL + FOOD & SHOP ------------------------------------- */}
          <Reveal delay={0.06}>
            <Heading>{footerNav.hotels.title}</Heading>
            <LinkList links={footerNav.hotels.links} locale={locale} />

            <div className="mt-8">
              <Heading>{footerNav.food.title}</Heading>
              <LinkList links={footerNav.food.links} locale={locale} />
            </div>
          </Reveal>

          {/* Corporate + contact -------------------------------------------- */}
          <Reveal delay={0.12}>
            <ul className="space-y-3.5">
              {footerNav.corporate.map((link) => (
                <li key={link.href}>
                  <FooterAnchor href={localePath(locale, link.href)}>{t(link.label, locale)}</FooterAnchor>
                </li>
              ))}
            </ul>

            <span aria-hidden className="mt-5 block h-px w-full max-w-[15rem] bg-brass/50" />

            <address className="mt-6 text-[0.875rem] leading-[1.75] text-ink/75 not-italic">
              <p>{site.address.postal}</p>
              {locale === 'ja' ? (
                <>
                  <p>神奈川県横浜市中区弥生町2-15-1</p>
                  <p>ストークタワー大通り公園III</p>
                </>
              ) : (
                <p>{site.address.en}</p>
              )}
            </address>

            <dl className="mt-5 space-y-2.5 text-[0.875rem]">
              <ContactRow label={dict.footer.tel}>
                <a href={`tel:${site.tel.replace(/-/g, '')}`} className="hover:text-brass">
                  {site.tel}
                </a>
              </ContactRow>
              <ContactRow label={dict.footer.fax}>{site.fax}</ContactRow>
              <ContactRow label={dict.footer.email}>
                <a href={`mailto:${site.email}`} className="hover:text-brass">
                  {site.email}
                </a>
              </ContactRow>
            </dl>
          </Reveal>
        </div>

        <p className="mt-16 border-t border-ink/10 pt-7 text-center text-[0.75rem] tracking-[0.14em] text-stone">
          {dict.footer.rights}
        </p>
      </div>
    </footer>
  );
}

/** Column heading with the short underline the original uses. */
function Heading({ children }: { children: ReactNode }) {
  return (
    <h3 className="type-display inline-block border-b border-brass/60 pb-2 text-[0.8125rem] tracking-[0.16em] text-ink uppercase">
      {children}
    </h3>
  );
}

function LinkList({ links, locale }: { links: FooterLink[]; locale: Locale }) {
  return (
    <ul className="mt-5 space-y-3.5">
      {links.map((link) => (
        <li key={link.href + link.label.ja}>
          <FooterAnchor href={localePath(locale, link.href)}>{t(link.label, locale)}</FooterAnchor>
        </li>
      ))}
    </ul>
  );
}

function FooterAnchor({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="text-[0.875rem] text-ink/75 transition-colors duration-300 hover:text-brass">
      {children}
    </Link>
  );
}

function ContactRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex gap-4 text-ink/75">
      <dt className="shrink-0">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}
