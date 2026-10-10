import {
  formatRelativeTime,
  type HomeCalendarEvent,
  type HomeFeedSnapshot,
  type HomeSignupActivity,
  type HomeThread,
} from '../api/home';

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
      items: snapshot.items.map(withCurrentTimeLabel),
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

// Relative times were formatted when the list was saved.
function withCurrentTimeLabel(thread: HomeThread): HomeThread {
  return { ...thread, timeLabel: formatRelativeTime(thread.timestamp) };
}

function isHomeThread(value: unknown): value is HomeThread {
  if (!value || typeof value !== 'object') return false;
  const thread = value as Record<string, unknown>;
  return typeof thread.id === 'string' && typeof thread.href === 'string' && typeof thread.title === 'string'
    && typeof thread.timestamp === 'string';
}

const HOME_PINNED_CACHE_KEY = 'capubbs-home-pinned';
const HOME_CALENDAR_CACHE_KEY = 'capubbs-home-calendar';
const HOME_SIGNUP_CACHE_KEY = 'capubbs-home-signup';

export function readHomePinnedCache(): HomeThread[] | null {
  const items = readJson(HOME_PINNED_CACHE_KEY);
  return Array.isArray(items) && items.every(isHomeThread) ? items.map(withCurrentTimeLabel) : null;
}

export function writeHomePinnedCache(items: HomeThread[]) {
  writeJson(HOME_PINNED_CACHE_KEY, items);
}

export function readHomeSignupCache(): HomeSignupActivity[] | null {
  const items = readJson(HOME_SIGNUP_CACHE_KEY);
  return Array.isArray(items) && items.every(isSignupActivity) ? items : null;
}

export function writeHomeSignupCache(items: HomeSignupActivity[]) {
  writeJson(HOME_SIGNUP_CACHE_KEY, items);
}

// The calendar cache belongs to one date range; a new year starts without it.
export function readHomeCalendarCache(rangeKey: string): HomeCalendarEvent[] | null {
  const value = readJson(HOME_CALENDAR_CACHE_KEY) as { items?: unknown; range?: unknown } | null;
  if (!value || value.range !== rangeKey || !Array.isArray(value.items)) return null;
  return value.items.every(isCalendarEvent) ? value.items : null;
}

export function writeHomeCalendarCache(rangeKey: string, items: HomeCalendarEvent[]) {
  writeJson(HOME_CALENDAR_CACHE_KEY, { items, range: rangeKey });
}

function readJson(key: string): unknown {
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) as unknown : null;
  } catch {
    return null;
  }
}

function writeJson(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // The cache only speeds up the next visit.
  }
}

function isCalendarEvent(value: unknown): value is HomeCalendarEvent {
  if (!value || typeof value !== 'object') return false;
  const event = value as Record<string, unknown>;
  return typeof event.id === 'string' && typeof event.date === 'string' && typeof event.title === 'string';
}

function isSignupActivity(value: unknown): value is HomeSignupActivity {
  if (!value || typeof value !== 'object') return false;
  const activity = value as Record<string, unknown>;
  return typeof activity.id === 'string' && typeof activity.href === 'string' && typeof activity.title === 'string';
}
