'use client';

import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import { useDndState } from '@/components/editor/shared/DndProvider';
import { useLinks } from '@/components/editor/shared/LinksContext';
import { useSelection } from '@/components/editor/shared/SelectionContext';
import type { LinkLayout, LinkType } from '@/lib/linkData';

import BlockPreviewToolbar from './BlockPreviewToolbar';

interface ToolbarCallbacks {
  onEdit?: () => void;
  onInteraction?: () => void;
  onDelete?: () => void;
}

interface LinkMetadata {
  linkId: string;
  currentLayout: LinkLayout;
  linkType?: LinkType;
}

interface ToolbarPosition {
  top: number;
  left: number;
}

interface BlockToolbarContextValue {
  reportHover: (
    position: ToolbarPosition,
    callbacks: ToolbarCallbacks,
    linkMetadata: LinkMetadata
  ) => void;
  reportLeave: () => void;
  setPopoverOpen: (isOpen: boolean) => void;
  updatePosition: (position: ToolbarPosition) => void;
}

const BlockToolbarContext = createContext<BlockToolbarContextValue | null>(
  null
);

export function useBlockToolbar() {
  const context = useContext(BlockToolbarContext);
  if (!context) {
    throw new Error(
      'useBlockToolbar must be used within a BlockToolbarProvider'
    );
  }
  return context;
}

interface BlockToolbarProviderProps {
  children: ReactNode;
}

export function BlockToolbarProvider({ children }: BlockToolbarProviderProps) {
  const { isEditing } = useSelection();
  const { links, updateLink } = useLinks();
  const { isDragging } = useDndState();
  const [isVisible, setIsVisible] = useState(false);
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const [toolbarMode, setToolbarMode] = useState<'preview' | 'edit' | 'layout'>(
    'preview'
  );
  const [position, setPosition] = useState<ToolbarPosition | null>(null);
  const [callbacks, setCallbacks] = useState<ToolbarCallbacks | null>(null);
  const [linkMetadata, setLinkMetadata] = useState<LinkMetadata | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentLinkData = linkMetadata
    ? links.find(l => l.id === linkMetadata.linkId)
    : null;
  const currentLayout =
    (currentLinkData?.layout as LinkLayout) ??
    linkMetadata?.currentLayout ??
    'classic';

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  // Reset toolbar state when entering edit mode to prevent it from
  // reappearing when exiting edit mode - but not when we explicitly
  // entered edit mode via the toolbar's edit button
  useEffect(() => {
    if (isEditing && toolbarMode !== 'edit') {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = null;
      }
      setIsVisible(false);
      setPosition(null);
      setToolbarMode('preview');
    }
  }, [isEditing, toolbarMode]);

  const reportHover = useCallback(
    (
      newPosition: ToolbarPosition,
      newCallbacks: ToolbarCallbacks,
      newLinkMetadata: LinkMetadata
    ) => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = null;
      }
      setPosition(newPosition);
      setCallbacks(newCallbacks);
      setLinkMetadata(newLinkMetadata);
      setIsVisible(true);
      setToolbarMode('preview');
    },
    []
  );

  const reportLeave = useCallback(() => {
    if (toolbarMode === 'layout' || toolbarMode === 'edit') {
      return;
    }
    hideTimeoutRef.current = setTimeout(() => {
      setIsVisible(false);
      setToolbarMode('preview');
      hideTimeoutRef.current = null;
    }, 100);
  }, [toolbarMode]);

  // Update position without changing toolbar mode (for edit mode position tracking)
  const updatePosition = useCallback((newPosition: ToolbarPosition) => {
    setPosition(newPosition);
  }, []);

  const handleToolbarMouseEnter = useCallback(() => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  }, []);

  const handleToolbarMouseLeave = useCallback(() => {
    if (toolbarMode === 'layout' || toolbarMode === 'edit') {
      return;
    }
    hideTimeoutRef.current = setTimeout(() => {
      setIsVisible(false);
      setToolbarMode('preview');
      hideTimeoutRef.current = null;
    }, 100);
  }, [toolbarMode]);

  const handleEditClick = useCallback(() => {
    setToolbarMode('edit');
    callbacks?.onEdit?.();
  }, [callbacks]);

  const handleLayoutClick = useCallback(() => {
    setToolbarMode('layout');
  }, []);

  const handleLayoutCheck = useCallback(() => {
    setIsVisible(false);
    setToolbarMode('preview');
  }, []);

  const handleLayoutChange = useCallback(
    (layout: LinkLayout) => {
      if (linkMetadata?.linkId) {
        updateLink(linkMetadata.linkId, { layout });
      }
    },
    [linkMetadata, updateLink]
  );

  const shouldShowToolbar =
    isVisible && !isEditing && !isPopoverOpen && !isDragging && position;

  return (
    <BlockToolbarContext.Provider
      value={{ reportHover, reportLeave, setPopoverOpen, updatePosition }}
    >
      {children}

      {isMounted &&
        createPortal(
          <LayoutGroup id="block-toolbar-layout">
            <AnimatePresence mode="popLayout">
              {shouldShowToolbar && (
                <motion.div
                  key="preview-toolbar"
                  initial={{
                    opacity: 0,
                    x: -4,
                    y: '-50%',
                    top: position.top,
                    left: position.left,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    y: '-50%',
                    top: position.top,
                    left: position.left,
                  }}
                  exit={{
                    opacity: 0,
                    x: -4,
                    transition: { duration: 0.15 },
                  }}
                  transition={{
                    opacity: { duration: 0.15, ease: 'easeOut' },
                    x: { duration: 0.15, ease: 'easeOut' },
                    y: { duration: 0 },
                    top: { type: 'spring', stiffness: 400, damping: 30 },
                    left: { type: 'spring', stiffness: 400, damping: 30 },
                  }}
                  className="pointer-events-auto fixed z-50"
                  onMouseEnter={handleToolbarMouseEnter}
                  onMouseLeave={handleToolbarMouseLeave}
                >
                  <BlockPreviewToolbar
                    variant={toolbarMode}
                    onEdit={handleEditClick}
                    onLayout={handleLayoutClick}
                    onCheck={handleLayoutCheck}
                    currentLayout={currentLayout}
                    linkType={linkMetadata?.linkType}
                    onLayoutChange={handleLayoutChange}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </LayoutGroup>,
          document.body
        )}
    </BlockToolbarContext.Provider>
  );
}
