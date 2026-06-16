'use client';

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  DEFAULT_PAGE_ID,
  getAllPages,
  getPageById,
  type Page,
} from '@/lib/editorData';

const STORAGE_KEY = 'linktree-active-page';

interface PageContextValue {
  activePageId: string;
  activePage: Page;
  setActivePage: (pageId: string) => void;
  allPages: Page[];
}

const PageContext = createContext<PageContextValue | null>(null);

function getStoredPageId(): string {
  if (typeof window === 'undefined') return DEFAULT_PAGE_ID;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && getPageById(stored)) {
    return stored;
  }
  return DEFAULT_PAGE_ID;
}

function storePageId(pageId: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, pageId);
}

interface PageProviderProps {
  children: ReactNode;
  initialPageId?: string;
}

export function PageProvider({ children, initialPageId }: PageProviderProps) {
  const [activePageId, setActivePageId] = useState(() => {
    return initialPageId || getStoredPageId();
  });

  useEffect(() => {
    if (initialPageId) {
      if (initialPageId !== activePageId) {
        setActivePageId(initialPageId);
        storePageId(initialPageId);
      }
    } else {
      const stored = getStoredPageId();
      if (stored !== activePageId) {
        setActivePageId(stored);
      }
    }
  }, [initialPageId, activePageId]);

  const activePage = useMemo(() => {
    const page = getPageById(activePageId);
    return page || getPageById(DEFAULT_PAGE_ID)!;
  }, [activePageId]);

  const allPages = useMemo(() => getAllPages(), []);

  const setActivePage = useCallback((pageId: string) => {
    const page = getPageById(pageId);
    if (page) {
      setActivePageId(pageId);
      storePageId(pageId);
    } else {
      console.warn(`Page with id "${pageId}" not found`);
    }
  }, []);

  const value = useMemo(
    () => ({
      activePageId,
      activePage,
      setActivePage,
      allPages,
    }),
    [activePageId, activePage, setActivePage, allPages]
  );

  return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
}

export function usePage() {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error('usePage must be used within a PageProvider');
  }
  return context;
}

export function useActivePageId() {
  const { activePageId } = usePage();
  return activePageId;
}
