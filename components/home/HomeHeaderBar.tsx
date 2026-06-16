'use client';

import { GearIcon, QuestionIcon } from '@phosphor-icons/react';
import Image from 'next/image';

interface SideNavColumnProps {
  avatarUrl?: string;
}

export function SideNavColumn({
  avatarUrl = '/avatar-pistakio.jpg',
}: SideNavColumnProps) {
  return (
    <div className="flex flex-col items-center gap-4 p-4 h-full">
      <button className="relative size-8 rounded-full overflow-hidden shadow-elevation-100 ring-1 ring-white/20 hover:opacity-80 transition-opacity">
        <Image src={avatarUrl} alt="Profile" className="object-cover" fill />
      </button>

      <div className="flex-1" />

      <button
        type="button"
        aria-label="Settings"
        className="size-6 flex items-center justify-center text-primary hover:text-secondary transition-colors"
      >
        <GearIcon size={24} weight="regular" />
      </button>

      <button
        type="button"
        aria-label="Help"
        className="size-6 flex items-center justify-center text-primary hover:text-secondary transition-colors"
      >
        <QuestionIcon size={24} weight="regular" />
      </button>
    </div>
  );
}
