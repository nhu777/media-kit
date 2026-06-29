'use client';

import {
  HandshakeIcon,
  ShareNetworkIcon,
  UserIcon,
  UsersThreeIcon,
} from '@phosphor-icons/react';
import type { ComponentType } from 'react';
import { useState } from 'react';

import {
  DEFAULT_BRAND_MENTION_IDS,
  DEFAULT_COLLABORATION_POST_IDS,
} from '@/components/media-kit/brandPartnershipsData';
import { DEFAULT_CREATOR_CATEGORY_IDS } from '@/components/media-kit/creatorCategoriesData';
import {
  DEFAULT_MEDIA_KIT_SECTION_ORDER,
  type MediaKitSectionId,
} from '@/components/media-kit/mediaKitSections';
import {
  DEFAULT_PERFORMANCE_METRIC_ORDER,
  type PerformanceMetric,
} from '@/components/media-kit/performanceData';
import type { Platform } from '@/components/media-kit/shared';
import {
  createDefaultVisibleSocialStatsByPlatform,
  type SocialStatKey,
  type VisibleSocialStatsByPlatform,
} from '@/components/media-kit/socialData';

import { AboutMeEditorPanel } from './AboutMeEditorPanel';
import { AudienceEditorPanel } from './AudienceEditorPanel';
import { BrandPartnershipsEditorPanel } from './BrandPartnershipsEditorPanel';
import { EditorScaledPanel } from './EditorScaledPanel';
import { MediaKitEditorShareCard } from './MediaKitEditorShareCard';
import { MediaKitPreviewPanel } from './MediaKitPreviewPanel';
import { MediaKitSectionList } from './MediaKitSectionList';
import { PerformanceEditorPanel } from './PerformanceEditorPanel';
import { SocialDataEditorPanel } from './SocialDataEditorPanel';

function LinktreeLogoIcon({
  size = 24,
  className,
}: {
  size?: number | string;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M13.09 3.5H10.66V7.62L7.84 4.73L6.21 6.38L9.16 9.22H5V11.53H9.18L6.21 14.43L7.84 16.05L11.88 12L15.93 16.05L17.54 14.43L14.57 11.53H18.75V9.22H14.59L17.54 6.38L15.93 4.73L13.09 7.62V3.5ZM10.66 14.86V20.35H13.09V14.86H10.66Z"
        fill="currentColor"
      />
    </svg>
  );
}

const SECTIONS: Array<{
  id: MediaKitSectionId;
  label: string;
  icon: ComponentType<{ size?: number | string; className?: string }>;
  defaultHidden?: boolean;
}> = [
  { id: 'about', label: 'About me', icon: UserIcon },
  { id: 'audience', label: 'Audience', icon: UsersThreeIcon },
  { id: 'performance', label: 'Performance', icon: LinktreeLogoIcon },
  {
    id: 'brand-partnerships',
    label: 'Brand partnerships',
    icon: HandshakeIcon,
  },
  { id: 'social-data', label: 'Social data', icon: ShareNetworkIcon },
];

const DEFAULT_HIDDEN_SECTIONS = new Set(
  SECTIONS.filter(section => section.defaultHidden).map(section => section.id)
);

