'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

import { cn } from '@/lib/utils';

export type HotelNavLink = { id: string; label: string };

/**
 * The reference hotel site's masthead: the hotel's wordmark centred on
 * white under the slideshow, then one centred row of small Japanese links
 * (予約する first, in colour), ruled underneath. The link row pins to the
 * top while the page scrolls and underlines the current section. On phones
 * it folds into a メニュー toggle that opens a drawer sliding in from the
 * right over 40% of the screen; the rest of the page stays visible, dimmed,
 * and a tap on it closes the drawer.
 */
export function HotelHeader({
  name,
  nameJa,
  stars,
  links,
  reserveHref,
  contactHref,
  homeHref,
}: {
  name: string;
  nameJa: string;
  stars: number;
  links: HotelNavLink[];
  reserveHref: string;
  contactHref: string;
  homeHref: string;
}) {
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const targets = links.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    let frame = 0;
    const update = () => {
      frame = 0;
      let current: string | null = null;
      for (const el of targets) if (el.getBoundingClientRect().top <= 120) current = el.id;
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [links]);

  // Drawer open: lock page scroll, close on Escape, close if the viewport grows to desktop.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onResize = () => window.innerWidth >= 768 && setOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  const linkClass =
    'relative block py-2 text-[0.8125rem] tracking-[0.06em] text-ink-mute transition-colors hover:text-black md:py-3';

  const drawerLink = 'block border-b border-black/10 py-3.5 text-[0.8125rem] tracking-[0.08em] text-ink-mute';

  return (
    <>
      {/* Wordmark block, white, centred. */}
      <div className="bg-white px-5 pt-16 pb-8 text-center md:pt-24 md:pb-10">
        <a href="#top" className="inline-block">
          <span className="block font-[family-name:var(--font-tenor)] text-[clamp(1.5rem,3vw,2.4rem)] tracking-[0.22em] text-black">
            {name}
          </span>
          <span className="mt-1 block text-[1rem] tracking-[0.3em] text-star">{'★'.repeat(stars)}</span>
          <span className="mt-2 block text-[0.75rem] tracking-[0.3em] text-stone">{nameJa}</span>
        </a>
      </div>

      <header className="sticky top-0 z-[130] border-y border-black/10 bg-white/95 backdrop-blur-sm">
        <div className="flex items-center justify-between px-5 md:hidden">
          <a href={reserveHref} target="_blank" rel="noopener noreferrer" className="py-3 text-[0.8125rem] font-medium text-brass">
            予約する
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="hotel-mobile-menu"
            className="py-3 text-[0.8125rem] tracking-[0.1em] text-black"
          >
            {open ? '閉じる' : 'メニュー'}
          </button>
        </div>

        {/* Desktop: one centred row of links. */}
        <nav aria-label="Page sections" className="hidden px-5 md:block">
          <ul className="flex flex-row justify-center gap-7 lg:gap-9">
            <li>
              <a href={reserveHref} target="_blank" rel="noopener noreferrer" className={cn(linkClass, 'font-medium text-brass hover:text-brass')}>
                予約する
              </a>
            </li>
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={active === link.id ? 'true' : undefined}
                  className={cn(linkClass, active === link.id && 'text-black')}
                >
                  {link.label}
                  <span
                    className={cn(
                      'absolute inset-x-0 bottom-1 h-px origin-center bg-black transition-transform duration-300',
                      active === link.id ? 'scale-x-100' : 'scale-x-0',
                    )}
                  />
                </a>
              </li>
            ))}
            <li>
              <Link href={contactHref} className={linkClass}>
                お問い合わせ
              </Link>
            </li>
            <li>
              <Link href={homeHref} className={cn(linkClass, 'text-stone')}>
                VNTグループ
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Phone: drawer from the right, 40% of the screen wide. */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[140] md:hidden">
            <motion.button
              type="button"
              aria-label="閉じる"
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-black/35"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.nav
              id="hotel-mobile-menu"
              aria-label="Page sections"
              className="absolute inset-y-0 right-0 flex w-[40%] min-w-[9.5rem] flex-col overflow-y-auto bg-white px-4 pb-8 shadow-[-12px_0_32px_rgba(0,0,0,0.12)]"
              initial={{ x: '100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center justify-end border-b border-black/10">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="py-3 text-[0.8125rem] tracking-[0.1em] text-black"
                >
                  閉じる
                </button>
              </div>
              <ul className="flex flex-col">
                <li>
                  <a
                    href={reserveHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(drawerLink, 'font-medium text-brass')}
                  >
                    予約する
                  </a>
                </li>
                {links.map((link) => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      onClick={() => setOpen(false)}
                      aria-current={active === link.id ? 'true' : undefined}
                      className={cn(drawerLink, active === link.id && 'text-black')}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <Link href={contactHref} onClick={() => setOpen(false)} className={drawerLink}>
                    お問い合わせ
                  </Link>
                </li>
                <li>
                  <Link href={homeHref} onClick={() => setOpen(false)} className={cn(drawerLink, 'border-b-0 text-stone')}>
                    VNTグループ
                  </Link>
                </li>
              </ul>
            </motion.nav>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
