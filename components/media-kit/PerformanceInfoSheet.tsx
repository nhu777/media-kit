'use client';

import React, { useEffect, useState } from 'react';

import { MediaKitBottomSheet } from './MediaKitBottomSheet';
import type { PerformanceMetric } from './performanceData';
import { PERFORMANCE_INFO } from './performanceInfoData';

interface PerformanceInfoSheetProps {
  metric: PerformanceMetric | null;
  onOpenChange: (open: boolean) => void;
}

export function PerformanceInfoSheet({
  metric,
  onOpenChange,
}: PerformanceInfoSheetProps) {
  const [displayedMetric, setDisplayedMetric] =
    useState<PerformanceMetric | null>(null);

  useEffect(() => {
    if (metric) setDisplayedMetric(metric);
  }, [metric]);

  const content = displayedMetric ? PERFORMANCE_INFO[displayedMetric] : null;

  if (!content) return null;

  return (
    <MediaKitBottomSheet
      open={metric !== null}
      onOpenChange={onOpenChange}
      title={content.title}
      titleId={`performance-info-${displayedMetric}-title`}
      overlayAriaLabel={`Close ${content.title} info`}
      roundedClass="rounded-[32px]"
      titleClassName="text-title-sm text-primary"
    >
      <div className="flex flex-col gap-6 px-6 pb-5 pt-6">
        {content.description ? (
          <p className="text-body-base text-secondary">{content.description}</p>
        ) : null}

        <div className="flex flex-col gap-2">
          <p className="text-body-base-emph text-primary">How we calculate</p>
          <ul className="list-disc space-y-2 pl-6 text-body-base text-secondary">
            {content.bullets.map(bullet => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </div>
      </div>
    </MediaKitBottomSheet>
  );
}
