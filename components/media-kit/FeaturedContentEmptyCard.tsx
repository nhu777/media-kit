'use client';

import { Button } from '@linktr.ee/arbor/Button';
import { PlusIcon, SquaresFourIcon } from '@phosphor-icons/react';

const FOOTER_COPY =
  "Hand-pick your best posts to give brands confidence in your style and track record. Prioritize the collabs that you're great at, and want to do more of.";

interface FeaturedContentEmptyCardProps {
  onAddPosts?: () => void;
}

export function FeaturedContentEmptyCard({
  onAddPosts,
}: FeaturedContentEmptyCardProps) {
  return (
    <div className="overflow-hidden rounded-[16px] bg-primary">
      <div className="overflow-hidden rounded-[16px] border border-dashed border-tertiary bg-elevated">
        <div className="flex items-center gap-4 border-b border-dashed border-tertiary p-4">
          <SquaresFourIcon
            size={24}
            weight="regular"
            className="shrink-0 text-primary"
          />
          <p className="min-w-0 flex-1 text-body-sm-emph text-primary">
            Featured content
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 px-6 py-10">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-white bg-primary p-[9.6px] shadow-elevation-100">
            <PlusIcon size={24} weight="regular" className="text-primary" />
          </div>

          <div className="flex w-full flex-col gap-0.5 text-center">
            <p className="text-body-sm-emph text-primary">
              Showcase the brand collaborations you&apos;ve done already
            </p>
            <p className="text-body-xs text-secondary">
              This can include anything you&apos;ve posted on TikTok, Instagram
              or YouTube.
            </p>
          </div>

          {onAddPosts ? (
            <Button
              variant="primary"
              size="xs"
              shape="capsule"
              onClick={onAddPosts}
            >
              Add posts
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
