'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'motion/react';
import { navigation, site } from '@/content/site';
import { localeLabels, locales, localePath, t, type Locale } from '@/lib/i18n';

const featured: Record<string, string> = {
  '/company': '/images/brand/hero-group.webp',
  '/business': '/images/business/product-02.webp',
  '/hotels': '/images/fuji/fuji-03.webp',
  '/dining': '/images/geisya/geisya-01.webp',
  '/reservation': '/images/toji/toji-01.webp',
  '/contact': '/images/brand/hero-main.webp',
};

const panel = {
  hidden: { y: '-100%' },
  show: { y: '0%', transition: { duration: 0.8, ease: [0.83, 0, 0.17, 1] as const } },
  exit: { y: '-100%', transition: { duration: 0.6, ease: [0.83, 0, 0.17, 1] as const } },
};

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.28 } },
};

const row = {
  hidden: { y: '110%', opacity: 0 },
  show: { y: '0%', opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
};

export function MenuOverlay({ locale, onClose }: { locale: Locale; onClose: () => void }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  // Same path under the other locale, so switching language keeps your place.
  const swapLocale = (next: Locale) => {
    const rest = pathname.replace(/^\/(ja|en)/, '') || '/';
    return localePath(next, rest);
  };

  const activeImage = hovered ? featured[hovered] : null;

  return (
    <motion.div
      className="fixed inset-0 z-[120] overflow-y-auto overscroll-contain bg-page"
      variants={panel}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <div className="grain absolute inset-0" />

      {/* min-h-full rather than h-full so a short viewport scrolls instead of
          clipping the contact row off the bottom. */}
      <div className="shell-wide relative flex min-h-full flex-col pt-24 pb-10">
        <div className="grid flex-1 gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.nav variants={list} initial="hidden" animate="show" className="flex flex-col justify-center">
            {navigation.map((item) => (
              <div key={item.href} className="overflow-hidden">
                <motion.div variants={row}>
                  <Link
                    href={localePath(locale, item.href)}
                    onMouseEnter={() => setHovered(item.href)}
                    onMouseLeave={() => setHovered(null)}
                    className="group flex items-baseline gap-6 border-b border-ink/10 py-4 md:py-5"
                  >
                    <span className="type-display text-[0.6875rem] tracking-[0.24em] text-brass/80">{item.index}</span>
                    <span className="type-display text-[clamp(1.75rem,5.2vw,4rem)] text-ink/85 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3 group-hover:text-ink">
                      {t(item.label, locale)}
                    </span>
                    <span
                      aria-hidden
                      className="ml-auto translate-x-[-0.5rem] text-brass opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100"
                    >
                      →
                    </span>
                  </Link>
                </motion.div>

                {item.children && (
                  <motion.div variants={row} className="flex flex-wrap gap-x-6 gap-y-2 py-3 pl-12">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={localePath(locale, child.href)}
                        className="text-xs tracking-[0.14em] text-ink/50 transition-colors duration-300 hover:text-brass"
                      >
                        {t(child.label, locale)}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </motion.nav>

          <div className="relative hidden lg:block">
            {/* Stops short of the bottom so the tagline and address below sit
                on clean paper rather than on the photograph. */}
            <div className="absolute inset-x-0 top-0 bottom-28 overflow-hidden">
              <AnimatePresence mode="wait">
                {activeImage && (
                  <motion.div
                    key={activeImage}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Image src={activeImage} alt="" fill sizes="40vw" className="object-cover" />
                    <div className="absolute inset-0 bg-linear-to-t from-page/70 to-transparent" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.div
              variants={row}
              initial="hidden"
              animate="show"
              className="absolute right-0 bottom-0 left-0 space-y-3 text-right"
            >
              <p className="type-display text-xs tracking-[0.3em] text-brass">{t(site.tagline, locale)}</p>
              <p className="text-xs leading-relaxed text-ink/50">
                {site.address.postal}
                <br />
                {locale === 'ja' ? site.address.ja : site.address.en}
              </p>
            </motion.div>
          </div>
        </div>

        <motion.div
          variants={row}
          initial="hidden"
          animate="show"
          className="mt-8 flex flex-wrap items-center justify-between gap-5 border-t border-ink/10 pt-6"
        >
          <div className="flex items-center gap-5 text-xs tracking-[0.16em]">
            <a href={`tel:${site.telGroup.replace(/-/g, '')}`} className="text-brass hover:opacity-70">
              {site.telGroup}
            </a>
            <a href={`mailto:${site.email}`} className="text-ink/60 hover:text-ink">
              {site.email}
            </a>
          </div>

          <div className="flex items-center gap-1 text-xs tracking-[0.18em]">
            {locales.map((code, i) => (
              <span key={code} className="flex items-center gap-1">
                {i > 0 && <span className="text-ink/25">/</span>}
                <Link
                  href={swapLocale(code)}
                  className={code === locale ? 'text-brass' : 'text-ink/50 hover:text-ink'}
                >
                  {localeLabels[code]}
                </Link>
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
