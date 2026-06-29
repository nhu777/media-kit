'use client';

import type { Icon } from '@phosphor-icons/react';
import { ChartLineUpIcon, EyesIcon } from '@phosphor-icons/react';

import { EditorEducationBlock } from './EditorEducationBlock';
import { EditorSectionHeader } from './EditorSectionHeader';

const INSIGHT_STATS: {
  icon: Icon;
  title: string;
  caption?: string;
  footer: string;
}[] = [
  {
    icon: EyesIcon,
    title: "Jean's Linktree has been viewed 3,049 times in the last 28 days",
    caption: '4.5x the platform average',
    footer:
      "Total views is the reach figure that anchors everything else. It tells brands how many people they're putting their product in front of during a campaign window.",
  },
  {
    icon: ChartLineUpIcon,
    title: 'This 15% increase comes after 2811 views in the previous 28 days',
    caption: '4.5x the platform average',
    footer:
      'Growth tells brands your audience is expanding. A partnership signed today will reach more people next month — paving the way for long-term relationships.',
  },
];

function EditorInsightBlock({
  icon: IconComponent,
  title,
  caption,
  footer,
}: {
  icon: Icon;
  title: string;
  caption?: string;
  footer: string;
}) {
  return (
    <div className="overflow-hidden rounded-[16px] bg-primary">
      <div className="rounded-[16px] border border-tertiary bg-elevated">
        <div className="flex items-center gap-4 p-4">
          <IconComponent
            size={24}
            weight="regular"
            className="shrink-0 text-primary"
          />
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <p className="text-body-sm-emph text-primary">{title}</p>
            {caption ? (
              <p className="text-body-xs text-secondary">{caption}</p>
            ) : null}
          </div>
        </div>
      </div>
      <div className="p-4">
        <p className="text-body-xs text-secondary">{footer}</p>
      </div>
    </div>
  );
}

interface TrafficEditorPanelProps {
  onBack: () => void;
  hidden?: boolean;
  onToggleHidden: () => void;
}

export function TrafficEditorPanel({
  onBack,
  hidden = false,
  onToggleHidden,
}: TrafficEditorPanelProps) {
  return (
    <div className="flex w-full max-w-[500px] flex-col gap-8">
      <EditorSectionHeader
        title="Traffic"
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
              Jean&apos;s traffic is growing 15% month-on-month.
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

        <EditorEducationBlock title="What is traffic?">
          <p className="text-body-xs text-secondary">
            Traffic measures how many people visit your Linktree, where they
            come from, and how consistently activity happens over time. Brands
            use it to size the potential audience for a campaign – but
            consistency, month-on-month growth and platform diversity matter
            too. They help reassure brands planning multi-week campaigns that
            your traffic won&apos;t depend on a single viral moment.
          </p>
        </EditorEducationBlock>
      </div>
    </div>
  );
}
