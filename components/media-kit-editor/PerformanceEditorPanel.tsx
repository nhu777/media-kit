'use client';

import type { PerformanceMetric } from '@/components/media-kit/performanceData';

import { AudienceRetentionEditorPanel } from './AudienceRetentionEditorPanel';
import { ClickThroughRateEditorPanel } from './ClickThroughRateEditorPanel';
import { EditorSectionHeader } from './EditorSectionHeader';
import { EngagementEditorPanel } from './EngagementEditorPanel';
import { PerformanceContentList } from './PerformanceContentList';
import { SalesEditorPanel } from './SalesEditorPanel';
import { TrafficEditorPanel } from './TrafficEditorPanel';

interface PerformanceEditorPanelProps {
  onBack: () => void;
  hidden?: boolean;
  onToggleHidden: () => void;
  activeMetric: PerformanceMetric | null;
  onActiveMetricChange: (metric: PerformanceMetric | null) => void;
  hiddenMetrics: Set<PerformanceMetric>;
  onToggleMetricHidden: (metric: PerformanceMetric) => void;
  performanceMetricOrder: PerformanceMetric[];
  onPerformanceMetricReorder: (nextOrder: PerformanceMetric[]) => void;
}

export function PerformanceEditorPanel({
  onBack,
  hidden = false,
  onToggleHidden,
  activeMetric,
  onActiveMetricChange,
  hiddenMetrics,
  onToggleMetricHidden,
  performanceMetricOrder,
  onPerformanceMetricReorder,
}: PerformanceEditorPanelProps) {
  if (activeMetric === 'ctr') {
    return (
      <ClickThroughRateEditorPanel
        onBack={() => onActiveMetricChange(null)}
        hidden={hiddenMetrics.has('ctr')}
        onToggleHidden={() => onToggleMetricHidden('ctr')}
      />
    );
  }

  if (activeMetric === 'engagement') {
    return (
      <EngagementEditorPanel
        onBack={() => onActiveMetricChange(null)}
        hidden={hiddenMetrics.has('engagement')}
        onToggleHidden={() => onToggleMetricHidden('engagement')}
      />
    );
  }

  if (activeMetric === 'retention') {
    return (
      <AudienceRetentionEditorPanel
        onBack={() => onActiveMetricChange(null)}
        hidden={hiddenMetrics.has('retention')}
        onToggleHidden={() => onToggleMetricHidden('retention')}
      />
    );
  }

  if (activeMetric === 'sales') {
    return (
      <SalesEditorPanel
        onBack={() => onActiveMetricChange(null)}
        hidden={hiddenMetrics.has('sales')}
        onToggleHidden={() => onToggleMetricHidden('sales')}
      />
    );
  }

  if (activeMetric === 'traffic') {
    return (
      <TrafficEditorPanel
        onBack={() => onActiveMetricChange(null)}
        hidden={hiddenMetrics.has('traffic')}
        onToggleHidden={() => onToggleMetricHidden('traffic')}
      />
    );
  }

  return (
    <div className="flex w-full max-w-[500px] flex-col gap-8">
      <EditorSectionHeader
        title="Performance"
        hidden={hidden}
        onBack={onBack}
        onToggleHidden={onToggleHidden}
      />

      <div className="flex flex-col gap-4">
        <p className="text-body-sm-emph text-primary">Content</p>

        <div className="overflow-visible">
          <PerformanceContentList
            order={performanceMetricOrder}
            hiddenMetrics={hiddenMetrics}
            sectionHidden={hidden}
            onItemClick={onActiveMetricChange}
            onToggleMetricHidden={onToggleMetricHidden}
            onReorder={onPerformanceMetricReorder}
          />
        </div>
      </div>
    </div>
  );
}
