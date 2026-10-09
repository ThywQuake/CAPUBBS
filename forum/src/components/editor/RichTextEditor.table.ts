// A table is a grid of cell ids: a merged cell is the same id repeated over a rectangle.
export type EditorTableCell = {
  html: string;
  originalText?: string;
  source?: HTMLTableCellElement;
  text: string;
};

export type EditorTable = {
  cells: Record<string, EditorTableCell>;
  grid: string[][];
  source?: HTMLTableElement;
};

export type TableRange = { bottom: number; left: number; right: number; top: number };

let nextCellId = 0;
const createCellId = () => `cell-${(nextCellId += 1)}`;
const emptyCell = (): EditorTableCell => ({ html: '', text: '' });

export function createEditorTable(rows: number, columns: number): EditorTable {
  const cells: EditorTable['cells'] = {};
  const grid = Array.from({ length: rows }, () => Array.from({ length: columns }, () => {
    const id = createCellId();
    cells[id] = emptyCell();
    return id;
  }));
  return { cells, grid };
}

function readCellText(cell: HTMLElement) {
  const copy = cell.cloneNode(true) as HTMLElement;
  copy.querySelectorAll('br').forEach((br) => br.replaceWith('\n'));
  copy.querySelectorAll('p, div, li, h1, h2, h3, h4, h5, h6').forEach((block) => {
    if (block.nextSibling) block.after('\n');
  });
  return (copy.textContent ?? '').replace(/ /g, ' ').trim();
}

export function readEditorTable(table: HTMLTableElement): EditorTable {
  const rows = Array.from(table.rows);
  const cells: EditorTable['cells'] = {};
  const grid: string[][] = rows.map(() => []);

  rows.forEach((row, rowIndex) => {
    let column = 0;
    Array.from(row.cells).forEach((cell) => {
      while (grid[rowIndex][column]) column += 1;
      const id = createCellId();
      const text = readCellText(cell);
      cells[id] = { html: cell.innerHTML, originalText: text, source: cell, text };
      const rowSpan = Math.min(Math.max(cell.rowSpan || 1, 1), rows.length - rowIndex);
      const colSpan = Math.max(cell.colSpan || 1, 1);
      for (let r = rowIndex; r < rowIndex + rowSpan; r += 1) {
        for (let c = column; c < column + colSpan; c += 1) {
          if (!grid[r][c]) grid[r][c] = id;
        }
      }
      column += colSpan;
    });
  });

  // Ragged rows: pad with empty cells so every row has the same width.
  const columns = Math.max(1, ...grid.map((row) => row.length));
  if (grid.length === 0) grid.push([]);
  grid.forEach((row) => {
    for (let c = 0; c < columns; c += 1) {
      if (row[c]) continue;
      const id = createCellId();
      cells[id] = emptyCell();
      row[c] = id;
    }
  });

  return { cells, grid, source: table };
}

export function buildEditorTableHtml(table: EditorTable) {
  const element = table.source
    ? table.source.cloneNode(false) as HTMLTableElement
    : document.createElement('table');
  const body = document.createElement('tbody');
  const seen = new Set<string>();

  table.grid.forEach((row, rowIndex) => {
    const tr = document.createElement('tr');
    row.forEach((id, columnIndex) => {
      if (seen.has(id)) return;
      seen.add(id);
      const { bottom, right } = getCellBounds(table.grid, id, rowIndex, columnIndex);
      const cell = table.cells[id];
      const td = cell.source
        ? cell.source.cloneNode(false) as HTMLTableCellElement
        : document.createElement('td');
      td.removeAttribute('rowspan');
      td.removeAttribute('colspan');
      if (bottom > rowIndex) td.rowSpan = bottom - rowIndex + 1;
      if (right > columnIndex) td.colSpan = right - columnIndex + 1;
      td.innerHTML = getCellHtml(cell);
      tr.append(td);
    });
    body.append(tr);
  });

  element.replaceChildren(body);
  return element.outerHTML;
}

function getCellHtml(cell: EditorTableCell) {
  return cell.text === cell.originalText ? cell.html : textToCellHtml(cell.text);
}

function textToCellHtml(text: string) {
  const holder = document.createElement('div');
  text.split('\n').forEach((line, index) => {
    if (index > 0) holder.append(document.createElement('br'));
    holder.append(line);
  });
  return holder.innerHTML;
}

