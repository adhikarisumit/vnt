'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

export type HotelNavLink = { id: string; label: string };

/**
 * The reference hotel site's masthead: the hotel's wordmark centred on
 * white under the slideshow, then one centred row of small Japanese links
 * (予約する first, in colour), ruled underneath. The link row pins to the
 * top while the page scrolls and underlines the current section. On phones
 * it folds into a メニュー toggle.
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

  const linkClass =
    'relative block py-2 text-[0.8125rem] tracking-[0.06em] text-ink-mute transition-colors hover:text-black md:py-3';

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
            className="py-3 text-[0.8125rem] tracking-[0.1em] text-black"
          >
            {open ? '閉じる' : 'メニュー'}
          </button>
        </div>

        <nav aria-label="Page sections" className={cn('px-5', open ? 'block' : 'hidden md:block')}>
          <ul className="flex flex-col items-center md:flex-row md:justify-center md:gap-7 lg:gap-9">
            <li className="hidden md:block">
              <a href={reserveHref} target="_blank" rel="noopener noreferrer" className={cn(linkClass, 'font-medium text-brass hover:text-brass')}>
                予約する
              </a>
            </li>
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === link.id ? 'true' : undefined}
                  className={cn(linkClass, active === link.id && 'text-black')}
                >
                  {link.label}
                  <span
                    className={cn(
                      'absolute inset-x-0 bottom-1 hidden h-px origin-center bg-black transition-transform duration-300 md:block',
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
    </>
  );
}
