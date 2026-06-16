'use client';

import { MagicWandIcon } from '@phosphor-icons/react';
import React, { useEffect, useRef, useState } from 'react';

import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface TitleFieldProps {
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  suggestedTitles?: string[];
}

export default function TitleField({
  value,
  onChange,
  placeholder = 'Enter a title',
  suggestedTitles,
}: TitleFieldProps) {
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const [inputWidth, setInputWidth] = useState<number | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);

  // Measure input container width for popover
  useEffect(() => {
    if (containerRef.current) {
      setInputWidth(containerRef.current.offsetWidth);
    }
  }, []);

  // Update width on window resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setInputWidth(containerRef.current.offsetWidth);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSuggestionSelect = (title: string) => {
    onChange?.(title);
    setIsSuggestionsOpen(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <p className="text-body-sm-emph text-primary">Title</p>
      <div className="relative" ref={containerRef}>
        <Input
          type="text"
          value={value}
          onChange={e => onChange?.(e.target.value)}
          placeholder={placeholder}
          className="h-11 rounded-[12px] border-transparent hover:border-primary bg-elevated shadow-elevation-100 text-body-base text-primary placeholder:text-tertiary focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0 pr-10"
        />
        <Popover open={isSuggestionsOpen} onOpenChange={setIsSuggestionsOpen}>
          <PopoverTrigger asChild>
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:text-accent transition-colors"
              aria-label="Show suggested titles"
              onMouseDown={e => e.preventDefault()}
            >
              <MagicWandIcon size={20} weight="regular" />
            </button>
          </PopoverTrigger>
          <PopoverContent
            className="p-2 rounded-xl"
            align="end"
            sideOffset={12}
            style={{ width: inputWidth ? `${inputWidth - 16}px` : '304px' }}
          >
            <div className="flex flex-col gap-[1px]">
              {(suggestedTitles ?? []).map(suggestion => (
                <button
                  key={suggestion}
                  onClick={e => {
                    e.stopPropagation();
                    handleSuggestionSelect(suggestion);
                  }}
                  className="w-full text-left rounded-[12px] p-2 text-body-sm text-primary hover:bg-secondary transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
