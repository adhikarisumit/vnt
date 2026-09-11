import type { L10n } from '@/lib/i18n';

export const greeting = {
  title: { ja: '代表挨拶', en: 'Message from the President' } satisfies L10n,
  body: {
    ja: '平素より格別のご高配を賜り、誠にありがとうございます。VNT株式会社を代表し、日頃よりご支援くださる大切なパートナーの皆様、お客様へ、心より感謝申し上げますとともに、皆様のご健勝とご多幸、そして更なるご発展をお祈り申し上げます。\n\n私たちVNTは、お客様からの信頼を何よりも大切にし、日本と世界をつなぐかけ橋として、皆様のニーズに応える商品・サービスの提供に努めてまいりました。現在は、健康食品、化粧品、衣料品、家電製品などを国内外へ展開しております。\n\n今後も、より良いサービスのご提供と、高品質な製品ラインナップの充実に尽力し、社会全体への貢献を目指してまいります。今後とも変わらぬご愛顧を賜りますよう、何卒よろしくお願い申し上げます。',
    en: 'Thank you for the consideration you have long shown us. On behalf of VNT Co., Ltd., I would like to express my sincere gratitude to the partners and customers who support us, and to wish you continued health, happiness and success.\n\nAt VNT, trust matters to us above everything else. Working as a bridge between Japan and the wider world, we have set out to provide the products and services our customers actually need — today spanning health foods, cosmetics, apparel and home appliances, both at home and abroad.\n\nWe will keep working to improve our service and deepen our product range, and through that to contribute to society as a whole. We look forward to your continued support.',
  } satisfies L10n,
  signature: { ja: '代表取締役　久野　哲', en: 'Satoshi Kuno, President & Representative Director' } satisfies L10n,
};

export type Fact = { label: L10n; value: L10n };

export const companyFacts: Fact[] = [
  {
    label: { ja: '会社名', en: 'Company name' },
    value: { ja: 'VNT株式会社', en: 'VNT Co., Ltd.' },
  },
  {
    label: { ja: '創立', en: 'Founded' },
    value: { ja: '平成28年3月', en: 'March 2016' },
  },
  {
    label: { ja: '代表取締役', en: 'Representative Director' },
    value: { ja: '久野　哲', en: 'Satoshi Kuno' },
  },
  {
    label: { ja: '所在地', en: 'Head office' },
    value: {
      ja: '神奈川県横浜市中区弥生町2-15-1 ストークタワー大通り公園III',
      en: 'Stork Tower Odori Koen III, 2-15-1 Yayoicho, Naka-ku, Yokohama, Kanagawa',
    },
  },
  {
    label: { ja: '資本金', en: 'Capital' },
    value: { ja: '10,000,000円', en: 'JPY 10,000,000' },
  },
  {
    label: { ja: 'TEL', en: 'Tel' },
    value: { ja: '0120-202-684', en: '0120-202-684' },
  },
  {
    label: { ja: 'FAX', en: 'Fax' },
    value: { ja: '+81-45-341-3456', en: '+81-45-341-3456' },
  },
  {
    label: { ja: 'Email', en: 'Email' },
    value: { ja: 'info@vntgroup.co.jp', en: 'info@vntgroup.co.jp' },
  },
  {
    label: { ja: '取引銀行', en: 'Bank' },
    value: { ja: 'みずほ銀行　高砂支店', en: 'Mizuho Bank, Takasago Branch' },
  },
];

/** Revenue by fiscal year (December close), in JPY. */
export const revenue = [
  { year: { ja: '令和4年度 12月期', en: 'FY2022 (Dec)' } satisfies L10n, value: 620_000_000 },
  { year: { ja: '令和5年度 12月期', en: 'FY2023 (Dec)' } satisfies L10n, value: 449_000_000 },
  { year: { ja: '令和6年度 12月期', en: 'FY2024 (Dec)' } satisfies L10n, value: 520_000_000 },
];

export const businessScope: L10n[] = [
  { ja: '食品及び健康食品等の販売、通信販売及び輸出入', en: 'Sale, mail order and import/export of foods and health foods' },
  { ja: '観光土産品の販売、紹介及び輸出入', en: 'Sale, introduction and import/export of tourist souvenirs' },
  {
    ja: '衣類、日用雑貨品、アクセサリー及び家具等の製造、販売及び輸出入',
    en: 'Manufacture, sale and import/export of apparel, household goods, accessories and furniture',
  },
  { ja: '貿易業のコンサルティング', en: 'Trade consulting' },
  { ja: '国際留学のコンサルティング', en: 'International study-abroad consulting' },
  {
    ja: 'メディカルツーリズム（医療観光）に関する情報提供サービス及びツアーの企画及び運営',
    en: 'Information services, tour planning and operation for medical tourism',
  },
  { ja: 'ドラッグストア及びコンビニエンスストアーの経営', en: 'Operation of drugstores and convenience stores' },
  { ja: 'イベントの企画、制作、管理、運営及びそれらの受託', en: 'Planning, production, management and operation of events' },
  {
    ja: '医薬品、医薬部外品及び化粧品の開発、製造、販売及び輸出入',
    en: 'Development, manufacture, sale and import/export of pharmaceuticals, quasi-drugs and cosmetics',
  },
  { ja: '酒類及びたばこの販売及び輸出入', en: 'Sale and import/export of alcohol and tobacco' },
  {
    ja: '飲食店、レストラン、カフェバー、カラオケ等の企画、設計及び経営並びにそれらのコンサルティング',
    en: 'Planning, design, operation and consulting for restaurants, cafés, bars and karaoke venues',
  },
  {
    ja: '写真及び映像の制作スタジオの運営並びに撮影用機材のレンタル',
    en: 'Operation of photo and video production studios, and rental of production equipment',
  },
  { ja: '古物営業法に基づく古物商', en: 'Secondhand goods dealing under the Antique Dealings Act' },
];

export const licenses: L10n[] = [
  { ja: '輸出物品販売場許可取得　販売場番号：葛法第5224号', en: 'Tax-free shop licence — No. Katsuho 5224' },
  { ja: '化粧品製造販売業許可書　許可番号：13C0X11788', en: 'Cosmetics manufacturing & sales licence — No. 13C0X11788' },
  { ja: '日本輸出入者標準コード：P002A0070000', en: 'Japan Standard Importer/Exporter Code — P002A0070000' },
  {
    ja: '古物商許可証　東京都公安委員会　第307762016250号',
    en: 'Antique dealer licence — Tokyo Metropolitan Public Safety Commission No. 307762016250',
  },
  { ja: '酒類販売業免許　葛法第499号', en: 'Liquor sales licence — No. Katsuho 499' },
];
