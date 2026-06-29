'use client';

import type { Icon } from '@phosphor-icons/react';
import {
  CursorClickIcon,
  EyeClosedIcon,
  QuestionIcon,
  UsersThreeIcon,
} from '@phosphor-icons/react';

import { EditorEducationBlock } from './EditorEducationBlock';
import { EditorHiddenHighlightCard } from './EditorHiddenHighlightCard';
import { EditorSectionHeader } from './EditorSectionHeader';

const INSIGHT_STATS = [
  {
    icon: UsersThreeIcon,
    title: '2 in 5 visitors return within a week',
    caption: '3x the platform average',
    footer:
      'Return visits tell brands your audience has formed a habit around your content, and are more likely to act on new recommendations than one-off visitors.',
  },
  {
    icon: CursorClickIcon,
    title:
      'At least 20% of Jean’s clicks in the last 28 days are from return visitors',
    caption: '3x the platform average',
    footer:
      'When your visitors return and click again, it proves that you’re capable of driving sustained commercial performance for brands – setting you apart from other partnership candidates.',
  },
];

function EditorInsightBlock({
  icon: Icon,
  title,
  caption,
  footer,
}: {
  icon: Icon;
  title: string;
  caption: string;
  footer: string;
}) {
  return (
    <div className="overflow-hidden rounded-[16px] bg-primary">
      <div className="rounded-[16px] border border-tertiary bg-elevated">
        <div className="flex items-center gap-4 p-4">
          <Icon size={24} weight="regular" className="shrink-0 text-primary" />
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

interface AudienceRetentionEditorPanelProps {
  onBack: () => void;
  hidden?: boolean;
  onToggleHidden: () => void;
}

export function AudienceRetentionEditorPanel({
  onBack,
  hidden = false,
  onToggleHidden,
}: AudienceRetentionEditorPanelProps) {
  return (
    <div className="flex w-full max-w-[500px] flex-col gap-8">
      <EditorSectionHeader
        title="Retention"
        hidden={hidden}
        onBack={onBack}
        onToggleHidden={onToggleHidden}
      />

      <div className="flex flex-col gap-8">
        <div className="rounded-[20px] bg-primary">
          <EditorHiddenHighlightCard>
            <div className="border-b border-tertiary">
              <div className="flex items-center justify-between px-4 pb-4 pt-5">
                <p className="text-body-sm-emph text-primary">Highlight</p>
                <div className="flex items-center gap-2">
                  <EyeClosedIcon
                    size={20}
                    weight="regular"
                    className="text-secondary"
                  />
                  <span className="text-body-sm-emph text-secondary">
                    Hidden
                  </span>
                </div>
              </div>
            </div>
            <div className="px-5 pb-5">
              <p className="text-[24px] font-medium leading-8 text-primary">
                Over 1% of Jean&apos;s visitors come back for more.
              </p>
            </div>
          </EditorHiddenHighlightCard>

          <div className="flex items-start gap-3 px-4 py-4">
            <QuestionIcon
              size={20}
              weight="regular"
              className="mt-0.5 shrink-0 text-[#1447e6]"
            />
            <p className="text-body-xs text-secondary">
              When your return visit rate hits 5% in a 28-day period, this
              highlight will display in your media kit.{' '}
              <button
                type="button"
                className="underline decoration-from-font underline-offset-2"
              >
                How to boost your return visits
              </button>
            </p>
          </div>
        </div>

        {INSIGHT_STATS.map(stat => (
          <EditorInsightBlock
            key={stat.title}
            icon={stat.icon}
            title={stat.title}
            caption={stat.caption}
            footer={stat.footer}
          />
        ))}

        <EditorEducationBlock title="What is retention?">
          <p className="text-body-xs text-secondary">
            Audience retention measures how often visitors come back to your
            Linktree and take action again. Brands use this to understand how
            loyal and consistently engaged your audience is.
          </p>
        </EditorEducationBlock>
      </div>
    </div>
  );
}
