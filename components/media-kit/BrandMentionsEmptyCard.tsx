'use client';

import { Button } from '@linktr.ee/arbor/Button';
import { PencilSimpleIcon, PlusIcon } from '@phosphor-icons/react';

const FOOTER_COPY =
  "Showcase the brands you already talk about, letting potential partners know that you're a natural fit, before the conversation even starts.";

interface BrandMentionsEmptyCardProps {
  onAddBrands?: () => void;
  onEdit?: () => void;
}

export function BrandMentionsEmptyCard({
  onAddBrands,
  onEdit,
}: BrandMentionsEmptyCardProps) {
  return (
    <div className="overflow-hidden rounded-[16px] bg-primary">
      <div className="overflow-hidden rounded-[16px] border border-dashed border-tertiary bg-elevated">
        <div className="flex items-center gap-4 border-b border-dashed border-tertiary p-4">
          <p className="min-w-0 flex-1 text-body-sm-emph text-primary">
            Brand mentions
          </p>
          {onEdit ? (
            <button
              type="button"
              aria-label="Edit brand mentions"
              onClick={onEdit}
              className="flex size-8 shrink-0 items-center justify-center rounded-full text-primary transition-colors hover:bg-secondary/60"
            >
              <PencilSimpleIcon size={20} weight="regular" />
            </button>
          ) : null}
        </div>

        <div className="flex flex-col items-center gap-4 px-6 py-10">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-white bg-primary p-[9.6px] shadow-elevation-100">
            <PlusIcon size={24} weight="regular" className="text-primary" />
          </div>

          <div className="flex w-full flex-col gap-0.5 text-center">
            <p className="text-body-sm-emph text-primary">
              Showcase your Instagram brand mentions
            </p>
            <p className="text-body-xs text-secondary">
              Include brands you&apos;ve mentioned on Instagram.
            </p>
          </div>

          {onAddBrands ? (
            <Button
              variant="primary"
              size="xs"
              shape="capsule"
              onClick={onAddBrands}
            >
              Add brands
            </Button>
          ) : null}
        </div>
      </div>

      <div className="p-4">
        <p className="text-body-xs text-secondary">{FOOTER_COPY}</p>
      </div>
    </div>
  );
}
