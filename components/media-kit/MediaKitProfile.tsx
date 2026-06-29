'use client';

import { Button } from '@linktr.ee/arbor/Button';
import {
  CaretDownIcon,
  ExportIcon,
  EyeClosedIcon,
  HeartIcon,
  InfoIcon,
  MapPinIcon,
} from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { cn } from '@/lib/utils';

import { BrandMentionsEmptyCard } from './BrandMentionsEmptyCard';
import {
  COLLABORATIONS,
  DEFAULT_BRAND_MENTION_IDS,
  DEFAULT_COLLABORATION_POST_IDS,
  getBrandMentionsFromIds,
  getCollaborationsFromIds,
} from './brandPartnershipsData';
import {
  DEFAULT_CREATOR_CATEGORY_IDS,
  getCreatorCategoriesFromIds,
} from './creatorCategoriesData';
import { FeaturedContentEmptyCard } from './FeaturedContentEmptyCard';
import { GetInTouchSheet } from './GetInTouchSheet';
import {
  DEFAULT_MEDIA_KIT_SECTION_ORDER,
  type MediaKitSectionId,
} from './mediaKitSections';
import { PerformanceCard } from './performanceCards';
import {
  DEFAULT_PERFORMANCE_METRIC_ORDER,
  getOrderedPerformanceCards,
  getOrderedPerformanceTabs,
  orderedIndexToPerformanceMetric,
  type PerformanceMetric,
  performanceMetricToOrderedIndex,
} from './performanceData';
import { PerformanceInfoSheet } from './PerformanceInfoSheet';
import { type LocationTab, PLATFORM_STATS } from './platformData';
import {
  AccentStatCard,
  AgeBreakdownCard,
  BrandMentionGrid,
  BREAKDOWN_TABS,
  BreakdownCarousel,
  type BreakdownTab,
  breakdownTabToIndex,
  CollaborationCarousel,
  CollaborationPost,
  GenderBreakdownCard,
  indexToBreakdownTab,
  LinktreeAttribution,
  LocationBreakdownCard,
  MEDIA_KIT_ACCENT,
  MEDIA_KIT_ACCENT_RADIUS_CLASS,
  MEDIA_KIT_PAGE_GUTTER_CLASS,
  MEDIA_KIT_PLATFORMS,
  MEDIA_KIT_SURFACE_BLEED_CLASS,
  MEDIA_KIT_SURFACE_GUTTER_CLASS,
  MEDIA_KIT_SURFACE_RADIUS_CLASS,
  PerformanceCarousel,
  Platform,
  PlatformPillTabs,
  ScrollablePillTabs,
  SectionTitle,
  SubsectionLabel,
} from './shared';
import {
  ALL_SOCIAL_STAT_KEYS,
  getAvailableSocialPlatforms,
  getPreviewSocialStats,
  getSocialStatPreviewGridItemClassName,
  hasAnyVisibleSocialStats,
  SOCIAL_PLATFORMS,
  SOCIAL_PREVIEW_BLOCK_HEIGHT,
  type VisibleSocialStatsByPlatform,
} from './socialData';

/** Clears fixed top nav when a section is scrolled to the top in editor preview. */
const PREVIEW_SECTION_TOP_INSET = 92;

function PreviewHiddenOverlay({
  hidden,
  children,
  className,
}: {
  hidden: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  if (!hidden) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={cn('relative', className)}>
      {children}
      <div
        className={cn(
          'pointer-events-none absolute inset-0 z-10 bg-white/20 backdrop-blur-[7px]',
          MEDIA_KIT_SURFACE_RADIUS_CLASS
        )}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
        <EyeClosedIcon size={48} weight="regular" className="text-secondary" />
      </div>
    </div>
  );
}

