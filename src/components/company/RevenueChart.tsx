'use client';

import { motion } from 'motion/react';
import type { Locale } from '@/lib/i18n';

/**
 * Revenue bars. Figures are printed in full yen, as on the live company page;
 * the bars are decoration and carry no information the text does not.
 */
export function RevenueChart({ data, locale }: { data: { label: string; value: number }[]; locale: Locale }) {
  const max = Math.max(...data.map((d) => d.value));
  const format = (v: number) => (locale === 'ja' ? `${v.toLocaleString('ja-JP')}円` : `JPY ${v.toLocaleString('en-US')}`);

  return (
    <ul className="space-y-9">
      {data.map((item, i) => (
        <li key={item.label}>
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <span className="text-[0.75rem] tracking-[0.18em] text-stone">{item.label}</span>
            <span className="type-display text-[clamp(1.1rem,2.6vw,1.75rem)] text-ink">{format(item.value)}</span>
          </div>

          <div className="mt-4 h-px w-full bg-ink/10">
            <motion.div
              className="h-px origin-left bg-linear-to-r from-brass to-brass-lit"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: item.value / max }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 1.3, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
