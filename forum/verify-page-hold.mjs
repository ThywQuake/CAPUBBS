// Navigation keeps a static copy of the current page until the next page's
// blocking progress ends; background progress and fallback handovers do not release it.
import assert from 'node:assert/strict';
import { buildSync } from 'esbuild';
import { JSDOM } from 'jsdom';

const dom = new JSDOM(`<div id="root"><main id="feed" class="page">
  <a href="/x">old page</a><input name="mode" type="radio" checked>
  <iframe class="frame" srcdoc="<p>frame</p>"></iframe>
</main></div>`, { pretendToBeVisual: true, runScripts: 'outside-only', url: 'http://localhost/bbs/index/' });
const { window } = dom;
Object.assign(globalThis, { document: window.document, window });
Object.defineProperty(window, 'scrollY', { value: 120 });

const { outputFiles } = buildSync({
  bundle: true,
  format: 'iife',
  globalName: 'hold',
  platform: 'browser',
  stdin: {
    contents: `
      export { holdCurrentPage, releaseHeldPageWhenSettled } from './src/utils/pageHold';
      export { beginPageProgress } from './src/utils/pageProgress';
    `,
    loader: 'ts',
    resolveDir: new URL('.', import.meta.url).pathname,
  },
  write: false,
});
window.eval(outputFiles[0].text);
const { beginPageProgress, holdCurrentPage, releaseHeldPageWhenSettled } = window.hold;
const tick = () => new Promise((resolve) => setTimeout(resolve, 5));
const layer = () => document.querySelector('.forum-page-hold');
const root = document.getElementById('root');

// The copy is static: no ids, radio names or live frames, placed at the scroll offset.
holdCurrentPage();
assert.ok(layer(), 'Copy is shown');
assert.equal(layer().inert, true);
assert.equal(layer().querySelector('a').textContent, 'old page');
assert.equal(layer().querySelectorAll('[id], [name], iframe').length, 0);
assert.ok(layer().querySelector('div.frame'), 'Frames keep their space');
assert.equal(layer().firstElementChild.style.top, `${-window.scrollY}px`);
assert.ok(root.querySelector('iframe') && root.querySelector('#feed'), 'The live page is untouched');
assert.ok(window.document.getElementById('nprogress'), 'Bar starts at once');

// The new page renders with a loading state; the copy stays until it ends.
root.innerHTML = '<main>new page</main>';
const pageLoading = beginPageProgress();
releaseHeldPageWhenSettled();
await tick();
assert.ok(layer(), 'Held while the new page loads');

// A route fallback handing over to the page's own loading state in one commit.
pageLoading();
const dataLoading = beginPageProgress();
await tick();
assert.ok(layer(), 'Handover does not release');

// Background refreshes do not hold the page.
const background = beginPageProgress({ background: true });
dataLoading();
await tick();
assert.equal(layer(), null, 'Released when blocking progress ends');
assert.ok(window.document.getElementById('nprogress'), 'Bar continues for background work');
background();

// A page with nothing to load is revealed on the next task.
holdCurrentPage();
releaseHeldPageWhenSettled();
assert.ok(layer());
await tick();
assert.equal(layer(), null);

// Navigating again during a hold keeps the first copy.
holdCurrentPage();
const first = layer();
holdCurrentPage();
assert.equal(document.querySelectorAll('.forum-page-hold').length, 1);
assert.equal(layer(), first);
releaseHeldPageWhenSettled();
await tick();
assert.equal(layer(), null);

window.close();
console.log('Page hold verification passed: static copy, loading hold, handover, background refresh and repeat navigation.');
