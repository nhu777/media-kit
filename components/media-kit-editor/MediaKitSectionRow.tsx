'use client';

import type { DraggableAttributes } from '@dnd-kit/core';
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { DotsSixVerticalIcon, EyeClosedIcon } from '@phosphor-icons/react';
import type { ComponentType, CSSProperties, KeyboardEvent } from 'react';
import { forwardRef, useMemo, useState } from 'react';

import { cn } from '@/lib/utils';

import {
  MEDIA_KIT_ROW_GRABBER_GAP_PX,
  MEDIA_KIT_ROW_GRABBER_SIZE_PX,
  MEDIA_KIT_ROW_MENU_GAP_PX,
  MEDIA_KIT_ROW_MENU_SIZE_PX,
} from './mediaKitRowLayout';
import { MediaKitRowMenuPopover } from './MediaKitRowMenuPopover';
import { useCompactEditorLayout } from './useCompactEditorLayout';

const SECTION_ICON_THUMBNAIL_CLASS =
  'flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-[12px] border-2 border-white bg-primary shadow-elevation-100';

interface MediaKitSectionRowProps {
  icon: ComponentType<{ size?: number | string; className?: string }>;
  label: string;
  hidden?: boolean;
  onClick?: () => void;
  onToggleHidden?: () => void;
  isDragging?: boolean;
  style?: CSSProperties;
  dragAttributes?: DraggableAttributes;
  dragListeners?: SyntheticListenerMap;
  dragHandleRef?: (element: HTMLElement | null) => void;
}

export const MediaKitSectionRow = forwardRef<
  HTMLDivElement,
  MediaKitSectionRowProps
>(function MediaKitSectionRow(
  {
    icon: Icon,
    label,
    hidden = false,
    onClick,
    onToggleHidden,
    isDragging = false,
    style,
    dragAttributes,
    dragListeners,
    dragHandleRef,
  },
  ref
) {
  const [isHovered, setIsHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isCompact = useCompactEditorLayout();
  const showGrabber = !isCompact && (isDragging || isHovered);
  const showMenu = isCompact || isHovered || menuOpen;

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick?.();
    }
  };

  const sortableAttributes = useMemo(() => {
    if (!dragAttributes) {
      return undefined;
    }

    const { 'aria-describedby': _, ...restAttributes } = dragAttributes;
    return restAttributes;
  }, [dragAttributes]);

  return (
    <div
      ref={ref}
      style={style}
      className={cn(
        'relative w-full touch-none',
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        aria-hidden
        className="absolute inset-y-0 touch-none hidden lg:block"
        style={{
          right: '100%',
          width: MEDIA_KIT_ROW_GRABBER_SIZE_PX + MEDIA_KIT_ROW_GRABBER_GAP_PX,
        }}
      />

      {onToggleHidden ? (
        <div
          aria-hidden
          className="absolute inset-y-0 touch-none hidden lg:block"
          style={{
            left: '100%',
            width: MEDIA_KIT_ROW_MENU_SIZE_PX + MEDIA_KIT_ROW_MENU_GAP_PX,
          }}
        />
      ) : null}

      <button
        ref={dragHandleRef}
        type="button"
        aria-label={`Reorder ${label}`}
        className={cn(
          'absolute top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full transition-opacity duration-150 touch-none lg:flex',
          showGrabber
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0',
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        )}
        style={{
          left: -(MEDIA_KIT_ROW_GRABBER_SIZE_PX + MEDIA_KIT_ROW_GRABBER_GAP_PX),
          width: MEDIA_KIT_ROW_GRABBER_SIZE_PX + MEDIA_KIT_ROW_GRABBER_GAP_PX,
          height: MEDIA_KIT_ROW_GRABBER_SIZE_PX,
        }}
        onClick={event => event.stopPropagation()}
        {...sortableAttributes}
        {...dragListeners}
      >
        <DotsSixVerticalIcon
          size={24}
          weight="regular"
          className="pointer-events-none text-primary"
          aria-hidden
        />
      </button>

      {onToggleHidden ? (
        <div
          className={cn(
            'absolute top-1/2 -translate-y-1/2',
            isCompact ? 'right-3' : ''
          )}
          style={
            isCompact
              ? {
                  width: MEDIA_KIT_ROW_MENU_SIZE_PX,
                  height: MEDIA_KIT_ROW_MENU_SIZE_PX,
                }
              : {
                  left: `calc(100% + ${MEDIA_KIT_ROW_MENU_GAP_PX}px)`,
                  width: MEDIA_KIT_ROW_MENU_SIZE_PX,
                  height: MEDIA_KIT_ROW_MENU_SIZE_PX,
                }
          }
        >
          <MediaKitRowMenuPopover
            label={label}
            hidden={hidden}
            visible={showMenu}
            onOpenChange={setMenuOpen}
            onEdit={() => onClick?.()}
            onToggleHidden={onToggleHidden}
          />
        </div>
      ) : null}

      <div
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        className={cn(
          'flex h-[72px] w-full items-center gap-[16px] overflow-hidden rounded-[20px] p-4 shadow-elevation-100 transition-colors hover:bg-secondary/40',
          onToggleHidden && isCompact && 'pr-12',
          hidden ? 'bg-primary' : 'bg-elevated',
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        )}
        {...dragListeners}
      >
        <div className={SECTION_ICON_THUMBNAIL_CLASS}>
          <Icon size={24} className="text-primary" />
        </div>

        <div className="flex min-w-0 flex-1 flex-col items-start justify-center gap-[2px]">
          <span className="w-full truncate text-left text-body-sm-emph text-primary">
            {label}
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {hidden ? (
            <EyeClosedIcon
              size={16}
              weight="regular"
              className="text-primary"
            />
          ) : null}
          {hidden ? (
            <span className="text-body-xs-emph text-secondary">Hidden</span>
          ) : null}
        </div>
      </div>
    </div>
  );
});
