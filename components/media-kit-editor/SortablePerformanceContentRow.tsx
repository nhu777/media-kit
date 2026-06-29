'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { CSSProperties } from 'react';

import type { PerformanceMetric } from '@/components/media-kit/performanceData';

import { PerformanceContentRow } from './PerformanceContentRow';

interface SortablePerformanceContentRowProps {
  id: PerformanceMetric;
  label: string;
  sublabel?: string;
  hidden?: boolean;
  locked?: boolean;
  onClick?: () => void;
  onToggleHidden?: () => void;
}

export function SortablePerformanceContentRow({
  id,
  label,
  sublabel,
  hidden = false,
  locked = false,
  onClick,
  onToggleHidden,
}: SortablePerformanceContentRowProps) {
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
    <PerformanceContentRow
      ref={setNodeRef}
      style={style}
      label={label}
      sublabel={sublabel}
      hidden={hidden}
      locked={locked}
      onClick={onClick}
      onToggleHidden={onToggleHidden}
      isDragging={isDragging}
      dragAttributes={attributes}
      dragListeners={listeners}
      dragHandleRef={setActivatorNodeRef}
    />
  );
}
