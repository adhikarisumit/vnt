import { Reveal } from '@/components/motion/Reveal';
import { SplitText } from '@/components/motion/SplitText';
import { cn } from '@/lib/utils';

/** Eyebrow + display title (+ optional lead). Centred by default, matching the
 *  live site; pass `align="left"` where it heads a narrow side-by-side column. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'center',
  className,
  tone = 'light',
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: 'left' | 'center';
  className?: string;
  tone?: 'light' | 'dark';
}) {
  return (
    <div className={cn(align === 'center' && 'text-center', className)}>
      {eyebrow && (
        <Reveal>
          <p className="type-eyebrow">{eyebrow}</p>
        </Reveal>
      )}

      <SplitText
        as="h2"
        text={title}
        delay={0.06}
        className={cn(
          'type-display mt-5 text-[clamp(1.75rem,4.4vw,3.5rem)]',
          tone === 'dark' ? 'text-ink' : 'text-ink',
        )}
      />

      {lead && (
        <Reveal delay={0.18}>
          <p
            className={cn(
              'type-mincho mt-6 max-w-2xl text-[0.95rem] whitespace-pre-line',
              align === 'center' && 'mx-auto',
              tone === 'dark' ? 'text-ink/70' : 'text-ink/70',
            )}
          >
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  );
}
