'use client';

import { ChartLineUpIcon, LinkIcon, TicketIcon } from '@phosphor-icons/react';
import Image from 'next/image';

import type { TopLinkRow } from '@/components/media-kit/performanceData';
import { PERFORMANCE_CARDS } from '@/components/media-kit/performanceData';

import { EditorEducationBlock } from './EditorEducationBlock';
import { EditorSectionHeader } from './EditorSectionHeader';

const LINK_THUMBNAIL_CLASS =
  'flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-[12px] border-2 border-white bg-primary shadow-elevation-100';

function EditorLinkRow({ link }: { link: TopLinkRow }) {
  return (
    <div className="flex items-center gap-4 rounded-[16px] border border-secondary p-4">
      <div className={LINK_THUMBNAIL_CLASS}>
        {link.variant === 'ticket' ? (
          <TicketIcon size={24} weight="regular" className="text-primary" />
        ) : link.image ? (
          <div className="relative size-full">
            <Image
              src={link.image}
              alt=""
              fill
              className="rounded-[10px] object-cover"
              sizes="32px"
            />
          </div>
        ) : (
          <LinkIcon size={24} weight="regular" className="text-primary" />
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className="truncate text-body-xs text-secondary">{link.title}</p>
        <p className="text-body-sm-emph text-primary">{link.clickRate}</p>
      </div>
    </div>
  );
}

interface ClickThroughRateEditorPanelProps {
  onBack: () => void;
  hidden?: boolean;
  onToggleHidden: () => void;
}

const CTR_CARD = PERFORMANCE_CARDS.find(card => card.id === 'ctr')!;

export function ClickThroughRateEditorPanel({
  onBack,
  hidden = false,
  onToggleHidden,
}: ClickThroughRateEditorPanelProps) {
  return (
    <div className="flex w-full max-w-[500px] flex-col gap-8">
      <EditorSectionHeader
        title="Click-through rate"
        hidden={hidden}
        onBack={onBack}
        onToggleHidden={onToggleHidden}
      />

      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4 overflow-hidden rounded-[20px] border border-tertiary bg-elevated">
          <div className="border-b border-tertiary px-4 pb-4 pt-5">
            <p className="text-body-sm-emph text-primary">Highlight</p>
          </div>
          <div className="px-5 pb-5">
            <p className="text-[24px] font-medium leading-8 text-primary">
              Click-through rate of 38% ranks in the top 15% on Linktree.
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-[20px] bg-primary">
          <div className="rounded-[20px] border border-tertiary bg-elevated">
            <div className="flex items-center gap-4 p-4">
              <ChartLineUpIcon
                size={24}
                weight="regular"
                className="shrink-0 text-primary"
              />
              <p className="text-body-sm-emph text-primary">
                Top performing links
              </p>
            </div>

            <div className="flex flex-col gap-3 px-4 pb-4">
              {CTR_CARD.topLinks?.map(link => (
                <EditorLinkRow key={link.title} link={link} />
              ))}
            </div>
          </div>

          <div className="p-4">
            <p className="text-body-xs text-secondary">
              Brands use link-level CTR to make predictions about how their
              campaign might perform alongside your existing content.
            </p>
          </div>
        </div>

        <EditorEducationBlock title="What is click-through rate?">
          <p className="text-body-xs text-secondary">
            It measures how often people click your links after visiting your
            Linktree. Brands use this to see how well you drive traffic to
            content, products or partners.
          </p>
        </EditorEducationBlock>
      </div>
    </div>
  );
}