function getCellBounds(grid: string[][], id: string, top: number, left: number) {
  let bottom = top;
  let right = left;
  while (grid[bottom + 1]?.[left] === id) bottom += 1;
  while (grid[top][right + 1] === id) right += 1;
  return { bottom, right };
}

// Grow a range until it fully contains every merged cell it touches.
export function expandTableRange(grid: string[][], range: TableRange): TableRange {
  let { bottom, left, right, top } = range;
  let changed = true;
  while (changed) {
    changed = false;
    for (let r = 0; r < grid.length; r += 1) {
      for (let c = 0; c < grid[r].length; c += 1) {
        const inside = r >= top && r <= bottom && c >= left && c <= right;
        if (inside) continue;
        const id = grid[r][c];
        const touches = grid.some((row, rr) => rr >= top && rr <= bottom
          && row.some((cellId, cc) => cc >= left && cc <= right && cellId === id));
        if (!touches) continue;
        top = Math.min(top, r);
        bottom = Math.max(bottom, r);
        left = Math.min(left, c);
        right = Math.max(right, c);
        changed = true;
      }
    }
  }
  return { bottom, left, right, top };
}

export function getTableRangeCellIds(grid: string[][], range: TableRange) {
  const ids = new Set<string>();
  for (let r = range.top; r <= range.bottom; r += 1) {
    for (let c = range.left; c <= range.right; c += 1) ids.add(grid[r][c]);
  }
  return [...ids];
}

function pruneCells(table: EditorTable): EditorTable {
  const used = new Set(table.grid.flat());
  const cells = Object.fromEntries(Object.entries(table.cells).filter(([id]) => used.has(id)));
  return { ...table, cells };
}

export function setTableCellText(table: EditorTable, id: string, text: string): EditorTable {
  return { ...table, cells: { ...table.cells, [id]: { ...table.cells[id], text } } };
}

// A new row keeps merged cells that span across the insertion line merged.
export function insertTableRow(table: EditorTable, index: number): EditorTable {
  const cells = { ...table.cells };
  const above = table.grid[index - 1];
  const below = table.grid[index];
  const row = table.grid[0].map((_, c) => {
    if (above && below && above[c] === below[c]) return above[c];
    const id = createCellId();
    cells[id] = emptyCell();
    return id;
  });
  const grid = [...table.grid.slice(0, index), row, ...table.grid.slice(index)];
  return { ...table, cells, grid };
}

export function insertTableColumn(table: EditorTable, index: number): EditorTable {
  const cells = { ...table.cells };
  const grid = table.grid.map((row) => {
    const left = row[index - 1];
    const right = row[index];
    let id: string;
    if (left && right && left === right) {
      id = left;
    } else {
      id = createCellId();
      cells[id] = emptyCell();
    }
    return [...row.slice(0, index), id, ...row.slice(index)];
  });
  return { ...table, cells, grid };
}

export function deleteTableRows(table: EditorTable, top: number, bottom: number): EditorTable {
  if (bottom - top + 1 >= table.grid.length) return table;
  return pruneCells({ ...table, grid: table.grid.filter((_, r) => r < top || r > bottom) });
}

export function deleteTableColumns(table: EditorTable, left: number, right: number): EditorTable {
  if (right - left + 1 >= table.grid[0].length) return table;
  return pruneCells({ ...table, grid: table.grid.map((row) => row.filter((_, c) => c < left || c > right)) });
}

export function mergeTableRange(table: EditorTable, range: TableRange): EditorTable {
  const ids = getTableRangeCellIds(table.grid, range);
  if (ids.length < 2) return table;
  const keep = table.grid[range.top][range.left];
  const filled = ids.map((id) => table.cells[id]).filter((cell) => cell.text);
  // Join the cells' HTML line by line so formatting inside existing cells survives the merge.
  const text = filled.map((cell) => cell.text).join('\n');
  const merged: EditorTableCell = {
    ...table.cells[keep],
    html: filled.map(getCellHtml).join('<br>'),
    originalText: text,
    text,
  };
  const grid = table.grid.map((row, r) => row.map((id, c) => (
    r >= range.top && r <= range.bottom && c >= range.left && c <= range.right ? keep : id
  )));
  return pruneCells({ ...table, cells: { ...table.cells, [keep]: merged }, grid });
}

