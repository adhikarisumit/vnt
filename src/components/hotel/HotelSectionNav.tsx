'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

export type SectionLink = { id: string; label: string; en: string };

/**
 * Sticky in-page tabs for the four common hotel sections. Sits under the
 * fixed header; the active tab follows the section in view. Clicks travel
 * through Lenis (SmoothScroll handles `#id` anchors).
 */
export function HotelSectionNav({ links }: { links: SectionLink[] }) {
  const [active, setActive] = useState(links[0]?.id);

  useEffect(() => {
    const targets = links.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    if (!targets.length) return;

    // Current = the last section whose top has passed the line under the nav.
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = 180;
      let current = targets[0].id;
      for (const el of targets) if (el.getBoundingClientRect().top <= line) current = el.id;
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
    <nav
      aria-label="Page sections"
      className="sticky top-(--header-h) z-[60] border-b border-ink/10 bg-page/[0.97] backdrop-blur-md"
    >
      <ul className="shell grid grid-cols-4">
        {links.map((link) => {
          const on = active === link.id;
          return (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                aria-current={on ? 'true' : undefined}
                className={cn(
                  'group relative flex flex-col items-center gap-1 py-3.5 text-center transition-colors md:py-4',
                  on ? 'text-ink' : 'text-ink/55 hover:text-ink',
                )}
              >
                <span className="type-mincho text-[0.8125rem] tracking-[0.12em] md:text-[0.9375rem]">{link.label}</span>
                <span className="hidden text-[0.5625rem] tracking-[0.28em] text-stone uppercase sm:block">{link.en}</span>
                <span
                  className={cn(
                    'absolute inset-x-3 bottom-0 h-px origin-center bg-brass transition-transform duration-500 ease-(--ease-out-expo)',
                    on ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50',
                  )}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
