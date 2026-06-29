'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { ComponentType, CSSProperties } from 'react';

import type { MediaKitSectionId } from '@/components/media-kit/mediaKitSections';

import { MediaKitSectionRow } from './MediaKitSectionRow';

interface SortableMediaKitSectionRowProps {
  id: MediaKitSectionId;
  icon: ComponentType<{ size?: number | string; className?: string }>;
  label: string;
  hidden?: boolean;
  onClick?: () => void;
  onToggleHidden?: () => void;
}

export function SortableMediaKitSectionRow({
  id,
  icon,
  label,
  hidden = false,
  onClick,
  onToggleHidden,
}: SortableMediaKitSectionRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    position: 'relative',
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <MediaKitSectionRow
      ref={setNodeRef}
      style={style}
      icon={icon}
      label={label}
      hidden={hidden}
      onClick={onClick}
      onToggleHidden={onToggleHidden}
      isDragging={isDragging}
      dragAttributes={attributes}
      dragListeners={listeners}
      dragHandleRef={setActivatorNodeRef}
    />
  );
}
