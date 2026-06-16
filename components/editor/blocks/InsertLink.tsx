'use client';

import { PlusIcon } from '@phosphor-icons/react';
import React, { useState } from 'react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface InsertLinkProps {
  onClick?: () => void;
}

export default function InsertLink({ onClick }: InsertLinkProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <TooltipProvider>
      <div
        className="relative w-full h-[20px] flex items-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={cn(
            'transition-opacity duration-150 ease-in-out',
            isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
          )}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                aria-label="Insert link"
                onClick={onClick}
                className="p-2 rounded-full hover:bg-secondary transition-colors duration-150 text-secondary hover:text-primary"
              >
                <PlusIcon size={20} weight="regular" />
              </button>
            </TooltipTrigger>
            <TooltipContent className="bg-inverse border-none rounded-sm">
              <p className="text-body-xs text-on-inverse-primary">Add</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}
