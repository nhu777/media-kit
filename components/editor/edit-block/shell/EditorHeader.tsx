'use client';

import {
  ArrowLeftIcon,
  DotsThreeIcon,
  UploadSimpleIcon,
  XIcon,
} from '@phosphor-icons/react';
import React from 'react';

import { Button } from '@/components/ui/button';
import type { LinkType } from '@/lib/linkData';

export type CloseMode = 'back' | 'close';

function getBlockTypeLabel(linkType: LinkType): string {
  switch (linkType) {
    case 'instagram':
      return 'Instagram Block';
    case 'music':
      return 'Music Block';
    case 'youtube':
      return 'YouTube Block';
    case 'digitalProduct':
      return 'Product Block';
    case 'classic':
    default:
      return 'Link Block';
  }
}

interface EditorHeaderProps {
  /** Type of link being edited */
  linkType: LinkType;
  /** Called when back/close button is clicked */
  onBack?: () => void;
  /** Determines which icon to show: 'back' for ArrowLeft, 'close' for X */
  closeMode?: CloseMode;
}

export default function EditorHeader({
  linkType,
  onBack,
  closeMode = 'back',
}: EditorHeaderProps) {
  const blockLabel = getBlockTypeLabel(linkType);

  const isCloseMode = closeMode === 'close';
  const Icon = isCloseMode ? XIcon : ArrowLeftIcon;
  const ariaLabel = isCloseMode ? 'Close panel' : 'Go back';

  return (
    <header className="flex items-center gap-4 px-4 py-4 border-b border-tertiary">
      {/* Back/Close button */}
      <Button
        onClick={onBack}
        variant="glass-secondary"
        size="icon"
        aria-label={ariaLabel}
      >
        <Icon size={20} weight="regular" className="text-primary" />
      </Button>

      {/* Title */}
      <div className="flex-1 min-w-0">
        <p className="text-body-base text-primary truncate">{blockLabel}</p>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2">
        <Button variant="glass-secondary" size="icon" aria-label="Share">
          <UploadSimpleIcon
            size={20}
            weight="regular"
            className="text-primary"
          />
        </Button>
        <Button variant="glass-secondary" size="icon" aria-label="More options">
          <DotsThreeIcon size={20} weight="regular" className="text-primary" />
        </Button>
      </div>
    </header>
  );
}
