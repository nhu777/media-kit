'use client';

import { FilmReelIcon, ImageSquareIcon, RowsIcon } from '@phosphor-icons/react';
import clsx from 'clsx';
import React from 'react';

import type { LinkLayout } from '@/lib/editorData';

interface DisplayOptionCardProps {
  icon: React.ElementType;
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

function DisplayOptionCard({
  icon: Icon,
  label,
  isSelected,
  onClick,
}: DisplayOptionCardProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'flex-1 flex flex-col items-center justify-center h-16 rounded-[16px] border transition-all overflow-hidden',
        isSelected
          ? 'bg-elevated border-inverse shadow-elevation-100'
          : 'bg-transparent border-secondary hover:border-inverse'
      )}
    >
      <Icon
        size={24}
        weight="regular"
        className={isSelected ? 'text-primary' : 'text-secondary'}
      />
      <span
        className={clsx(
          'text-body-sm',
          isSelected ? 'text-primary' : 'text-secondary'
        )}
      >
        {label}
      </span>
    </button>
  );
}

interface DisplayLayoutSelectorProps {
  value: LinkLayout;
  onChange?: (layout: LinkLayout) => void;
  /** Show the Reels option (for Instagram links) */
  showReels?: boolean;
}

export default function DisplayLayoutSelector({
  value,
  onChange,
  showReels = false,
}: DisplayLayoutSelectorProps) {
  return (
    <div className="flex flex-col">
      <p className="text-body-sm-emph text-primary mb-4">Display</p>
      <div className="flex gap-3">
        <DisplayOptionCard
          icon={RowsIcon}
          label="Button"
          isSelected={value === 'classic'}
          onClick={() => onChange?.('classic')}
        />
        <DisplayOptionCard
          icon={ImageSquareIcon}
          label="Featured"
          isSelected={value === 'featured'}
          onClick={() => onChange?.('featured')}
        />
        {showReels && (
          <DisplayOptionCard
            icon={FilmReelIcon}
            label="Reels"
            isSelected={value === 'reels'}
            onClick={() => onChange?.('reels')}
          />
        )}
      </div>
    </div>
  );
}
