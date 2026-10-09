import { DialogLayer } from '../layout/DialogPresence';
import {
  AlignCenter, AlignLeft, AlignRight,
  ArrowDown, ArrowLeft, ArrowRight, ArrowUp, BetweenHorizontalEnd, BetweenHorizontalStart,
  BetweenVerticalEnd, BetweenVerticalStart, Table, TableCellsMerge, TableCellsSplit, Trash2, X,
} from 'lucide-react';
import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type PointerEvent, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import type { LucideIcon } from 'lucide-react';
import {
  buildEditorTableHtml,
  canMoveTableColumns,
  canMoveTableRows,
  createEditorTable,
  deleteTableColumns,
  deleteTableRows,
  expandTableRange,
  getTableRangeCellIds,
  hasMergedCell,
  insertTableColumn,
  insertTableRow,
  mergeTableRange,
  moveTableColumns,
  moveTableRows,
  readEditorTable,
  setTableCellsAlign,
  setTableCellText,
  splitTableCells,
  type EditorTable,
  type TableCellAlign,
  type TableRange,
} from './RichTextEditor.table';

type CellPosition = { column: number; row: number };

export function TableDialog({
  onCancel,
  onSave,
  sourceTable,
}: {
  onCancel: () => void;
  onSave: (html: string) => void;
  sourceTable?: HTMLTableElement | null;
}) {
  const isEditing = Boolean(sourceTable);
  const [table, setTable] = useState<EditorTable>(() => (
    sourceTable ? readEditorTable(sourceTable) : createEditorTable(3, 3)
  ));
  const [anchor, setAnchor] = useState<CellPosition>({ column: 0, row: 0 });
  const [focus, setFocus] = useState<CellPosition>({ column: 0, row: 0 });
  const draggingRef = useRef(false);
  const gridRef = useRef<HTMLTableElement>(null);
  const rows = table.grid.length;
  const columns = table.grid[0].length;

  const range = expandTableRange(table.grid, {
    bottom: Math.min(Math.max(anchor.row, focus.row), rows - 1),
    left: Math.min(Math.min(anchor.column, focus.column), columns - 1),
    right: Math.min(Math.max(anchor.column, focus.column), columns - 1),
    top: Math.min(Math.min(anchor.row, focus.row), rows - 1),
  });
  const selectedIds = new Set(getTableRangeCellIds(table.grid, range));
  const canMerge = selectedIds.size > 1;
  const canSplit = hasMergedCell(table, range);
  const selectedAligns = new Set([...selectedIds].map((id) => table.cells[id].align ?? 'left'));
  const currentAlign = selectedAligns.size === 1 ? [...selectedAligns][0] : null;

  useEffect(() => {
    document.body.classList.add('gallery-dialog-open');

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') onCancel();
    }
    function stopDragging() {
      draggingRef.current = false;
    }

    document.addEventListener('keydown', closeOnEscape);
    document.addEventListener('pointerup', stopDragging);
    return () => {
      document.body.classList.remove('gallery-dialog-open');
      document.removeEventListener('keydown', closeOnEscape);
      document.removeEventListener('pointerup', stopDragging);
    };
  }, [onCancel]);

  function selectRange(next: EditorTable, nextRange: TableRange) {
    setTable(next);
    setAnchor({ column: nextRange.left, row: nextRange.top });
    setFocus({ column: nextRange.right, row: nextRange.bottom });
  }

  function selectCell(position: CellPosition) {
    setAnchor(position);
    setFocus(position);
  }

  function focusCell(position: CellPosition) {
    window.requestAnimationFrame(() => {
      gridRef.current
        ?.querySelector<HTMLTextAreaElement>(`textarea[data-row="${position.row}"][data-column="${position.column}"]`)
        ?.focus();
    });
  }

  // Enter goes to the cell below (Shift+Enter keeps the line break); on the last row it stays put.
  function handleCellKeyDown(event: ReactKeyboardEvent<HTMLTextAreaElement>, id: string, position: CellPosition) {
    if (event.key !== 'Enter' || event.shiftKey || event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.nativeEvent.isComposing) return;
    event.preventDefault();
    let below = position.row;
    while (table.grid[below + 1]?.[position.column] === id) below += 1;
    const nextId = table.grid[below + 1]?.[position.column];
    if (!nextId) return;
    const row = table.grid.findIndex((cells) => cells.includes(nextId));
    const next = { column: table.grid[row].indexOf(nextId), row };
    selectCell(next);
    focusCell(next);
  }

  function handleCellPointerDown(event: PointerEvent<HTMLTableCellElement>, position: CellPosition) {
    if (event.button !== 0) return;
    if (event.shiftKey) {
      event.preventDefault();
      setFocus(position);
    } else {
      selectCell(position);
    }
    draggingRef.current = true;
  }

  function handleGridPointerMove(event: PointerEvent<HTMLTableElement>) {
    if (!draggingRef.current) return;
    const cell = document.elementFromPoint(event.clientX, event.clientY)?.closest<HTMLElement>('td[data-row]');
    if (!cell || !event.currentTarget.contains(cell)) return;
    const position = { column: Number(cell.dataset.column), row: Number(cell.dataset.row) };
    if (position.row === focus.row && position.column === focus.column) return;
    setFocus(position);
    // Selecting several cells: drop the text selection the drag started inside the first textarea.
    if (position.row !== anchor.row || position.column !== anchor.column) window.getSelection()?.removeAllRanges();
  }

  function insertRow(where: 'above' | 'below') {
    const index = where === 'above' ? range.top : range.bottom + 1;
    const next = insertTableRow(table, index);
    const shift = where === 'above' ? 1 : 0;
    selectRange(next, { ...range, bottom: range.bottom + shift, top: range.top + shift });
  }

  function insertColumn(where: 'left' | 'right') {
    const index = where === 'left' ? range.left : range.right + 1;
    const next = insertTableColumn(table, index);
    const shift = where === 'left' ? 1 : 0;
    selectRange(next, { ...range, left: range.left + shift, right: range.right + shift });
  }

  function deleteRows() {
    const next = deleteTableRows(table, range.top, range.bottom);
    const row = Math.min(range.top, next.grid.length - 1);
    selectRange(next, { bottom: row, left: range.left, right: range.left, top: row });
  }

  function deleteColumns() {
    const next = deleteTableColumns(table, range.left, range.right);
    const column = Math.min(range.left, next.grid[0].length - 1);
    selectRange(next, { bottom: range.top, left: column, right: column, top: range.top });
  }

  function moveRows(step: -1 | 1) {
    const moved = moveTableRows(table, range, step);
    if (moved) selectRange(moved.table, moved.range);
  }

  function moveColumns(step: -1 | 1) {
    const moved = moveTableColumns(table, range, step);
    if (moved) selectRange(moved.table, moved.range);
  }

  function merge() {
    selectRange(mergeTableRange(table, range), range);
    focusCell({ column: range.left, row: range.top });
  }

  function split() {
    selectRange(splitTableCells(table, range), range);
  }

  function align(value: TableCellAlign) {
    setTable(setTableCellsAlign(table, [...selectedIds], value));
  }

  const renderedIds = new Set<string>();

  return createPortal(
    <DialogLayer className="gallery-dialog-backdrop" onClick={onCancel} role="presentation">
      <section
        aria-labelledby="table-dialog-title"
        aria-modal="true"
        className="gallery-dialog table-dialog"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <header>
          <span><Table size={18} /></span>
          <h2 id="table-dialog-title">{isEditing ? '编辑表格' : '插入表格'}</h2>
          <button aria-label="关闭表格编辑" onClick={onCancel} type="button"><X size={18} /></button>
        </header>

        <div className="table-dialog-toolbar" role="toolbar" aria-label="表格操作">
          <ToolGroup label="行">
            <ToolButton icon={BetweenHorizontalStart} label="上方插入行" onClick={() => insertRow('above')} text="上方插入" />
            <ToolButton icon={BetweenHorizontalEnd} label="下方插入行" onClick={() => insertRow('below')} text="下方插入" />
            <ToolButton disabled={!canMoveTableRows(table, range, -1)} icon={ArrowUp} label="上移行" onClick={() => moveRows(-1)} text="上移" />
            <ToolButton disabled={!canMoveTableRows(table, range, 1)} icon={ArrowDown} label="下移行" onClick={() => moveRows(1)} text="下移" />
            <ToolButton danger disabled={range.bottom - range.top + 1 >= rows} icon={Trash2} label="删除行" onClick={deleteRows} text="删除" />
          </ToolGroup>
          <ToolGroup label="列">
            <ToolButton icon={BetweenVerticalStart} label="左侧插入列" onClick={() => insertColumn('left')} text="左侧插入" />
            <ToolButton icon={BetweenVerticalEnd} label="右侧插入列" onClick={() => insertColumn('right')} text="右侧插入" />
            <ToolButton disabled={!canMoveTableColumns(table, range, -1)} icon={ArrowLeft} label="左移列" onClick={() => moveColumns(-1)} text="左移" />
            <ToolButton disabled={!canMoveTableColumns(table, range, 1)} icon={ArrowRight} label="右移列" onClick={() => moveColumns(1)} text="右移" />
            <ToolButton danger disabled={range.right - range.left + 1 >= columns} icon={Trash2} label="删除列" onClick={deleteColumns} text="删除" />
          </ToolGroup>
          <ToolGroup label="单元格">
            <ToolButton disabled={!canMerge} icon={TableCellsMerge} label="合并单元格" onClick={merge} text="合并" />
            <ToolButton disabled={!canSplit} icon={TableCellsSplit} label="拆分单元格" onClick={split} text="拆分" />
            <span aria-hidden="true" className="table-dialog-tool-divider" />
            <ToolButton active={currentAlign === 'left'} icon={AlignLeft} label="左对齐" onClick={() => align('left')} text="左对齐" />
            <ToolButton active={currentAlign === 'center'} icon={AlignCenter} label="居中" onClick={() => align('center')} text="居中" />
            <ToolButton active={currentAlign === 'right'} icon={AlignRight} label="右对齐" onClick={() => align('right')} text="右对齐" />
          </ToolGroup>
        </div>

        <div className="gallery-dialog-body table-dialog-body">
          <table className="table-dialog-grid" onPointerMove={handleGridPointerMove} ref={gridRef}>
            <tbody>
              {table.grid.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((id, columnIndex) => {
                    if (renderedIds.has(id)) return null;
                    renderedIds.add(id);
                    let rowSpan = 1;
                    let colSpan = 1;
                    while (table.grid[rowIndex + rowSpan]?.[columnIndex] === id) rowSpan += 1;
                    while (row[columnIndex + colSpan] === id) colSpan += 1;
                    const position = { column: columnIndex, row: rowIndex };
                    const isSelected = selectedIds.has(id);

                    return (
                      <td
                        className={isSelected ? 'is-selected' : undefined}
                        colSpan={colSpan > 1 ? colSpan : undefined}
                        data-column={columnIndex}
                        data-row={rowIndex}
                        key={id}
                        onPointerDown={(event) => handleCellPointerDown(event, position)}
                        rowSpan={rowSpan > 1 ? rowSpan : undefined}
                      >
                        <textarea
                          aria-label={`第 ${rowIndex + 1} 行第 ${columnIndex + 1} 列`}
                          data-column={columnIndex}
                          data-row={rowIndex}
                          onChange={(event) => setTable((current) => setTableCellText(current, id, event.target.value))}
                          onKeyDown={(event) => handleCellKeyDown(event, id, position)}
                          onFocus={() => {
                            if (!draggingRef.current && !selectedIds.has(id)) selectCell(position);
                          }}
                          rows={1}
                          style={table.cells[id].align ? { textAlign: table.cells[id].align } : undefined}
                          value={table.cells[id].text}
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <footer>
          <span>{rows} 行 × {columns} 列</span>
          <button onClick={onCancel} type="button">取消</button>
          <button onClick={() => onSave(buildEditorTableHtml(table))} type="button">
            {isEditing ? '保存表格' : '插入表格'}
          </button>
        </footer>
      </section>
    </DialogLayer>,
    document.body,
  );
}

function ToolGroup({ children, label }: { children: ReactNode; label: string }) {
  return (
    <div className="table-dialog-tool-group" role="group" aria-label={label}>
      <span className="table-dialog-tool-label">{label}</span>
      <div className="table-dialog-tool-buttons">{children}</div>
    </div>
  );
}

function ToolButton({
  active, danger, disabled, icon: Icon, label, onClick, text,
}: {
  active?: boolean;
  danger?: boolean;
  disabled?: boolean;
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  text: string;
}) {
  return (
    <button
      aria-label={label}
      aria-pressed={active === undefined ? undefined : active}
      className={[danger ? 'is-danger' : '', active ? 'is-active' : ''].filter(Boolean).join(' ') || undefined}
      disabled={disabled}
      onClick={onClick}
      onPointerDown={(event) => event.preventDefault()}
      type="button"
    >
      <Icon size={15} />
      <span>{text}</span>
    </button>
  );
}
