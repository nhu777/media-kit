'use client';

import { Button } from '@linktr.ee/arbor/Button';
import {
  CaretDownIcon,
  ExportIcon,
  HeartIcon,
  InfoIcon,
  MapPinIcon,
} from '@phosphor-icons/react';
import Image from 'next/image';
import React, { useState } from 'react';

import { GetInTouchSheet } from './GetInTouchSheet';
import { PerformanceCard } from './performanceCards';
import {
  indexToPerformanceMetric,
  PERFORMANCE_CARDS,
  PERFORMANCE_TABS,
  type PerformanceMetric,
  performanceMetricToIndex,
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
  MEDIA_KIT_SURFACE_GUTTER_CLASS,
  MEDIA_KIT_SURFACE_RADIUS_CLASS,
  PerformanceCarousel,
  Platform,
  PlatformPillTabs,
  ScrollablePillTabs,
  SectionTitle,
  SubsectionLabel,
} from './shared';

const COLLABORATIONS = [
  {
    image: '/media-kit/collab-1.jpg',
    brandLogo: '/media-kit/brand-glossier.png',
    brandName: 'Glossier',
    platform: 'tiktok' as Platform,
  },
  {
    image: '/media-kit/collab-2.jpg',
    brandLogo: '/media-kit/brand-rhode.png',
    brandName: 'Rhode',
    platform: 'instagram' as Platform,
  },
  {
    image: '/media-kit/collab-3.jpg',
    brandLogo: '/media-kit/brand-rare-beauty.png',
    brandName: 'Rare Beauty',
    platform: 'youtube' as Platform,
  },
];

const BRAND_MENTIONS = [
  '/media-kit/mention-1.png',
  '/media-kit/mention-2.png',
  '/media-kit/mention-3.png',
  '/media-kit/mention-4.png',
  '/media-kit/mention-5.png',
  '/media-kit/mention-6.png',
  '/media-kit/brand-glossier-g-icon.png',
  '/media-kit/mention-7.png',
];

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

