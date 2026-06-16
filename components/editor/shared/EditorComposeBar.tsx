'use client';

import type { IconComponent } from '@linktr.ee/arbor/IconButton';
import { IconButton } from '@linktr.ee/arbor/IconButton';
import { ArrowUpIcon } from '@phosphor-icons/react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import type { SuggestionChip } from '@/lib/editorData';

import { SuggestionHoverCardContent } from './SuggestionHoverCard';

interface EditorComposeBarProps {
  onAddLink?: (url: string) => void;
  suggestionChips?: SuggestionChip[];
  position?: 'top' | 'bottom';
}

export default function EditorComposeBar({
  onAddLink,
  suggestionChips = [],
  position = 'bottom',
}: EditorComposeBarProps) {
  const [url, setUrl] = useState('');
  const [hoveredChip, setHoveredChip] = useState<SuggestionChip | null>(null);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const chipRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const openDelayRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const handleSubmit = () => {
    if (url.trim()) {
      onAddLink?.(url.trim());
      setUrl('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleChipClick = (chip: SuggestionChip) => {
    console.log('Chip clicked:', chip.label);
  };

  const handleChipMouseEnter = useCallback((chip: SuggestionChip) => {
    // Clear any pending close timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    // Clear any pending open timeout
    if (openDelayRef.current) {
      clearTimeout(openDelayRef.current);
    }

    // Add delay before showing hover card to prevent accidental triggers
    openDelayRef.current = setTimeout(() => {
      const chipEl = chipRefs.current.get(chip.id);
      if (chipEl) {
        setAnchorRect(chipEl.getBoundingClientRect());
        setHoveredChip(chip);
      }
    }, 200);
  }, []);

  const handleChipMouseLeave = useCallback(() => {
    // Clear any pending open timeout
    if (openDelayRef.current) {
      clearTimeout(openDelayRef.current);
      openDelayRef.current = null;
    }

    // Delay closing to allow moving between chips
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredChip(null);
      setAnchorRect(null);
    }, 150);
  }, []);

  const handleCardMouseEnter = useCallback(() => {
    // Keep card open when hovering over it
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  }, []);

  const handleCardMouseLeave = useCallback(() => {
    // Close when leaving the card
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredChip(null);
      setAnchorRect(null);
    }, 100);
  }, []);

  const setChipRef = useCallback((id: string, el: HTMLButtonElement | null) => {
    if (el) {
      chipRefs.current.set(id, el);
    } else {
      chipRefs.current.delete(id);
    }
  }, []);

  const hasInput = url.trim().length > 0;

  // Calculate card position centered above or below the hovered chip
  const CARD_HEIGHT = 240; // Approximate height of the hover card
  const cardStyle = anchorRect
    ? {
        position: 'fixed' as const,
        left: anchorRect.left + anchorRect.width / 2 - 127.5,
        top:
          position === 'top'
            ? anchorRect.top - CARD_HEIGHT - 8
            : anchorRect.bottom + 8,
        zIndex: 50,
      }
    : {};

  return (
    <div className="bg-elevated border-primary rounded-xl shadow-elevation-300 overflow-hidden border-[0.5px] max-w-[588px]">
      {/* Input Field Row */}
      <div className="flex items-center gap-4 p-4">
        <input
          type="text"
          placeholder="Paste link or search..."
          value={url}
          onChange={e => setUrl(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-body-lg text-primary placeholder:text-primary outline-none"
        />
        <IconButton
          variant="primary"
          size="xs"
          icon={ArrowUpIcon as IconComponent}
          aria-label="Submit"
          onClick={handleSubmit}
          disabled={!hasInput}
          className={hasInput ? 'opacity-100' : 'opacity-0'}
        />
      </div>

      {/* Suggestion Chips Row */}
      <div className="flex items-center gap-2 p-4 overflow-x-auto scrollbar-hide">
        {suggestionChips.map(chip => (
          <button
            key={chip.id}
            ref={el => setChipRef(chip.id, el)}
            onClick={
              chip.id === 'browse' ? () => handleChipClick(chip) : undefined
            }
            onMouseEnter={
              chip.id !== 'browse'
                ? () => handleChipMouseEnter(chip)
                : undefined
            }
            onMouseLeave={
              chip.id !== 'browse' ? handleChipMouseLeave : undefined
            }
            className="flex-shrink-0 flex items-center gap-2 border border-secondary rounded-full pl-1 pr-3 py-1 hover:opacity-80 transition-opacity overflow-hidden"
          >
            <div
              className="size-6 rounded-full flex items-center justify-center overflow-hidden"
              style={
                chip.backgroundColor
                  ? { backgroundColor: chip.backgroundColor }
                  : undefined
              }
            >
              {chip.imageUrl ? (
                <img
                  src={chip.imageUrl}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : chip.icon ? (
                <div
                  className={
                    chip.iconColor === 'dark'
                      ? 'text-primary'
                      : 'text-on-inverse-primary'
                  }
                >
                  {chip.icon}
                </div>
              ) : null}
            </div>
            <span className="text-body-sm text-primary whitespace-nowrap">
              {chip.label}
            </span>
          </button>
        ))}
      </div>

      {/* Shared Hover Card - rendered via portal */}
      {isMounted &&
        hoveredChip &&
        anchorRect &&
        createPortal(
          <div
            className={`w-[255px] p-4 rounded-[16px] bg-elevated shadow-elevation-300 animate-in fade-in-0 zoom-in-95 ${
              position === 'top'
                ? 'slide-in-from-bottom-2'
                : 'slide-in-from-top-2'
            }`}
            style={cardStyle}
            onMouseEnter={handleCardMouseEnter}
            onMouseLeave={handleCardMouseLeave}
          >
            <SuggestionHoverCardContent
              title={hoveredChip.label}
              description={hoveredChip.description}
              previewImageUrl={hoveredChip.previewImageUrl}
              onAdd={() => handleChipClick(hoveredChip)}
            />
          </div>,
          document.body
        )}
    </div>
  );
}
