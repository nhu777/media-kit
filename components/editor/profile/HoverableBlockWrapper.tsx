'use client';

import { useCallback, useEffect, useRef } from 'react';

import { useDndState } from '@/components/editor/shared/DndProvider';
import { useSelection } from '@/components/editor/shared/SelectionContext';
import type { LinkLayout, LinkType } from '@/lib/linkData';

import { useBlockToolbar } from './BlockToolbarContext';

interface HoverableBlockWrapperProps {
  children: React.ReactNode;
  linkId: string;
  currentLayout?: LinkLayout;
  linkType?: LinkType;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  onEdit?: () => void;
  onInteraction?: () => void;
  onDelete?: () => void;
}

export default function HoverableBlockWrapper({
  children,
  linkId,
  currentLayout = 'classic',
  linkType,
  onKeyDown,
  onEdit,
  onInteraction,
  onDelete,
}: HoverableBlockWrapperProps) {
  const blockRef = useRef<HTMLDivElement>(null);
  const { reportHover, reportLeave, updatePosition } = useBlockToolbar();
  const { isDragging } = useDndState();
  const { selectedLinkId, isEditing } = useSelection();

  const isSelected = selectedLinkId === linkId;
  // When editing, non-selected blocks should not have hover interactions
  const isNonSelectedWhileEditing = isEditing && !isSelected;

  // When this block is selected (edit mode), track position changes
  useEffect(() => {
    if (!isSelected || !blockRef.current) return;

    const updatePos = () => {
      if (!blockRef.current) return;
      const rect = blockRef.current.getBoundingClientRect();
      updatePosition({
        left: rect.right + 4,
        top: rect.top + rect.height / 2,
      });
    };

    // Initial position update after layout settles
    const timeoutId = setTimeout(updatePos, 50);

    // Track position changes from scroll, resize, or container layout changes
    window.addEventListener('scroll', updatePos, true);
    window.addEventListener('resize', updatePos);
    const resizeObserver = new ResizeObserver(updatePos);
    resizeObserver.observe(blockRef.current);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', updatePos, true);
      window.removeEventListener('resize', updatePos);
      resizeObserver.disconnect();
    };
  }, [isSelected, updatePosition]);

  const handleMouseEnter = useCallback(() => {
    // Disable hover interactions for non-selected blocks when in editing mode
    if (!blockRef.current || isDragging || isNonSelectedWhileEditing) return;

    const blockRect = blockRef.current.getBoundingClientRect();
    const position = {
      left: blockRect.right + 4,
      top: blockRect.top + blockRect.height / 2,
    };

    reportHover(
      position,
      { onEdit, onInteraction, onDelete },
      { linkId, currentLayout, linkType }
    );
  }, [
    reportHover,
    onEdit,
    onInteraction,
    onDelete,
    linkId,
    currentLayout,
    linkType,
    isDragging,
    isNonSelectedWhileEditing,
  ]);

  const handleMouseLeave = useCallback(() => {
    reportLeave();
  }, [reportLeave]);

  const handleClick = useCallback(() => {
    // When in editing mode and clicking a different block, switch to that block
    if (isNonSelectedWhileEditing) {
      onEdit?.();
    }
  }, [isNonSelectedWhileEditing, onEdit]);

  // Determine cursor style
  const getCursor = () => {
    if (isDragging) return 'grabbing';
    if (isNonSelectedWhileEditing) return 'pointer';
    return undefined;
  };

  return (
    <div
      ref={blockRef}
      role="button"
      tabIndex={0}
      className="relative w-full text-left"
      style={{ cursor: getCursor() }}
      onKeyDown={onKeyDown}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {/* Overlay to capture all clicks when this block is not selected during editing */}
      {isNonSelectedWhileEditing && (
        <div className="absolute inset-0 z-10" aria-hidden="true" />
      )}
    </div>
  );
}
