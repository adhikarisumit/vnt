'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { headerNav } from '@/content/site';
import { localePath, t, type Locale } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { MenuOverlay } from './MenuOverlay';
import { Wordmark } from '@/components/brand/Wordmark';

/** Each hotel page carries its own header, as on the live site. */
const OWN_HEADER = /^\/(ja|en)\/hotels\/[^/]+\/?$/;

/**
 * The live site's header: white bar, red VNT mark on the left, the five
 * Japanese links in bold, then 施設予約 (red outline) and お問い合わせ
 * (red fill). Sticky, so it stays reachable on long pages; the live one
 * scrolls away.
 */
export function Header({ locale, labels }: { locale: Locale; labels: { menu: string; close: string; reserve: string; contact: string } }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (OWN_HEADER.test(pathname)) return null;

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-[130] bg-white transition-shadow duration-300',
          scrolled && !open && 'shadow-[0_2px_12px_rgba(0,0,0,0.08)]',
        )}
      >
        <div className="flex h-(--header-h) items-center justify-between gap-6 px-5 md:px-10">
          <Link href={localePath(locale)} aria-label="VNT GROUP" className="text-brand transition-opacity hover:opacity-75">
            <Wordmark className="h-6 w-auto md:h-7" />
          </Link>

          <div className="flex items-center gap-7">
            <nav className="hidden items-center gap-6 lg:flex">
              {headerNav.map((item) => (
                <Link
                  key={item.href + item.label.ja}
                  href={localePath(locale, item.href)}
                  className="text-[0.9375rem] font-bold text-black transition-colors hover:text-brand"
                >
                  {t(item.label, locale)}
                </Link>
              ))}
            </nav>

            <div className="hidden items-center gap-3 md:flex">
              <Link
                href={localePath(locale, '/reservation')}
                className="rounded-lg border-2 border-brand px-6 py-3 text-[0.9375rem] font-bold text-brand transition-colors hover:bg-brand hover:text-white"
              >
                {labels.reserve}
              </Link>
              <Link
                href={localePath(locale, '/contact')}
                className="rounded-lg bg-brand px-6 py-3.5 text-[0.9375rem] font-bold text-white shadow-[0_4px_12px_rgba(183,41,41,0.3)] transition-opacity hover:opacity-85"
              >
                {labels.contact}
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? labels.close : labels.menu}
              className="relative z-[130] flex h-11 w-11 items-center justify-center lg:hidden"
            >
              <span className="relative block h-3.5 w-7">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="absolute left-0 block h-[2px] w-full bg-black"
                    animate={
                      open
                        ? { top: '50%', rotate: i === 1 ? 0 : i === 0 ? 45 : -45, opacity: i === 1 ? 0 : 1 }
                        : { top: `${i * 50}%`, rotate: 0, opacity: 1 }
                    }
                    transition={{ duration: 0.35 }}
                  />
                ))}
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>{open && <MenuOverlay locale={locale} onClose={() => setOpen(false)} />}</AnimatePresence>
    </>
  );
}
