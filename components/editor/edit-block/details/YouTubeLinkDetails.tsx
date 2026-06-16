'use client';

import React from 'react';

import type { ThumbnailType } from '@/components/editor/shared/PopoverThumbnail';
import type { LinkLayout } from '@/lib/editorData';

import {
  DisplayLayoutSelector,
  LinkPreviewCard,
  ThumbnailSelect,
  TitleField,
} from '../shared';

interface YouTubeLinkDetailsProps {
  title: string;
  url: string;
  faviconUrl?: string;
  onTitleChange?: (title: string) => void;
  thumbnailUrl?: string | null;
  thumbnailType?: ThumbnailType;
  onThumbnailChange?: (
    thumbnailUrl: string | null,
    thumbnailType: ThumbnailType
  ) => void;
  layout?: LinkLayout;
  onLayoutChange?: (layout: LinkLayout) => void;
}

export default function YouTubeLinkDetails({
  title,
  url,
  faviconUrl,
  onTitleChange,
  thumbnailUrl,
  thumbnailType = 'empty',
  onThumbnailChange,
  layout = 'classic',
  onLayoutChange,
}: YouTubeLinkDetailsProps) {
  return (
    <div className="flex flex-col gap-6 p-6 h-full overflow-y-auto">
      {/* Link Preview Card */}
      <LinkPreviewCard destinationUrl={url} faviconUrl={faviconUrl} />

      {/* Display Section */}
      <DisplayLayoutSelector value={layout} onChange={onLayoutChange} />

      {/* Title Field */}
      <TitleField value={title} onChange={onTitleChange} />

      {/* Thumbnail Field */}
      <ThumbnailSelect
        thumbnailType={thumbnailType}
        thumbnailUrl={thumbnailUrl}
        onChange={(type, imageUrl) => {
          onThumbnailChange?.(imageUrl ?? null, type);
        }}
      />
    </div>
  );
}
