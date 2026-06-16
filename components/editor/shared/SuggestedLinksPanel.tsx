'use client';

import {
  ArrowLineLeftIcon,
  MusicNotesPlusIcon,
  MusicNotesSimpleIcon,
  TicketIcon,
} from '@phosphor-icons/react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { type SuggestedApp, suggestedApps } from '@/lib/editorData';
import { cn } from '@/lib/utils';

import CapsuleTabs from './CapsuleTabs';
import SuggestedLinkCard from './SuggestedLinkCard';
import { SuggestionHoverCardContent } from './SuggestionHoverCard';

interface SuggestedLinksPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onAddApp?: (app: SuggestedApp) => void;
}

const tabs = [
  { value: 'for-you', label: 'For you' },
  { value: 'all-apps', label: 'All apps' },
];

// Map icon types to actual icons
function getIconForApp(app: SuggestedApp) {
  switch (app.iconType) {
    case 'music-presave':
      return <MusicNotesPlusIcon size={16} weight="bold" />;
    case 'music':
      return <MusicNotesSimpleIcon size={16} weight="bold" />;
    case 'tour-dates':
      return <TicketIcon size={16} weight="bold" />;
    default:
      return null;
  }
}

export default function SuggestedLinksPanel({
  isOpen,
  onClose,
  onAddApp,
}: SuggestedLinksPanelProps) {
  const [activeTab, setActiveTab] = useState('for-you');
  const [hoveredApp, setHoveredApp] = useState<SuggestedApp | null>(null);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const cardRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const openDelayRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const handleCardMouseEnter = useCallback((app: SuggestedApp) => {
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
      const cardEl = cardRefs.current.get(app.id);
      if (cardEl) {
        setAnchorRect(cardEl.getBoundingClientRect());
        setHoveredApp(app);
      }
    }, 200);
  }, []);

  const handleCardMouseLeave = useCallback(() => {
    // Clear any pending open timeout
    if (openDelayRef.current) {
      clearTimeout(openDelayRef.current);
      openDelayRef.current = null;
    }

    // Delay closing to allow moving between cards or to the hover card
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredApp(null);
      setAnchorRect(null);
    }, 150);
  }, []);

  const handleHoverCardMouseEnter = useCallback(() => {
    // Keep card open when hovering over it
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  }, []);

  const handleHoverCardMouseLeave = useCallback(() => {
    // Close when leaving the hover card
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredApp(null);
      setAnchorRect(null);
    }, 100);
  }, []);

  const setCardRef = useCallback((id: string, el: HTMLButtonElement | null) => {
    if (el) {
      cardRefs.current.set(id, el);
    } else {
      cardRefs.current.delete(id);
    }
  }, []);

  // Calculate hover card position to the right of the hovered card
  const OFFSET = 8;
  const cardStyle = anchorRect
    ? {
        position: 'fixed' as const,
        left: anchorRect.right + OFFSET,
        top: anchorRect.top + anchorRect.height / 2 - 120, // Center vertically relative to card
        zIndex: 50,
      }
    : {};

  return (
    <div
      className={cn(
        'flex flex-col gap-6 h-full p-5 border-r border-tertiary',
        'w-[288px] flex-shrink-0',
        // Smooth transitions for collapse/expand
        'transition-all duration-200 ease-out',
        'motion-reduce:transition-none',
        // Handle closed state with transform for smooth animation
        !isOpen && 'w-0 p-0 opacity-0 overflow-hidden pointer-events-none'
      )}
      data-state={isOpen ? 'open' : 'closed'}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <CapsuleTabs
          tabs={tabs}
          value={activeTab}
          onValueChange={setActiveTab}
        />
        <button
          onClick={onClose}
          className="p-1 rounded hover:bg-secondary transition-colors"
          aria-label="Close suggestions panel"
        >
          <ArrowLineLeftIcon
            size={16}
            weight="regular"
            className="text-primary"
          />
        </button>
      </div>

      {/* Suggested Cards */}
      <div className="flex flex-col gap-3 overflow-y-auto flex-1">
        {suggestedApps.map(app => (
          <SuggestedLinkCard
            key={app.id}
            ref={el => setCardRef(app.id, el)}
            title={app.title}
            description={app.description}
            imageUrl={app.imageUrl}
            backgroundColor={app.backgroundColor}
            icon={getIconForApp(app)}
            onAdd={() => onAddApp?.(app)}
            onMouseEnter={() => handleCardMouseEnter(app)}
            onMouseLeave={handleCardMouseLeave}
          />
        ))}
      </div>

      {/* Shared Hover Card - rendered via portal */}
      {isMounted &&
        hoveredApp &&
        anchorRect &&
        createPortal(
          <div
            className="w-[255px] p-4 rounded-[16px] bg-elevated shadow-elevation-300 animate-in fade-in-0 zoom-in-95 slide-in-from-left-2"
            style={cardStyle}
            onMouseEnter={handleHoverCardMouseEnter}
            onMouseLeave={handleHoverCardMouseLeave}
          >
            <SuggestionHoverCardContent
              title={hoveredApp.title}
              description={hoveredApp.description}
              previewImageUrl={hoveredApp.previewImageUrl}
              onAdd={() => onAddApp?.(hoveredApp)}
            />
          </div>,
          document.body
        )}
    </div>
  );
}
