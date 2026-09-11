'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/** Text link with a rule that draws itself in and an arrow that steps right. */
export function ArrowLink({
  href,
  children,
  className,
  external,
  tone = 'ink',
}: {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
  /** `washi` is for links placed over photography. */
  tone?: 'ink' | 'washi';
}) {
  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden
        className="relative z-10 translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5"
      >
        →
      </span>
      <span
        aria-hidden
        className={cn(
          'absolute bottom-0 left-0 h-px w-full origin-right scale-x-100 transition-transform duration-600 ease-[cubic-bezier(0.83,0,0.17,1)] group-hover:origin-left',
          tone === 'washi' ? 'bg-washi/35' : 'bg-ink/25',
        )}
      />
      <span
        aria-hidden
        className={cn(
          'absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-600 ease-[cubic-bezier(0.83,0,0.17,1)] group-hover:scale-x-100',
          tone === 'washi' ? 'bg-brass-lit' : 'bg-brass',
        )}
      />
    </>
  );

  const classes = cn(
    'group relative inline-flex items-center gap-3 pb-2 text-sm tracking-[0.16em] uppercase',
    tone === 'washi' ? 'text-washi' : 'text-ink',
    className,
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}

/**
 * Solid CTA. `brass` and `ink` sit on paper; `outline` is the quiet option on
 * paper; `on-media` is the outlined version for use over a photograph.
 */
export function ButtonLink({
  href,
  children,
  className,
  variant = 'brass',
  external,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: 'brass' | 'ink' | 'outline' | 'on-media';
  external?: boolean;
}) {
  const classes = cn(
    'group relative inline-flex items-center justify-center gap-3 overflow-hidden px-9 py-4 text-[0.8125rem] tracking-[0.22em] uppercase transition-colors duration-500',
    variant === 'brass' && 'bg-brass text-page',
    variant === 'ink' && 'bg-ink text-washi',
    variant === 'outline' && 'border border-ink/30 text-ink hover:border-brass',
    variant === 'on-media' && 'border border-washi/45 text-washi hover:border-brass-lit',
    className,
  );

  const inner = (
    <>
      <span
        aria-hidden
        className={cn(
          'absolute inset-0 origin-bottom scale-y-0 transition-transform duration-600 ease-[cubic-bezier(0.83,0,0.17,1)] group-hover:scale-y-100',
          variant === 'brass' && 'bg-ink',
          variant === 'ink' && 'bg-brass',
          variant === 'outline' && 'bg-brass',
          variant === 'on-media' && 'bg-brass-lit',
        )}
      />
      <span
        className={cn(
          'relative z-10 transition-colors duration-400',
          variant === 'brass' && 'group-hover:text-washi',
          variant === 'ink' && 'group-hover:text-page',
          variant === 'outline' && 'group-hover:text-page',
          variant === 'on-media' && 'group-hover:text-ink',
        )}
      >
        {children}
      </span>
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}
