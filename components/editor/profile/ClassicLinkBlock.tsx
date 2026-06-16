'use client';

import { CameraPlus, DotsSixVertical } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import { useState } from 'react';

import { useDndState } from '@/components/editor/shared/DndProvider';
import PopoverThumbnail from '@/components/editor/shared/PopoverThumbnail';
import { hexToRgba } from '@/lib/utils';

import { useBlockToolbar } from './BlockToolbarContext';
import EditableTitle from './EditableTitle';
import type { ClassicLinkBlockProps } from './types';

export default function ClassicLinkBlock({
  title,
  thumbnailUrl,
  thumbnailType,
  onThumbnailChange,
  onTitleChange,
  layout = 'classic',
  linkId,
  backgroundColor = '#FFFFFF',
  textColor,
}: ClassicLinkBlockProps) {
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
          className="relative h-[202px] w-full shrink-0 overflow-hidden"
          style={{ borderRadius: 2 }}
        >
          {thumbnailUrl ? (
            <img
              src={thumbnailUrl}
              alt=""
              className="absolute inset-0 size-full object-cover"
            />
          ) : (
            <div
              className="flex h-full w-full flex-col items-center justify-center gap-2"
              style={{
                backgroundColor: hexToRgba(effectiveTextColor, 0.05),
                border: `4px dotted ${hexToRgba(effectiveTextColor, 0.1)}`,
                borderRadius: 2,
              }}
            >
              <PopoverThumbnail
                initialType={thumbnailType || 'empty'}
                thumbnailUrl={thumbnailUrl}
                side="top"
                align="center"
                onOpenChange={open => {
                  setIsPopoverOpen(open);
                  setPopoverOpen(open);
                }}
                onSave={(type, imageUrl) => {
                  onThumbnailChange?.(type, imageUrl);
                }}
              >
                <button
                  type="button"
                  className="flex cursor-pointer items-center justify-center rounded-full p-2 transition-colors hover:bg-black/5"
                  aria-label="Add thumbnail image"
                  onClick={e => e.stopPropagation()}
                >
                  <CameraPlus
                    size={24}
                    weight="regular"
                    style={{ color: hexToRgba(effectiveTextColor, 0.55) }}
                  />
                </button>
              </PopoverThumbnail>
              <span
                className="text-body-xs-emph"
                style={{ color: hexToRgba(effectiveTextColor, 0.55) }}
              >
                Featured layouts look best with an image
              </span>
            </div>
          )}
        </motion.div>

        <div className="relative flex h-12 w-full shrink-0 items-center justify-between px-10">
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
