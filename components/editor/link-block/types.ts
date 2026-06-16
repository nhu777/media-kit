/**
 * Shared types for all LinkBlock variants.
 * All variants must implement the same props interface to ensure interchangeability.
 */

import type { DraggableAttributes } from '@dnd-kit/core';

import type { ThumbnailType } from '@/components/editor/shared/PopoverThumbnail';
import type { LinkData } from '@/lib/linkData';

export interface DragHandleProps {
  attributes: DraggableAttributes;
}

export interface LinkBlockProps {
  /** Link data object */
  link: LinkData;
  /** Called when the link block is clicked (typically to edit - opens Details tab) */
  onClick?: () => void;
  /** Called when click count is clicked (opens Insights tab) */
  onClickCountClick?: () => void;
  /** Called when drag handle is activated */
  onDragStart?: () => void;
  /** Called when remove action is triggered */
  onRemove?: () => void;
  /** Called when thumbnail is changed */
  onThumbnailChange?: (
    thumbnailUrl: string | null,
    thumbnailType: ThumbnailType
  ) => void;
  /** Called when title is changed via inline editing */
  onTitleChange?: (newTitle: string) => void;
  /** Props for the drag handle (accessibility attributes) */
  dragHandleProps?: DragHandleProps;
  /** Whether this specific block is currently being dragged */
  isDragging?: boolean;
}
