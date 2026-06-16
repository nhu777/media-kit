'use client';

import { Button } from '@linktr.ee/arbor/Button';
import { PaperPlaneTiltIcon } from '@phosphor-icons/react';
import Image from 'next/image';
import React, { useState } from 'react';

import { MediaKitBottomSheet } from './MediaKitBottomSheet';
import { MEDIA_KIT_SURFACE_RADIUS_CLASS } from './shared';

const EMAIL = 'jeantree@gmail.com';

interface GetInTouchSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GetInTouchSheet({ open, onOpenChange }: GetInTouchSheetProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <MediaKitBottomSheet
      open={open}
      onOpenChange={onOpenChange}
      title="Get in touch"
      titleId="get-in-touch-title"
      overlayAriaLabel="Close get in touch sheet"
      showHandle
      roundedClass={MEDIA_KIT_SURFACE_RADIUS_CLASS}
    >
      <div className="flex flex-col gap-4 p-4">
        <div className="flex w-full flex-col items-center rounded-[24px] border border-black/4 p-4">
          <div className="flex w-full items-center gap-6">
            <div className="relative size-[88px] shrink-0 overflow-hidden rounded-full">
              <Image
                src="/media-kit/avatar.jpg"
                alt="Jean Liu"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <p className="text-title-sm text-primary">Jean Liu</p>
              <p className="text-body-sm text-secondary">linktr.ee/jeantree</p>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col gap-2">
          <div className="flex w-full items-center justify-between gap-3 rounded-2xl bg-secondary py-3 pl-5 pr-3">
            <p className="min-w-0 truncate text-body-base text-primary">
              {EMAIL}
            </p>
            <Button
              variant="primary"
              size="sm"
              shape="capsule"
              onClick={handleCopy}
            >
              {copied ? 'Copied' : 'Copy'}
            </Button>
          </div>

          <button
            type="button"
            className="flex w-full items-center gap-4 py-3 text-left"
          >
            <PaperPlaneTiltIcon
              size={24}
              weight="regular"
              className="shrink-0 text-primary"
            />
            <span className="text-body-base text-primary">Message Jean</span>
          </button>
        </div>
      </div>
    </MediaKitBottomSheet>
  );
}
