// lucide "maximize-2"
const EXPAND_ICON = '<svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="m21 3-7 7"/><path d="m3 21 7-7"/><path d="M9 21H3v-6"/></svg>';

function createExpandButton(document: Document) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'forum-table-expand';
  button.dataset.forumTableExpand = 'true';
  button.setAttribute('aria-label', '放大表格');
  button.title = '放大表格';
  button.innerHTML = EXPAND_ICON;
  return button;
}

/** The table an expand button belongs to, if the event came from one. */
export function getForumTableExpandTarget(target: EventTarget | null) {
  if (!(target instanceof Element)) return null;
  const button = target.closest<HTMLElement>('[data-forum-table-expand="true"]');
  return button?.closest('.forum-table-viewport')?.querySelector<HTMLTableElement>('table.forum-data-table') ?? null;
}

/** Enhance ordinary post tables without changing saved HTML or executable embeds. */
export function prepareForumTables(container: HTMLElement) {
  const cleanups: Array<() => void> = [];

  container.querySelectorAll<HTMLTableElement>('table').forEach((table) => {
    if (table.classList.contains('forum-punishment-table')) return;
    // Nested/single-cell tables are often authored layouts, not data tables.
    if (table.parentElement?.closest('table') || table.querySelector('table')) return;
    if (table.rows.length < 2 || !Array.from(table.rows).some((row) => row.cells.length > 1)) return;

    let wrapper = table.parentElement;
    if (!wrapper?.classList.contains('forum-table-scroll')) {
      wrapper = table.ownerDocument.createElement('div');
      wrapper.className = 'forum-table-scroll';
      wrapper.tabIndex = 0;
      table.before(wrapper);
      wrapper.append(table);
      table.classList.add('forum-data-table');

      // Track occupied columns so a rowspan does not freeze the second column
      // on the following row. A cell spanning several columns stays scrollable.
      let occupied: number[] = [];
      let section: HTMLElement | null = null;
      Array.from(table.rows).forEach((row, rowIndex) => {
        if (section !== row.parentElement) {
          section = row.parentElement;
          occupied = [];
        }
        let column = 0;
        Array.from(row.cells).forEach((cell) => {
          while ((occupied[column] ?? 0) > 0) column += 1;
          if (column === 0 && cell.colSpan === 1) cell.classList.add('forum-table-first-column');
          if (rowIndex === 0 && !table.tHead) cell.classList.add('forum-table-heading');
          const rowSpan = cell.rowSpan === 0 ? table.rows.length : cell.rowSpan;
          for (let offset = 0; offset < cell.colSpan; offset += 1) occupied[column + offset] = rowSpan;
          column += cell.colSpan;

          const content = table.ownerDocument.createElement('div');
          content.className = 'forum-table-cell-content';
          while (cell.firstChild) content.append(cell.firstChild);
          cell.append(content);
        });
        occupied = occupied.map((remaining) => Math.max(0, remaining - 1));
      });
    }

    const scrollContainer = wrapper;
    let viewport = scrollContainer.parentElement;
    if (!viewport?.classList.contains('forum-table-viewport')) {
      viewport = table.ownerDocument.createElement('div');
      viewport.className = 'forum-table-viewport';
      scrollContainer.before(viewport);
      viewport.append(scrollContainer);
    }
    if (!viewport.querySelector(':scope > .forum-table-expand')) viewport.append(createExpandButton(table.ownerDocument));
    const tableViewport = viewport;
    const syncScroll = () => {
      scrollContainer.classList.toggle('forum-table-scrolled', scrollContainer.scrollLeft > 0);
      tableViewport.classList.toggle(
        'forum-table-more-right',
        scrollContainer.scrollWidth - scrollContainer.clientWidth - scrollContainer.scrollLeft > 1,
      );
    };
    syncScroll();
    scrollContainer.addEventListener('scroll', syncScroll, { passive: true });
    const view = table.ownerDocument.defaultView;
    const observer = view?.ResizeObserver ? new view.ResizeObserver(syncScroll) : null;
    observer?.observe(scrollContainer);
    observer?.observe(table);
    view?.addEventListener('resize', syncScroll);
    cleanups.push(() => {
      scrollContainer.removeEventListener('scroll', syncScroll);
      observer?.disconnect();
      view?.removeEventListener('resize', syncScroll);
    });
  });

  return () => cleanups.forEach((cleanup) => cleanup());
}
