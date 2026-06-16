'use client';

import { PlusIcon } from '@phosphor-icons/react';
import React, { forwardRef } from 'react';

import { cn } from '@/lib/utils';

interface SuggestedLinkCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  backgroundColor?: string;
  icon?: React.ReactNode;
  onAdd?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  className?: string;
}

const SuggestedLinkCard = forwardRef<HTMLButtonElement, SuggestedLinkCardProps>(
  function SuggestedLinkCard(
    {
      title,
      description,
      imageUrl,
      backgroundColor,
      icon,
      onAdd,
      onMouseEnter,
      onMouseLeave,
      className,
    },
    ref
  ) {
    return (
      <button
        ref={ref}
        onClick={onAdd}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={cn(
          'flex items-center gap-2 rounded-xl border border-secondary px-3 py-2 overflow-hidden text-left hover:bg-secondary/50 transition-colors',
          className
        )}
      >
        {/* Icon/Image */}
        <div
          className="flex-shrink-0 size-6 rounded-lg flex items-center justify-center overflow-hidden"
          style={backgroundColor ? { backgroundColor } : undefined}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt=""
              className="w-full h-full object-cover rounded-lg"
            />
          ) : icon ? (
            <div className="text-on-inverse-primary">{icon}</div>
          ) : null}
        </div>

        {/* Text Content */}
        <div className="flex-1 min-w-0 flex flex-col">
          <span className="text-body-xs font-medium text-primary truncate">
            {title}
          </span>
          <span className="text-body-xs text-secondary truncate">
            {description}
          </span>
        </div>

        {/* Add Icon */}
        <div className="flex-shrink-0 p-1 rounded-full">
          <PlusIcon size={16} weight="regular" className="text-primary" />
        </div>
      </button>
    );
  }
);

export default SuggestedLinkCard;
