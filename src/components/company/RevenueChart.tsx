'use client';

import { motion } from 'motion/react';

/**
 * Revenue bars. Values are read straight from the label, so the figures stay
 * legible to screen readers without depending on the bar geometry.
 */
export function RevenueChart({ data }: { data: { label: string; value: number }[] }) {
  const max = Math.max(...data.map((d) => d.value));

  return (
    <ul className="space-y-9">
      {data.map((item, i) => {
        const millions = Math.round(item.value / 1_000_000);
        return (
          <li key={item.label}>
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <span className="text-[0.6875rem] tracking-[0.22em] text-stone uppercase">{item.label}</span>
              <span className="type-display text-[clamp(1.25rem,3vw,2rem)] text-ink">
                {millions.toLocaleString()}
                <span className="ml-2 text-xs tracking-[0.2em] text-brass">M JPY</span>
              </span>
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
        );
      })}
    </ul>
  );
}
