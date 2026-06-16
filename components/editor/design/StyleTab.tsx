'use client';

import { CaretRightIcon } from '@phosphor-icons/react';
import React from 'react';

interface StyleTabProps {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}

export default function StyleTab({ label, icon, onClick }: StyleTabProps) {
  return (
    <button
      onClick={onClick}
      className="w-full min-w-[184px] bg-elevated shadow-elevation-100 flex items-center justify-between p-3 rounded-xl border border-transparent hover:border-primary transition-all duration-150"
    >
      <div className="flex items-center gap-4">
        <div className="size-10 flex items-center justify-center">{icon}</div>
        <span className="text-body-sm text-primary">{label}</span>
      </div>
      <CaretRightIcon size={20} weight="regular" className="text-secondary" />
    </button>
  );
}