function BrandPartnershipsLayoutPlaceholder() {
  return (
    <>
      <div
        className="flex min-w-0 flex-col gap-6 invisible pointer-events-none"
        aria-hidden
      >
        <SubsectionLabel>Featured content</SubsectionLabel>
        <div className={`flex min-w-0 gap-2 ${MEDIA_KIT_SURFACE_BLEED_CLASS}`}>
          <div aria-hidden className="w-4 shrink-0" />
          {DEFAULT_COLLABORATION_POST_IDS.map(id => (
            <div
              key={id}
              className={`h-[186px] w-[128px] shrink-0 ${MEDIA_KIT_ACCENT_RADIUS_CLASS}`}
            />
          ))}
          <div aria-hidden className="w-4 shrink-0" />
        </div>
      </div>
      <div
        className="w-full shrink-0 border-t border-secondary invisible"
        aria-hidden
        role="separator"
      />
      <div
        className="flex flex-col gap-6 invisible pointer-events-none"
        aria-hidden
      >
        <SubsectionLabel>Brand mentions</SubsectionLabel>
        <div className="grid w-full grid-cols-4 gap-4">
          {DEFAULT_BRAND_MENTION_IDS.map(id => (
            <div key={id} className="aspect-square w-full rounded-full" />
          ))}
        </div>
      </div>
    </>
  );
}

function LinktreeLogoIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.09 3.5H10.66V7.62L7.84 4.73L6.21 6.38L9.16 9.22H5V11.53H9.18L6.21 14.43L7.84 16.05L11.88 12L15.93 16.05L17.54 14.43L14.57 11.53H18.75V9.22H14.59L17.54 6.38L15.93 4.73L13.09 7.62V3.5ZM10.66 14.86V20.35H13.09V14.86H10.66Z"
        fill="currentColor"
      />
    </svg>
  );
}

const SOCIAL_STAT_LAYOUT_TRANSITION = {
  layout: { duration: 0.38, ease: [0.32, 0.72, 0, 1] as const },
  opacity: { duration: 0.22, ease: [0.4, 0, 0.2, 1] as const },
  scale: { duration: 0.22, ease: [0.4, 0, 0.2, 1] as const },
};

