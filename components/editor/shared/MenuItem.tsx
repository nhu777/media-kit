'use client';

import React from 'react';

import { cn } from '@/lib/utils';

interface MenuItemProps {
  label: string;
  onClick: () => void;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  className?: string;
}

export default function MenuItem({
  label,
  onClick,
  startIcon,
  endIcon,
  className,
}: MenuItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-4 p-2 w-full text-left rounded-full',
        'hover:bg-secondary transition-colors duration-150',
        'focus:outline-none focus-visible:bg-secondary',
        className
      )}
    >
      {startIcon && (
        <span className="flex-shrink-0 text-primary">{startIcon}</span>
      )}
      <span className="text-body-sm text-primary whitespace-nowrap flex-1">
        {label}
      </span>
      {endIcon && <span className="flex-shrink-0 text-primary">{endIcon}</span>}
    </button>
  );
}
