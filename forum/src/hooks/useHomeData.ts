import { useCallback, useEffect, useRef, useState } from 'react';
import {
  fetchGlobalPinnedThreads,
  fetchHomeCalendar,
  fetchHomeFeedPage,
  fetchHomeSignupActivities,
  isAbortError,
  reloadStaleHomeFeedPage,
  type HomeCalendarEvent,
  type HomeFeedPage,
  type HomeFeedSnapshot,
  type HomeSignupActivity,
  type HomeThread,
} from '../api/home';
import { readHomeHotCache, writeHomeHotCache } from '../utils/homeHotCache';

export type HomeDataStatus = 'error' | 'loading' | 'ready';

type CollectionState = {
  error: string;
  items: HomeThread[];
  status: HomeDataStatus;
};

type CalendarState = {
  error: string;
  items: HomeCalendarEvent[];
  status: HomeDataStatus;
};

type SignupState = {
  error: string;
  items: HomeSignupActivity[];
  status: HomeDataStatus;
};

const initialCollection: CollectionState = {
  error: '',
  items: [],
  status: 'loading',
};

const initialCalendar: CalendarState = {
  error: '',
  items: [],
  status: 'loading',
};

const initialSignup: SignupState = {
  error: '',
  items: [],
  status: 'loading',
};

const HOME_FEED_BATCH_SIZE = 15;
const COMPACT_HOME_FEED_BATCH_SIZE = 30;

function initialFeedLimit(compactMode: boolean) {
  return compactMode ? COMPACT_HOME_FEED_BATCH_SIZE : HOME_FEED_BATCH_SIZE;
}

