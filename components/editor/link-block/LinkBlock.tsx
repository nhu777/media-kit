'use client';

import {
  ChartBarIcon,
  DotsSixVerticalIcon,
  PencilSimpleIcon,
} from '@phosphor-icons/react';
import Image from 'next/image';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import LinkBlockMenuPopover from '@/components/editor/shared/LinkBlockMenuPopover';
import { TooltipProvider } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

import { TitleSuggestionsMenu } from './TitleSuggestionsMenu';
import type { LinkBlockProps } from './types';

export default function LinkBlock({
  link,
  onClick,
  onClickCountClick,
  onDragStart: _onDragStart,
  onRemove,
  onThumbnailChange: _onThumbnailChange,
  onTitleChange,
  dragHandleProps,
  isDragging = false,
}: LinkBlockProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isSuggestionsMenuOpen, setIsSuggestionsMenuOpen] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const originalTitleRef = useRef(link.title);
  const ignoreClickRef = useRef(false);

  // Store original title and select text when entering edit mode
  useEffect(() => {
    if (isEditingTitle) {
      originalTitleRef.current = link.title;
      // Select all text after a microtask to ensure input is focused
      requestAnimationFrame(() => {
        inputRef.current?.select();
      });
    }
  }, [isEditingTitle, link.title]);

  // Show drag handle when hovering OR dragging, but never during title edit
  const showDragHandle = (isHovered || isDragging) && !isEditingTitle;
  // Only show pencil icon on hover when NOT dragging
  const showPencilIcon = isHovered && !isEditingTitle && !isDragging;

  const handleTitleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditingTitle(true);
  };

  const handleSave = () => {
    const newTitle = inputRef.current?.value.trim();
    if (newTitle && newTitle !== link.title) {
      onTitleChange?.(newTitle);
    }
    setIsEditingTitle(false);
  };

  const handleCancel = () => {
    if (inputRef.current) {
      inputRef.current.value = originalTitleRef.current;
    }
    setIsEditingTitle(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleCancel();
    }
  };

  const handleMouseDown = () => {
    if (isEditingTitle) {
      ignoreClickRef.current = true;
    }
  };

  const handleCardClick = () => {
    if (ignoreClickRef.current) {
      ignoreClickRef.current = false;
      return;
    }
    if (!isEditingTitle) {
      onClick?.();
    }
  };

  const handleSuggestionsMenuOpenChange = (open: boolean) => {
    // When menu is closing, set flag to prevent navigation on the subsequent click
    if (!open && isSuggestionsMenuOpen) {
      ignoreClickRef.current = true;
    }
    setIsSuggestionsMenuOpen(open);
  };

  // Filter out aria-describedby to prevent hydration mismatch
  // DnD Kit generates this dynamically and it differs between server/client
  const dragHandleAttributes = useMemo(() => {
    if (!dragHandleProps?.attributes) return undefined;
    const { 'aria-describedby': _, ...restAttributes } =
      dragHandleProps.attributes;
    return restAttributes;
  }, [dragHandleProps?.attributes]);

  return (
    <TooltipProvider>
      <div
        className="relative w-full h-[72px] flex items-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Drag Handle - Absolute Left */}
        <div
          className={cn(
            'absolute left-0 transition-opacity duration-150 ease-in-out',
            showDragHandle ? 'opacity-100' : 'opacity-0 pointer-events-none'
          )}
        >
          <LinkBlockMenuPopover
            onRemove={onRemove}
            hideTooltip={isDragging}
            tooltipText={
              <div className="text-body-xs text-on-inverse-primary">
                <p>
                  Drag{' '}
                  <span className="text-on-inverse-secondary">to move</span>
                </p>
                <p>
                  Click{' '}
                  <span className="text-on-inverse-secondary">for more</span>
                </p>
              </div>
            }
          >
            <button
              aria-label="Drag to move or click for menu"
              className={cn(
                'p-2 rounded-full hover:bg-secondary transition-colors duration-150 text-secondary hover:text-primary touch-none',
                isDragging ? 'cursor-grabbing' : 'cursor-grab'
              )}
              {...dragHandleAttributes}
              suppressHydrationWarning
            >
              <DotsSixVerticalIcon size={20} weight="bold" />
            </button>
          </LinkBlockMenuPopover>
        </div>

        {/* Main Card - Centered */}
        <div className="flex-1 mx-12 min-w-0">
          <div
            role="button"
            tabIndex={0}
            onClick={handleCardClick}
            onMouseDown={handleMouseDown}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleCardClick();
              }
            }}
            className="w-full h-[72px] bg-elevated rounded-xl shadow-elevation-100 flex items-center gap-3 px-4 py-4 hover:border-primary border border-transparent transition-all duration-150 cursor-pointer overflow-hidden"
          >
            {/* Favicon */}
            <div className="size-8 flex items-center justify-center bg-elevated border-2 border-white rounded-full shadow-elevation-100 flex-shrink-0 p-1">
              {link.faviconUrl ? (
                <Image
                  src={link.faviconUrl}
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

            {/* Content */}
            <div className="flex-1 min-w-0 text-left flex flex-col items-start gap-0.5">
              {isEditingTitle ? (
                <input
                  ref={inputRef}
                  type="text"
                  defaultValue={link.title}
                  onBlur={handleSave}
                  onKeyDown={handleKeyDown}
                  onClick={e => e.stopPropagation()}
                  autoFocus
                  aria-label="Edit link title"
                  spellCheck={false}
                  className="w-full text-body-base text-primary bg-transparent outline-none rounded-[4px] -mx-1.5 px-1.5 selection:bg-[#ddd2ff]"
                />
              ) : (
                <span
                  onClick={handleTitleClick}
                  className="block w-full cursor-text rounded-[4px] -mx-1.5 px-[5px] hover:border-secondary border border-transparent transition-colors duration-150 delay-75"
                >
                  <span className="block truncate text-body-base text-primary">
                    {link.title}
                  </span>
                </span>
              )}
              <div className="relative h-4 w-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 transition-transform duration-300 ease-in-out"
                  style={{
                    transform:
                      isEditingTitle || isSuggestionsMenuOpen
                        ? 'translateY(100%)'
                        : 'translateY(0)',
                  }}
                >
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      onClickCountClick?.();
                    }}
                    className="text-body-xs text-secondary flex items-center gap-1 hover:text-primary transition-colors rounded-[4px] -mx-1.5 px-1.5 w-fit h-4"
                    tabIndex={isEditingTitle || isSuggestionsMenuOpen ? -1 : 0}
                  >
                    <ChartBarIcon size={12} weight="regular" />
                    <span>{link.clickCount} clicks</span>
                  </button>
                </div>
                <div
                  className="absolute top-0 left-0 transition-transform duration-300 ease-in-out"
                  style={{
                    transform:
                      isEditingTitle || isSuggestionsMenuOpen
                        ? 'translateY(0)'
                        : 'translateY(-100%)',
                  }}
                >
                  <TitleSuggestionsMenu
                    suggestions={link.suggestedTitles}
                    open={isSuggestionsMenuOpen}
                    onOpenChange={handleSuggestionsMenuOpenChange}
                    onSelect={newTitle => {
                      if (newTitle !== link.title) {
                        onTitleChange?.(newTitle);
                      }
                      setIsEditingTitle(false);
                      setIsSuggestionsMenuOpen(false);
                    }}
                    triggerClassName="h-4"
                    triggerProps={{
                      tabIndex:
                        isEditingTitle || isSuggestionsMenuOpen ? 0 : -1,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Edit Icon */}
            {showPencilIcon && (
              <PencilSimpleIcon
                size={20}
                weight="regular"
                className="flex-shrink-0 text-secondary hover:text-primary transition-colors duration-150"
              />
            )}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