export function MediaKitProfile() {
  const [socialPlatform, setSocialPlatform] = useState<Platform>('instagram');
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
  const social = PLATFORM_STATS[socialPlatform].social;
  const locationRankings = audience.locations[locationTab];

  return (
    <div
      className="relative h-[812px] w-[375px] shrink-0 overflow-hidden rounded-[24px] shadow-elevation-400"
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
        className={`relative z-[1] h-full scrollbar-hide ${
          sheetOpen ? 'overflow-hidden' : 'overflow-y-auto'
        }`}
        data-media-kit-scroll
      >
        <div
          className={`flex flex-col gap-[40px] pb-10 pt-[92px] ${MEDIA_KIT_PAGE_GUTTER_CLASS}`}
        >
          <h1 className="w-full text-center text-title-md text-black">
            Work with me
          </h1>

          {/* Profile card */}
          <div
            className={`flex w-full flex-col gap-4 bg-primary p-5 ${MEDIA_KIT_SURFACE_RADIUS_CLASS}`}
          >
            <div className="relative mx-auto size-[96px] overflow-hidden rounded-full">
              <Image
                src="/media-kit/avatar.jpg"
                alt="Jean"
                fill
                className="object-cover"
              />
            </div>
            <p className="w-full text-center text-title-md text-primary">
              Jean
            </p>
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
              <div className="flex items-center gap-2">
                <HeartIcon
                  size={16}
                  weight="regular"
                  className="shrink-0 text-primary"
                />
                <p className="whitespace-nowrap text-body-sm text-primary">
                  Interests in <span className="font-bold">music</span>,{' '}
                  <span className="font-bold">fashion</span>, and{' '}
                  <span className="font-bold">lifestyle</span>
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
          </div>

          {/* Audience */}
          <section className="flex w-full flex-col gap-6">
            <SectionTitle>Audience</SectionTitle>
            <div className="flex w-full flex-col gap-3">
              <div
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

                  <div
                    className={`flex flex-col ${breakdownOpen ? 'pt-4' : ''}`}
                  >
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
              </div>

              <LinktreeAttribution
                prefix="Social audience data aggregated by"
                showPlatformIcons
              />
            </div>
          </section>

          {/* Performance */}
          <section className="flex w-full flex-col gap-6">
            <SectionTitle>Performance</SectionTitle>
            <div className="flex flex-col gap-3">
              <ScrollablePillTabs
                tabs={PERFORMANCE_TABS}
                active={performanceMetric}
                onChange={setPerformanceMetric}
              />

              <PerformanceCarousel
                activeIndex={performanceMetricToIndex(performanceMetric)}
                onActiveIndexChange={index =>
                  setPerformanceMetric(indexToPerformanceMetric(index))
                }
              >
                {PERFORMANCE_CARDS.map(card => (
                  <PerformanceCard
                    key={card.id}
                    data={card}
                    onInfoClick={() => setPerformanceInfoMetric(card.id)}
                  />
                ))}
              </PerformanceCarousel>

              <LinktreeAttribution prefix="Compared to similar music and fashion creators on" />
            </div>
          </section>

          {/* Brand partnerships */}
          <section className="flex w-full flex-col gap-6">
            <SectionTitle>Brand partnerships</SectionTitle>
            <div
              className={`flex w-full flex-col gap-6 bg-primary py-5 ${MEDIA_KIT_SURFACE_GUTTER_CLASS} ${MEDIA_KIT_SURFACE_RADIUS_CLASS}`}
            >
              <div className="flex min-w-0 flex-col gap-6">
                <SubsectionLabel>Collaborations</SubsectionLabel>
                <CollaborationCarousel>
                  {COLLABORATIONS.map(collab => (
                    <CollaborationPost key={collab.brandName} {...collab} />
                  ))}
                </CollaborationCarousel>
              </div>
              <div
                className="w-full shrink-0 border-t border-secondary"
                role="separator"
              />
              <div className="flex flex-col gap-6">
                <SubsectionLabel>Brand mentions</SubsectionLabel>
                <BrandMentionGrid logos={BRAND_MENTIONS} />
              </div>
            </div>
          </section>

          {/* Social data */}
          <section className="flex w-full flex-col gap-6">
            <SectionTitle>Social data</SectionTitle>
            <div className="flex w-full flex-col gap-3">
              <div
                className={`flex w-full flex-col gap-4 bg-primary p-5 ${MEDIA_KIT_SURFACE_RADIUS_CLASS}`}
              >
                <PlatformPillTabs
                  active={socialPlatform}
                  onChange={setSocialPlatform}
                />
                <div
                  key={socialPlatform}
                  className={`flex w-full flex-col items-center gap-2 p-4 ${MEDIA_KIT_ACCENT_RADIUS_CLASS}`}
                  style={{ backgroundColor: MEDIA_KIT_ACCENT }}
                >
                  <p className="text-body-xs text-secondary">
                    {social.totalLabel}
                  </p>
                  <p className="text-body-lg-emph text-primary">
                    {social.total}
                  </p>
                </div>
                <div
                  key={`${socialPlatform}-grid`}
                  className="grid grid-cols-2 gap-3"
                >
                  <SocialStat
                    label={social.impressionsLabel}
                    value={social.impressions}
                  />
                  <SocialStat
                    label={social.growthLabel}
                    value={social.growth}
                    positive={social.growthPositive}
                  />
                  <SocialStat
                    label="Engagement rate"
                    value={social.engagementRate}
                  />
                  <SocialStat
                    label="Engagement growth"
                    value={social.engagementGrowth}
                    positive={social.engagementGrowthPositive}
                  />
                  <SocialStat
                    label="Average EMV"
                    value={social.averageEmv}
                    info
                  />
                  <SocialStat
                    label="Posting frequency"
                    value={
                      <>
                        <span className="text-body-lg-emph">
                          {social.postingFrequencyPrimary}
                        </span>{' '}
                        <span className="text-body-sm">
                          {social.postingFrequencySecondary}
                        </span>
                      </>
                    }
                  />
                </div>
              </div>
              <LinktreeAttribution prefix="Social data verified by" />
            </div>
          </section>
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

function SocialStat({
  label,
  value,
  positive,
  info,
}: {
  label: string;
  value: React.ReactNode;
  positive?: boolean;
  info?: boolean;
}) {
  return (
    <div
      className={`relative flex h-[96px] flex-col items-center justify-center gap-2 p-4 ${MEDIA_KIT_ACCENT_RADIUS_CLASS}`}
      style={{ backgroundColor: MEDIA_KIT_ACCENT }}
    >
      {info && (
        <InfoIcon
          size={16}
          weight="regular"
          className="absolute right-2 top-2 text-secondary"
        />
      )}
      <p className="text-center text-body-xs text-secondary">{label}</p>
      <p
        className={`text-center text-body-lg-emph ${positive ? 'text-success' : 'text-primary'}`}
      >
        {value}
      </p>
    </div>
  );
}

export default MediaKitProfile;
