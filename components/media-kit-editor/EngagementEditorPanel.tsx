'use client';

import {
  ChartBarIcon,
  CursorClickIcon,
  PencilSimpleIcon,
} from '@phosphor-icons/react';

import { PERFORMANCE_CARDS } from '@/components/media-kit/performanceData';
import type { Platform } from '@/components/media-kit/shared';

import { EditorEducationBlock } from './EditorEducationBlock';
import { EditorSectionHeader } from './EditorSectionHeader';
import { EditorTrafficPlatformIcon } from './EditorTrafficPlatformIcon';

const ENGAGEMENT_CARD = PERFORMANCE_CARDS.find(
  card => card.id === 'engagement'
)!;

const PLATFORM_ROWS =
  ENGAGEMENT_CARD.trafficSources?.map(row => ({
    platform: row.platform,
    handle: '@jeanbert',
    clicks: `${row.value} average clicks`,
  })) ?? [];

const INSIGHT_STATS = [
  {
    title:
      'Average clicks-per-session on Jean’s Linktree is higher than similar creators',
    caption: '3x the platform average',
    footer:
      'Multiple clicks per session is what brands call "action depth" — the clearest signal that your audience is actively exploring, not just scrolling past.',
  },
  {
    title:
      'Visitors spend 30% more time exploring Jean’s Linktree than similar creators',
    caption: '2x the platform average',
    footer:
      'For brands selling products that need a moment of consideration, high time-per-visit signals that your audience is genuinely engaged rather than passing through.',
  },
];

function EditorTrafficSourceRow({
  platform,
  handle,
  clicks,
}: {
  platform: Platform;
  handle: string;
  clicks: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-[16px] border border-secondary p-4">
      <EditorTrafficPlatformIcon platform={platform} />

      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className="truncate text-body-xs text-secondary">{handle}</p>
        <p className="text-body-sm-emph text-primary">{clicks}</p>
      </div>

      <button
        type="button"
        aria-label={`Edit ${platform} traffic source`}
        className="flex size-8 shrink-0 items-center justify-center rounded-full text-primary transition-colors hover:bg-secondary/60"
      >
        <PencilSimpleIcon size={20} weight="regular" />
      </button>
    </div>
  );
}

function EditorInsightBlock({
  title,
  caption,
  footer,
}: {
  title: string;
  caption: string;
  footer: string;
}) {
  return (
    <div className="overflow-hidden rounded-[16px] bg-primary">
      <div className="rounded-[16px] border border-tertiary bg-elevated">
        <div className="flex items-center gap-4 p-4">
          <CursorClickIcon
            size={24}
            weight="regular"
            className="shrink-0 text-primary"
          />
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <p className="text-body-sm-emph text-primary">{title}</p>
            <p className="text-body-xs text-secondary">{caption}</p>
          </div>
        </div>
      </div>
      <div className="p-4">
        <p className="text-body-xs text-secondary">{footer}</p>
      </div>
    </div>
  );
}

interface EngagementEditorPanelProps {
  onBack: () => void;
  hidden?: boolean;
  onToggleHidden: () => void;
}

export function EngagementEditorPanel({
  onBack,
  hidden = false,
  onToggleHidden,
}: EngagementEditorPanelProps) {
  return (
    <div className="flex w-full max-w-[500px] flex-col gap-8">
      <EditorSectionHeader
        title="Engagement"
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
              On average, Jean&apos;s visitors spend 15 seconds and make 3+
              clicks per visit.
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-[16px] bg-primary">
          <div className="rounded-[16px] border border-tertiary bg-elevated">
            <div className="flex items-center gap-4 p-4">
              <ChartBarIcon
                size={24}
                weight="regular"
                className="shrink-0 text-primary"
              />
              <p className="text-body-sm-emph text-primary">
                Average clicks by traffic source
              </p>
            </div>

            <div className="flex flex-col gap-3 px-4 pb-4">
              {PLATFORM_ROWS.map(row => (
                <EditorTrafficSourceRow
                  key={row.platform}
                  platform={row.platform}
                  handle={row.handle}
                  clicks={row.clicks}
                />
              ))}
            </div>
          </div>

          <div className="p-4">
            <p className="text-body-xs text-secondary">
              Brands want to know which platforms send clicks to your Linktree,
              and whether your engagement depends on any single one of them.
              Strong click rates from multiple platforms makes you a safer bet.
            </p>
          </div>
        </div>

        {INSIGHT_STATS.map(stat => (
          <EditorInsightBlock
            key={stat.title}
            title={stat.title}
            caption={stat.caption}
            footer={stat.footer}
          />
        ))}

        <EditorEducationBlock title="What is engagement?">
          <p className="text-body-xs text-secondary">
            It measures how actively visitors explore your Linktree; tracking
            clicks per session and time spent, not just whether someone arrived.
            Brands use it to understand how interested visitors really are in
            what you&apos;re sharing – a stronger commercial signal than
            followers and reach alone.
          </p>
        </EditorEducationBlock>
      </div>
    </div>
  );
}
