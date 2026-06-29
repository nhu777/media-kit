'use client';

import { CaretDownIcon, InfoIcon } from '@phosphor-icons/react';
import { type ReactNode, useState } from 'react';

import { cn } from '@/lib/utils';

export function EditorEducationBlock({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-[16px] border border-tertiary bg-[#dbeafe]">
      <button
        type="button"
        onClick={() => setOpen(current => !current)}
        className="flex w-full items-center gap-2 px-4 py-3 text-left"
      >
        <InfoIcon
          size={16}
          weight="regular"
          className="shrink-0 text-[#1447e6]"
        />
        <p className="min-w-0 flex-1 text-body-sm-emph text-[#1447e6]">
          {title}
        </p>
        <span
          className={cn(
            'flex size-8 shrink-0 items-center justify-center rounded-full text-[#1447e6]',
            'transition-colors duration-150',
            'hover:bg-white/90 hover:shadow-sm'
          )}
        >
          <CaretDownIcon
            size={16}
            weight="regular"
            className={cn(
              'transition-transform duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none',
              open ? 'rotate-180' : ''
            )}
          />
        </span>
      </button>
      <div
        className={cn(
          'grid motion-reduce:transition-none',
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
          'transition-[grid-template-rows,opacity] duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]'
        )}
        aria-hidden={!open}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="border-t border-tertiary bg-elevated px-4 py-3">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
