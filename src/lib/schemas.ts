import { z } from 'zod';

export const facilityIds = [
  'fuji-hotel',
  'nagoya-hotel',
  'toji-hotel',
  'fuji-restaurant',
  'geisyatei',
  'kyoto-restaurant',
  'other',
] as const;

export type FacilityId = (typeof facilityIds)[number];

export const facilities: {
  id: FacilityId;
  area: string;
  ja: string;
  en: string;
  kind: 'hotel' | 'food' | 'other';
}[] = [
  // Labels as on the live reservation form.
  { id: 'fuji-hotel', area: 'FUJI', ja: '【HOTEL】富士プレミアムホテル（Fuji Premium Hotel）', en: '[HOTEL] Fuji Premium Hotel', kind: 'hotel' },
  { id: 'nagoya-hotel', area: 'NAGOYA', ja: '【HOTEL】名古屋プレミアムホテル（Nagoya Premium Hotel）', en: '[HOTEL] Nagoya Premium Hotel', kind: 'hotel' },
  { id: 'toji-hotel', area: 'KYOTO', ja: '【HOTEL】京都, プレミアム東寺ホテル（Kyoto, Premium Toji Hotel）', en: '[HOTEL] Kyoto, Premium Toji Hotel', kind: 'hotel' },
  { id: 'fuji-restaurant', area: 'FUJI', ja: '【FOOD】富士エリアレストラン（Fujiyoshida, Kawaguchiko areas Restaurant)', en: '[FOOD] Fujiyoshida, Kawaguchiko areas Restaurant', kind: 'food' },
  { id: 'geisyatei', area: 'TOKYO', ja: '【FOOD&SHOW】東京浅草, 芸者亭（Tokyo Asakusa, Geisya-tei）', en: '[FOOD&SHOW] Tokyo Asakusa, Geisya-tei', kind: 'food' },
  { id: 'kyoto-restaurant', area: 'KYOTO', ja: '【FOOD】京都エリアレストラン（Kyoto areas Restaurant)', en: '[FOOD] Kyoto areas Restaurant', kind: 'food' },
  { id: 'other', area: '—', ja: 'その他', en: 'Other', kind: 'other' },
];

export const reservationSchema = z.object({
  facility: z.enum(facilityIds),
  date: z.string().min(1),
  nights: z.coerce.number().int().min(0).max(30).optional(),
  guests: z.coerce.number().int().min(1).max(500),
  name: z.string().trim().min(1).max(120),
  company: z.string().trim().max(160).optional().or(z.literal('')),
  phone: z.string().trim().min(6).max(40),
  email: z.email().max(200),
  message: z.string().trim().min(1).max(4000),
  agree: z.literal(true),
  locale: z.enum(['ja', 'en']).default('ja'),
  // Honeypot — real people never fill this in.
  website: z.string().max(200).optional(),
});

export type ReservationInput = z.infer<typeof reservationSchema>;

export const contactSchema = z.object({
  category: z.string().trim().min(1).max(80),
  name: z.string().trim().min(1).max(120),
  company: z.string().trim().min(1).max(160),
  email: z.email().max(200),
  phone: z.string().trim().min(6).max(40),
  detail: z.string().trim().min(1).max(4000),
  agree: z.literal(true),
  locale: z.enum(['ja', 'en']).default('ja'),
  website: z.string().max(200).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
