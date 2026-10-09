import { useEffect, useRef, useState, type RefObject } from 'react';

export type TableDialogState = { target: HTMLTableElement | null };
export type RichTableEditButton = { left: number; top: number };

function getSelectionTable(editor: HTMLElement) {
  const node = window.getSelection()?.anchorNode;
  const element = node instanceof Element ? node : node?.parentElement;
  const table = element?.closest('table');
  return table && editor.contains(table) ? table : null;
}

export function useRichTextEditorTables({
  closeMenus,
  editorRef,
  editorShellRef,
  insertRichHtml,
  isSourceMode,
  saveSelection,
  updateContent,
}: {
  closeMenus: () => void;
  editorRef: RefObject<HTMLDivElement | null>;
  editorShellRef: RefObject<HTMLElement | null>;
  insertRichHtml: (html: string) => void;
  isSourceMode: boolean;
  saveSelection: () => void;
  updateContent: (content: string) => void;
}) {
  const activeTableRef = useRef<HTMLTableElement | null>(null);
  const [tableDialogState, setTableDialogState] = useState<TableDialogState | null>(null);
  const [tableEditButton, setTableEditButton] = useState<RichTableEditButton | null>(null);

  const updateTableEditButton = () => {
    const editor = editorRef.current;
    const shell = editorShellRef.current;
    const table = editor && !isSourceMode ? getSelectionTable(editor) : null;
    activeTableRef.current = table;
    if (!table || !shell) {
      setTableEditButton(null);
      return;
    }

    const shellBounds = shell.getBoundingClientRect();
    const editorBounds = editor!.getBoundingClientRect();
    const tableBounds = table.getBoundingClientRect();
    // Keep the button inside the visible part of the editor when the table is wider or scrolled.
    setTableEditButton({
      left: Math.min(tableBounds.right, editorBounds.right) - shellBounds.left,
      top: Math.max(tableBounds.top, editorBounds.top) - shellBounds.top,
    });
  };

  useEffect(() => {
    if (isSourceMode) {
      activeTableRef.current = null;
      setTableEditButton(null);
      return undefined;
    }

    document.addEventListener('selectionchange', updateTableEditButton);
    window.addEventListener('resize', updateTableEditButton);
    return () => {
      document.removeEventListener('selectionchange', updateTableEditButton);
      window.removeEventListener('resize', updateTableEditButton);
    };
  }, [isSourceMode]);

  const openTableDialog = (target?: HTMLTableElement | null) => {
    const editor = editorRef.current;
    saveSelection();
    closeMenus();
    setTableDialogState({ target: target ?? (editor ? getSelectionTable(editor) : null) });
  };

  const saveTable = (html: string) => {
    const editor = editorRef.current;
    const target = tableDialogState?.target;

    if (target && editor?.contains(target)) {
      target.insertAdjacentHTML('afterend', html);
      target.remove();
      updateContent(editor.innerHTML);
    } else {
      insertRichHtml(`${html}<p><br></p>`);
    }
    setTableDialogState(null);
  };

  return {
    closeTableDialog: () => setTableDialogState(null),
    editActiveTable: () => openTableDialog(activeTableRef.current),
    openTableDialog: () => openTableDialog(),
    saveTable,
    tableDialogState,
    tableEditButton,
    updateTableEditButton,
  };
}
