import { usePageProgress } from '../../hooks/usePageProgress';
import { AppBackground } from './AppBackground';
import { LoadingSpinner } from './LoadingSpinner';
import { TopBar } from './TopBar';

type LoadingStateProps = {
  ariaLabel?: string;
  className?: string;
  id?: string;
  label: string;
  variant?: 'page' | 'panel';
};

export function LoadingState({ ariaLabel, className = '', id, label, variant = 'page' }: LoadingStateProps) {
  if (variant === 'page') return <PageProgress ariaLabel={ariaLabel} id={id} label={label} />;

  const classes = `forum-loading-state forum-card forum-loading-state-card forum-loading-state-panel${className ? ` ${className}` : ''}`;

  return (
    <section aria-busy="true" aria-label={ariaLabel} aria-live="polite" className={classes} id={id} role="status">
      <span aria-hidden="true" className="forum-loading-visual">
        <LoadingSpinner size={34} />
      </span>
      <p>{label}</p>
    </section>
  );
}

// Full-page waits show the top progress bar instead of a centered spinner card.
export function PageProgress({ ariaLabel, id, label }: { ariaLabel?: string; id?: string; label: string }) {
  usePageProgress(true);

  return (
    <span aria-label={ariaLabel} aria-live="polite" className="sr-only" id={id} role="status">{label}</span>
  );
}

export function RouteLoadingPage({ label = '正在打开页面' }: { label?: string }) {
  return (
    <div className="forum-route-loading-page relative text-[var(--text)] transition-colors duration-200">
      <AppBackground />
      <TopBar />
      <PageProgress label={label} />
    </div>
  );
}
