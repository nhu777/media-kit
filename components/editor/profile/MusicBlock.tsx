'use client';

import {
  CameraPlus,
  DotsSixVertical,
  SpotifyLogo,
} from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import { useState } from 'react';

import { useDndState } from '@/components/editor/shared/DndProvider';
import PopoverThumbnail from '@/components/editor/shared/PopoverThumbnail';
import { hexToRgba } from '@/lib/utils';

import { useBlockToolbar } from './BlockToolbarContext';
import EditableTitle from './EditableTitle';
import type { MusicBlockProps } from './types';

export default function MusicBlock({
  title,
  thumbnailUrl,
  thumbnailType,
  onThumbnailChange,
  onTitleChange,
  albumName,
  trackCount,
  linkId,
  layout = 'classic',
  backgroundColor = '#EEEEEE',
  textColor = '#333',
}: MusicBlockProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const { setPopoverOpen } = useBlockToolbar();
  const { isDragging } = useDndState();

  const showThumbnailButton = (isHovered || isPopoverOpen) && !isDragging;
  const effectiveTextColor = textColor || '#000000';

  if (layout === 'featured') {
    return (
      <motion.div
        layout
        layoutId={linkId ? `${linkId}-container` : undefined}
        className="relative flex w-full shrink-0 flex-col gap-2 overflow-hidden p-2 shadow-elevation-200"
        style={{ backgroundColor, borderRadius: 6 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          layout
          layoutId={linkId ? `${linkId}-thumbnail` : undefined}
          className="relative w-full shrink-0"
          style={{ aspectRatio: '369 / 231', borderRadius: 2 }}
        >
          {thumbnailUrl && (
            <img
              src={thumbnailUrl}
              alt=""
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 object-cover"
              style={{ width: 220, height: 220, borderRadius: 12 }}
            />
          )}
        </motion.div>

        <div className="relative flex h-14 w-full shrink-0 items-start justify-between px-10 pt-2">
          <div className="min-w-0 flex-1 text-center">
            <EditableTitle
              title={title}
              textColor={effectiveTextColor}
              className="text-body-sm-emph line-clamp-2"
              layoutId={linkId ? `${linkId}-title` : undefined}
              isBlockHovered={isHovered}
              onSave={newTitle => onTitleChange?.(newTitle)}
            />
          </div>

          {(albumName || trackCount) && (
            <div className="absolute inset-x-10 top-8 flex items-center justify-center gap-1 opacity-60">
              <SpotifyLogo
                size={14}
                weight="fill"
                style={{ color: textColor }}
              />
              {albumName && (
                <span
                  className="text-body-xs truncate"
                  style={{ color: textColor }}
                >
                  {albumName}
                </span>
              )}
              {albumName && trackCount && (
                <span className="text-body-xs" style={{ color: textColor }}>
                  ·
                </span>
              )}
              {trackCount && (
                <span className="text-body-xs" style={{ color: textColor }}>
                  {trackCount} {trackCount === 1 ? 'track' : 'tracks'}
                </span>
              )}
            </div>
          )}

          <motion.div
            layout
            layoutId={linkId ? `${linkId}-more` : undefined}
            className="absolute right-0 flex size-10 -translate-y-1/2 items-center justify-center rounded-full"
            style={{ cursor: 'grab' }}
          >
            <DotsSixVertical
              size={20}
              weight="bold"
              className="text-tertiary"
            />
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      layoutId={linkId ? `${linkId}-container` : undefined}
      className="relative flex h-16 w-full shrink-0 items-center justify-center overflow-hidden p-2 shadow-elevation-200"
      style={{ backgroundColor, borderRadius: 6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex h-full w-full items-center justify-between">
        <PopoverThumbnail
          initialType={thumbnailType || 'empty'}
          thumbnailUrl={thumbnailUrl}
          side="right"
          align="center"
          onOpenChange={open => {
            setIsPopoverOpen(open);
            setPopoverOpen(open);
          }}
          onSave={(type, imageUrl) => {
            onThumbnailChange?.(type, imageUrl);
          }}
        >
          <motion.div
            layout
            layoutId={linkId ? `${linkId}-thumbnail` : undefined}
            className="relative size-12 shrink-0 cursor-pointer overflow-hidden"
            style={{ borderRadius: 2 }}
            onClick={e => e.stopPropagation()}
          >
            {thumbnailUrl ? (
              <img
                src={thumbnailUrl}
                alt=""
                className="absolute inset-0 size-full object-cover"
              />
            ) : (
              showThumbnailButton && (
                <div
                  className="flex h-full w-full items-center justify-center"
                  style={{
                    backgroundColor: hexToRgba(effectiveTextColor, 0.05),
                  }}
                >
                  <CameraPlus
                    size={20}
                    weight="regular"
                    style={{ color: effectiveTextColor }}
                  />
                </div>
              )
            )}
          </motion.div>
        </PopoverThumbnail>

        <div className="min-w-0 flex-1 px-4 text-center">
          <EditableTitle
            title={title}
            textColor={effectiveTextColor}
            className="text-body-sm-emph line-clamp-2"
            layoutId={linkId ? `${linkId}-title` : undefined}
            isBlockHovered={isHovered}
            onSave={newTitle => onTitleChange?.(newTitle)}
          />
        </div>

        <motion.div
          layout
          layoutId={linkId ? `${linkId}-more` : undefined}
          className="flex size-10 shrink-0 items-center justify-center rounded-full"
          style={{ cursor: 'grab' }}
        >
          <DotsSixVertical size={20} weight="bold" className="text-tertiary" />
        </motion.div>
      </div>
    </motion.div>
  );
}