export function MediaKitProfile({
  preview = false,
  activeSection = null,
  activePerformanceMetric = null,
  hiddenSections = null,
  hiddenPerformanceMetrics = null,
  visibleSocialStatsByPlatform = null,
  selectedBrandMentionIds = null,
  selectedCollaborationPostIds = null,
  selectedCreatorCategoryIds = null,
  editorSocialPlatform = null,
  onEditorSocialPlatformChange = null,
  sectionOrder = null,
  performanceMetricOrder = null,
}: {
  preview?: boolean;
  activeSection?: string | null;
  activePerformanceMetric?: PerformanceMetric | null;
  hiddenSections?: Set<string> | null;
  hiddenPerformanceMetrics?: Set<PerformanceMetric> | null;
  visibleSocialStatsByPlatform?: VisibleSocialStatsByPlatform | null;
  selectedBrandMentionIds?: string[] | null;
  selectedCollaborationPostIds?: string[] | null;
  selectedCreatorCategoryIds?: string[] | null;
  editorSocialPlatform?: Platform | null;
  onEditorSocialPlatformChange?: ((platform: Platform) => void) | null;
  sectionOrder?: MediaKitSectionId[] | null;
  performanceMetricOrder?: PerformanceMetric[] | null;
}) {
  const [internalSocialPlatform, setInternalSocialPlatform] =
    useState<Platform>('instagram');
  const isSocialPlatformControlled =
    editorSocialPlatform !== null && onEditorSocialPlatformChange !== null;
  const socialPlatform = isSocialPlatformControlled
    ? editorSocialPlatform
    : internalSocialPlatform;
  const setSocialPlatform = isSocialPlatformControlled
    ? onEditorSocialPlatformChange
    : setInternalSocialPlatform;
  const [performanceMetric, setPerformanceMetric] =
    useState<PerformanceMetric>('ctr');
  const [breakdownOpen, setBreakdownOpen] = useState(true);
  const [breakdownTab, setBreakdownTab] = useState<BreakdownTab>('gender');
  const [locationTab, setLocationTab] = useState<LocationTab>('cities');
  const [getInTouchOpen, setGetInTouchOpen] = useState(false);
  const [performanceInfoMetric, setPerformanceInfoMetric] =
    useState<PerformanceMetric | null>(null);

  const sheetOpen = getInTouchOpen || performanceInfoMetric !== null;

  const audience = PLATFORM_STATS.instagram.audience;
  const locationRankings = audience.locations[locationTab];

  const availableSocialPlatforms = useMemo(() => {
    if (isSocialPlatformControlled) {
      return MEDIA_KIT_PLATFORMS;
    }

    if (!preview || !visibleSocialStatsByPlatform) {
      return MEDIA_KIT_PLATFORMS;
    }

    return getAvailableSocialPlatforms(visibleSocialStatsByPlatform);
  }, [isSocialPlatformControlled, preview, visibleSocialStatsByPlatform]);

  const visibleSocialStats = useMemo(() => {
    if (!preview || !visibleSocialStatsByPlatform) {
      return new Set(ALL_SOCIAL_STAT_KEYS);
    }

    return visibleSocialStatsByPlatform[socialPlatform];
  }, [preview, visibleSocialStatsByPlatform, socialPlatform]);

  const previewSocialStats = useMemo(
    () => getPreviewSocialStats(socialPlatform, visibleSocialStats),
    [socialPlatform, visibleSocialStats]
  );

  const disabledSocialPlatforms = useMemo(() => {
    if (!preview || !visibleSocialStatsByPlatform) {
      return [];
    }

    return SOCIAL_PLATFORMS.filter(
      platform => visibleSocialStatsByPlatform[platform].size === 0
    );
  }, [preview, visibleSocialStatsByPlatform]);

  const showSocialStatsEmptyState =
    preview &&
    visibleSocialStatsByPlatform !== null &&
    visibleSocialStats.size === 0 &&
    hasAnyVisibleSocialStats(visibleSocialStatsByPlatform);

  const allSocialStatsHidden =
    preview &&
    visibleSocialStatsByPlatform !== null &&
    !hasAnyVisibleSocialStats(visibleSocialStatsByPlatform);

  const socialStatsForPreview = useMemo(() => {
    if (allSocialStatsHidden) {
      return getPreviewSocialStats(
        socialPlatform,
        new Set(ALL_SOCIAL_STAT_KEYS)
      );
    }

    return previewSocialStats;
  }, [allSocialStatsHidden, previewSocialStats, socialPlatform]);

  useEffect(() => {
    if (isSocialPlatformControlled) {
      return;
    }

    if (
      availableSocialPlatforms.length > 0 &&
      !availableSocialPlatforms.includes(socialPlatform)
    ) {
      setSocialPlatform(availableSocialPlatforms[0]!);
    }
  }, [
    availableSocialPlatforms,
    isSocialPlatformControlled,
    setSocialPlatform,
    socialPlatform,
  ]);

  const showSocialDataSection =
    !preview ||
    !visibleSocialStatsByPlatform ||
    availableSocialPlatforms.length > 0 ||
    allSocialStatsHidden ||
    activeSection === 'social-data';

  const brandMentions = useMemo(() => {
    if (preview && selectedBrandMentionIds != null) {
      return getBrandMentionsFromIds(selectedBrandMentionIds);
    }

    return getBrandMentionsFromIds(DEFAULT_BRAND_MENTION_IDS);
  }, [preview, selectedBrandMentionIds]);

  const collaborationPosts = useMemo(() => {
    if (preview && selectedCollaborationPostIds != null) {
      return getCollaborationsFromIds(selectedCollaborationPostIds);
    }

    return COLLABORATIONS;
  }, [preview, selectedCollaborationPostIds]);

  const creatorCategories = useMemo(() => {
    if (preview && selectedCreatorCategoryIds != null) {
      return getCreatorCategoriesFromIds(selectedCreatorCategoryIds);
    }

    return getCreatorCategoriesFromIds(DEFAULT_CREATOR_CATEGORY_IDS);
  }, [preview, selectedCreatorCategoryIds]);

  const showCollaborationsInPreview = !preview || collaborationPosts.length > 0;
  const showBrandMentionsInPreview = !preview || brandMentions.length > 0;
  const allBrandPartnershipsHidden =
    preview &&
    selectedCollaborationPostIds != null &&
    selectedBrandMentionIds != null &&
    !showCollaborationsInPreview &&
    !showBrandMentionsInPreview;
  const showBrandPartnershipsSection =
    !preview ||
    showCollaborationsInPreview ||
    showBrandMentionsInPreview ||
    activeSection === 'brand-partnerships' ||
    allBrandPartnershipsHidden ||
    (preview && (hiddenSections?.has('brand-partnerships') ?? false));

  const reserveBrandPartnershipsLayoutHeight =
    preview &&
    showBrandPartnershipsSection &&
    !showCollaborationsInPreview &&
    !showBrandMentionsInPreview;

  const sectionHighlightClass = (sectionId: string) => {
    if (preview && hiddenSections?.has(sectionId)) {
      return 'opacity-100';
    }

    return cn(
      'transition-opacity duration-300 ease-out',
      activeSection
        ? activeSection === sectionId
          ? 'opacity-100'
          : 'opacity-50'
        : 'opacity-100'
    );
  };

  const isSectionHidden = (sectionId: string) =>
    preview && (hiddenSections?.has(sectionId) ?? false);

  const isPerformanceCardHidden = (metricId: PerformanceMetric) =>
    isSectionHidden('performance') ||
    (preview && (hiddenPerformanceMetrics?.has(metricId) ?? false));

  const isPerformanceCardLocked = (metricId: PerformanceMetric) =>
    preview && metricId === 'sales';

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const displayedPerformanceMetric =
    preview && activePerformanceMetric
      ? activePerformanceMetric
      : performanceMetric;

  const resolvedPerformanceMetricOrder =
    performanceMetricOrder ?? DEFAULT_PERFORMANCE_METRIC_ORDER;
  const orderedPerformanceTabs = getOrderedPerformanceTabs(
    resolvedPerformanceMetricOrder
  );
  const orderedPerformanceCards = getOrderedPerformanceCards(
    resolvedPerformanceMetricOrder
  );

  useLayoutEffect(() => {
    if (!preview || !activePerformanceMetric) return;
    setPerformanceMetric(activePerformanceMetric);
  }, [preview, activePerformanceMetric]);

  useLayoutEffect(() => {
    if (!preview) return;

    const scrollToActiveSection = () => {
      const container = scrollContainerRef.current;
      if (!container) return false;

      if (!activeSection) {
        container.scrollTo({ top: 0, behavior: 'smooth' });
        return true;
      }

      const section = container.querySelector<HTMLElement>(
        `[data-media-kit-section="${activeSection}"]`
      );
      if (!section) return false;

      const containerRect = container.getBoundingClientRect();
      const scale = containerRect.height / container.clientHeight || 1;
      const relativeTop =
        container.scrollTop +
        (section.getBoundingClientRect().top - containerRect.top) / scale;
      const targetScrollTop = relativeTop - PREVIEW_SECTION_TOP_INSET;

      container.scrollTo({
        top: Math.max(
          0,
          Math.min(
            targetScrollTop,
            container.scrollHeight - container.clientHeight
          )
        ),
        behavior: 'smooth',
      });

      return true;
    };

    if (!scrollToActiveSection()) {
      requestAnimationFrame(() => {
        scrollToActiveSection();
      });
    }
  }, [
    preview,
    activeSection,
    showBrandPartnershipsSection,
    sectionOrder,
    collaborationPosts.length,
    brandMentions.length,
  ]);

  const orderedSectionIds = sectionOrder ?? DEFAULT_MEDIA_KIT_SECTION_ORDER;

  const aboutSection = (
    <>
      {/* Profile card */}
      <div
        data-media-kit-section="about"
        className={sectionHighlightClass('about')}
      >
        <PreviewHiddenOverlay
          hidden={isSectionHidden('about')}
          className={cn(
            'flex w-full flex-col gap-4 bg-primary p-5',
            MEDIA_KIT_SURFACE_RADIUS_CLASS
          )}
        >
          <div className="relative mx-auto size-[96px] overflow-hidden rounded-full">
            <Image
              src="/media-kit/avatar.jpg"
              alt="Jean"
              fill
              className="object-cover"
            />
          </div>
          <p className="w-full text-center text-title-md text-primary">Jean</p>
          <p className="w-full text-body-sm text-primary">
            Small artist sharing my music and fashion! Send me any additional
            project details through this contact form or my email. Hoping to
            work with you!
          </p>
          <div
            className="w-full shrink-0 border-t border-secondary"
            role="separator"
          />
          <div className="flex w-full flex-col gap-3">
            <div className="flex items-center gap-2">
              <MapPinIcon
                size={16}
                weight="regular"
                className="shrink-0 text-primary"
              />
              <span className="whitespace-nowrap text-body-sm text-primary">
                Based out of New York, NY
              </span>
            </div>
            <div className="flex items-start gap-2">
              <HeartIcon
                size={16}
                weight="regular"
                className="mt-0.5 shrink-0 text-primary"
              />
              <p className="min-w-0 text-body-sm text-primary">
                Interests in{' '}
                {creatorCategories.map((category, index) => (
                  <React.Fragment key={category.id}>
                    {index > 0
                      ? index === creatorCategories.length - 1
                        ? ' and '
                        : ', '
                      : null}
                    <span className="font-bold">
                      {category.label.toLowerCase()}
                    </span>
                  </React.Fragment>
                ))}
              </p>
            </div>
          </div>
          <Button
            variant="primary"
            size="md"
            shape="capsule"
            className="w-full"
            onClick={() => setGetInTouchOpen(true)}
          >
            Get in touch
          </Button>
        </PreviewHiddenOverlay>
      </div>
    </>
  );

  const audienceSection = (
    <>
      {/* Audience */}
      <section
        data-media-kit-section="audience"
        className={cn(
          'flex w-full flex-col gap-6',
          sectionHighlightClass('audience')
        )}
      >
        <SectionTitle>Audience</SectionTitle>
        <div className="flex w-full flex-col gap-3">
          <PreviewHiddenOverlay
            hidden={isSectionHidden('audience')}
            className={`flex w-full flex-col gap-4 overflow-hidden bg-primary pt-5 transition-[padding-bottom] duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none ${MEDIA_KIT_SURFACE_RADIUS_CLASS} ${
              breakdownOpen ? 'pb-5' : 'pb-0'
            }`}
          >
            <div
              className={`flex flex-col gap-3 ${MEDIA_KIT_SURFACE_GUTTER_CLASS}`}
            >
              <div className="grid grid-cols-2 gap-3">
                <AccentStatCard label="Gender" value={audience.gender} />
                <AccentStatCard
                  label="Average age"
                  value={audience.averageAge}
                />
              </div>
              <AccentStatCard
                label="Top location"
                value={audience.topLocation}
              />
            </div>

            <div className={`flex flex-col ${breakdownOpen ? '' : 'pb-4'}`}>
              <div className={MEDIA_KIT_SURFACE_GUTTER_CLASS}>
                <button
                  type="button"
                  onClick={() => {
                    setBreakdownOpen(open => {
                      if (!open) setBreakdownTab('gender');
                      return !open;
                    });
                  }}
                  className="flex w-full items-center justify-between"
                >
                  <span className="text-body-sm text-primary">
                    View breakdown
                  </span>
                  <span
                    className="flex size-6 items-center justify-center rounded-full"
                    style={{ backgroundColor: MEDIA_KIT_ACCENT }}
                  >
                    <CaretDownIcon
                      size={16}
                      weight="bold"
                      className={`transition-transform duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none ${
                        breakdownOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </span>
                </button>
              </div>

              <div className={`flex flex-col ${breakdownOpen ? 'pt-4' : ''}`}>
                {breakdownOpen ? (
                  <div
                    className="mx-4 shrink-0 border-t border-secondary"
                    role="separator"
                  />
                ) : null}

                <div
                  className={`grid motion-reduce:transition-none ${
                    breakdownOpen
                      ? 'grid-rows-[1fr] opacity-100'
                      : 'grid-rows-[0fr] opacity-0'
                  } transition-[grid-template-rows,opacity] duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]`}
                  aria-hidden={!breakdownOpen}
                >
                  <div className="min-h-0 overflow-hidden">
                    {breakdownOpen ? (
                      <div
                        className={`flex min-w-0 flex-col gap-3 pt-4 ${MEDIA_KIT_SURFACE_GUTTER_CLASS}`}
                      >
                        <ScrollablePillTabs
                          tabs={BREAKDOWN_TABS}
                          active={breakdownTab}
                          onChange={setBreakdownTab}
                        />
                        <BreakdownCarousel
                          activeIndex={breakdownTabToIndex(breakdownTab)}
                          onActiveIndexChange={index =>
                            setBreakdownTab(indexToBreakdownTab(index))
                          }
                        >
                          <GenderBreakdownCard
                            items={audience.genderBreakdown}
                            isActive={breakdownTab === 'gender'}
                          />
                          <AgeBreakdownCard
                            items={audience.ageBreakdown}
                            isActive={breakdownTab === 'age'}
                          />
                          <LocationBreakdownCard
                            activeTab={locationTab}
                            onTabChange={setLocationTab}
                            rankings={locationRankings}
                          />
                        </BreakdownCarousel>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </PreviewHiddenOverlay>

          <LinktreeAttribution
            prefix="Social audience data aggregated by"
            showPlatformIcons
          />
        </div>
      </section>
    </>
  );

  const performanceSection = (
    <>
      {/* Performance */}
      <section
        data-media-kit-section="performance"
        className={cn(
          'flex w-full flex-col gap-6',
          sectionHighlightClass('performance')
        )}
      >
        <SectionTitle>Performance</SectionTitle>
        <div className="flex flex-col gap-3">
          <ScrollablePillTabs
            tabs={orderedPerformanceTabs}
            active={displayedPerformanceMetric}
            onChange={setPerformanceMetric}
          />

          <PerformanceCarousel
            activeIndex={performanceMetricToOrderedIndex(
              displayedPerformanceMetric,
              resolvedPerformanceMetricOrder
            )}
            onActiveIndexChange={index =>
              setPerformanceMetric(
                orderedIndexToPerformanceMetric(
                  index,
                  resolvedPerformanceMetricOrder
                )
              )
            }
          >
            {orderedPerformanceCards.map(card => (
              <PerformanceCard
                key={card.id}
                data={card}
                hidden={
                  isPerformanceCardHidden(card.id) &&
                  !isPerformanceCardLocked(card.id)
                }
                locked={isPerformanceCardLocked(card.id)}
                showHighlight={!(preview && card.id === 'retention')}
                onInfoClick={() => setPerformanceInfoMetric(card.id)}
              />
            ))}
          </PerformanceCarousel>

          <LinktreeAttribution prefix="Compared to similar music and fashion creators on" />
        </div>
      </section>
    </>
  );

  const brand_partnershipsSection = showBrandPartnershipsSection ? (
    <>
      {/* Brand partnerships */}
      <section
        data-media-kit-section="brand-partnerships"
        className={cn(
          'flex w-full flex-col gap-6',
          sectionHighlightClass('brand-partnerships')
        )}
      >
        <SectionTitle>Brand partnerships</SectionTitle>
        <PreviewHiddenOverlay
          hidden={
            isSectionHidden('brand-partnerships') || allBrandPartnershipsHidden
          }
          className={`flex w-full flex-col gap-6 bg-primary py-5 ${MEDIA_KIT_SURFACE_GUTTER_CLASS} ${MEDIA_KIT_SURFACE_RADIUS_CLASS}`}
        >
          {reserveBrandPartnershipsLayoutHeight ? (
            <BrandPartnershipsLayoutPlaceholder />
          ) : (
            <>
              {showCollaborationsInPreview ? (
                <div className="flex min-w-0 flex-col gap-6">
                  <SubsectionLabel>Featured content</SubsectionLabel>
                  {collaborationPosts.length === 0 ? (
                    <FeaturedContentEmptyCard />
                  ) : (
                    <CollaborationCarousel>
                      {collaborationPosts.map(collab => (
                        <CollaborationPost key={collab.id} {...collab} />
                      ))}
                    </CollaborationCarousel>
                  )}
                </div>
              ) : null}
              {showCollaborationsInPreview && showBrandMentionsInPreview ? (
                <div
                  className="w-full shrink-0 border-t border-secondary"
                  role="separator"
                />
              ) : null}
              {showBrandMentionsInPreview ? (
                <div className="flex flex-col gap-6">
                  <SubsectionLabel>Brand mentions</SubsectionLabel>
                  {brandMentions.length === 0 ? (
                    <BrandMentionsEmptyCard />
                  ) : (
                    <BrandMentionGrid brands={brandMentions} />
                  )}
                </div>
              ) : null}
            </>
          )}
        </PreviewHiddenOverlay>
      </section>
    </>
  ) : null;

  const social_dataSection = (
    <>
      {/* Social data */}
      {showSocialDataSection ? (
        <section
          data-media-kit-section="social-data"
          className={cn(
            'flex w-full flex-col gap-6',
            sectionHighlightClass('social-data')
          )}
        >
          <SectionTitle>Social data</SectionTitle>
          <div className="flex w-full flex-col gap-3">
            <PreviewHiddenOverlay
              hidden={isSectionHidden('social-data') || allSocialStatsHidden}
              className={`flex w-full flex-col gap-4 bg-primary p-5 ${MEDIA_KIT_SURFACE_RADIUS_CLASS}`}
            >
              <PlatformPillTabs
                active={socialPlatform}
                onChange={setSocialPlatform}
                platforms={
                  allSocialStatsHidden
                    ? SOCIAL_PLATFORMS
                    : availableSocialPlatforms
                }
                disabledPlatforms={
                  allSocialStatsHidden
                    ? SOCIAL_PLATFORMS
                    : disabledSocialPlatforms
                }
              />

              {showSocialStatsEmptyState ? (
                <SocialStatsHiddenEmptyState />
              ) : (
                <motion.div
                  layout
                  className="grid grid-cols-2 gap-3"
                  style={{
                    height: SOCIAL_PREVIEW_BLOCK_HEIGHT,
                    gridAutoRows: '1fr',
                  }}
                  transition={SOCIAL_STAT_LAYOUT_TRANSITION}
                >
                  <AnimatePresence mode="popLayout" initial={false}>
                    {socialStatsForPreview.hero ? (
                      <motion.div
                        key={`${socialPlatform}-hero`}
                        layout
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={SOCIAL_STAT_LAYOUT_TRANSITION}
                        className="col-span-2 h-full min-h-0"
                      >
                        <SocialStat
                          label={socialStatsForPreview.hero.label}
                          value={socialStatsForPreview.hero.value}
                          className="h-full"
                        />
                      </motion.div>
                    ) : null}

                    {socialStatsForPreview.gridItems.map((stat, index) => (
                      <motion.div
                        key={stat.key}
                        layout
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={SOCIAL_STAT_LAYOUT_TRANSITION}
                        className={cn(
                          'h-full min-h-0',
                          getSocialStatPreviewGridItemClassName(
                            index,
                            socialStatsForPreview.gridItems.length
                          )
                        )}
                      >
                        <SocialStat
                          label={stat.label}
                          value={stat.value}
                          positive={stat.positive}
                          info={stat.info}
                          postingFrequencySecondary={
                            stat.postingFrequencySecondary
                          }
                          className="h-full"
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
            </PreviewHiddenOverlay>
            <LinktreeAttribution prefix="Social data verified by" />
          </div>
        </section>
      ) : null}
    </>
  );

  return (
    <div
      className={`relative h-[812px] w-[375px] shrink-0 overflow-hidden ${
        preview ? '' : 'rounded-[24px] shadow-elevation-400'
      }`}
      style={{ backgroundColor: MEDIA_KIT_ACCENT }}
    >
      {/* Original Figma background: portrait image + blur overlay */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Image
          src="/media-kit/profile-bg.jpg"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute left-1/2 top-1/2 h-[3483px] w-[375px] -translate-x-1/2 -translate-y-1/2 backdrop-blur-[17px] bg-white/50" />
      </div>

      {/* Top nav — 16px from frame edges */}
      <div className="pointer-events-none absolute left-[16px] right-[16px] top-[16px] z-20 flex items-center justify-between">
        <button
          type="button"
          aria-label="Go to Linktree"
          className="pointer-events-auto flex size-11 shrink-0 items-center justify-center rounded-full bg-primary shadow-sm"
        >
          <LinktreeLogoIcon size={20} />
        </button>
        <button
          type="button"
          aria-label="Share media kit"
          className="pointer-events-auto flex size-11 shrink-0 items-center justify-center rounded-full bg-primary shadow-sm"
        >
          <ExportIcon size={20} weight="regular" />
        </button>
      </div>

      {/* Scrollable content */}
      <div
        ref={scrollContainerRef}
        className={`relative z-[1] h-full scrollbar-hide ${
          sheetOpen ? 'overflow-hidden' : 'overflow-y-auto'
        }`}
        data-media-kit-scroll
      >
        <div
          className={`flex flex-col gap-[40px] pb-10 pt-[92px] ${MEDIA_KIT_PAGE_GUTTER_CLASS}`}
        >
          <div
            className={cn(
              'flex w-full justify-center transition-opacity duration-300 ease-out',
              activeSection ? 'opacity-50' : 'opacity-100'
            )}
          >
            <SectionTitle>Work with me</SectionTitle>
          </div>

          {orderedSectionIds.map(sectionId => {
            const sectionNode =
              sectionId === 'about'
                ? aboutSection
                : sectionId === 'audience'
                  ? audienceSection
                  : sectionId === 'performance'
                    ? performanceSection
                    : sectionId === 'brand-partnerships'
                      ? brand_partnershipsSection
                      : sectionId === 'social-data'
                        ? social_dataSection
                        : null;

            return sectionNode ? (
              <React.Fragment key={sectionId}>{sectionNode}</React.Fragment>
            ) : null;
          })}
        </div>
      </div>

      <GetInTouchSheet open={getInTouchOpen} onOpenChange={setGetInTouchOpen} />
      <PerformanceInfoSheet
        metric={performanceInfoMetric}
        onOpenChange={open => {
          if (!open) setPerformanceInfoMetric(null);
        }}
      />
    </div>
  );
}

function SocialStatsHiddenEmptyState() {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-4 border border-dashed border-primary p-4',
        MEDIA_KIT_ACCENT_RADIUS_CLASS
      )}
      style={{ height: SOCIAL_PREVIEW_BLOCK_HEIGHT }}
    >
      <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-primary p-[12.8px] shadow-elevation-100">
        <EyeClosedIcon size={32} weight="regular" className="text-secondary" />
      </div>
      <p className="text-center text-body-sm text-secondary">
        All of your stats are hidden. Select at least one to show your metrics
        for this platform.
      </p>
    </div>
  );
}

function SocialStat({
  label,
  value,
  positive,
  info,
  postingFrequencySecondary,
  className,
}: {
  label: string;
  value: React.ReactNode;
  positive?: boolean;
  info?: boolean;
  postingFrequencySecondary?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'relative flex h-full min-h-0 flex-col items-center justify-center gap-2 p-4',
        MEDIA_KIT_ACCENT_RADIUS_CLASS,
        className
      )}
      style={{ backgroundColor: MEDIA_KIT_ACCENT }}
    >
      {info ? (
        <InfoIcon
          size={16}
          weight="regular"
          className="absolute right-2 top-2 text-secondary"
        />
      ) : null}
      <p className="text-center text-body-xs text-secondary">{label}</p>
      {postingFrequencySecondary ? (
        <p className="text-center text-primary">
          <span className="text-body-lg-emph">{value}</span>{' '}
          <span className="text-body-sm">{postingFrequencySecondary}</span>
        </p>
      ) : (
        <p
          className={cn(
            'text-center text-body-lg-emph',
            positive ? 'text-success' : 'text-primary'
          )}
        >
          {value}
        </p>
      )}
    </div>
  );
}

export default MediaKitProfile;
