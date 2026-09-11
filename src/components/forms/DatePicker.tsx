'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { cn } from '@/lib/utils';
import type { Locale } from '@/lib/i18n';

const WEEKDAYS: Record<Locale, string[]> = {
  ja: ['日', '月', '火', '水', '木', '金', '土'],
  en: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
};

function startOfDay(d: Date) {
  const copy = new Date(d);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function toISO(d: Date) {
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
}

/**
 * Month grid used for the reservation date. Dates before today are disabled;
 * the next 14 days are marked so guests know to phone instead of waiting for
 * an email reply — matching the note under the form.
 */
export function DatePicker({
  value,
  onChange,
  locale,
  shortNoticeLabel,
}: {
  value: string;
  onChange: (iso: string) => void;
  locale: Locale;
  shortNoticeLabel: string;
}) {
  const today = useMemo(() => startOfDay(new Date()), []);
  const selected = value ? startOfDay(new Date(value)) : null;
  const [cursor, setCursor] = useState(() => {
    const base = selected ?? today;
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });
  const [direction, setDirection] = useState(1);

  const shortNoticeUntil = useMemo(() => {
    const d = new Date(today);
    d.setDate(d.getDate() + 14);
    return d;
  }, [today]);

  const cells = useMemo(() => {
    const first = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
    const daysInMonth = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate();
    const lead = first.getDay();
    return [
      ...Array.from({ length: lead }, () => null),
      ...Array.from({ length: daysInMonth }, (_, i) => new Date(cursor.getFullYear(), cursor.getMonth(), i + 1)),
    ];
  }, [cursor]);

  const move = (delta: number) => {
    setDirection(delta);
    setCursor((c) => new Date(c.getFullYear(), c.getMonth() + delta, 1));
  };

  const monthLabel = new Intl.DateTimeFormat(locale === 'ja' ? 'ja-JP' : 'en-GB', {
    year: 'numeric',
    month: 'long',
  }).format(cursor);

  const atFirstMonth =
    cursor.getFullYear() === today.getFullYear() && cursor.getMonth() === today.getMonth();

  return (
    <div className="w-full max-w-[26rem] border border-ink/15 p-5 md:p-6">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => move(-1)}
          disabled={atFirstMonth}
          aria-label="Previous month"
          className="flex h-9 w-9 items-center justify-center border border-ink/15 text-ink/70 transition-colors duration-300 hover:border-brass hover:text-brass disabled:pointer-events-none disabled:opacity-25"
        >
          ←
        </button>

        <div className="relative h-6 overflow-hidden px-4">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={monthLabel}
              className="type-display text-sm tracking-[0.16em] text-ink"
              initial={{ y: direction > 0 ? 22 : -22, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: direction > 0 ? -22 : 22, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {monthLabel}
            </motion.p>
          </AnimatePresence>
        </div>

        <button
          type="button"
          onClick={() => move(1)}
          aria-label="Next month"
          className="flex h-9 w-9 items-center justify-center border border-ink/15 text-ink/70 transition-colors duration-300 hover:border-brass hover:text-brass"
        >
          →
        </button>
      </div>

      <div className="mt-6 grid grid-cols-7 gap-1 text-center">
        {WEEKDAYS[locale].map((d, i) => (
          <span
            key={i}
            className={cn(
              'pb-2 text-[0.625rem] tracking-[0.14em] uppercase',
              i === 0 ? 'text-vermilion/70' : i === 6 ? 'text-brass/70' : 'text-stone',
            )}
          >
            {d}
          </span>
        ))}

        {cells.map((date, i) => {
          if (!date) return <span key={`pad-${i}`} />;

          const iso = toISO(date);
          const isPast = date < today;
          const isSelected = selected ? toISO(selected) === iso : false;
          const isShortNotice = !isPast && date <= shortNoticeUntil;

          return (
            <button
              key={iso}
              type="button"
              disabled={isPast}
              onClick={() => onChange(iso)}
              aria-pressed={isSelected}
              className={cn(
                'relative aspect-square text-[0.8125rem] transition-colors duration-250',
                isPast && 'cursor-not-allowed text-ink/15',
                !isPast && !isSelected && 'text-ink/75 hover:bg-ink/8 hover:text-ink',
                isSelected && 'bg-brass font-medium text-page',
              )}
            >
              {date.getDate()}
              {isShortNotice && !isSelected && (
                <span className="absolute bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-vermilion/70" />
              )}
            </button>
          );
        })}
      </div>

      <p className="mt-5 flex items-center gap-2.5 border-t border-ink/10 pt-4 text-[0.6875rem] leading-relaxed text-stone">
        <span className="h-1 w-1 shrink-0 rounded-full bg-vermilion/70" />
        {shortNoticeLabel}
      </p>
    </div>
  );
}
