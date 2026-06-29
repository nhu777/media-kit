'use client';

import { Button } from '@linktr.ee/arbor/Button';
import {
  CheckIcon,
  LinkBreakIcon,
  PencilSimpleIcon,
  XIcon,
} from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

import {
  BRAND_MENTION_MODAL_OPTIONS,
  type BrandMentionOption,
  isGlossierLogo,
  MAX_BRAND_MENTIONS,
} from '@/components/media-kit/brandPartnershipsData';
import { cn } from '@/lib/utils';

import { EditorTrafficPlatformIcon } from './EditorTrafficPlatformIcon';

const MAX_SELECTIONS = MAX_BRAND_MENTIONS;

const OVERLAY_TRANSITION = { duration: 0.2, ease: [0.4, 0, 0.2, 1] as const };
const MODAL_TRANSITION = { duration: 0.28, ease: [0.32, 0.72, 0, 1] as const };

interface AddBrandMentionsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedIds: string[];
  onSave: (selectedIds: string[]) => void;
}

function BrandMentionCheckbox({
  checked,
  disabled,
  onToggle,
  label,
}: {
  checked: boolean;
  disabled?: boolean;
  onToggle: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={`${checked ? 'Remove' : 'Add'} ${label}`}
      disabled={disabled}
      onClick={onToggle}
      className={cn(
        'flex size-5 shrink-0 items-center justify-center rounded-[4px] border transition-colors',
        checked
          ? 'border-inverse bg-inverse text-on-inverse-primary'
          : 'border-secondary bg-elevated',
        disabled && 'cursor-not-allowed opacity-40'
      )}
    >
      {checked ? <CheckIcon size={16} weight="bold" /> : null}
    </button>
  );
}

function BrandMentionSelectionBadge({
  brand,
}: {
  brand: BrandMentionOption | null;
}) {
  if (brand) {
    return <BrandMentionLogo logo={brand.logo} size={48} />;
  }

  return (
    <div className="flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-white bg-primary p-[9.6px] shadow-elevation-100">
      <LinkBreakIcon size={29} weight="regular" className="text-secondary" />
    </div>
  );
}

function BrandMentionLogo({
  logo,
  size = 32,
}: {
  logo: string;
  size?: 32 | 48;
}) {
  return (
    <div
      className={cn(
        'relative shrink-0 overflow-hidden rounded-full',
        size === 48 ? 'size-12' : 'size-8',
        isGlossierLogo(logo) ? 'border border-secondary' : ''
      )}
    >
      <Image
        src={logo}
        alt=""
        fill
        className="object-cover"
        sizes={size === 48 ? '48px' : '32px'}
      />
    </div>
  );
}

function ConnectedAccountCard() {
  return (
    <div className="flex shrink-0 items-center gap-4 rounded-[16px] border border-secondary p-4">
      <EditorTrafficPlatformIcon platform="instagram" />

      <div className="flex min-w-0 flex-1 flex-col">
        <p className="truncate text-body-sm text-primary">@jeanbert</p>
        <div className="flex items-center gap-1">
          <span
            className="size-2 shrink-0 rounded-full bg-[#008236]"
            aria-hidden
          />
          <p className="truncate text-body-xs text-secondary">jeanbert</p>
        </div>
      </div>

      <button
        type="button"
        aria-label="Edit Instagram account"
        className="flex size-8 shrink-0 items-center justify-center rounded-full text-primary transition-colors hover:bg-secondary/60"
      >
        <PencilSimpleIcon size={20} weight="regular" />
      </button>
    </div>
  );
}

function BrandMentionRow({
  brand,
  checked,
  selectionDisabled,
  onToggle,
}: {
  brand: BrandMentionOption;
  checked: boolean;
  selectionDisabled: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="group flex w-full items-center gap-4 rounded-[16px] p-4 transition-colors hover:bg-secondary">
      <BrandMentionLogo logo={brand.logo} />
      <p className="min-w-0 flex-1 text-body-sm-emph text-primary">
        {brand.name}
      </p>
      <BrandMentionCheckbox
        checked={checked}
        disabled={!checked && selectionDisabled}
        onToggle={onToggle}
        label={brand.name}
      />
    </div>
  );
}

