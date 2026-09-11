'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useMotionValueEvent, useScroll } from 'motion/react';
import { useState } from 'react';
import { site } from '@/content/site';
import { localePath, type Locale } from '@/lib/i18n';

/**
 * Phone and reservation stay one thumb away on small screens, where the
 * header's desktop CTAs are hidden. Slides in once the hero is behind you,
 * and stays out of the way on the reservation form itself.
 */
export function MobileActionBar({
  locale,
  labels,
}: {
  locale: Locale;
  labels: { call: string; reserve: string };
}) {
  const [shown, setShown] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  useMotionValueEvent(scrollY, 'change', (y) => setShown(y > 520));

  if (pathname.endsWith('/reservation')) return null;

  return (
    <motion.div
      className="fixed inset-x-0 bottom-0 z-[110] grid grid-cols-2 border-t border-ink/12 bg-page/95 shadow-[0_-8px_28px_rgba(21,21,26,0.08)] backdrop-blur-lg md:hidden"
      initial={{ y: '100%' }}
      animate={{ y: shown ? '0%' : '100%' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <a
        href={`tel:${site.telGroup.replace(/-/g, '')}`}
        className="flex flex-col items-center gap-1 border-r border-ink/12 py-3.5"
      >
        <span className="text-[0.5625rem] tracking-[0.24em] text-stone uppercase">{labels.call}</span>
        <span className="type-display text-[0.9375rem] tracking-[0.08em] text-brass">{site.telGroup}</span>
      </a>

      <Link
        href={localePath(locale, '/reservation')}
        className="flex flex-col items-center justify-center gap-1 bg-brass py-3.5"
      >
        <span className="text-[0.5625rem] tracking-[0.24em] text-page/70 uppercase">Form</span>
        <span className="text-[0.8125rem] tracking-[0.12em] text-page">{labels.reserve}</span>
      </Link>
    </motion.div>
  );
}
