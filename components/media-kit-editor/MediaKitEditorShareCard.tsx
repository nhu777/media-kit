'use client';

import { CheckIcon, PlusIcon } from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

const MEDIA_KIT_URL = 'linktr.ee/jean-mediakit';
const CELEBRATION_EASE = [0.32, 0.72, 0, 1] as const;
const CELEBRATION_SPRING = {
  type: 'spring' as const,
  stiffness: 520,
  damping: 24,
  mass: 0.7,
};

const SPARKLE_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

function LinktreeMarkIcon({ className }: { className?: string }) {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M13.09 3.5H10.66V7.62L7.84 4.73L6.21 6.38L9.16 9.22H5V11.53H9.18L6.21 14.43L7.84 16.05L11.88 12L15.93 16.05L17.54 14.43L14.57 11.53H18.75V9.22H14.59L17.54 6.38L15.93 4.73L13.09 7.62V3.5ZM10.66 14.86V20.35H13.09V14.86H10.66Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CopyLinkButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);
  const [celebrating, setCelebrating] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setCelebrating(true);
      window.setTimeout(() => {
        setCopied(false);
        setCelebrating(false);
      }, 2000);
    } catch {
      setCopied(false);
      setCelebrating(false);
    }
  };

  return (
    <div className="relative shrink-0">
      <AnimatePresence>
        {celebrating ? (
          <motion.span
            key="copy-pulse"
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[8px] border border-white/70"
            initial={{ opacity: 0.8, scale: 1 }}
            animate={{ opacity: 0, scale: 1.35 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: CELEBRATION_EASE }}
          />
        ) : null}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={handleCopy}
        initial={false}
        animate={{
          scale: celebrating ? [1, 1.08, 0.96, 1.02, 1] : 1,
        }}
        transition={
          celebrating
            ? {
                duration: 0.45,
                ease: CELEBRATION_EASE,
                times: [0, 0.18, 0.42, 0.68, 1],
              }
            : { duration: 0.2 }
        }
        whileTap={{ scale: 0.96 }}
        className="relative flex h-8 min-w-[62px] items-center justify-center overflow-hidden rounded-[8px] bg-inverse px-2.5 text-body-sm-emph text-on-inverse-primary"
      >
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span
              key="copied"
              initial={{ opacity: 0, y: 10, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.9 }}
              transition={CELEBRATION_SPRING}
              className="flex items-center gap-1"
            >
              <CheckIcon size={14} weight="bold" aria-hidden />
              Copied
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ opacity: 0, y: -8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.85 }}
              transition={{ duration: 0.18, ease: CELEBRATION_EASE }}
            >
              Copy
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}

const FOOTER_DISMISS_DELAY_MS = 2000;
const FOOTER_COLLAPSE_TRANSITION = {
  duration: 0.38,
  ease: CELEBRATION_EASE,
};

