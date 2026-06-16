'use client';

import { CaretDownIcon } from '@phosphor-icons/react';
import React from 'react';

import type { ThumbnailType } from '@/components/editor/shared/PopoverThumbnail';
import PopoverThumbnail from '@/components/editor/shared/PopoverThumbnail';

interface ThumbnailSelectProps {
  thumbnailType: ThumbnailType;
  thumbnailUrl?: string | null;
  onChange?: (type: ThumbnailType, imageUrl?: string) => void;
}

export default function ThumbnailSelect({
  thumbnailType,
  thumbnailUrl,
  onChange,
}: ThumbnailSelectProps) {
  // Determine label based on current state
  const getLabel = () => {
    if (thumbnailType === 'image' && thumbnailUrl) {
      return 'Image';
    }
    if (thumbnailType === 'icon') {
      return 'Icon';
    }
    if (thumbnailType === 'none') {
      return 'None';
    }
    // 'empty' state - no thumbnail set yet
    return 'None';
  };

  return (
    <div className="flex items-center gap-0 w-full">
      {/* Label section */}
      <div className="flex flex-col gap-0 flex-1 min-w-0">
        <p className="text-body-sm-emph text-primary truncate">Thumbnail</p>
        <p className="text-body-xs text-secondary truncate">
          Add an image or icon
        </p>
      </div>
      {/* Select button with popover */}
      <div className="relative flex-1">
        <PopoverThumbnail
          initialType={thumbnailType === 'none' ? 'image' : thumbnailType}
          thumbnailUrl={thumbnailUrl ?? undefined}
          side="top"
          align="end"
          onSave={(type, imageUrl) => {
            onChange?.(type, imageUrl);
          }}
        >
          <button
            type="button"
            className="flex items-center justify-between gap-2 w-full h-11 px-3 border border-transparent rounded-[12px] bg-elevated shadow-elevation-100 hover:border-primary transition-colors"
          >
            <span className="text-body-sm text-primary truncate">
              {getLabel()}
            </span>
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Mini thumbnail when image exists */}
              {thumbnailUrl && (
                <div className="size-5 rounded-xs overflow-hidden flex-shrink-0">
                  <img
                    src={thumbnailUrl}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <CaretDownIcon
                size={20}
                weight="regular"
                className="text-primary"
              />
            </div>
          </button>
        </PopoverThumbnail>
      </div>
    </div>
  );
}
