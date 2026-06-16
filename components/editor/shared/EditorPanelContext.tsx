'use client';

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

interface EditorPanelContextValue {
  activePanel: string | null;
  openPanel: (panel: string) => void;
  togglePanel: (panel: string) => void;
}

const EditorPanelContext = createContext<EditorPanelContextValue | null>(null);

interface EditorPanelProviderProps {
  children: ReactNode;
}

export function EditorPanelProvider({ children }: EditorPanelProviderProps) {
  const [activePanel, setActivePanel] = useState<string | null>(null);

  const openPanel = useCallback((panel: string) => {
    setActivePanel(panel);
  }, []);

  const togglePanel = useCallback((panel: string) => {
    setActivePanel(current => (current === panel ? null : panel));
  }, []);

  const value = useMemo(
    () => ({
      activePanel,
      openPanel,
      togglePanel,
    }),
    [activePanel, openPanel, togglePanel]
  );

  return (
    <EditorPanelContext.Provider value={value}>
      {children}
    </EditorPanelContext.Provider>
  );
}

export function useEditorPanel() {
  const context = useContext(EditorPanelContext);
  if (!context) {
    throw new Error(
      'useEditorPanel must be used within an EditorPanelProvider'
    );
  }
  return context;
}
