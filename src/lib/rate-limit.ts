const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

const hits = new Map<string, number[]>();

/**
 * Per-instance sliding window. Enough to blunt casual form spam; swap for a
 * shared store (Redis/Upstash) if the site is ever scaled across regions.
 */
export function rateLimit(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);

  if (recent.length >= MAX_REQUESTS) {
    hits.set(key, recent);
    return false;
  }

  recent.push(now);
  hits.set(key, recent);

  // Opportunistic cleanup so the map cannot grow without bound.
  if (hits.size > 5000) {
    for (const [k, times] of hits) {
      if (!times.some((t) => now - t < WINDOW_MS)) hits.delete(k);
    }
  }

  return true;
}
