import { Table, X } from 'lucide-react';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { DialogLayer } from '../layout/DialogPresence';
import { trackForumTableScroll } from './forumTables';

/** A post table shown at a larger size; `html` is the already rendered (sanitized) table. */
export function ForumTableDialog({ html, onClose }: { html: string; onClose: () => void }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.classList.add('gallery-dialog-open');
    return () => document.body.classList.remove('gallery-dialog-open');
  }, []);

  // Same wrappers and scroll tracking as the floor, so the frozen first column and its shadows behave alike.
  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const scrollContainer = scrollRef.current;
    const table = scrollContainer?.querySelector('table');
    if (!viewport || !scrollContainer || !table) return undefined;
    return trackForumTableScroll(viewport, scrollContainer, table);
  }, [html]);

  return createPortal(
    <DialogLayer className="gallery-dialog-backdrop" onClick={onClose} onDismiss={onClose} role="presentation">
      <section
        aria-labelledby="forum-table-dialog-title"
        aria-modal="true"
        className="gallery-dialog forum-table-dialog"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <header>
          <span><Table size={18} /></span>
          <h2 id="forum-table-dialog-title">表格</h2>
          <button aria-label="关闭表格" data-autofocus onClick={onClose} type="button"><X size={18} /></button>
        </header>
        <div className="forum-markup forum-table-dialog-body">
          <div className="forum-table-viewport" ref={viewportRef}>
            <div
              className="forum-table-scroll"
              dangerouslySetInnerHTML={{ __html: html }}
              ref={scrollRef}
              tabIndex={0}
            />
          </div>
        </div>
      </section>
    </DialogLayer>,
    document.body,
  );
}
