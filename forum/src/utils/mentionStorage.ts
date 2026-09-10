import { getPublicProfilePath } from './userRoutes.ts';

// The posting API sends mentions only for legacy [at] markers. Keep editor
// links for previews/drafts, and restore the markers at the publishing boundary.
export function normalizeMentionsForLegacyStorage(html: string) {
  if (!html.trim() || typeof document === 'undefined') return html;

  const template = document.createElement('template');
  template.innerHTML = html;
  template.content.querySelectorAll<HTMLAnchorElement>('a[href]').forEach((anchor) => {
    if (anchor.closest('pre, code')) return;
    const label = anchor.textContent?.trim() ?? '';
    if (!label.startsWith('@')) return;
    const username = label.slice(1);
    if (!username || /[\r\n\[\]]/.test(username)) return;

    try {
      const href = new URL(anchor.getAttribute('href')!, window.location.origin);
      const profile = new URL(getPublicProfilePath(username), window.location.origin);
      if (href.origin !== profile.origin || href.pathname !== profile.pathname || href.search) return;
    } catch {
      return;
    }

    anchor.replaceWith(document.createTextNode(`[at]${username}[/at]`));
  });
  return template.innerHTML;
}
