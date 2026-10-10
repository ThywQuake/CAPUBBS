import type { HomeFeedSnapshot, HomeThread } from '../api/home';

// bootstrap/startup.js reads these keys to skip the startup page for returning visitors.
const HOME_HOT_CACHE_KEYS = {
  compact: 'capubbs-home-hot-compact',
  standard: 'capubbs-home-hot',
} as const;

function cacheKey(compactMode: boolean) {
  return compactMode ? HOME_HOT_CACHE_KEYS.compact : HOME_HOT_CACHE_KEYS.standard;
}

export function readHomeHotCache(compactMode: boolean): HomeFeedSnapshot | null {
  try {
    const value = window.localStorage.getItem(cacheKey(compactMode));
    if (!value) return null;
    const snapshot = JSON.parse(value) as Partial<HomeFeedSnapshot>;
    if (
      typeof snapshot.generation !== 'string'
      || typeof snapshot.fullUrl !== 'string'
      || typeof snapshot.total !== 'number'
      || !Array.isArray(snapshot.items)
      || !snapshot.items.every(isHomeThread)
    ) return null;
    return {
      dirty: snapshot.dirty === true,
      expiresAt: typeof snapshot.expiresAt === 'number' ? snapshot.expiresAt : 0,
      fullUrl: snapshot.fullUrl,
      generation: snapshot.generation,
      items: snapshot.items,
      total: snapshot.total,
    };
  } catch {
    return null;
  }
}

// Only the first batch is kept; later batches still come from the snapshot's full list.
export function writeHomeHotCache(compactMode: boolean, snapshot: HomeFeedSnapshot, limit: number) {
  try {
    window.localStorage.setItem(cacheKey(compactMode), JSON.stringify({
      ...snapshot,
      items: snapshot.items.slice(0, limit),
    }));
  } catch {
    // The cache only speeds up the next visit.
  }
}

function isHomeThread(value: unknown): value is HomeThread {
  if (!value || typeof value !== 'object') return false;
  const thread = value as Record<string, unknown>;
  return typeof thread.id === 'string' && typeof thread.href === 'string' && typeof thread.title === 'string';
}
