import { Table, X } from 'lucide-react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { DialogLayer } from '../layout/DialogPresence';

/** A post table shown at a larger size; `html` is the already rendered (sanitized) table. */
export function ForumTableDialog({ html, onClose }: { html: string; onClose: () => void }) {
  useEffect(() => {
    document.body.classList.add('gallery-dialog-open');
    return () => document.body.classList.remove('gallery-dialog-open');
  }, []);

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
        <div
          className="forum-markup forum-table-dialog-body"
          dangerouslySetInnerHTML={{ __html: html }}
          tabIndex={0}
        />
      </section>
    </DialogLayer>,
    document.body,
  );
}
