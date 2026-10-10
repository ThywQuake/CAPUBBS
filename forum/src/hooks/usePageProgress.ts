import { useEffect } from 'react';
import { beginPageProgress } from '../utils/pageProgress';

export function usePageProgress(active: boolean, { background = false }: { background?: boolean } = {}) {
  useEffect(() => (active ? beginPageProgress({ background }) : undefined), [active, background]);
}