export function splitTableCells(table: EditorTable, range: TableRange): EditorTable {
  const ids = new Set(getTableRangeCellIds(table.grid, range));
  const cells = { ...table.cells };
  const seen = new Set<string>();
  const grid = table.grid.map((row) => row.map((id) => {
    if (!ids.has(id)) return id;
    if (!seen.has(id)) {
      seen.add(id);
      return id;
    }
    const nextId = createCellId();
    cells[nextId] = emptyCell();
    return nextId;
  }));
  return { ...table, cells, grid };
}

export function hasMergedCell(table: EditorTable, range: TableRange) {
  const counts = new Map<string, number>();
  table.grid.flat().forEach((id) => counts.set(id, (counts.get(id) ?? 0) + 1));
  return getTableRangeCellIds(table.grid, range).some((id) => (counts.get(id) ?? 0) > 1);
}

// No merged cell crosses the line above row `index` (or left of column `index`).
function isRowBoundary(grid: string[][], index: number) {
  if (index <= 0 || index >= grid.length) return true;
  return grid[index].every((id, c) => grid[index - 1][c] !== id);
}

function isColumnBoundary(grid: string[][], index: number) {
  if (index <= 0 || index >= grid[0].length) return true;
  return grid.every((row) => row[index] !== row[index - 1]);
}

// The neighbouring block of rows (or columns) that can be swapped with [start, end], if any.
function findNeighbourBlock(size: number, isBoundary: (index: number) => boolean, start: number, end: number, step: -1 | 1) {
  if (!isBoundary(start) || !isBoundary(end + 1)) return null;
  if (step === 1) {
    if (end + 1 >= size) return null;
    let next = end + 2;
    while (next < size && !isBoundary(next)) next += 1;
    return { end: next - 1, start: end + 1 };
  }
  if (start <= 0) return null;
  let previous = start - 1;
  while (previous > 0 && !isBoundary(previous)) previous -= 1;
  return { end: start - 1, start: previous };
}

function swapBlocks<T>(items: T[], first: { end: number; start: number }, second: { end: number; start: number }) {
  const [a, b] = first.start < second.start ? [first, second] : [second, first];
  return [
    ...items.slice(0, a.start),
    ...items.slice(b.start, b.end + 1),
    ...items.slice(a.start, a.end + 1),
    ...items.slice(b.end + 1),
  ];
}

export function canMoveTableRows(table: EditorTable, range: TableRange, step: -1 | 1) {
  return findNeighbourBlock(table.grid.length, (i) => isRowBoundary(table.grid, i), range.top, range.bottom, step) !== null;
}

export function canMoveTableColumns(table: EditorTable, range: TableRange, step: -1 | 1) {
  return findNeighbourBlock(table.grid[0].length, (i) => isColumnBoundary(table.grid, i), range.left, range.right, step) !== null;
}

export function moveTableRows(table: EditorTable, range: TableRange, step: -1 | 1) {
  const block = { end: range.bottom, start: range.top };
  const neighbour = findNeighbourBlock(table.grid.length, (i) => isRowBoundary(table.grid, i), block.start, block.end, step);
  if (!neighbour) return null;
  const offset = step === 1 ? neighbour.end - neighbour.start + 1 : -(neighbour.end - neighbour.start + 1);
  return {
    range: { ...range, bottom: range.bottom + offset, top: range.top + offset },
    table: { ...table, grid: swapBlocks(table.grid, block, neighbour) },
  };
}

export function moveTableColumns(table: EditorTable, range: TableRange, step: -1 | 1) {
  const block = { end: range.right, start: range.left };
  const neighbour = findNeighbourBlock(table.grid[0].length, (i) => isColumnBoundary(table.grid, i), block.start, block.end, step);
  if (!neighbour) return null;
  const offset = step === 1 ? neighbour.end - neighbour.start + 1 : -(neighbour.end - neighbour.start + 1);
  return {
    range: { ...range, left: range.left + offset, right: range.right + offset },
    table: { ...table, grid: table.grid.map((row) => swapBlocks(row, block, neighbour)) },
  };
}
