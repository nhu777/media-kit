'use client';

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';

import type { Link } from '@/lib/editorData';

import { useLinks } from './LinksContext';

interface SelectLinkOptions {
  /** Whether the content panel was open when editing started */
  panelWasOpen?: boolean;
}

interface SelectionContextValue {
  selectedLinkId: string | null;
  selectedLink: Link | null;
  isEditing: boolean;
  /** Whether the content panel was open when the user first started editing */
  enteredWithPanelOpen: boolean;
  selectLink: (linkId: string, options?: SelectLinkOptions) => void;
  clearSelection: () => void;
}

const SelectionContext = createContext<SelectionContextValue | null>(null);

interface SelectionProviderProps {
  children: ReactNode;
}

export function SelectionProvider({ children }: SelectionProviderProps) {
  const [selectedLinkId, setSelectedLinkId] = useState<string | null>(null);
  const [enteredWithPanelOpen, setEnteredWithPanelOpen] = useState(false);
  const { links } = useLinks();

  // Track if we already have an active editing session
  const isEditingRef = useRef(false);

  const selectedLink = useMemo(
    () => links.find(link => link.id === selectedLinkId) ?? null,
    [links, selectedLinkId]
  );

  const isEditing = selectedLinkId !== null;

  const selectLink = useCallback(
    (linkId: string, options?: SelectLinkOptions) => {
      // Only update entry context on first selection (not when switching blocks)
      if (!isEditingRef.current) {
        setEnteredWithPanelOpen(options?.panelWasOpen ?? false);
        isEditingRef.current = true;
      }
      setSelectedLinkId(linkId);
    },
    []
  );

  const clearSelection = useCallback(() => {
    setSelectedLinkId(null);
    setEnteredWithPanelOpen(false);
    isEditingRef.current = false;
  }, []);

  const value = useMemo(
    () => ({
      selectedLinkId,
      selectedLink,
      isEditing,
      enteredWithPanelOpen,
      selectLink,
      clearSelection,
    }),
    [
      selectedLinkId,
      selectedLink,
      isEditing,
      enteredWithPanelOpen,
      selectLink,
      clearSelection,
    ]
  );

  return (
    <SelectionContext.Provider value={value}>
      {children}
    </SelectionContext.Provider>
  );
}

export function useSelection() {
  const context = useContext(SelectionContext);
  if (!context) {
    throw new Error('useSelection must be used within a SelectionProvider');
  }
  return context;
}
