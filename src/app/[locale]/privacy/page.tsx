import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { PageHero } from '@/components/sections/PageHero';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { getDictionary } from '@/content/dictionary';
import { site } from '@/content/site';
import { isLocale, type Locale } from '@/lib/i18n';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: locale === 'ja' ? 'プライバシーポリシー' : 'Privacy Policy', robots: { index: false } };
}

const sections: Record<Locale, { heading: string; body: string }[]> = {
  ja: [
    {
      heading: '個人情報の取得と利用目的',
      body: 'VNT株式会社（以下「当社」）は、お問い合わせフォームおよび団体予約フォームを通じて、お名前、会社名・団体名、メールアドレス、電話番号、お問い合わせ内容等の個人情報を取得します。取得した個人情報は、お問い合わせへの回答、ご予約の確認およびご連絡、当社サービスのご案内のためにのみ利用いたします。',
    },
    {
      heading: '第三者への提供',
      body: '当社は、法令に基づく場合を除き、ご本人の同意なく個人情報を第三者に提供することはありません。ご予約の履行に必要な範囲で、当社グループの各施設（ホテル・飲食店等）に情報を共有する場合があります。',
    },
    {
      heading: '安全管理',
      body: '当社は、個人情報への不正アクセス、紛失、破壊、改ざんおよび漏えいを防止するため、必要かつ適切な安全管理措置を講じます。当ウェブサイトの通信はすべて暗号化されています。',
    },
    {
      heading: 'Cookie 等の利用',
      body: '当ウェブサイトでは、表示設定の保持および利用状況の把握のために Cookie を利用する場合があります。Google マップおよび YouTube の埋め込みコンテンツは、お客様が明示的に読み込みを選択した場合にのみ表示され、それまで第三者への通信は行われません。',
    },
    {
      heading: '開示・訂正・削除のご請求',
      body: '保有する個人情報の開示、訂正、利用停止または削除をご希望の場合は、下記の窓口までご連絡ください。ご本人であることを確認のうえ、速やかに対応いたします。',
    },
    {
      heading: 'お問い合わせ窓口',
      body: `${site.legalName.ja}\n${site.address.postal} ${site.address.ja}\n電話 ${site.tel}／メール ${site.email}`,
    },
  ],
  en: [
    {
      heading: 'Information we collect and why',
      body: 'VNT Co., Ltd. (“we”) collects your name, company or group name, email address, telephone number and the content of your message through the contact and group reservation forms. We use this information solely to answer your enquiry, to confirm and arrange your reservation, and to provide information about our services.',
    },
    {
      heading: 'Disclosure to third parties',
      body: 'We do not provide personal information to third parties without your consent, except where required by law. Where necessary to fulfil a reservation, information may be shared with the relevant VNT Group property (hotel, restaurant and so on).',
    },
    {
      heading: 'Security',
      body: 'We take appropriate measures to prevent unauthorised access to, and the loss, destruction, alteration or leakage of, personal information. All traffic to this website is encrypted.',
    },
    {
      heading: 'Cookies and embedded content',
      body: 'This website may use cookies to remember display preferences and to understand how the site is used. Google Maps and YouTube embeds load only when you explicitly choose to load them; until then no request is made to those services.',
    },
    {
      heading: 'Access, correction and deletion',
      body: 'To request disclosure, correction, suspension of use or deletion of the personal information we hold about you, please contact us using the details below. We will respond promptly once we have verified your identity.',
    },
    {
      heading: 'Contact',
      body: `${site.legalName.en}\n${site.address.postal} ${site.address.en}\nTel ${site.tel} / Email ${site.email}`,
    },
  ],
};

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const active = locale as Locale;
  const dict = getDictionary(active);

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={dict.privacy.title}
        image="/images/brand/hero-main.webp"
        height="h-[42vh] min-h-[16rem] md:h-[50vh]"
      />

      <section className="relative py-20 md:py-28">
        <div className="shell max-w-4xl">
          <RevealGroup as="ul" className="space-y-12" stagger={0.06}>
            {sections[active].map((section, i) => (
              <RevealItem key={i} as="li">
                <h2 className="type-display text-[1.0625rem] text-ink">
                  <span className="mr-4 text-[0.6875rem] tracking-[0.2em] text-brass">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {section.heading}
                </h2>
                <p className="type-body mt-4 whitespace-pre-line">{section.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </>
  );
}
