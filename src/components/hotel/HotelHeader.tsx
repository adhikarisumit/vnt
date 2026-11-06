'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

export type HotelNavLink = { id: string; label: string };

/**
 * The live hotel pages' own header: hotel name in Tenor caps with gold stars
 * on the left, spaced caps links on the right (live: TOP / ABOUT /
 * SPECIALITY). It stays pinned here and carries the new 客室 / お食事 /
 * アクセス / 周辺観光 sections, with the current one underlined. The black
 * RESERVE tab on the right edge is the live page's too.
 */
export function HotelHeader({
  name,
  stars,
  links,
  reserveHref,
  homeHref,
}: {
  name: string;
  stars: number;
  links: HotelNavLink[];
  reserveHref: string;
  homeHref: string;
}) {
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const targets = links.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 8);
      let current: string | null = null;
      for (const el of targets) if (el.getBoundingClientRect().top <= 160) current = el.id;
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

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-[130] bg-white transition-shadow duration-300',
          scrolled && 'shadow-[0_2px_12px_rgba(0,0,0,0.08)]',
        )}
      >
        <div className="flex flex-col gap-3 px-5 pt-5 pb-3 md:h-[5.5rem] md:flex-row md:items-center md:justify-between md:px-[6.25%] md:py-0 lg:h-[7.5rem]">
          <a href="#top" className="block w-fit text-center">
            <span className="block font-[family-name:var(--font-tenor)] text-[1.05rem] tracking-[0.14em] text-black md:text-[1.2rem]">
              {name}
            </span>
            <span className="block text-[0.95rem] leading-none tracking-[0.18em] text-star md:text-[1.05rem]">
              {'★'.repeat(stars)}
            </span>
          </a>

          <nav aria-label="Page sections" className="-mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
            <ul className="flex gap-6 whitespace-nowrap md:gap-8 xl:gap-12">
              {links.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    aria-current={active === link.id ? 'true' : undefined}
                    className={cn(
                      'relative block py-1 font-[family-name:var(--font-sans)] text-[0.8125rem] tracking-[0.08em] text-black transition-opacity hover:opacity-60 md:text-[0.875rem]',
                    )}
                  >
                    {link.label}
                    <span
                      className={cn(
                        'absolute inset-x-0 -bottom-0.5 h-px origin-center bg-black transition-transform duration-300',
                        active === link.id ? 'scale-x-100' : 'scale-x-0',
                      )}
                    />
                  </a>
                </li>
              ))}
              <li>
                <Link
                  href={homeHref}
                  className="block py-1 font-[family-name:var(--font-sans)] text-[0.8125rem] tracking-[0.08em] text-stone transition-opacity hover:opacity-60 md:text-[0.875rem]"
                >
                  VNTグループ
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <a
        href={reserveHref}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed top-[27%] right-0 z-[120] hidden h-[10.25rem] w-11 items-center justify-center bg-black text-white md:flex"
      >
        <span className="writing-vertical font-[family-name:var(--font-tenor)] text-[0.75rem] tracking-[0.3em]">ご予約</span>
      </a>
    </>
  );
}
