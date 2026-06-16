'use client';

import { XIcon } from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

const OVERLAY_TRANSITION = { duration: 0.32, ease: [0.4, 0, 0.2, 1] as const };
const SHEET_TRANSITION = { duration: 0.42, ease: [0.32, 0.72, 0, 1] as const };

interface MediaKitBottomSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  titleId: string;
  overlayAriaLabel: string;
  showHandle?: boolean;
  roundedClass?: string;
  titleClassName?: string;
  children: React.ReactNode;
}

export function MediaKitBottomSheet({
  open,
  onOpenChange,
  title,
  titleId,
  overlayAriaLabel,
  showHandle = false,
  roundedClass = 'rounded-[20px]',
  titleClassName = 'text-body-lg-emph text-primary',
  children,
}: MediaKitBottomSheetProps) {
  return (
    <AnimatePresence>
      {open ? (
        <div className="absolute inset-0 z-50 flex flex-col justify-end">
          <motion.button
            type="button"
            aria-label={overlayAriaLabel}
            className="absolute inset-0 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={OVERLAY_TRANSITION}
            onClick={() => onOpenChange(false)}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-[1] w-full px-4 pb-8"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={SHEET_TRANSITION}
          >
            <div
              className={`flex w-full flex-col overflow-hidden border-[1.5px] border-white bg-primary ${roundedClass}`}
            >
              <div
                className={`relative flex shrink-0 items-center justify-between border-b border-black/4 ${
                  showHandle ? 'h-16' : 'p-6'
                }`}
              >
                {showHandle ? (
                  <div className="absolute left-1/2 top-2 h-1 w-10 -translate-x-1/2 rounded-full bg-[#d7d4ce]" />
                ) : null}
                <h2
                  id={titleId}
                  className={`flex-1 ${showHandle ? 'px-4' : ''} ${titleClassName}`}
                >
                  {title}
                </h2>
                <button
                  type="button"
                  aria-label="Close"
                  onClick={() => onOpenChange(false)}
                  className={`flex size-7 shrink-0 items-center justify-center rounded-full bg-secondary ${
                    showHandle ? 'mr-4' : ''
                  }`}
                >
                  <XIcon size={20} weight="regular" className="text-primary" />
                </button>
              </div>

              {children}
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
