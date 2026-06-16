'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { type CSSProperties, forwardRef, type ReactNode } from 'react';

import { useDndState } from '@/components/editor/shared/DndProvider';

interface SortablePreviewBlockProps {
  id: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  disabled?: boolean;
}

const SortablePreviewBlock = forwardRef<
  HTMLDivElement,
  SortablePreviewBlockProps
>(
  (
    { id, children, className, style: externalStyle, disabled = false },
    ref
  ) => {
    const { activeView } = useDndState();
    const isDisabled = disabled || activeView === 'panel';

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
      opacity: isDragging ? 0.5 : undefined,
      ...externalStyle,
    };

    const combinedRef = (el: HTMLDivElement | null) => {
      setNodeRef(el);
      if (typeof ref === 'function') {
        ref(el);
      } else if (ref) {
        ref.current = el;
      }
    };

    return (
      <div
        ref={combinedRef}
        style={style}
        className={className}
        suppressHydrationWarning
        {...attributes}
        {...listeners}
      >
        {children}
      </div>
    );
  }
);

SortablePreviewBlock.displayName = 'SortablePreviewBlock';

export default SortablePreviewBlock;
