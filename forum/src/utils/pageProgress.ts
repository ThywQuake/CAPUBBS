import NProgress from 'nprogress';

NProgress.configure({ showSpinner: false });

// Blocking progress means the page has nothing to show yet; navigation keeps the
// previous page on screen until it ends. Background progress only drives the bar.
let blockingCount = 0;
let backgroundCount = 0;
let settleTimer: number | undefined;
const settledListeners = new Set<() => void>();

export function beginPageProgress({ background = false }: { background?: boolean } = {}) {
  if (background) backgroundCount += 1;
  else blockingCount += 1;
  if (settleTimer !== undefined) {
    window.clearTimeout(settleTimer);
    settleTimer = undefined;
  }
  if (!NProgress.isStarted()) NProgress.start();

  let ended = false;
  return () => {
    if (ended) return;
    ended = true;
    if (background) backgroundCount -= 1;
    else blockingCount -= 1;
    scheduleSettle();
  };
}

// A route fallback and the page replacing it hand over within one commit; wait a
// task so that handover does not finish the bar or reveal the page early.
function scheduleSettle() {
  if (settleTimer !== undefined) window.clearTimeout(settleTimer);
  settleTimer = window.setTimeout(() => {
    settleTimer = undefined;
    if (blockingCount === 0) {
      const listeners = [...settledListeners];
      settledListeners.clear();
      listeners.forEach((listener) => listener());
    }
    if (blockingCount === 0 && backgroundCount === 0) NProgress.done();
  }, 0);
}

export function whenPageSettled(listener: () => void) {
  settledListeners.add(listener);
  scheduleSettle();
  return () => {
    settledListeners.delete(listener);
  };
}