function AddToLinktreeButton({
  added,
  celebrating,
  onAdd,
}: {
  added: boolean;
  celebrating: boolean;
  onAdd: () => void;
}) {
  return (
    <div className="relative flex size-8 shrink-0 items-center justify-center">
      <AnimatePresence>
        {celebrating
          ? SPARKLE_ANGLES.map((angle, index) => (
              <motion.span
                key={`sparkle-${angle}`}
                aria-hidden
                className="pointer-events-none absolute size-1.5 rounded-full bg-[#008236]"
                initial={{ opacity: 0.95, scale: 0.4, x: 0, y: 0 }}
                animate={{
                  opacity: 0,
                  scale: 1,
                  x: Math.cos((angle * Math.PI) / 180) * 22,
                  y: Math.sin((angle * Math.PI) / 180) * 22,
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.55,
                  ease: CELEBRATION_EASE,
                  delay: index * 0.015,
                }}
              />
            ))
          : null}
      </AnimatePresence>

      <AnimatePresence>
        {celebrating ? (
          <motion.span
            key="pulse-ring"
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full border-2 border-[#008236]"
            initial={{ opacity: 0.75, scale: 1 }}
            animate={{ opacity: 0, scale: 2.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: CELEBRATION_EASE }}
          />
        ) : null}
      </AnimatePresence>

      <motion.button
        type="button"
        aria-label={added ? 'Added to your Linktree' : 'Add to your Linktree'}
        aria-pressed={added}
        disabled={added}
        onClick={onAdd}
        initial={false}
        animate={{
          scale: celebrating ? [1, 1.18, 0.96, 1.04, 1] : 1,
        }}
        transition={
          celebrating
            ? {
                duration: 0.55,
                ease: CELEBRATION_EASE,
                times: [0, 0.2, 0.45, 0.7, 1],
              }
            : { duration: 0.2 }
        }
        className={cn(
          'relative flex size-8 items-center justify-center overflow-hidden rounded-full border transition-colors motion-reduce:transition-none',
          added
            ? 'border-transparent bg-[#008236] text-white'
            : 'border-secondary bg-elevated text-primary hover:bg-primary'
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          {added ? (
            <motion.span
              key="check"
              initial={{ opacity: 0, scale: 0.2, rotate: -120 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={CELEBRATION_SPRING}
              className="flex items-center justify-center"
            >
              <CheckIcon size={16} weight="bold" />
            </motion.span>
          ) : (
            <motion.span
              key="plus"
              exit={{ opacity: 0, scale: 0.35, rotate: 90 }}
              transition={{ duration: 0.18, ease: CELEBRATION_EASE }}
              className="flex items-center justify-center"
            >
              <PlusIcon size={16} weight="regular" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}

export function MediaKitEditorShareCard() {
  const [addedToLinktree, setAddedToLinktree] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const [showLinktreeFooter, setShowLinktreeFooter] = useState(true);

  useEffect(() => {
    if (!addedToLinktree) return;

    const dismissTimer = window.setTimeout(() => {
      setShowLinktreeFooter(false);
    }, FOOTER_DISMISS_DELAY_MS);

    return () => window.clearTimeout(dismissTimer);
  }, [addedToLinktree]);

  const handleAddToLinktree = () => {
    if (addedToLinktree) return;

    setAddedToLinktree(true);
    setCelebrating(true);
    window.setTimeout(() => setCelebrating(false), 650);
  };

  return (
    <div className="overflow-hidden rounded-[20px] bg-elevated shadow-elevation-100">
      <div
        className={cn(
          'flex flex-col gap-4 px-4 pt-4',
          !showLinktreeFooter && 'pb-4'
        )}
      >
        <p className="text-body-sm-emph text-primary">Share your media kit</p>

        <div className="flex h-14 w-full items-center gap-3 rounded-[12px] border border-primary pl-4 pr-3">
          <LinktreeMarkIcon className="shrink-0 text-primary" />
          <p className="min-w-0 flex-1 truncate text-body-base text-primary">
            {MEDIA_KIT_URL}
          </p>
          <CopyLinkButton url={MEDIA_KIT_URL} />
        </div>
      </div>

      <AnimatePresence initial={false}>
        {showLinktreeFooter ? (
          <motion.div
            key="linktree-footer"
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: 'auto', opacity: 1, marginTop: 16, scaleY: 1 }}
            exit={{
              height: 0,
              opacity: 0,
              marginTop: 0,
              scaleY: 0.88,
              transition: FOOTER_COLLAPSE_TRANSITION,
            }}
            transition={FOOTER_COLLAPSE_TRANSITION}
            style={{ transformOrigin: 'top center' }}
            className="overflow-hidden"
          >
            <div className="relative flex items-center gap-3 bg-secondary p-4">
              <AnimatePresence>
                {celebrating ? (
                  <motion.div
                    key="footer-flash"
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-[#ecfdf3]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.85, 0] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.65, ease: CELEBRATION_EASE }}
                  />
                ) : null}
              </AnimatePresence>

              <div className="relative min-w-0 flex-1">
                <p className="text-body-sm-emph leading-none text-primary">
                  Add to your Linktree
                </p>
                <AnimatePresence mode="wait" initial={false}>
                  {addedToLinktree ? (
                    <motion.p
                      key="added-copy"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.28,
                        ease: CELEBRATION_EASE,
                        delay: 0.08,
                      }}
                      className="mt-1 text-body-xs text-[#008236]"
                    >
                      Added to your Linktree
                    </motion.p>
                  ) : (
                    <motion.p
                      key="default-copy"
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.16, ease: CELEBRATION_EASE }}
                      className="mt-1 text-body-xs text-secondary"
                    >
                      Displaying your media kit on your page helps brands find
                      you
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              <AddToLinktreeButton
                added={addedToLinktree}
                celebrating={celebrating}
                onAdd={handleAddToLinktree}
              />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
