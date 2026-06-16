'use client';

import React, { useState } from 'react';

import type { ThumbnailType } from '@/components/editor/shared/PopoverThumbnail';
import type { LinkLayout } from '@/lib/editorData';
import type { InteractionType } from '@/lib/linkData';

import {
  DisplayLayoutSelector,
  InstagramProfileCard,
  InteractionSelect,
  ThumbnailSelect,
  TitleField,
} from '../shared';

interface InstagramLinkDetailsProps {
  title: string;
  onTitleChange?: (title: string) => void;
  instagramUsername?: string;
  isConnected?: boolean;
  interactionType?: InteractionType;
  onInteractionTypeChange?: (type: InteractionType) => void;
  thumbnailUrl?: string | null;
  thumbnailType?: ThumbnailType;
  onThumbnailChange?: (
    thumbnailUrl: string | null,
    thumbnailType: ThumbnailType
  ) => void;
  layout?: LinkLayout;
  onLayoutChange?: (layout: LinkLayout) => void;
  faviconUrl?: string;
}

export default function InstagramLinkDetails({
  title,
  onTitleChange,
  instagramUsername = 'flycatcherband',
  isConnected = true,
  interactionType: initialInteractionType = 'openProfile',
  onInteractionTypeChange,
  thumbnailUrl,
  thumbnailType = 'empty',
  onThumbnailChange,
  layout = 'classic',
  onLayoutChange,
  faviconUrl,
}: InstagramLinkDetailsProps) {
  const [localInteractionType, setLocalInteractionType] =
    useState<InteractionType>(initialInteractionType);

  const handleInteractionTypeChange = (type: InteractionType) => {
    setLocalInteractionType(type);
    onInteractionTypeChange?.(type);
  };

  const handleLayoutChange = (newLayout: LinkLayout) => {
    onLayoutChange?.(newLayout);
  };

  // Hide thumbnail for featured layout (featured uses grid images instead)
  const showThumbnail = layout === 'classic';

  return (
    <div className="flex flex-col gap-6 p-6 h-full overflow-y-auto">
      {/* Instagram Profile Card */}
      <InstagramProfileCard
        username={instagramUsername}
        isConnected={isConnected}
        faviconUrl={faviconUrl}
      />

      {/* Display Section - Button and Featured options only */}
      <DisplayLayoutSelector value={layout} onChange={handleLayoutChange} />

      {/* Fields Section */}
      <div className="flex flex-col gap-6">
        {/* Title Field */}
        <TitleField value={title} onChange={onTitleChange} />

        {/* Thumbnail Field - CSS grid animation for show/hide */}
        <div
          className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${
            showThumbnail
              ? 'grid-rows-[1fr] opacity-100'
              : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div
            className={`${showThumbnail ? 'overflow-visible' : 'overflow-hidden'} min-h-0`}
          >
            <ThumbnailSelect
              thumbnailType={thumbnailType}
              thumbnailUrl={thumbnailUrl}
              onChange={(type, imageUrl) => {
                onThumbnailChange?.(imageUrl ?? null, type);
              }}
            />
          </div>
        </div>

        {/* Interaction Field */}
        <InteractionSelect
          value={localInteractionType}
          onChange={handleInteractionTypeChange}
        />
      </div>
    </div>
  );
}
