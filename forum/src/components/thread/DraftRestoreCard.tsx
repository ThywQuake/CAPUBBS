import { RotateCcw, Trash2 } from 'lucide-react';
import type { RefObject } from 'react';
import { Button } from '../Button';
import { LoadingSpinner as LoaderCircle } from '../layout/LoadingSpinner';
import { formatPostEditorPreviewTimestamp } from './PostEditor';

export function DraftRestoreCard({
  className = '',
  deleting,
  editorRef,
  error,
  excerpt,
  heading,
  id,
  onDelete,
  onRestore,
  updatedAt,
}: {
  className?: string;
  deleting: boolean;
  editorRef?: RefObject<HTMLElement | null>;
  error?: string;
  excerpt: string;
  heading: string;
  id: string;
  onDelete: () => void;
  onRestore: () => void;
  updatedAt: string;
}) {
  const headingId = `${id}-title`;

  return (
    <section
      aria-labelledby={headingId}
      className={`forum-card reply-editor reply-draft-restore ${className}`.trim()}
      id={id}
      ref={editorRef}
    >
      <header className="reply-editor-heading">
        <h2 id={headingId}>{heading}</h2>
        <p>{formatPostEditorPreviewTimestamp(new Date(updatedAt))}</p>
      </header>
      <p className="reply-draft-restore-excerpt">{excerpt}</p>
      {error && <p className="reply-draft-restore-status" role="alert">{error}</p>}
      <div className="reply-draft-restore-actions">
        <Button disabled={deleting} onClick={onDelete} variant="danger">
          {deleting ? <LoaderCircle size={15} /> : <Trash2 size={15} />}
          删除草稿
        </Button>
        <Button disabled={deleting} onClick={onRestore} variant="primary">
          <RotateCcw size={15} />
          恢复草稿
        </Button>
      </div>
    </section>
  );
}
