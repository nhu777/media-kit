'use client';

import { PencilSimpleIcon } from '@phosphor-icons/react';
import Image from 'next/image';
import React from 'react';

interface LinkPreviewCardProps {
  destinationUrl: string;
  faviconUrl?: string;
  onEditClick?: () => void;
}

export default function LinkPreviewCard({
  destinationUrl,
  faviconUrl,
  onEditClick,
}: LinkPreviewCardProps) {
  return (
    <div className="flex items-center justify-between p-4 h-16 rounded-[16px] bg-elevated shadow-elevation-100">
      <div className="flex items-center gap-4 flex-1 min-w-0">
        {/* Favicon container */}
        <div className="size-8 flex items-center justify-center bg-elevated border-2 border-white rounded-full shadow-elevation-100 flex-shrink-0 p-1">
          {faviconUrl ? (
            <Image
              src={faviconUrl}
              alt=""
              width={20}
              height={20}
              className="size-5 rounded-full object-cover"
              unoptimized
            />
          ) : (
            <div className="size-5 rounded-full bg-tertiary" />
          )}
        </div>
        {/* URL text */}
        <p className="text-body-sm text-primary truncate flex-1 min-w-0">
          {destinationUrl}
        </p>
      </div>
      {/* Edit button */}
      <button
        onClick={onEditClick}
        className="size-10 flex items-center justify-center rounded-full hover:bg-secondary transition-colors flex-shrink-0"
        aria-label="Edit link"
      >
        <PencilSimpleIcon size={20} weight="regular" className="text-primary" />
      </button>
    </div>
  );
}