export function AddBrandMentionsModal({
  open,
  onOpenChange,
  selectedIds,
  onSave,
}: AddBrandMentionsModalProps) {
  const [draftSelectedIds, setDraftSelectedIds] = useState<string[]>(() => [
    ...selectedIds,
  ]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onOpenChange(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onOpenChange]);

  useEffect(() => {
    if (open) {
      setDraftSelectedIds([...selectedIds]);
    }
  }, [open, selectedIds]);

  const mostRecentBrand = useMemo(() => {
    const mostRecentId = draftSelectedIds[draftSelectedIds.length - 1];
    if (!mostRecentId) {
      return null;
    }

    return (
      BRAND_MENTION_MODAL_OPTIONS.find(brand => brand.id === mostRecentId) ??
      null
    );
  }, [draftSelectedIds]);

  const selectionDisabled = draftSelectedIds.length >= MAX_SELECTIONS;

  const toggleBrand = (brandId: string) => {
    setDraftSelectedIds(current => {
      if (current.includes(brandId)) {
        return current.filter(id => id !== brandId);
      }

      if (current.length >= MAX_SELECTIONS) {
        return current;
      }

      return [...current, brandId];
    });
  };

  const handleSave = () => {
    onSave([...draftSelectedIds]);
    onOpenChange(false);
  };

  if (typeof window === 'undefined') {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            aria-label="Close brand mentions dialog"
            className="fixed inset-0 z-[100] bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={OVERLAY_TRANSITION}
            onClick={() => onOpenChange(false)}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-brand-mentions-title"
            className="pointer-events-none fixed inset-0 z-[101] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={OVERLAY_TRANSITION}
          >
            <motion.div
              className="pointer-events-auto flex h-[640px] w-[560px] flex-col overflow-hidden rounded-[24px] bg-elevated shadow-elevation-400"
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 8 }}
              transition={MODAL_TRANSITION}
              onClick={event => event.stopPropagation()}
            >
              <div className="flex h-[72px] shrink-0 items-center gap-4 border-b border-tertiary px-4">
                <button
                  type="button"
                  aria-label="Close"
                  onClick={() => onOpenChange(false)}
                  className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary text-primary transition-colors hover:bg-tertiary"
                >
                  <XIcon size={20} weight="regular" />
                </button>
                <h2
                  id="add-brand-mentions-title"
                  className="min-w-0 flex-1 text-center text-body-base-emph text-primary"
                >
                  Instagram brand mentions
                </h2>
                <div className="size-10 shrink-0" aria-hidden />
              </div>

              <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden p-4">
                <ConnectedAccountCard />

                <p className="shrink-0 text-center text-body-sm text-secondary">
                  Here are the brands you&apos;ve mentioned so far. Add up to 8.
                </p>

                <div className="scrollbar-hide min-h-0 flex-1 overflow-y-auto">
                  <div className="flex flex-col">
                    {BRAND_MENTION_MODAL_OPTIONS.map(brand => (
                      <BrandMentionRow
                        key={brand.id}
                        brand={brand}
                        checked={draftSelectedIds.includes(brand.id)}
                        selectionDisabled={selectionDisabled}
                        onToggle={() => toggleBrand(brand.id)}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex shrink-0 items-center justify-between border-t border-tertiary p-4">
                <div className="flex min-w-0 items-center gap-4">
                  <BrandMentionSelectionBadge brand={mostRecentBrand} />
                  <p className="text-body-base-emph text-primary">
                    {draftSelectedIds.length} selected
                  </p>
                </div>

                <Button
                  variant="primary"
                  size="sm"
                  shape="capsule"
                  onClick={handleSave}
                >
                  Save
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}
