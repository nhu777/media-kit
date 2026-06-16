'use client';

import { createContext, type RefObject, useContext, useRef } from 'react';

const OverlayContext = createContext<RefObject<HTMLDivElement> | null>(null);

export function OverlayProvider({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <OverlayContext.Provider value={containerRef}>
      <div ref={containerRef} className="relative h-full">
        {children}
      </div>
    </OverlayContext.Provider>
  );
}

export function useOverlayContainer() {
  return useContext(OverlayContext);
}
