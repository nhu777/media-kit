'use client';

import { PlusIcon } from '@phosphor-icons/react';
import React, { useState } from 'react';

import { cn } from '@/lib/utils';

interface PasteBarProps {
  onAddLink?: (url: string) => void;
  placeholder?: string;
  className?: string;
}

export default function PasteBar({
  onAddLink,
  placeholder = 'Paste link or search...',
  className,
}: PasteBarProps) {
  const [url, setUrl] = useState('');

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

  return (
    <div
      className={cn(
        'flex items-center gap-4 rounded-full bg-elevated p-4 shadow-elevation-300',
        className
      )}
    >
      <button
        onClick={handleSubmit}
        className="flex-shrink-0 size-8 flex items-center justify-center rounded-full bg-inverse"
        aria-label="Add link"
      >
        <PlusIcon
          size={24}
          weight="regular"
          className="text-on-inverse-primary"
        />
      </button>
      <input
        type="text"
        placeholder={placeholder}
        value={url}
        onChange={e => setUrl(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 bg-transparent text-body-base text-primary placeholder:text-primary outline-none"
      />
    </div>
  );
}
