'use client';

import { PlusIcon } from '@phosphor-icons/react';
import React from 'react';

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

interface SuggestionHoverCardContentProps {
  title: string;
  description?: string;
  previewImageUrl?: string;
  onAdd?: () => void;
}

export function SuggestionHoverCardContent({
  title,
  description = 'Brief description of value',
  onAdd,
}: SuggestionHoverCardContentProps) {
  return (
    <>
      {/* Preview Image Area */}
      <div className="h-[140px] bg-secondary rounded-xl overflow-hidden" />

      {/* Content Row */}
      <div className="flex gap-2 items-center mt-4">
        <div className="flex-1 min-w-0">
          <p className="text-body-sm-emph text-primary truncate">{title}</p>
          <p className="text-body-xs text-secondary truncate">{description}</p>
        </div>
        <button
          onClick={onAdd}
          className="flex-shrink-0 size-8 flex items-center justify-center rounded-full bg-secondary hover:bg-tertiary transition-colors"
          aria-label={`Add ${title}`}
        >
          <PlusIcon size={16} weight="bold" className="text-primary" />
        </button>
      </div>
    </>
  );
}

interface SuggestionHoverCardProps extends SuggestionHoverCardContentProps {
  children: React.ReactNode;
  position?: 'top' | 'bottom';
}

export default function SuggestionHoverCard({
  title,
  description,
  previewImageUrl,
  onAdd,
  children,
  position = 'top',
}: SuggestionHoverCardProps) {
  return (
    <HoverCard openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent
        className="w-[255px] p-4 rounded-[16px] bg-elevated shadow-elevation-300"
        sideOffset={8}
        side={position}
      >
        <SuggestionHoverCardContent
          title={title}
          description={description}
          previewImageUrl={previewImageUrl}
          onAdd={onAdd}
        />
      </HoverCardContent>
    </HoverCard>
  );
}
