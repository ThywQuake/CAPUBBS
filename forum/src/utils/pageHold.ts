import { beginPageProgress, whenPageSettled } from './pageProgress';

// While the next page loads, a static copy of the current one stays on screen. The
// real page underneath is already the new one, so nothing stale keeps running.
const HOLD_TIMEOUT_MS = 15_000;
const LIVE_MEDIA_SELECTOR = 'iframe, video, audio, embed, object';

let layer: HTMLElement | null = null;
let endNavigationProgress: (() => void) | undefined;
let cancelSettled: (() => void) | undefined;
let timeout: number | undefined;

export function holdCurrentPage() {
  const root = document.getElementById('root');
  // A navigation during a hold keeps showing the page the reader last saw.
  if (layer || !root?.firstElementChild) {
    endNavigationProgress ??= beginPageProgress();
    return;
  }

  const copy = root.cloneNode(true) as HTMLElement;
  copy.removeAttribute('id');
  // Duplicate ids and radio names would let the copy answer lookups meant for the new page.
  copy.querySelectorAll('[id]').forEach((element) => element.removeAttribute('id'));
  copy.querySelectorAll('[name]').forEach((element) => element.removeAttribute('name'));
  replaceLiveMedia(root, copy);
  copyCanvases(root, copy);

  const content = document.createElement('div');
  content.className = 'forum-page-hold-content';
  content.style.top = `${-window.scrollY}px`;
  content.style.left = `${-window.scrollX}px`;
  content.append(copy);

  layer = document.createElement('div');
  layer.className = 'forum-page-hold';
  layer.setAttribute('aria-hidden', 'true');
  layer.inert = true;
  layer.append(content);
  document.body.append(layer);
  endNavigationProgress = beginPageProgress();
}

// Called once the new location has rendered; the copy goes when its loading ends.
export function releaseHeldPageWhenSettled() {
  if (!endNavigationProgress) return;
  const end = endNavigationProgress;
  endNavigationProgress = undefined;
  cancelSettled?.();
  cancelSettled = whenPageSettled(releaseHeldPage);
  if (timeout === undefined) timeout = window.setTimeout(releaseHeldPage, HOLD_TIMEOUT_MS);
  end();
}

function releaseHeldPage() {
  cancelSettled?.();
  cancelSettled = undefined;
  if (timeout !== undefined) window.clearTimeout(timeout);
  timeout = undefined;
  layer?.remove();
  layer = null;
}

// Copies of frames and media would load and run again; keep only their space.
function replaceLiveMedia(source: HTMLElement, copy: HTMLElement) {
  const originals = source.querySelectorAll(LIVE_MEDIA_SELECTOR);
  copy.querySelectorAll(LIVE_MEDIA_SELECTOR).forEach((element, index) => {
    const original = originals[index];
    const placeholder = document.createElement('div');
    placeholder.className = element.className;
    if (original) {
      const { height, width } = original.getBoundingClientRect();
      placeholder.style.width = `${width}px`;
      placeholder.style.height = `${height}px`;
    }
    element.replaceWith(placeholder);
  });
}

function copyCanvases(source: HTMLElement, copy: HTMLElement) {
  const originals = source.querySelectorAll('canvas');
  copy.querySelectorAll('canvas').forEach((canvas, index) => {
    try {
      canvas.getContext('2d')?.drawImage(originals[index], 0, 0);
    } catch {
      // A tainted or WebGL canvas stays blank in the copy.
    }
  });
}
