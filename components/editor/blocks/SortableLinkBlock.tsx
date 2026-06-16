'use client';

import type { DraggableAttributes } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { type CSSProperties, type ReactNode } from 'react';

import { useDndState } from '@/components/editor/shared/DndProvider';
import { cn } from '@/lib/utils';

interface SortableLinkBlockChildProps {
  attributes: DraggableAttributes;
  isDragging: boolean;
}

interface SortableLinkBlockProps {
  id: string;
  children: (props: SortableLinkBlockChildProps) => ReactNode;
  disabled?: boolean;
}

export default function SortableLinkBlock({
  id,
  children,
  disabled = false,
}: SortableLinkBlockProps) {
  const { activeView } = useDndState();
  const isDisabled = disabled || activeView === 'preview';

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    disabled: isDisabled,
  });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    position: 'relative',
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn('w-full touch-none', isDragging && 'cursor-grabbing')}
      {...listeners}
    >
      {children({ attributes, isDragging })}
    </div>
  );
}
