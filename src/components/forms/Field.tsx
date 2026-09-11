'use client';

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

const controlClass =
  'w-full border-b border-ink/20 bg-transparent px-0 py-3.5 text-[0.95rem] text-ink outline-none transition-colors duration-300 placeholder:text-ink/25 focus:border-brass disabled:opacity-50';

export function Field({
  label,
  required,
  requiredLabel,
  error,
  hint,
  children,
  htmlFor,
  className,
}: {
  label: string;
  required?: boolean;
  requiredLabel?: string;
  error?: string;
  hint?: string;
  children: ReactNode;
  htmlFor?: string;
  className?: string;
}) {
  return (
    <div className={cn('group', className)}>
      <label htmlFor={htmlFor} className="flex items-baseline gap-3">
        <span className="text-[0.6875rem] tracking-[0.2em] text-stone uppercase">{label}</span>
        {required && (
          <span className="text-[0.5625rem] tracking-[0.16em] text-brass uppercase">{requiredLabel ?? '*'}</span>
        )}
      </label>

      <div className="mt-1.5">{children}</div>

      {hint && !error && <p className="mt-2 text-xs text-stone/80">{hint}</p>}
      {error && <p className="mt-2 text-xs text-vermilion">{error}</p>}
    </div>
  );
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(controlClass, props.className)} />;
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cn(controlClass, 'min-h-32 resize-y', props.className)} />;
}

export function Select({
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { children: ReactNode }) {
  return (
    <div className="relative">
      <select {...props} className={cn(controlClass, 'cursor-pointer pr-8', props.className)}>
        {children}
      </select>
      <span aria-hidden className="pointer-events-none absolute top-1/2 right-1 -translate-y-1/2 text-brass">
        ▾
      </span>
    </div>
  );
}

export function Checkbox({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: ReactNode }) {
  return (
    <label className="flex cursor-pointer items-start gap-3.5">
      <span className="relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border border-ink/30 transition-colors duration-300 has-checked:border-brass">
        <input {...props} type="checkbox" className="peer absolute inset-0 cursor-pointer opacity-0" />
        <span className="h-2.5 w-2.5 scale-0 bg-brass transition-transform duration-300 peer-checked:scale-100" />
      </span>
      <span className="text-[0.8125rem] leading-relaxed text-ink/70">{label}</span>
    </label>
  );
}