function calendarDateKey(year: number, month: number, day: number) {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export function useHomeData(compactMode = false) {
  // A cached snapshot from the last visit is shown at once while the current one loads.
  const [initialCache] = useState(() => readHomeHotCache(compactMode));
  const [feed, setFeed] = useState<CollectionState>(() => (initialCache
    ? { error: '', items: initialCache.items.slice(0, initialFeedLimit(compactMode)), status: 'ready' }
    : initialCollection));
  const [feedHasMore, setFeedHasMore] = useState(() => !initialCache
    || initialCache.items.length < initialCache.total);
  const [feedRefreshing, setFeedRefreshing] = useState(false);
  const [feedLimit, setFeedLimit] = useState(HOME_FEED_BATCH_SIZE);
  const [compactFeedLimit, setCompactFeedLimit] = useState(COMPACT_HOME_FEED_BATCH_SIZE);
  const [pinned, setPinned] = useState<CollectionState>(initialCollection);
  const [calendar, setCalendar] = useState<CalendarState>(initialCalendar);
  const [signup, setSignup] = useState<SignupState>(initialSignup);
  const [requestVersion, setRequestVersion] = useState(0);
  const feedSnapshotRef = useRef<HomeFeedSnapshot | null>(null);
  const [calendarRange] = useState(() => {
    const currentYear = new Date().getFullYear();
    return {
      end: calendarDateKey(currentYear + 1, 12, 31),
      start: calendarDateKey(currentYear - 1, 1, 1),
    };
  });
  const calendarFullRequestedRef = useRef(false);
  const activeFeedLimit = compactMode ? compactFeedLimit : feedLimit;

  const retry = useCallback(() => setRequestVersion((version) => version + 1), []);
  const loadMore = useCallback(() => {
    if (compactMode) {
      setCompactFeedLimit((limit) => limit + COMPACT_HOME_FEED_BATCH_SIZE);
      return;
    }
    setFeedLimit((limit) => limit + HOME_FEED_BATCH_SIZE);
  }, [compactMode]);
  const loadFullCalendarForDate = useCallback((date: string) => {
    if (date >= calendarRange.start && date <= calendarRange.end) return;
    if (calendarFullRequestedRef.current) return;

    calendarFullRequestedRef.current = true;
    const controller = new AbortController();
    setCalendar((current) => ({ ...current, error: '', status: 'loading' }));
    void fetchHomeCalendar(controller.signal, { full: true }).then(
      (items) => setCalendar({ error: '', items, status: 'ready' }),
      (error: unknown) => {
        if (!isAbortError(error)) {
          setCalendar((current) => ({
            ...current,
            error: error instanceof Error ? error.message : '日历加载失败，请稍后重试。',
            status: 'error',
          }));
        }
      },
    );
  }, [calendarRange]);

  // A browser restoring the homepage from the back/forward cache runs no effects; reload it.
  useEffect(() => {
    const reloadRestoredPage = (event: PageTransitionEvent) => {
      if (!event.persisted) return;
      feedSnapshotRef.current = null;
      setRequestVersion((version) => version + 1);
    };
    window.addEventListener('pageshow', reloadRestoredPage);
    return () => window.removeEventListener('pageshow', reloadRestoredPage);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const request = {
      includeText: !compactMode,
      limit: activeFeedLimit,
      signal: controller.signal,
    };
    const firstBatch = activeFeedLimit === initialFeedLimit(compactMode);
    const cached = firstBatch && !feedSnapshotRef.current ? readHomeHotCache(compactMode) : null;
    let shownGeneration = cached?.generation;
    const showPage = (page: HomeFeedPage) => {
      feedSnapshotRef.current = page.snapshot;
      setFeedHasMore(page.hasMore);
      if (page.snapshot && firstBatch) writeHomeHotCache(compactMode, page.snapshot, activeFeedLimit);
      // The cached list is already on screen; replace it only with a newer snapshot.
      if (page.snapshot && page.snapshot.generation === shownGeneration) return;
      shownGeneration = page.snapshot?.generation;
      setFeed({ error: '', items: page.items, status: 'ready' });
    };
    if (cached) {
      setFeed({ error: '', items: cached.items.slice(0, activeFeedLimit), status: 'ready' });
      setFeedHasMore(cached.items.length < cached.total);
      setFeedRefreshing(true);
    } else {
      setFeed((current) => ({ ...current, error: '', status: 'loading' }));
    }

    void fetchHomeFeedPage({ ...request, previous: feedSnapshotRef.current }).then(
      async (page) => {
        showPage(page);
        if (!page.stale) return;
        // Show the outdated list at once, then swap in the rebuilt snapshot.
        try {
          showPage(await reloadStaleHomeFeedPage(request));
        } catch {
          // Keep the outdated list; the next visit refreshes again.
        }
      },
      (error: unknown) => {
        if (!isAbortError(error) && !cached) {
          setFeed((current) => ({
            ...current,
            error: error instanceof Error ? error.message : '帖子加载失败，请稍后重试。',
            status: 'error',
          }));
        }
      },
    ).finally(() => {
      if (!controller.signal.aborted) setFeedRefreshing(false);
    });

    return () => {
      controller.abort();
      setFeedRefreshing(false);
    };
  }, [activeFeedLimit, compactMode, requestVersion]);

  useEffect(() => {
    const controller = new AbortController();
    setPinned((current) => ({ ...current, error: '', status: 'loading' }));

    void fetchGlobalPinnedThreads(controller.signal).then(
      (items) => {
        setPinned({ error: '', items, status: 'ready' });
      },
      (error: unknown) => {
        if (!isAbortError(error)) {
          setPinned((current) => ({
            ...current,
            error: error instanceof Error ? error.message : '置顶内容加载失败，请稍后重试。',
            status: 'error',
          }));
        }
      },
    );

    return () => controller.abort();
  }, [requestVersion]);

  useEffect(() => {
    const controller = new AbortController();
    calendarFullRequestedRef.current = false;
    setCalendar((current) => ({ ...current, error: '', status: 'loading' }));

    void fetchHomeCalendar(controller.signal, {
      endDate: calendarRange.end,
      startDate: calendarRange.start,
    }).then(
      (items) => {
        if (!calendarFullRequestedRef.current) setCalendar({ error: '', items, status: 'ready' });
      },
      (error: unknown) => {
        if (!isAbortError(error)) {
          setCalendar((current) => ({
            ...current,
            error: error instanceof Error ? error.message : '日历加载失败，请稍后重试。',
            status: 'error',
          }));
        }
      },
    );

    return () => controller.abort();
  }, [calendarRange, requestVersion]);

  useEffect(() => {
    const controller = new AbortController();
    setSignup((current) => ({ ...current, error: '', status: 'loading' }));

    void fetchHomeSignupActivities(5, controller.signal).then(
      (items) => setSignup({ error: '', items, status: 'ready' }),
      (error: unknown) => {
        if (!isAbortError(error)) {
          setSignup((current) => ({
            ...current,
            error: error instanceof Error ? error.message : '活动报名加载失败，请稍后重试。',
            status: 'error',
          }));
        }
      },
    );

    return () => controller.abort();
  }, [requestVersion]);

  return { calendar, feed, feedHasMore, feedRefreshing, loadFullCalendarForDate, loadMore, pinned, retry, signup };
}
