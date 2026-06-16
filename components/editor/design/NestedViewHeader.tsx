'use client';

import { ArrowLeftIcon } from '@phosphor-icons/react';
import React from 'react';

interface NestedViewHeaderProps {
  title: string;
  onBack: () => void;
}

export default function NestedViewHeader({
  title,
  onBack,
}: NestedViewHeaderProps) {
  return (
    <div className="h-[72px] flex items-center gap-4 px-4 py-4 shrink-0">
      <button
        onClick={onBack}
        className="size-10 flex items-center justify-center rounded-full bg-elevated shadow-elevation-100 hover:bg-secondary transition-colors"
        aria-label="Go back"
      >
        <ArrowLeftIcon size={16} weight="regular" className="text-primary" />
      </button>
      <h2 className="flex-1 text-body-base-emph text-primary">{title}</h2>
    </div>
  );
}
