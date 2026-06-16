/**
 * Types for the LinkEditor component.
 */

import type { ThumbnailType } from '@/components/editor/shared/PopoverThumbnail';
import type { LinkLayout } from '@/lib/editorData';
import type { InteractionType, LinkType } from '@/lib/linkData';

import type { CloseMode } from './shell/EditorHeader';

/** Available tabs in the LinkEditor */
export type LinkEditorTab = 'details' | 'prioritize' | 'rules' | 'insights';

export interface LinkEditorProps {
  /** Type of link being edited (classic, instagram, etc.) */
  linkType?: LinkType;
  /** Current title value */
  title?: string;
  /** Current URL value */
  url?: string;
  /** URL for the thumbnail/image */
  imageUrl?: string;
  /** Initial tab to display */
  initialTab?: LinkEditorTab;
  /** Called when back/close button is clicked */
  onBack?: () => void;
  /** Determines which icon to show in header: 'back' for ArrowLeft, 'close' for X */
  closeMode?: CloseMode;
  /** Called when title changes */
  onTitleChange?: (title: string) => void;
  /** Called when URL changes */
  onUrlChange?: (url: string) => void;
  /** Called when image changes */
  onImageChange?: (imageUrl: string) => void;

  // Instagram-specific props
  /** Instagram username (without @) */
  instagramUsername?: string;
  /** Whether the Instagram account is connected */
  isConnected?: boolean;
  /** Interaction type for Instagram links */
  interactionType?: InteractionType;
  /** Called when interaction type changes */
  onInteractionTypeChange?: (type: InteractionType) => void;

  // Thumbnail props
  /** URL for the thumbnail image */
  thumbnailUrl?: string | null;
  /** Type of thumbnail (image, icon, or none) */
  thumbnailType?: ThumbnailType;
  /** Called when thumbnail changes */
  onThumbnailChange?: (
    thumbnailUrl: string | null,
    thumbnailType: ThumbnailType
  ) => void;

  /** Display layout: 'classic' for button style, 'featured' for large thumbnail */
  layout?: LinkLayout;
  /** Called when layout changes */
  onLayoutChange?: (layout: LinkLayout) => void;

  /** Favicon URL for the link destination */
  faviconUrl?: string;

  /** AI-generated title suggestions for this link */
  suggestedTitles?: string[];
}

// Local types (previously in variants/default/types.ts)

// Navigation item for sidebar
export interface NavItem {
  id: LinkEditorTab;
  label: string;
  icon: React.ElementType;
}

// Props for shared form field components
export interface TitleFieldProps {
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

export interface ThumbnailSelectProps {
  thumbnailType: ThumbnailType;
  thumbnailUrl?: string | null;
  onChange?: (type: ThumbnailType, imageUrl?: string) => void;
}

export interface LinkPreviewCardProps {
  destinationUrl: string;
  faviconUrl?: string;
  onEditClick?: () => void;
}

// Re-export for convenience so consumers can import from this module
export type { ThumbnailType };

export interface DisplayOptionCardProps {
  icon: React.ElementType;
  label: string;
  isSelected: boolean;
  onClick: () => void;
}
