'use client';

import React from 'react';

import { cn } from '@/lib/utils';

export interface Option {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface OptionSelectorProps {
  options: Option[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function OptionSelector({
  options,
  selectedId,
  onSelect,
}: OptionSelectorProps) {
  return (
    <div className="flex gap-2 w-full">
      {options.map(option => {
        const isSelected = option.id === selectedId;
        return (
          <div
            key={option.id}
            className="flex-1 flex flex-col gap-1 items-start"
          >
            <button
              onClick={() => onSelect(option.id)}
              className="w-full flex flex-col items-start rounded-xl"
            >
              <div
                className={cn(
                  'w-full h-12 flex items-center justify-center rounded-[12px] bg-tertiary overflow-hidden',
                  isSelected && 'border-2 border-black'
                )}
              >
                <div
                  className={cn(
                    'size-6',
                    isSelected ? 'text-primary' : 'text-secondary'
                  )}
                >
                  {option.icon}
                </div>
              </div>
            </button>
            <p className="w-full text-body-xs text-secondary text-center">
              {option.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}
