'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { motion } from 'motion/react';
import { navigation, site } from '@/content/site';
import { localePath, t, type Locale } from '@/lib/i18n';

/**
 * Site menu (phones and tablets): a drawer that slides in from the right over
 * 40% of the screen, like the hotel pages. The rest of the page stays visible,
 * dimmed; a tap on it, the close button or Escape closes the drawer.
 */
export function MenuOverlay({ locale, onClose }: { locale: Locale; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  const closeLabel = locale === 'ja' ? '閉じる' : 'Close';

  return (
    <div className="fixed inset-0 z-[140]">
      <motion.button
        type="button"
        aria-label={closeLabel}
        onClick={onClose}
        className="absolute inset-0 bg-black/35"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      />
      <motion.nav
        aria-label="Menu"
        className="absolute inset-y-0 right-0 flex w-[40%] min-w-[10rem] flex-col overflow-y-auto overscroll-contain bg-white px-4 pb-8 shadow-[-12px_0_32px_rgba(0,0,0,0.12)]"
        initial={{ x: '100%' }}
        animate={{ x: '0%' }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center justify-end border-b border-black/10">
          <button type="button" onClick={onClose} className="py-3 text-[0.8125rem] tracking-[0.1em] text-black">
            {closeLabel}
          </button>
        </div>

        <ul className="flex flex-col">
          {navigation.map((item) => (
            <li key={item.href} className="border-b border-black/10">
              <Link href={localePath(locale, item.href)} onClick={onClose} className="flex items-baseline gap-2 py-3.5">
                <span className="text-[0.625rem] tracking-[0.16em] text-brand">{item.index}</span>
                <span className="text-[0.9375rem] font-medium tracking-[0.04em] text-black">{t(item.label, locale)}</span>
              </Link>
              {item.children && (
                <div className="flex flex-col gap-1.5 pb-3 pl-5">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={localePath(locale, child.href)}
                      onClick={onClose}
                      className="text-[0.6875rem] leading-snug tracking-[0.04em] text-ink-mute"
                    >
                      {t(child.label, locale)}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-col gap-2 text-[0.6875rem] tracking-[0.04em] break-all">
          <a href={`tel:${site.telGroup.replace(/-/g, '')}`} className="text-brand">
            {site.telGroup}
          </a>
          <a href={`mailto:${site.email}`} className="text-ink-mute">
            {site.email}
          </a>
        </div>
      </motion.nav>
    </div>
  );
}
