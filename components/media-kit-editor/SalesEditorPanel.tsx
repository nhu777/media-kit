'use client';

import { Button } from '@linktr.ee/arbor/Button';
import { CoinsIcon } from '@phosphor-icons/react';

import { EditorEducationBlock } from './EditorEducationBlock';
import { EditorHiddenHighlightCard } from './EditorHiddenHighlightCard';
import { EditorSectionHeader } from './EditorSectionHeader';

interface SalesEditorPanelProps {
  onBack: () => void;
  hidden?: boolean;
  onToggleHidden: () => void;
}

export function SalesEditorPanel({
  onBack,
  hidden = false,
  onToggleHidden,
}: SalesEditorPanelProps) {
  return (
    <div className="flex w-full max-w-[500px] flex-col gap-8">
      <EditorSectionHeader
        title="Sales performance"
        hidden={hidden}
        onBack={onBack}
        onToggleHidden={onToggleHidden}
        toggleHiddenDisabled
      />

      <div className="flex flex-col gap-8">
        <EditorHiddenHighlightCard className="items-center px-6 py-10 text-center">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-white bg-primary shadow-elevation-100">
            <CoinsIcon size={29} weight="regular" className="text-primary" />
          </div>

          <div className="flex w-full flex-col gap-0.5">
            <p className="text-body-sm-emph text-primary">
              Your recent earnings will show up here
            </p>
            <p className="text-body-xs text-secondary">
              Make a sale in the current 28-day period by selling digital
              products, launching an online course, or earning affiliate
              commissions partnerships from your Linktree.
            </p>
          </div>

          <Button variant="primary" size="sm" shape="capsule">
            Explore ways to earn
          </Button>
        </EditorHiddenHighlightCard>

        <EditorEducationBlock title="What is sales performance?">
          <p className="text-body-xs text-secondary">
            It shows how your Linktree clicks turn into purchases, including
            total sales volume, conversion rate, and the categories your
            audience buys in most. Brands use this to measure sales impact, so
            keep your Shop updated and share it often to keep your numbers up.
            These stats cover sales made via your Linktree specifically, and may
            not reflect your total sales across all platforms.
          </p>
        </EditorEducationBlock>
      </div>
    </div>
  );
}
