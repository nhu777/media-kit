'use client';

import { PlusIcon } from '@phosphor-icons/react';
import { clsx } from 'clsx';
import { useState } from 'react';

interface AddBarProps {
  onAddLink?: (url: string) => void;
  className?: string;
  placeholder?: string;
}

export default function AddBar({
  onAddLink,
  className,
  placeholder = 'Paste URL or search...',
}: AddBarProps) {
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    if (value.trim()) {
      onAddLink?.(value.trim());
      setValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div
      className={clsx(
        'group flex items-center gap-4 rounded-full bg-elevated pl-4 pr-6 py-4 shadow-elevation-300 transition-all focus-within:ring-2 focus-within:ring-primary/10',
        className
      )}
    >
      <button
        onClick={handleSubmit}
        className="flex-shrink-0 size-8 flex items-center justify-center rounded-full bg-inverse hover:bg-btnPrimary/90 transition-colors"
        aria-label="Add link"
      >
        <PlusIcon
          size={18}
          weight="bold"
          className="text-on-inverse-primary" // Usually btnPrimary text is white/inverse
        />
      </button>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 bg-transparent text-body-base text-primary placeholder:text-secondary outline-none min-w-0"
      />
    </div>
  );
}
