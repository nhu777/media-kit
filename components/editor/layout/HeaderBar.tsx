'use client';

import {
  CaretDownIcon,
  CaretLeftIcon,
  CheckIcon,
  ExportIcon,
  SparkleIcon,
} from '@phosphor-icons/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';

import { usePage } from '@/components/editor/shared/PageContext';
import { useClickOutside } from '@/components/editor/shared/useClickOutside';

export default function HeaderBar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { activePage } = usePage();

  useClickOutside(menuRef, () => setIsOpen(false));

  return (
    <header className="relative flex shrink-0 items-center justify-between pl-4 pr-5 py-4">
      <div className="flex items-center gap-6 z-10">
        <Link
          href="/"
          className="bg-elevated w-[56px] h-[40px] flex items-center justify-center gap-[2px] pl-2 pr-3 rounded-full shadow-elevation-100"
        >
          <CaretLeftIcon size={16} weight="regular" className="text-primary" />
          <Image
            src="/logo.svg"
            width={20}
            height={20}
            alt="Linktree"
            className="size-5"
          />
        </Link>
        <div ref={menuRef} className="relative">
          <button
            onClick={() => setIsOpen(v => !v)}
            className="flex items-center gap-1.5 h-[40px] p-2 rounded-full hover:opacity-80 transition-opacity"
            aria-haspopup="menu"
            aria-expanded={isOpen}
          >
            <span className="text-body-base-emph text-primary">
              {activePage.name}
            </span>
            <CaretDownIcon size={16} weight="bold" className="text-primary" />
          </button>

          {isOpen && (
            <div
              role="menu"
              className="absolute top-full mt-2 left-0 w-[180px] rounded-xl bg-elevated shadow-elevation-400 p-2"
            >
              <div className="flex flex-col gap-[1px]">
                <button
                  role="menuitem"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-body-sm text-primary hover:bg-secondary"
                >
                  <span className="flex-1 text-left">{activePage.name}</span>
                  <CheckIcon size={16} weight="bold" className="text-primary" />
                </button>
                <button
                  role="menuitem"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-body-sm text-primary hover:bg-secondary"
                >
                  <span className="flex-1 text-left">New page</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 z-10">
        <button
          className="bg-elevated size-[40px] flex items-center justify-center rounded-full shadow-elevation-100"
          aria-label="AI"
        >
          <SparkleIcon size={20} weight="regular" className="text-primary" />
        </button>
        <button
          className="bg-elevated h-[40px] flex items-center gap-1.5 px-3.5 rounded-full shadow-elevation-100"
          aria-label="Share"
        >
          <ExportIcon size={20} weight="regular" className="text-primary" />
          <span className="text-body-sm-emph text-primary">Share</span>
        </button>
      </div>
    </header>
  );
}
