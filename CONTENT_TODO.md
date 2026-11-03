# VNT renewal — content to confirm with the client

Estimate 2026-10-26 (VNT_見積書). Items 1–4 (hotel common template + Fuji / Nagoya / Toji pages) are built in
`src/app/[locale]/hotels/[slug]/page.tsx` with copy in `src/content/hotelStay.ts`. Everything in `hotelStay.ts`
is OUR DRAFT for layout; replace it with the client's supplied copy and photos.

## Common template (all three hotels)
- Sections: 客室 / お食事 / アクセス / 周辺観光, with a sticky tab bar under the header.
- Room photos and specs (size m², capacity, beds) per room type.
- Dining: is breakfast offered at each hotel? Time, price, style (buffet / set). Draft only says "depends on plan".
- Check-in / check-out times and parking (fields exist, hidden until filled).
- Sightseeing photos (cards without a photo show an ink panel), final spot list and travel times.

## Fuji Premium Hotel
- Room types: only one room photo (fuji-02). Need the full list of room types.
- Travel times are estimates from the map (富士山駅 taxi ~7 min, 河口湖IC ~10 min, spots 5–15 min by car).

## Nagoya Premium Hotel
- Estimate note: the current Nagoya URL looks the same as Fuji's — confirm the correct live URL.
- Walking time from 国府宮駅 (draft: ~5 min), Centrair time (draft: ~1 h).

## Premium Toji
- Room types: two photos (toji-04 pagoda view, toji-08 twin). Booking.com lists a restaurant/breakfast — confirm.
- Kyoto Station walk (draft ~20 min) / 近鉄東寺駅 (draft ~10 min).
