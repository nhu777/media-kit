'use client';

import { CaretDownIcon } from '@phosphor-icons/react';
import Link from 'next/link';
import React, { useState } from 'react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface VersionOption {
  label: string;
  href: string;
  isExternal?: boolean;
}

const versionOptions: VersionOption[] = [
  { label: 'V2', href: '/editor', isExternal: false },
  {
    label: 'V1',
    href: 'https://baby-linktree-git-editor-shell-v1-linktree-managed.vercel.app?_vercel_share=duLm7fgaAaos5WDNX10QfuTez2Myt6aM',
    isExternal: true,
  },
];

export function VersionDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-1.5 px-3 py-2 bg-elevated shadow-elevation-100 rounded-full text-body-sm-emph text-primary hover:bg-secondary transition-colors"
        >
          <span>V1</span>
          <CaretDownIcon size={14} weight="bold" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" sideOffset={8} className="w-40 p-2">
        <div className="flex flex-col gap-1">
          {versionOptions.map(option =>
            option.isExternal ? (
              <a
                key={option.label}
                href={option.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-body-sm text-primary hover:bg-secondary transition-colors"
                onClick={() => setOpen(false)}
              >
                {option.label}
              </a>
            ) : (
              <Link
                key={option.label}
                href={option.href}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-body-sm text-primary hover:bg-secondary transition-colors"
                onClick={() => setOpen(false)}
              >
                {option.label}
              </Link>
            )
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default VersionDropdown;
