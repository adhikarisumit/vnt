'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { navigation, site } from '@/content/site';
import { localePath, t, type Locale } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { MenuOverlay } from './MenuOverlay';
import { Wordmark } from '@/components/brand/Wordmark';

/** Resting lengths of the three menu rules, longest at the top. */
const barRest = ['100%', '62%', '82%'];

/** Where each rule lands once the menu is open: an even cross. */
const barOpen = [
  { top: '50%', width: '100%', rotate: 45, opacity: 1 },
  { top: '50%', width: '100%', rotate: 0, opacity: 0 },
  { top: '50%', width: '100%', rotate: -45, opacity: 1 },
];

export function Header({ locale, labels }: { locale: Locale; labels: { menu: string; close: string; reserve: string } }) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  useMotionValueEvent(scrollY, 'change', (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > 320 && y > previous && !open);
  });

  useEffect(() => setOpen(false), [pathname]);

  /* At the top the header sits on the hero photograph and has to read light;
     once it lifts onto the paper background it flips to ink. */
  const onMedia = !scrolled && !open;

  return (
    <>
      {/* The header sits above the menu overlay: `position: fixed` plus the
          slide transform makes it its own stacking context, so a z-index on
          the close button alone would still be trapped underneath. */}
      <motion.header
        className={cn(
          'fixed inset-x-0 top-0 z-[130] transition-colors duration-500',
          onMedia || open ? 'bg-transparent' : 'bg-page/85 backdrop-blur-xl',
        )}
        animate={{ y: hidden ? '-100%' : '0%' }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="shell-wide flex h-20 items-center justify-between gap-6">
          <Link
            href={localePath(locale)}
            aria-label="VNT GROUP"
            className="text-brand transition-opacity duration-400 hover:opacity-75"
          >
            {/* The brand red has too little contrast against the dark hero
                scrim, so over photography the mark carries a soft paper-light
                halo that traces the letterforms; on paper it drops away. */}
            <span
              className={cn(
                'block transition-[filter] duration-500',
                onMedia
                  ? '[filter:drop-shadow(0_0_3px_rgba(250,248,244,0.95))_drop-shadow(0_0_10px_rgba(250,248,244,0.55))]'
                  : '[filter:drop-shadow(0_0_0_rgba(250,248,244,0))_drop-shadow(0_0_0_rgba(250,248,244,0))]',
              )}
            >
              <Wordmark className="h-5 w-auto md:h-6" />
            </span>
          </Link>

          <nav className="hidden items-center gap-9 lg:flex">
            {navigation.slice(0, 4).map((item) => (
              <Link
                key={item.href}
                href={localePath(locale, item.href)}
                className={cn(
                  'group relative text-[0.75rem] tracking-[0.2em] uppercase transition-colors duration-400',
                  onMedia ? 'text-washi/80 hover:text-washi' : 'text-ink/70 hover:text-ink',
                )}
              >
                {t(item.label, locale)}
                <span
                  className={cn(
                    'absolute -bottom-1.5 left-0 h-px w-full origin-right scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.83,0,0.17,1)] group-hover:origin-left group-hover:scale-x-100',
                    onMedia ? 'bg-brass-lit' : 'bg-brass',
                  )}
                />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href={`tel:${site.telGroup.replace(/-/g, '')}`}
              className={cn(
                'hidden text-[0.75rem] tracking-[0.18em] transition-opacity hover:opacity-75 xl:block',
                onMedia ? 'text-brass-lit' : 'text-brass',
              )}
            >
              {site.telGroup}
            </a>

            <Link
              href={localePath(locale, '/reservation')}
              className={cn(
                'hidden px-6 py-2.5 text-[0.6875rem] tracking-[0.2em] uppercase transition-colors duration-400 md:inline-block',
                onMedia
                  ? 'border border-brass-lit/70 text-brass-lit hover:bg-brass-lit hover:text-ink'
                  : 'border border-brass/60 text-brass hover:bg-brass hover:text-page',
              )}
            >
              {labels.reserve}
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              onPointerEnter={() => setHovered(true)}
              onPointerLeave={() => setHovered(false)}
              aria-expanded={open}
              aria-label={open ? labels.close : labels.menu}
              className="relative z-[130] flex h-11 w-11 items-center justify-center"
            >
              {/* Three rules of staggered length that square up on hover and
                  fold into a cross once the menu is open. */}
              <span className="relative block h-4 w-7">
                {barRest.map((rest, i) => (
                  <motion.span
                    key={i}
                    className={cn(
                      'absolute left-0 block h-px origin-center',
                      onMedia ? 'bg-washi' : 'bg-ink',
                    )}
                    animate={
                      open
                        ? barOpen[i]
                        : { top: `${i * 50}%`, width: hovered ? '100%' : rest, rotate: 0, opacity: 1 }
                    }
                    transition={{ duration: 0.45, ease: [0.83, 0, 0.17, 1] }}
                  />
                ))}
              </span>
            </button>
          </div>
        </div>

        <motion.div
          className="h-px origin-left bg-linear-to-r from-transparent via-brass/35 to-transparent"
          animate={{ scaleX: scrolled && !open ? 1 : 0 }}
          transition={{ duration: 0.6, ease: [0.83, 0, 0.17, 1] }}
        />
      </motion.header>

      <AnimatePresence>{open && <MenuOverlay locale={locale} onClose={() => setOpen(false)} />}</AnimatePresence>
    </>
  );
}
