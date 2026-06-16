'use client';

import { arrayMove } from '@dnd-kit/sortable';
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import type { Link } from '@/lib/editorData';

import { usePage } from './PageContext';

const STORAGE_KEY_PREFIX = 'linktree-';
const STORAGE_KEY_SUFFIX = '-links';

function getStorageKey(pageId: string): string {
  return `${STORAGE_KEY_PREFIX}${pageId}${STORAGE_KEY_SUFFIX}`;
}

function getStoredLinks(pageId: string): Link[] | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(getStorageKey(pageId));
    if (stored) {
      return JSON.parse(stored) as Link[];
    }
  } catch (e) {
    console.warn('Failed to parse stored links:', e);
  }
  return null;
}

function storeLinks(pageId: string, links: Link[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(getStorageKey(pageId), JSON.stringify(links));
  } catch (e) {
    console.warn('Failed to store links:', e);
  }
}

interface LinksContextValue {
  links: Link[];
  removeLink: (id: string) => void;
  updateLink: (id: string, updates: Partial<Link>) => void;
  addLink: (link: Link) => void;
  reorderLinks: (activeId: string, overId: string) => void;
}

const LinksContext = createContext<LinksContextValue | null>(null);

interface LinksProviderProps {
  children: ReactNode;
}

export function LinksProvider({ children }: LinksProviderProps) {
  const { activePage, activePageId } = usePage();
  const [links, setLinks] = useState<Link[]>(activePage.links);
  const currentPageIdRef = useRef(activePageId);
  const pageIdRef = useRef(activePageId);

  useEffect(() => {
    pageIdRef.current = activePageId;
  }, [activePageId]);

  useEffect(() => {
    const storedLinks = getStoredLinks(activePageId);
    if (storedLinks) {
      setLinks(storedLinks);
    } else if (activePageId !== currentPageIdRef.current) {
      setLinks(activePage.links);
    }
    currentPageIdRef.current = activePageId;
  }, [activePageId, activePage.links]);

  const setLinksAndPersist = useCallback(
    (updater: (prev: Link[]) => Link[]) => {
      setLinks(prev => {
        const newLinks = updater(prev);
        storeLinks(pageIdRef.current, newLinks);
        return newLinks;
      });
    },
    []
  );

  const removeLink = useCallback(
    (id: string) => {
      setLinksAndPersist(prev => prev.filter(link => link.id !== id));
    },
    [setLinksAndPersist]
  );

  const updateLink = useCallback(
    (id: string, updates: Partial<Link>) => {
      setLinksAndPersist(prev =>
        prev.map(link => (link.id === id ? { ...link, ...updates } : link))
      );
    },
    [setLinksAndPersist]
  );

  const addLink = useCallback(
    (link: Link) => {
      setLinksAndPersist(prev => [...prev, link]);
    },
    [setLinksAndPersist]
  );

  const reorderLinks = useCallback(
    (activeId: string, overId: string) => {
      setLinksAndPersist(prev => {
        const oldIndex = prev.findIndex(link => link.id === activeId);
        const newIndex = prev.findIndex(link => link.id === overId);
        if (oldIndex === -1 || newIndex === -1) return prev;
        return arrayMove(prev, oldIndex, newIndex);
      });
    },
    [setLinksAndPersist]
  );

  const value = useMemo(
    () => ({
      links,
      removeLink,
      updateLink,
      addLink,
      reorderLinks,
    }),
    [links, removeLink, updateLink, addLink, reorderLinks]
  );

  return (
    <LinksContext.Provider value={value}>{children}</LinksContext.Provider>
  );
}

export function useLinks() {
  const context = useContext(LinksContext);
  if (!context) {
    throw new Error('useLinks must be used within a LinksProvider');
  }
  return context;
}
