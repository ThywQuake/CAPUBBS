import { useEffect } from 'react';
import { beginPageProgress } from '../utils/pageProgress';

export function usePageProgress(active: boolean) {
  useEffect(() => (active ? beginPageProgress() : undefined), [active]);
}
