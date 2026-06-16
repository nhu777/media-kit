'use client';

import {
  createContext,
  type CSSProperties,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import type { PageDesign } from '@/lib/editorData';

import { usePage } from './PageContext';

const STORAGE_KEY_PREFIX = 'linktree-';
const STORAGE_KEY_SUFFIX = '-design';

function getStorageKey(pageId: string): string {
  return `${STORAGE_KEY_PREFIX}${pageId}${STORAGE_KEY_SUFFIX}`;
}

function getStoredDesign(pageId: string): PageDesign | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(getStorageKey(pageId));
    if (stored) {
      return JSON.parse(stored) as PageDesign;
    }
  } catch (e) {
    console.warn('Failed to parse stored design:', e);
  }
  return null;
}

function storeDesign(pageId: string, design: PageDesign): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(getStorageKey(pageId), JSON.stringify(design));
  } catch (e) {
    console.warn('Failed to store design:', e);
  }
}

interface EditorThemeContextValue {
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
  linkBlockBackground: string;
  setLinkBlockBackground: (color: string) => void;
  linkBlockTextColor: string;
  setLinkBlockTextColor: (color: string) => void;
  buttonTextColor: string;
  setButtonTextColor: (color: string) => void;
  pageTextColor: string;
  setPageTextColor: (color: string) => void;
  getShellBackground: () => string;
  getPreviewBackground: () => string;
  getLinkBlockCSSVars: () => CSSProperties;
}

const EditorThemeContext = createContext<EditorThemeContextValue | null>(null);

const DEFAULT_BUTTON_TEXT_COLOR = '#000000';

interface EditorThemeProviderProps {
  children: ReactNode;
}

export function EditorThemeProvider({ children }: EditorThemeProviderProps) {
  const { activePage, activePageId } = usePage();
  const { design } = activePage;
  const currentPageIdRef = useRef(activePageId);
  const pageIdRef = useRef(activePageId);

  const [backgroundColor, setBackgroundColorState] = useState(
    design.backgroundColor
  );
  const [buttonTextColor, setButtonTextColorState] = useState(
    DEFAULT_BUTTON_TEXT_COLOR
  );
  const [linkBlockBackground, setLinkBlockBackgroundState] = useState(
    design.linkBlockBackground
  );
  const [linkBlockTextColor, setLinkBlockTextColorState] = useState(
    design.linkBlockTextColor
  );
  const [pageTextColor, setPageTextColorState] = useState(design.pageTextColor);

  useEffect(() => {
    pageIdRef.current = activePageId;
  }, [activePageId]);

  useEffect(() => {
    const storedDesign = getStoredDesign(activePageId);
    if (storedDesign) {
      setBackgroundColorState(storedDesign.backgroundColor);
      setLinkBlockBackgroundState(storedDesign.linkBlockBackground);
      setLinkBlockTextColorState(storedDesign.linkBlockTextColor);
      setPageTextColorState(storedDesign.pageTextColor);
    } else if (activePageId !== currentPageIdRef.current) {
      setBackgroundColorState(design.backgroundColor);
      setLinkBlockBackgroundState(design.linkBlockBackground);
      setLinkBlockTextColorState(design.linkBlockTextColor);
      setPageTextColorState(design.pageTextColor);
    }
    currentPageIdRef.current = activePageId;
  }, [activePageId, design]);

  const persistDesign = useCallback(
    (updates: Partial<PageDesign>) => {
      const currentDesign: PageDesign = {
        backgroundColor,
        linkBlockBackground,
        linkBlockTextColor,
        pageTextColor,
        ...updates,
      };
      storeDesign(pageIdRef.current, currentDesign);
    },
    [backgroundColor, linkBlockBackground, linkBlockTextColor, pageTextColor]
  );

  const setBackgroundColor = useCallback(
    (color: string) => {
      setBackgroundColorState(color);
      persistDesign({ backgroundColor: color });
    },
    [persistDesign]
  );

  const setButtonTextColor = useCallback((color: string) => {
    setButtonTextColorState(color);
  }, []);

  const setLinkBlockBackground = useCallback(
    (color: string) => {
      setLinkBlockBackgroundState(color);
      persistDesign({ linkBlockBackground: color });
    },
    [persistDesign]
  );

  const setLinkBlockTextColor = useCallback(
    (color: string) => {
      setLinkBlockTextColorState(color);
      persistDesign({ linkBlockTextColor: color });
    },
    [persistDesign]
  );

  const setPageTextColor = useCallback(
    (color: string) => {
      setPageTextColorState(color);
      persistDesign({ pageTextColor: color });
    },
    [persistDesign]
  );

  const value = useMemo(() => {
    const getShellBackground = () => {
      return `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), ${backgroundColor}`;
    };

    const getPreviewBackground = () => {
      return `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), ${backgroundColor}`;
    };

    const getLinkBlockCSSVars = (): CSSProperties =>
      ({
        '--link-bg': linkBlockBackground,
        '--link-text': linkBlockTextColor,
      }) as CSSProperties;

    return {
      backgroundColor,
      setBackgroundColor,
      buttonTextColor,
      setButtonTextColor,
      linkBlockBackground,
      setLinkBlockBackground,
      linkBlockTextColor,
      setLinkBlockTextColor,
      pageTextColor,
      setPageTextColor,
      getShellBackground,
      getPreviewBackground,
      getLinkBlockCSSVars,
    };
  }, [
    backgroundColor,
    setBackgroundColor,
    buttonTextColor,
    setButtonTextColor,
    linkBlockBackground,
    setLinkBlockBackground,
    linkBlockTextColor,
    setLinkBlockTextColor,
    pageTextColor,
    setPageTextColor,
  ]);

  return (
    <EditorThemeContext.Provider value={value}>
      {children}
    </EditorThemeContext.Provider>
  );
}

export function useEditorTheme() {
  const context = useContext(EditorThemeContext);
  if (!context) {
    throw new Error(
      'useEditorTheme must be used within an EditorThemeProvider'
    );
  }
  return context;
}
