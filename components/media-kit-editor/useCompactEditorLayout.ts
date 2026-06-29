'use client';

import { useEffect, useState } from 'react';

import { EDITOR_COMPACT_BREAKPOINT_PX } from './mediaKitEditorLayout';

export function useCompactEditorLayout() {
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      `(max-width: ${EDITOR_COMPACT_BREAKPOINT_PX - 1}px)`
    );
    const update = () => setIsCompact(mediaQuery.matches);

    update();
    mediaQuery.addEventListener('change', update);

    return () => mediaQuery.removeEventListener('change', update);
  }, []);

  return isCompact;
}
