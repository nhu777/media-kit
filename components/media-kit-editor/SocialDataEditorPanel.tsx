'use client';

import { CheckIcon } from '@phosphor-icons/react';

import type { Platform } from '@/components/media-kit/shared';
import {
  getEditorSocialStatRows,
  type SocialStatKey,
  type VisibleSocialStatsByPlatform,
} from '@/components/media-kit/socialData';
import { cn } from '@/lib/utils';

import { EditorEducationBlock } from './EditorEducationBlock';
import { EditorPlatformTabs } from './EditorPlatformTabs';
import { EditorSectionHeader } from './EditorSectionHeader';

function EditorStatCheckbox({
  checked,
  onToggle,
  label,
}: {
  checked: boolean;
  onToggle: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={`Show ${label} on media kit`}
      onClick={onToggle}
      className={cn(
        'flex size-5 shrink-0 items-center justify-center rounded-[4px] border transition-colors',
        checked
          ? 'border-inverse bg-inverse text-on-inverse-primary'
          : 'border-secondary bg-elevated'
      )}
    >
      {checked ? <CheckIcon size={16} weight="bold" /> : null}
    </button>
  );
}

function EditorSocialStatCell({
  label,
  value,
  positive,
  checked,
  onToggle,
  className,
}: {
  label: string;
  value: string;
  positive?: boolean;
  checked: boolean;
  onToggle: () => void;
  className?: string;
}) {
  return (
    <div className={cn('flex items-center gap-4 p-4', className)}>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className="truncate text-body-xs text-secondary">{label}</p>
        <p
          className={cn(
            'text-body-sm-emph',
            positive ? 'text-success' : 'text-primary'
          )}
        >
          {value}
        </p>
      </div>
      <EditorStatCheckbox checked={checked} onToggle={onToggle} label={label} />
    </div>
  );
}

interface SocialDataEditorPanelProps {
  onBack: () => void;
  hidden?: boolean;
  onToggleHidden: () => void;
  visibleStatsByPlatform: VisibleSocialStatsByPlatform;
  onToggleStat: (platform: Platform, key: SocialStatKey) => void;
  platform: Platform;
  onPlatformChange: (platform: Platform) => void;
}

export function SocialDataEditorPanel({
  onBack,
  hidden = false,
  onToggleHidden,
  visibleStatsByPlatform,
  onToggleStat,
  platform,
  onPlatformChange,
}: SocialDataEditorPanelProps) {
  const visibleStats = visibleStatsByPlatform[platform];
  const statRows = getEditorSocialStatRows(platform);

  return (
    <div className="flex w-full max-w-[500px] flex-col gap-8">
      <EditorSectionHeader
        title="Social data"
        hidden={hidden}
        onBack={onBack}
        onToggleHidden={onToggleHidden}
      />

      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-8">
          <EditorPlatformTabs active={platform} onChange={onPlatformChange} />

          <div className="overflow-hidden rounded-[20px] bg-primary">
            <div className="rounded-[20px] border border-tertiary bg-elevated">
              {statRows.map((row, rowIndex) => (
                <div key={rowIndex} className="flex w-full">
                  {row.map(stat => (
                    <EditorSocialStatCell
                      key={stat.key}
                      label={stat.label}
                      value={stat.value}
                      positive={stat.positive}
                      checked={visibleStats.has(stat.key)}
                      onToggle={() => onToggleStat(platform, stat.key)}
                      className={row.length === 1 ? 'w-1/2' : 'flex-1'}
                    />
                  ))}
                </div>
              ))}
            </div>

            <div className="p-4">
              <p className="text-body-xs text-secondary">
                This helps brands understand your reach and performance across
                platforms and get the full picture. You can choose to show or
                hide it at any time!
              </p>
            </div>
          </div>
        </div>

        <EditorEducationBlock title="Why is social data important?">
          <p className="text-body-xs text-secondary">
            Social data shows brands how your audience behaves across the
            platforms that drive traffic to your Linktree. Follower count and
            impressions tell them your scale; engagement rate and growth tell
            them how actively your audience responds to your content. Together
            these stats help brands judge whether your audience is likely to act
            — and how that compares to similar creators in your space.
          </p>
        </EditorEducationBlock>
      </div>
    </div>
  );
}
