'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

import { Checkbox, Field, Select, TextArea, TextInput } from './Field';
import { DatePicker } from './DatePicker';
import { facilities, reservationSchema } from '@/lib/schemas';
import { getDictionary } from '@/content/dictionary';
import type { Locale } from '@/lib/i18n';
import { cn } from '@/lib/utils';

type Values = {
  facility: string;
  date: string;
  nights: string;
  guests: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  message: string;
  agree: boolean;
  website: string;
};

const empty: Values = {
  facility: '',
  date: '',
  nights: '1',
  guests: '2',
  name: '',
  company: '',
  phone: '',
  email: '',
  message: '',
  agree: false,
  website: '',
};

const slide = {
  enter: (dir: number) => ({ x: dir > 0 ? 48 : -48, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -48 : 48, opacity: 0 }),
};

export function ReservationForm({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const [values, setValues] = useState<Values>(empty);
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
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

  const validateStep = (index: number) => {
    const next: Record<string, string> = {};
    if (index === 0) {
      if (!values.facility) next.facility = required;
      if (!values.date) next.date = required;
      if (!values.guests) next.guests = required;
    }
    if (index === 1) {
      if (!values.name.trim()) next.name = required;
      if (!values.phone.trim()) next.phone = required;
      if (!/^\S+@\S+\.\S+$/.test(values.email)) {
        next.email = locale === 'ja' ? '有効なメールアドレスを入力してください' : 'Enter a valid email address';
      }
      if (!values.message.trim()) next.message = required;
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const go = (delta: number) => {
    if (delta > 0 && !validateStep(step)) return;
    setDirection(delta);
    setStep((s) => Math.min(2, Math.max(0, s + delta)));
  };

  const submit = async () => {
    if (!values.agree) {
      setErrors({ agree: required });
      return;
    }

    const parsed = reservationSchema.safeParse({
      ...values,
      nights: values.nights || undefined,
      agree: values.agree,
      locale,
    });

    if (!parsed.success) {
      setErrors({ form: dict.reservation.errorBody });
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch('/api/reservation', {
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

  const selectedFacility = facilities.find((f) => f.id === values.facility);

  return (
    <div>
      {/* Step rail ------------------------------------------------------- */}
      <ol className="flex flex-wrap gap-6 border-b border-ink/12 pb-5">
        {dict.reservation.steps.map((label, i) => (
          <li key={label} className="flex items-center gap-2.5">
            <span
              className={cn(
                'flex h-6 w-6 items-center justify-center rounded-full border text-[0.625rem] transition-colors duration-400',
                i === step
                  ? 'border-brass bg-brass text-page'
                  : i < step
                    ? 'border-brass/50 text-brass'
                    : 'border-ink/20 text-ink/35',
              )}
            >
              {i < step ? '✓' : i + 1}
            </span>
            <span
              className={cn(
                'text-[0.6875rem] tracking-[0.18em] uppercase transition-colors duration-400',
                i === step ? 'text-ink' : 'text-ink/35',
              )}
            >
              {label}
            </span>
          </li>
        ))}
      </ol>

      <div className="relative mt-10 overflow-hidden">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          {/* Step 1 — facility & date ------------------------------------ */}
          {step === 0 && (
            <motion.div
              key="step-0"
              custom={direction}
              variants={slide}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-12"
            >
              <fieldset>
                <legend className="flex items-baseline gap-3">
                  <span className="text-[0.6875rem] tracking-[0.2em] text-stone uppercase">
                    {dict.reservation.facility}
                  </span>
                  <span className="text-[0.5625rem] tracking-[0.16em] text-brass uppercase">
                    {dict.common.required}
                  </span>
                </legend>

                <div className="mt-5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                  {facilities.map((facility) => {
                    const active = values.facility === facility.id;
                    return (
                      <button
                        type="button"
                        key={facility.id}
                        onClick={() => set('facility', facility.id)}
                        className={cn(
                          'group relative flex flex-col items-start gap-2 border p-5 text-left transition-colors duration-400',
                          active ? 'border-brass bg-brass/8' : 'border-ink/15 hover:border-ink/35',
                        )}
                      >
                        <span
                          className={cn(
                            'text-[0.5625rem] tracking-[0.24em] uppercase transition-colors duration-400',
                            active ? 'text-brass' : 'text-stone',
                          )}
                        >
                          {facility.area}
                        </span>
                        <span className="text-[0.875rem] leading-snug text-ink/90">
                          {locale === 'ja' ? facility.ja : facility.en}
                        </span>
                        {active && (
                          <motion.span
                            layoutId="facility-marker"
                            className="absolute top-4 right-4 h-1.5 w-1.5 rounded-full bg-brass"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
                {errors.facility && <p className="mt-3 text-xs text-vermilion">{errors.facility}</p>}
              </fieldset>

              <div className="grid gap-10 lg:grid-cols-[26rem_1fr] lg:gap-16">
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-[0.6875rem] tracking-[0.2em] text-stone uppercase">
                      {dict.reservation.date}
                    </span>
                    <span className="text-[0.5625rem] tracking-[0.16em] text-brass uppercase">
                      {dict.common.required}
                    </span>
                  </div>
                  <div className="mt-4">
                    <DatePicker
                      value={values.date}
                      onChange={(iso) => set('date', iso)}
                      locale={locale}
                      shortNoticeLabel={dict.reservation.shortNotice}
                    />
                  </div>
                  {errors.date && <p className="mt-3 text-xs text-vermilion">{errors.date}</p>}
                </div>

                <div className="space-y-8">
                  {selectedFacility?.kind === 'hotel' && (
                    <Field label={dict.reservation.nights} htmlFor="nights">
                      <Select id="nights" value={values.nights} onChange={(e) => set('nights', e.target.value)}>
                        {Array.from({ length: 14 }, (_, i) => i + 1).map((n) => (
                          <option key={n} value={n} className="bg-page">
                            {n}
                          </option>
                        ))}
                      </Select>
                    </Field>
                  )}

                  <Field
                    label={dict.reservation.guests}
                    required
                    requiredLabel={dict.common.required}
                    htmlFor="guests"
                    error={errors.guests}
                  >
                    <TextInput
                      id="guests"
                      type="number"
                      min={1}
                      max={500}
                      value={values.guests}
                      onChange={(e) => set('guests', e.target.value)}
                      placeholder="20"
                    />
                  </Field>

                  {values.date && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border border-brass/25 bg-brass/5 p-5"
                    >
                      <p className="text-[0.625rem] tracking-[0.24em] text-brass uppercase">
                        {dict.reservation.date}
                      </p>
                      <p className="type-display mt-2 text-lg text-ink">
                        {new Intl.DateTimeFormat(locale === 'ja' ? 'ja-JP' : 'en-GB', {
                          dateStyle: 'long',
                        }).format(new Date(values.date))}
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2 — details -------------------------------------------- */}
          {step === 1 && (
            <motion.div
              key="step-1"
              custom={direction}
              variants={slide}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="grid gap-9 md:grid-cols-2"
            >
              <Field
                label={dict.reservation.name}
                required
                requiredLabel={dict.common.required}
                htmlFor="name"
                error={errors.name}
              >
                <TextInput
                  id="name"
                  autoComplete="name"
                  value={values.name}
                  onChange={(e) => set('name', e.target.value)}
                />
              </Field>

              <Field label={dict.reservation.company} htmlFor="company">
                <TextInput
                  id="company"
                  autoComplete="organization"
                  value={values.company}
                  onChange={(e) => set('company', e.target.value)}
                />
              </Field>

              <Field
                label={dict.reservation.phone}
                required
                requiredLabel={dict.common.required}
                htmlFor="phone"
                error={errors.phone}
              >
                <TextInput
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  value={values.phone}
                  onChange={(e) => set('phone', e.target.value)}
                />
              </Field>

              <Field
                label={dict.reservation.email}
                required
                requiredLabel={dict.common.required}
                htmlFor="email"
                error={errors.email}
              >
                <TextInput
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={(e) => set('email', e.target.value)}
                />
              </Field>

              <Field
                label={dict.reservation.message}
                required
                requiredLabel={dict.common.required}
                htmlFor="message"
                error={errors.message}
                className="md:col-span-2"
              >
                <TextArea id="message" value={values.message} onChange={(e) => set('message', e.target.value)} />
              </Field>
            </motion.div>
          )}

          {/* Step 3 — review --------------------------------------------- */}
          {step === 2 && (
            <motion.div
              key="step-2"
              custom={direction}
              variants={slide}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="type-display text-lg text-ink">{dict.reservation.reviewTitle}</h3>

              <dl className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
                <ReviewRow
                  label={dict.reservation.facility}
                  value={selectedFacility ? (locale === 'ja' ? selectedFacility.ja : selectedFacility.en) : '—'}
                />
                <ReviewRow
                  label={dict.reservation.date}
                  value={
                    values.date
                      ? new Intl.DateTimeFormat(locale === 'ja' ? 'ja-JP' : 'en-GB', { dateStyle: 'long' }).format(
                          new Date(values.date),
                        )
                      : '—'
                  }
                />
                {selectedFacility?.kind === 'hotel' && (
                  <ReviewRow label={dict.reservation.nights} value={values.nights} />
                )}
                <ReviewRow label={dict.reservation.guests} value={values.guests} />
                <ReviewRow label={dict.reservation.name} value={values.name} />
                {values.company && <ReviewRow label={dict.reservation.company} value={values.company} />}
                <ReviewRow label={dict.reservation.phone} value={values.phone} />
                <ReviewRow label={dict.reservation.email} value={values.email} />
                <ReviewRow label={dict.reservation.message} value={values.message} />
              </dl>

              <div className="mt-9 space-y-5">
                <Checkbox
                  checked={values.agree}
                  onChange={(e) => set('agree', e.target.checked)}
                  label={dict.reservation.agree}
                />
                {errors.agree && <p className="text-xs text-vermilion">{errors.agree}</p>}

                <p className="border-l border-brass/40 pl-5 text-[0.75rem] leading-relaxed whitespace-pre-line text-stone">
                  {dict.reservation.disclaimer}
                </p>

                {status === 'error' && (
                  <p className="border border-vermilion/40 bg-vermilion/10 p-4 text-sm text-ink/85">
                    {dict.reservation.errorTitle} — {dict.reservation.errorBody}
                  </p>
                )}
                {errors.form && <p className="text-xs text-vermilion">{errors.form}</p>}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Honeypot */}
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

      {/* Controls -------------------------------------------------------- */}
      <div className="mt-12 flex flex-wrap items-center justify-between gap-5 border-t border-ink/12 pt-8">
        <button
          type="button"
          onClick={() => go(-1)}
          disabled={step === 0}
          className="text-[0.6875rem] tracking-[0.22em] text-ink/50 uppercase transition-colors duration-300 hover:text-ink disabled:pointer-events-none disabled:opacity-25"
        >
          ← {dict.reservation.back}
        </button>

        {step < 2 ? (
          <button
            type="button"
            onClick={() => go(1)}
            className="group relative overflow-hidden bg-brass px-10 py-4 text-[0.6875rem] tracking-[0.22em] text-page uppercase"
          >
            <span className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-500 ease-[cubic-bezier(0.83,0,0.17,1)] group-hover:scale-y-100" />
            <span className="relative transition-colors duration-300 group-hover:text-page">
              {dict.reservation.next} →
            </span>
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            disabled={status === 'sending'}
            className="group relative overflow-hidden bg-brass px-10 py-4 text-[0.6875rem] tracking-[0.22em] text-page uppercase disabled:opacity-60"
          >
            <span className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-500 ease-[cubic-bezier(0.83,0,0.17,1)] group-hover:scale-y-100" />
            <span className="relative transition-colors duration-300 group-hover:text-page">
              {status === 'sending' ? dict.reservation.submitting : dict.reservation.submit}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1.5 py-4 md:grid-cols-[12rem_1fr] md:gap-6">
      <dt className="text-[0.6875rem] tracking-[0.2em] text-stone uppercase">{label}</dt>
      <dd className="text-sm leading-relaxed whitespace-pre-line text-ink/85">{value}</dd>
    </div>
  );
}

export function SuccessPanel({ title, body }: { title: string; body: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="border border-brass/35 bg-brass/5 px-8 py-16 text-center md:px-16"
    >
      <motion.span
        className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-brass"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="text-2xl text-brass">✓</span>
      </motion.span>

      <h3 className="type-display mt-8 text-[clamp(1.25rem,3vw,1.75rem)] text-ink">{title}</h3>
      <p className="type-body mx-auto mt-5 max-w-lg">{body}</p>
    </motion.div>
  );
}