export function MediaKitEditorWorkspace() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [activePerformanceMetric, setActivePerformanceMetric] =
    useState<PerformanceMetric | null>(null);
  const [hiddenSections, setHiddenSections] = useState<Set<string>>(
    () => new Set(DEFAULT_HIDDEN_SECTIONS)
  );
  const [hiddenPerformanceMetrics, setHiddenPerformanceMetrics] = useState<
    Set<PerformanceMetric>
  >(() => new Set());
  const [visibleSocialStatsByPlatform, setVisibleSocialStatsByPlatform] =
    useState<VisibleSocialStatsByPlatform>(
      createDefaultVisibleSocialStatsByPlatform
    );
  const [selectedBrandMentionIds, setSelectedBrandMentionIds] = useState<
    string[]
  >(() => [...DEFAULT_BRAND_MENTION_IDS]);
  const [selectedCollaborationPostIds, setSelectedCollaborationPostIds] =
    useState<string[]>(() => [...DEFAULT_COLLABORATION_POST_IDS]);
  const [selectedCreatorCategoryIds, setSelectedCreatorCategoryIds] = useState<
    string[]
  >(() => [...DEFAULT_CREATOR_CATEGORY_IDS]);
  const [socialPlatform, setSocialPlatform] = useState<Platform>('instagram');
  const [sectionOrder, setSectionOrder] = useState<MediaKitSectionId[]>(() => [
    ...DEFAULT_MEDIA_KIT_SECTION_ORDER,
  ]);
  const [performanceMetricOrder, setPerformanceMetricOrder] = useState<
    PerformanceMetric[]
  >(() => [...DEFAULT_PERFORMANCE_METRIC_ORDER]);

  const orderedSections = sectionOrder
    .map(sectionId => SECTIONS.find(section => section.id === sectionId))
    .filter(
      (section): section is (typeof SECTIONS)[number] => section !== undefined
    );

  const toggleSectionHidden = (sectionId: string) => {
    setHiddenSections(prev => {
      const next = new Set(prev);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
    });
  };

  const togglePerformanceMetricHidden = (metric: PerformanceMetric) => {
    setHiddenPerformanceMetrics(prev => {
      const next = new Set(prev);
      if (next.has(metric)) {
        next.delete(metric);
      } else {
        next.add(metric);
      }
      return next;
    });
  };

  const toggleSocialStat = (platform: Platform, key: SocialStatKey) => {
    setVisibleSocialStatsByPlatform(prev => {
      const nextPlatformStats = new Set(prev[platform]);

      if (nextPlatformStats.has(key)) {
        nextPlatformStats.delete(key);
      } else {
        nextPlatformStats.add(key);
      }

      return {
        ...prev,
        [platform]: nextPlatformStats,
      };
    });
  };

  const leavePerformanceSection = () => {
    setActiveSection(null);
    setActivePerformanceMetric(null);
  };

  const isBrandPartnershipsEmpty =
    selectedCollaborationPostIds.length === 0 &&
    selectedBrandMentionIds.length === 0;

  const isSectionHidden = (sectionId: MediaKitSectionId) =>
    hiddenSections.has(sectionId) ||
    (sectionId === 'brand-partnerships' && isBrandPartnershipsEmpty);

  const isBrandPartnershipsHidden = isSectionHidden('brand-partnerships');

  return (
    <div className="flex h-full min-h-0 w-full flex-col">
      <header className="flex h-16 shrink-0 items-center border-b border-secondary px-4 lg:px-6">
        <h1 className="text-body-base-emph text-primary">Media kit</h1>
      </header>

      <div className="flex min-h-0 flex-1 w-full">
        <EditorScaledPanel className="flex min-w-0 flex-1 flex-col overflow-y-auto bg-elevated lg:max-w-[50%] lg:basis-1/2 lg:border-r lg:border-secondary">
          {activeSection === 'about' ? (
            <AboutMeEditorPanel
              onBack={() => setActiveSection(null)}
              hidden={hiddenSections.has('about')}
              onToggleHidden={() => toggleSectionHidden('about')}
              selectedCreatorCategoryIds={selectedCreatorCategoryIds}
              onCreatorCategoriesChange={setSelectedCreatorCategoryIds}
            />
          ) : activeSection === 'audience' ? (
            <AudienceEditorPanel
              onBack={() => setActiveSection(null)}
              hidden={hiddenSections.has('audience')}
              onToggleHidden={() => toggleSectionHidden('audience')}
            />
          ) : activeSection === 'performance' ? (
            <PerformanceEditorPanel
              onBack={leavePerformanceSection}
              hidden={hiddenSections.has('performance')}
              onToggleHidden={() => toggleSectionHidden('performance')}
              activeMetric={activePerformanceMetric}
              onActiveMetricChange={setActivePerformanceMetric}
              hiddenMetrics={hiddenPerformanceMetrics}
              onToggleMetricHidden={togglePerformanceMetricHidden}
              performanceMetricOrder={performanceMetricOrder}
              onPerformanceMetricReorder={setPerformanceMetricOrder}
            />
          ) : activeSection === 'brand-partnerships' ? (
            <BrandPartnershipsEditorPanel
              onBack={() => setActiveSection(null)}
              hidden={isBrandPartnershipsHidden}
              onToggleHidden={() => toggleSectionHidden('brand-partnerships')}
              selectedBrandMentionIds={selectedBrandMentionIds}
              onBrandMentionsChange={setSelectedBrandMentionIds}
              selectedCollaborationPostIds={selectedCollaborationPostIds}
              onCollaborationsChange={setSelectedCollaborationPostIds}
            />
          ) : activeSection === 'social-data' ? (
            <SocialDataEditorPanel
              onBack={() => setActiveSection(null)}
              hidden={hiddenSections.has('social-data')}
              onToggleHidden={() => toggleSectionHidden('social-data')}
              visibleStatsByPlatform={visibleSocialStatsByPlatform}
              onToggleStat={toggleSocialStat}
              platform={socialPlatform}
              onPlatformChange={setSocialPlatform}
            />
          ) : (
            <>
              <h2 className="text-title-sm text-primary">
                Edit your media kit
              </h2>

              <div className="overflow-visible">
                <MediaKitSectionList
                  sections={orderedSections}
                  hiddenSections={hiddenSections}
                  isSectionHidden={isSectionHidden}
                  onSectionClick={setActiveSection}
                  onToggleSectionHidden={toggleSectionHidden}
                  onReorder={setSectionOrder}
                />
              </div>

              <MediaKitEditorShareCard />
            </>
          )}
        </EditorScaledPanel>

        <MediaKitPreviewPanel
          activeSection={activeSection}
          activePerformanceMetric={
            activeSection === 'performance' ? activePerformanceMetric : null
          }
          hiddenSections={hiddenSections}
          hiddenPerformanceMetrics={hiddenPerformanceMetrics}
          visibleSocialStatsByPlatform={visibleSocialStatsByPlatform}
          selectedBrandMentionIds={selectedBrandMentionIds}
          selectedCollaborationPostIds={selectedCollaborationPostIds}
          selectedCreatorCategoryIds={selectedCreatorCategoryIds}
          sectionOrder={sectionOrder}
          performanceMetricOrder={performanceMetricOrder}
          socialPlatform={socialPlatform}
          onSocialPlatformChange={setSocialPlatform}
        />
      </div>
    </div>
  );
}
