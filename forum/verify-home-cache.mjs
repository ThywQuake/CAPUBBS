// Renders useHomeData against a mocked server: cached home data must show at once,
// stay in place when unchanged, be replaced when changed and survive failed refreshes.
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { buildSync } from 'esbuild';
import { JSDOM } from 'jsdom';

const forumDirectory = dirname(fileURLToPath(import.meta.url));
const dom = new JSDOM('<div id="root"></div>', { url: 'http://localhost/bbs/index/' });
Object.assign(globalThis, {
  document: dom.window.document,
  DOMParser: dom.window.DOMParser,
  Node: dom.window.Node,
  IS_REACT_ACT_ENVIRONMENT: true,
  localStorage: dom.window.localStorage,
  window: dom.window,
});
Object.defineProperty(globalThis, 'navigator', { configurable: true, value: dom.window.navigator });

const server = { fail: false, gate: Promise.resolve(), version: 1 };
const year = new Date().getFullYear();
dom.window.fetch = globalThis.fetch = async (input, init = {}) => {
  await server.gate;
  if (server.fail) throw new TypeError('offline');
  const url = new URL(String(input), 'http://localhost');
  const v = server.version;
  const json = (body) => ({ ok: true, status: 200, json: async () => structuredClone(body) });
  if (url.pathname === '/api/cache/home-hot/hot-15.json') {
    return json({
      code: 0,
      data: [1, 2, 3].map((tid) => ({ bid: '2', tid: String(tid), title: `hot-${v}-${tid}`, text: 'body', timestamp: '1700000000' })),
      meta: { dirty: false, expiresAt: 4_000_000_000, generation: `2026101012000${v}-abcdef012${v}`, kind: 'standard', total: 3 },
    });
  }
  if (url.pathname === '/assets/api/getCalendar.php') {
    return json([{ date: `${year}-10-12 09:00`, id: 'c1', title: `calendar-${v}` }]);
  }
  if (url.pathname === '/api/api.php') {
    const ask = new URLSearchParams(String(init.body)).get('ask');
    if (ask === 'global_top') {
      return json({ code: 0, data: [{ bid: '2', tid: '9', title: `pinned-${v}`, timestamp: '1700000000' }] });
    }
    if (ask === 'activity_signup_list') {
      return json({ code: 0, data: [{
        activity_ends_on: `${year}-10-20`, activity_id: '5', activity_starts_on: `${year}-10-19`, bid: '2',
        ends_at: '1900000000', name: `signup-${v}`, signup_count: '3', starts_at: '1700000000', tid: '7',
      }] });
    }
  }
  throw new Error(`Unexpected request ${url}`);
};

const outputDirectory = mkdtempSync(join(tmpdir(), 'capubbs-home-cache-'));
const entry = join(outputDirectory, 'entry.mjs');
try {
  const { outputFiles } = buildSync({
    bundle: true,
    define: { 'import.meta.env': '{}', 'process.env.NODE_ENV': '"development"' },
    format: 'esm',
    platform: 'browser',
    stdin: {
      contents: `
        export { act, createElement } from 'react';
        export { createRoot } from 'react-dom/client';
        export { useHomeData } from './src/hooks/useHomeData';
      `,
      loader: 'ts',
      resolveDir: forumDirectory,
    },
    write: false,
  });
  writeFileSync(entry, outputFiles[0].text);
  const { act, createElement, createRoot, useHomeData } = await import(pathToFileURL(entry).href);

  async function mount() {
    const renders = [];
    let release;
    server.gate = new Promise((resolve) => { release = resolve; });
    function Probe() {
      renders.push(useHomeData(false));
      return null;
    }
    const root = createRoot(document.getElementById('root'));
    await act(async () => root.render(createElement(Probe)));
    const pending = renders.at(-1);
    await act(async () => {
      release();
      await new Promise((resolve) => setTimeout(resolve, 20));
    });
    const settled = renders.at(-1);
    await act(async () => root.unmount());
    return { pending, renders, settled };
  }

  const titles = (state) => state.items.map((item) => item.title).join();
  const sections = ['feed', 'pinned', 'calendar', 'signup'];

  // First visit: nothing cached, every section loads and is saved.
  let run = await mount();
  for (const name of sections) assert.equal(run.pending[name].status, 'loading', `${name} loads on first visit`);
  assert.equal(run.pending.refreshing, false);
  assert.equal(titles(run.settled.feed), 'hot-1-1,hot-1-2,hot-1-3');
  assert.equal(titles(run.settled.pinned), 'pinned-1');
  assert.equal(titles(run.settled.calendar), 'calendar-1');
  assert.equal(titles(run.settled.signup), 'signup-1');
  for (const key of ['capubbs-home-hot', 'capubbs-home-pinned', 'capubbs-home-calendar', 'capubbs-home-signup']) {
    assert.ok(localStorage.getItem(key), `${key} is saved`);
  }

  // Unchanged data: the cached sections show at once and are not replaced.
  const hot = JSON.parse(localStorage.getItem('capubbs-home-hot'));
  hot.items[0].timeLabel = 'stale';
  localStorage.setItem('capubbs-home-hot', JSON.stringify(hot));
  run = await mount();
  assert.ok(run.renders.every((state) => sections.every((name) => state[name].status === 'ready')), 'Never shows loading with a cache');
  assert.equal(run.pending.refreshing, true);
  assert.notEqual(run.pending.feed.items[0].timeLabel, 'stale', 'Relative times are recomputed');
  assert.equal(run.settled.refreshing, false);
  for (const name of sections) assert.equal(run.settled[name], run.pending[name], `${name} is kept when unchanged`);

  // Changed data: cached sections show first, then the new data replaces them.
  server.version = 2;
  run = await mount();
  assert.equal(titles(run.pending.feed), 'hot-1-1,hot-1-2,hot-1-3');
  assert.equal(titles(run.pending.signup), 'signup-1');
  assert.equal(titles(run.settled.feed), 'hot-2-1,hot-2-2,hot-2-3');
  assert.equal(titles(run.settled.pinned), 'pinned-2');
  assert.equal(titles(run.settled.calendar), 'calendar-2');
  assert.equal(titles(run.settled.signup), 'signup-2');
  assert.equal(run.settled.refreshing, false);

  // Failed refresh: the cached sections stay without an error.
  server.fail = true;
  run = await mount();
  for (const name of sections) {
    assert.equal(run.settled[name].status, 'ready', `${name} stays ready`);
    assert.equal(run.settled[name].error, '');
  }
  assert.equal(titles(run.settled.feed), 'hot-2-1,hot-2-2,hot-2-3');
  assert.equal(titles(run.settled.signup), 'signup-2');
  assert.equal(run.settled.refreshing, false);

  // No cache and no server: the error states remain.
  localStorage.clear();
  run = await mount();
  for (const name of sections) assert.equal(run.settled[name].status, 'error', `${name} reports the failure`);
} finally {
  rmSync(outputDirectory, { force: true, recursive: true });
  dom.window.close();
}

console.log('Home cache verification passed: first visit, unchanged, changed, failed refresh and no cache.');
// React's scheduler keeps a MessageChannel open in the bundle.
process.exit(0);
