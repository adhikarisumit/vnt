'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';

import { Checkbox, Field, Select, TextArea, TextInput } from './Field';
import { SuccessPanel } from './ReservationForm';
import { contactSchema } from '@/lib/schemas';
import { getDictionary } from '@/content/dictionary';
import { localePath, type Locale } from '@/lib/i18n';

type Values = {
  category: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  detail: string;
  agree: boolean;
  website: string;
};

export function ContactForm({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const [values, setValues] = useState<Values>({
    category: dict.contact.categories[0],
    name: '',
    company: '',
    email: '',
    phone: '',
    detail: '',
    agree: false,
    website: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => {
      if (!e[key as string]) return e;
      const next = { ...e };
      delete next[key as string];
      return next;
    });
  };

  const required = locale === 'ja' ? '必須項目です' : 'This field is required';

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const next: Record<string, string> = {};
    if (!values.name.trim()) next.name = required;
    if (!values.company.trim()) next.company = required;
    if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      next.email = locale === 'ja' ? '有効なメールアドレスを入力してください' : 'Enter a valid email address';
    }
    if (!values.phone.trim()) next.phone = required;
    if (!values.detail.trim()) next.detail = required;
    if (!values.agree) next.agree = required;

    setErrors(next);
    if (Object.keys(next).length) return;

    const parsed = contactSchema.safeParse({ ...values, locale });
    if (!parsed.success) {
      setErrors({ form: dict.reservation.errorBody });
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return <SuccessPanel title={dict.reservation.successTitle} body={dict.reservation.successBody} />;
  }

  return (
    <motion.form
      onSubmit={onSubmit}
      noValidate
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="grid gap-9 md:grid-cols-2"
    >
      <Field
        label={dict.contact.category}
        required
        requiredLabel={dict.common.required}
        htmlFor="category"
        className="md:col-span-2"
      >
        <Select id="category" value={values.category} onChange={(e) => set('category', e.target.value)}>
          {dict.contact.categories.map((c) => (
            <option key={c} value={c} className="bg-page">
              {c}
            </option>
          ))}
        </Select>
      </Field>

      <Field label={dict.contact.name} required requiredLabel={dict.common.required} htmlFor="c-name" error={errors.name}>
        <TextInput id="c-name" autoComplete="name" value={values.name} onChange={(e) => set('name', e.target.value)} />
      </Field>

      <Field
        label={dict.contact.company}
        required
        requiredLabel={dict.common.required}
        htmlFor="c-company"
        error={errors.company}
      >
        <TextInput
          id="c-company"
          autoComplete="organization"
          value={values.company}
          onChange={(e) => set('company', e.target.value)}
        />
      </Field>

      <Field label={dict.contact.email} required requiredLabel={dict.common.required} htmlFor="c-email" error={errors.email}>
        <TextInput
          id="c-email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={(e) => set('email', e.target.value)}
        />
      </Field>

      <Field label={dict.contact.phone} required requiredLabel={dict.common.required} htmlFor="c-phone" error={errors.phone}>
        <TextInput
          id="c-phone"
          type="tel"
          autoComplete="tel"
          value={values.phone}
          onChange={(e) => set('phone', e.target.value)}
        />
      </Field>

      <Field
        label={dict.contact.detail}
        required
        requiredLabel={dict.common.required}
        htmlFor="c-detail"
        error={errors.detail}
        className="md:col-span-2"
      >
        <TextArea id="c-detail" value={values.detail} onChange={(e) => set('detail', e.target.value)} />
      </Field>

      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        value={values.website}
        onChange={(e) => set('website', e.target.value)}
        className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      <div className="space-y-4 md:col-span-2">
        <Checkbox
          checked={values.agree}
          onChange={(e) => set('agree', e.target.checked)}
          label={
            <>
              <Link href={localePath(locale, '/privacy')} className="text-brass underline-offset-4 hover:underline">
                {dict.privacy.title}
              </Link>
              {locale === 'ja' ? 'に同意する' : ' — I agree'}
            </>
          }
        />
        {errors.agree && <p className="text-xs text-vermilion">{errors.agree}</p>}
        {status === 'error' && (
          <p className="border border-vermilion/40 bg-vermilion/10 p-4 text-sm text-ink/85">
            {dict.reservation.errorTitle} — {dict.reservation.errorBody}
          </p>
        )}
        {errors.form && <p className="text-xs text-vermilion">{errors.form}</p>}
      </div>

      <div className="md:col-span-2">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="group relative overflow-hidden bg-brass px-12 py-4 text-[0.6875rem] tracking-[0.22em] text-page uppercase disabled:opacity-60"
        >
          <span className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-500 ease-[cubic-bezier(0.83,0,0.17,1)] group-hover:scale-y-100" />
          <span className="relative transition-colors duration-300 group-hover:text-page">
            {status === 'sending' ? dict.reservation.submitting : dict.contact.submit}
          </span>
        </button>
      </div>
    </motion.form>
  );
}
