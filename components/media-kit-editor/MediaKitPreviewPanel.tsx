'use client';

import { ExportIcon } from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import { MediaKitProfile } from '@/components/media-kit';
import type { PerformanceMetric } from '@/components/media-kit/performanceData';
import { MEDIA_KIT_ACCENT, type Platform } from '@/components/media-kit/shared';
import type { VisibleSocialStatsByPlatform } from '@/components/media-kit/socialData';

import { MediaKitShareSheet } from './MediaKitShareSheet';

const PROFILE_WIDTH = 375;
const PROFILE_HEIGHT = 812;
const SHARE_BUTTON_WIDTH = PROFILE_WIDTH;
const SHARE_BUTTON_HEIGHT = 48;
const PREVIEW_AREA_PADDING = 0.92;
const SHARE_SHEET_TRANSITION = {
  duration: 0.28,
  ease: [0.32, 0.72, 0, 1] as const,
};

function fitPhoneScale(areaWidth: number, areaHeight: number) {
  if (areaWidth <= 0 || areaHeight <= 0) return 1;

  return Math.min(
    (areaWidth * PREVIEW_AREA_PADDING) / PROFILE_WIDTH,
    (areaHeight * PREVIEW_AREA_PADDING) / PROFILE_HEIGHT
  );
}

export function MediaKitPreviewPanel({
  activeSection = null,
  activePerformanceMetric = null,
  hiddenSections = null,
  hiddenPerformanceMetrics = null,
  visibleSocialStatsByPlatform = null,
  selectedBrandMentionIds = null,
  selectedCollaborationPostIds = null,
  selectedCreatorCategoryIds = null,
  sectionOrder = null,
  performanceMetricOrder = null,
  socialPlatform = null,
  onSocialPlatformChange = null,
}: {
  activeSection?: string | null;
  activePerformanceMetric?: PerformanceMetric | null;
  hiddenSections?: Set<string> | null;
  hiddenPerformanceMetrics?: Set<PerformanceMetric> | null;
  visibleSocialStatsByPlatform?: VisibleSocialStatsByPlatform | null;
  selectedBrandMentionIds?: string[] | null;
  selectedCollaborationPostIds?: string[] | null;
  selectedCreatorCategoryIds?: string[] | null;
  sectionOrder?:
    | import('@/components/media-kit/mediaKitSections').MediaKitSectionId[]
    | null;
  performanceMetricOrder?: PerformanceMetric[] | null;
  socialPlatform?: Platform | null;
  onSocialPlatformChange?: ((platform: Platform) => void) | null;
}) {
  const [shareOpen, setShareOpen] = useState(false);
  const previewAreaRef = useRef<HTMLDivElement>(null);
  const [previewScale, setPreviewScale] = useState(1);

  useEffect(() => {
    const area = previewAreaRef.current;
    if (!area) return;

    const update = () => {
      setPreviewScale(fitPhoneScale(area.clientWidth, area.clientHeight));
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(area);

    return () => observer.disconnect();
  }, []);

  const shareWidth = SHARE_BUTTON_WIDTH * previewScale;
  const shareHeight = SHARE_BUTTON_HEIGHT * previewScale;
  const previewWidth = PROFILE_WIDTH * previewScale;
  const previewHeight = PROFILE_HEIGHT * previewScale;

  return (
    <div
      className="relative hidden h-full min-w-0 max-w-[50%] flex-1 basis-1/2 flex-col items-center gap-4 py-4 lg:flex"
      style={{ backgroundColor: MEDIA_KIT_ACCENT }}
    >
      <AnimatePresence>
        {shareOpen ? (
          <motion.button
            key="share-backdrop"
            type="button"
            aria-label="Close share menu"
            className="fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setShareOpen(false)}
          />
        ) : null}
      </AnimatePresence>

      <div
        className="relative z-50 shrink-0"
        style={{
          width: shareWidth,
          height: shareHeight,
        }}
      >
        <div
          className="absolute left-0 top-0 origin-top-left"
          style={{
            width: SHARE_BUTTON_WIDTH,
            height: SHARE_BUTTON_HEIGHT,
            transform: `scale(${previewScale})`,
          }}
        >
          <button
            type="button"
            aria-label="Share media kit"
            aria-expanded={shareOpen}
            onClick={() => setShareOpen(open => !open)}
            className="relative flex h-12 w-[375px] items-center justify-center rounded-full bg-elevated px-10 shadow-elevation-100 transition-colors hover:bg-secondary/40"
          >
            <span className="min-w-0 flex-1 truncate text-center text-body-base text-primary">
              linktr.ee/jeanbert/mediakit
            </span>
            <span
              aria-hidden
              className="absolute right-1 flex size-12 items-center justify-center rounded-full text-primary"
            >
              <ExportIcon size={24} weight="regular" />
            </span>
          </button>

          <AnimatePresence>
            {shareOpen ? (
              <div className="absolute left-1/2 top-[calc(100%+12px)] z-50 -translate-x-1/2">
                <motion.div
                  key="share-sheet"
                  style={{ transformOrigin: 'top center' }}
                  initial={{ opacity: 0, scale: 0.94, y: -8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: -4 }}
                  transition={SHARE_SHEET_TRANSITION}
                >
                  <MediaKitShareSheet onClose={() => setShareOpen(false)} />
                </motion.div>
              </div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>

      <div
        ref={previewAreaRef}
        className="flex min-h-0 w-full flex-1 items-center justify-center px-4"
      >
        <div
          className="shrink-0 overflow-hidden rounded-[32px] border-2 border-secondary shadow-elevation-400"
          style={{
            width: previewWidth,
            height: previewHeight,
          }}
        >
          <div
            style={{
              width: PROFILE_WIDTH,
              height: PROFILE_HEIGHT,
              transform: `scale(${previewScale})`,
              transformOrigin: 'top left',
            }}
          >
            <MediaKitProfile
              preview
              activeSection={activeSection}
              activePerformanceMetric={activePerformanceMetric}
              hiddenSections={hiddenSections}
              hiddenPerformanceMetrics={hiddenPerformanceMetrics}
              visibleSocialStatsByPlatform={visibleSocialStatsByPlatform}
              selectedBrandMentionIds={selectedBrandMentionIds}
              selectedCollaborationPostIds={selectedCollaborationPostIds}
              selectedCreatorCategoryIds={selectedCreatorCategoryIds}
              sectionOrder={sectionOrder}
              performanceMetricOrder={performanceMetricOrder}
              editorSocialPlatform={socialPlatform}
              onEditorSocialPlatformChange={onSocialPlatformChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
