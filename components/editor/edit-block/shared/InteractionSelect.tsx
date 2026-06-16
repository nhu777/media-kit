'use client';

import { CaretDownIcon } from '@phosphor-icons/react';
import clsx from 'clsx';
import React, { useState } from 'react';

import type { InteractionType } from '@/lib/linkData';

interface InteractionSelectProps {
  value: InteractionType;
  onChange?: (value: InteractionType) => void;
}

export default function InteractionSelect({
  value,
  onChange,
}: InteractionSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const options: { value: InteractionType; label: string }[] = [
    { value: 'openProfile', label: 'Open Instagram profile' },
    { value: 'showLatestPosts', label: 'Show latest posts' },
    { value: 'openInApp', label: 'Open in Instagram app' },
  ];

  const currentLabel =
    options.find(opt => opt.value === value)?.label || 'Open Instagram profile';

  return (
    <div className="flex items-center gap-0 w-full">
      {/* Label section */}
      <div className="flex flex-col gap-0 flex-1 min-w-0">
        <p className="text-body-sm-emph text-primary truncate">Interaction</p>
        <p className="text-body-xs text-secondary truncate">
          When a visitor clicks
        </p>
      </div>
      {/* Select dropdown */}
      <div className="relative flex-1">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between gap-2 w-full h-11 px-3 border border-transparent rounded-[12px] bg-elevated shadow-elevation-100 hover:border-primary transition-colors"
        >
          <span className="text-body-sm text-primary truncate">
            {currentLabel}
          </span>
          <CaretDownIcon
            size={20}
            weight="regular"
            className="text-primary flex-shrink-0"
          />
        </button>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute top-full left-0 right-0 mt-1 bg-elevated border border-secondary rounded-[12px] shadow-elevation-200 z-20 overflow-hidden">
              {options.map(option => (
                <button
                  key={option.value}
                  onClick={() => {
                    onChange?.(option.value);
                    setIsOpen(false);
                  }}
                  className={clsx(
                    'w-full px-3 py-2 text-left text-body-sm hover:bg-secondary transition-colors',
                    option.value === value
                      ? 'text-primary bg-secondary'
                      : 'text-primary'
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
