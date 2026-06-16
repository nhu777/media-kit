'use client';

import {
  InstagramLogoIcon,
  TiktokLogoIcon,
  YoutubeLogoIcon,
} from '@phosphor-icons/react';
import {
  animate as motionAnimate,
  motion,
  useReducedMotion,
} from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

export const MEDIA_KIT_ACCENT = '#eef4e4';
/** Corner radius for green accent stat surfaces. */
export const MEDIA_KIT_ACCENT_RADIUS_CLASS = 'rounded-[16px]';
/** Corner radius for white content surfaces. */
export const MEDIA_KIT_SURFACE_RADIUS_CLASS = 'rounded-[16px]';
/** Horizontal inset from the 375px frame edge to section content. */
export const MEDIA_KIT_PAGE_GUTTER = 16;
export const MEDIA_KIT_PAGE_GUTTER_CLASS = 'px-[16px]';
/** White card width: 375 − (2 × 16). */
export const MEDIA_KIT_CONTENT_WIDTH = 375 - MEDIA_KIT_PAGE_GUTTER * 2;
export const MEDIA_KIT_CONTENT_WIDTH_CLASS = 'w-[343px]';
export const MEDIA_KIT_BAR = '#a9b791';

const CHART_EASE = [0.32, 0.72, 0, 1] as const;
const AGE_BAR_EASE = [0.16, 1, 0.3, 1] as const;
const AGE_BAR_STAGGER = 0.14;

function useActiveChartAnimation(isActive: boolean) {
  const prefersReducedMotion = useReducedMotion();
  const [animationKey, setAnimationKey] = useState(0);
  const prevActiveRef = useRef(false);

  useLayoutEffect(() => {
    if (isActive && !prevActiveRef.current && !prefersReducedMotion) {
      setAnimationKey(key => key + 1);
    }
    prevActiveRef.current = isActive;
  }, [isActive, prefersReducedMotion]);

  return {
    shouldAnimate: isActive && !prefersReducedMotion,
    animationKey,
  };
}

export type Platform = 'instagram' | 'tiktok' | 'youtube';

const PLATFORMS: { id: Platform; label: string; icon: React.ElementType }[] = [
  { id: 'instagram', label: 'Instagram', icon: InstagramLogoIcon },
  { id: 'tiktok', label: 'TikTok', icon: TiktokLogoIcon },
  { id: 'youtube', label: 'YouTube', icon: YoutubeLogoIcon },
];

interface PlatformPillTabsProps {
  active: Platform;
  onChange?: (platform: Platform) => void;
}

export function PlatformPillTabs({ active, onChange }: PlatformPillTabsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {PLATFORMS.map(({ id, label, icon: Icon }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange?.(id)}
            className={`flex items-center gap-1 rounded-full px-3 py-2 text-body-xs-emph transition-colors ${
              isActive
                ? 'bg-inverse text-on-inverse-primary'
                : 'border border-white/10 text-primary'
            }`}
          >
            <Icon size={16} weight="regular" />
            {label}
          </button>
        );
      })}
    </div>
  );
}

export type BreakdownTab = 'gender' | 'age' | 'location';

export const BREAKDOWN_TABS: { id: BreakdownTab; label: string }[] = [
  { id: 'gender', label: 'Gender' },
  { id: 'age', label: 'Age' },
  { id: 'location', label: 'Location' },
];

export function breakdownTabToIndex(tab: BreakdownTab): number {
  if (tab === 'gender') return 0;
  if (tab === 'age') return 1;
  return 2;
}

export function indexToBreakdownTab(index: number): BreakdownTab {
  if (index === 0) return 'gender';
  if (index === 1) return 'age';
  return 'location';
}

interface BreakdownPillTabsProps {
  active: BreakdownTab;
  onChange?: (tab: BreakdownTab) => void;
}

export function BreakdownPillTabs({
  active,
  onChange,
}: BreakdownPillTabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {BREAKDOWN_TABS.map(({ id, label }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange?.(id)}
            className={`rounded-full px-3 py-2 text-body-xs-emph ${
              isActive ? 'bg-inverse text-on-inverse-primary' : 'text-primary'
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

interface ScrollablePillTabsProps<T extends string> {
  tabs: { id: T; label: string }[];
  active: T;
  onChange?: (id: T) => void;
}

export function ScrollablePillTabs<T extends string>({
  tabs,
  active,
  onChange,
}: ScrollablePillTabsProps<T>) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const prevActiveRef = useRef<T | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const activeIndex = tabs.findIndex(tab => tab.id === active);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || activeIndex < 0) return;

    let layoutFrame = 0;

    const runScroll = () => {
      const chips = Array.from(container.children) as HTMLElement[];
      const targetLeft = getChipScrollLeft(container, chips, activeIndex);

      if (prevActiveRef.current === null) {
        prevActiveRef.current = active;
        container.scrollLeft = targetLeft;
        return;
      }

      if (prevActiveRef.current === active) return;

      prevActiveRef.current = active;

      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }

      animateScrollTo(container, targetLeft, undefined, animationFrameRef, {
        minDuration: 280,
        maxDuration: 480,
        navigate: true,
      });
    };

    layoutFrame = requestAnimationFrame(() => {
      layoutFrame = requestAnimationFrame(runScroll);
    });

    return () => {
      cancelAnimationFrame(layoutFrame);
    };
  }, [active, activeIndex]);

  return (
    <div
      ref={scrollRef}
      className={`flex gap-2 overflow-x-auto scrollbar-hide ${MEDIA_KIT_SURFACE_BLEED_CLASS} ${MEDIA_KIT_SURFACE_GUTTER_CLASS}`}
      style={{ scrollPaddingInline: MEDIA_KIT_SURFACE_GUTTER }}
    >
      {tabs.map(tab => {
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange?.(tab.id)}
            className={`shrink-0 whitespace-nowrap rounded-full px-3 py-2 text-body-xs-emph ${
              isActive ? 'bg-inverse text-on-inverse-primary' : 'text-primary'
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

interface SectionTitleProps {
  children: React.ReactNode;
}

export function SectionTitle({ children }: SectionTitleProps) {
  return (
    <h2 className="text-title-md text-primary whitespace-nowrap">{children}</h2>
  );
}

interface SubsectionLabelProps {
  children: React.ReactNode;
}

export function SubsectionLabel({ children }: SubsectionLabelProps) {
  return <p className="text-body-xs text-secondary">{children}</p>;
}

interface AccentStatCardProps {
  label: string;
  value: React.ReactNode;
  className?: string;
}

export function AccentStatCard({
  label,
  value,
  className,
}: AccentStatCardProps) {
  return (
    <div
      className={`flex flex-col gap-2 border border-white/10 p-5 ${MEDIA_KIT_ACCENT_RADIUS_CLASS} ${className ?? ''}`}
      style={{ backgroundColor: MEDIA_KIT_ACCENT }}
    >
      <p className="text-body-xs text-secondary">{label}</p>
      <p className="text-body-lg-emph text-primary">{value}</p>
    </div>
  );
}

interface AgeBarProps {
  percent: number;
  range: string;
  animate?: boolean;
  delay?: number;
}

export function AgeBar({
  percent,
  range,
  animate = false,
  delay = 0,
}: AgeBarProps) {
  return (
    <div
      className="relative flex h-10 w-full items-center overflow-hidden rounded-full"
      style={{ backgroundColor: 'rgba(255,255,255,0.56)' }}
    >
      <motion.div
        className="absolute inset-y-0 left-0 rounded-full"
        initial={animate ? { width: '0%', opacity: 0.35 } : false}
        animate={{ width: `${percent}%`, opacity: 1 }}
        transition={{
          duration: 0.9,
          ease: AGE_BAR_EASE,
          delay,
        }}
        style={{ backgroundColor: MEDIA_KIT_BAR }}
      />
      <div className="relative flex items-center gap-2 px-4">
        <span className="text-body-sm text-secondary shrink-0">{percent}%</span>
        <span className="text-body-sm-emph text-primary">{range}</span>
      </div>
    </div>
  );
}

interface RankingRowProps {
  rank: number;
  label: string;
  percent: string;
}

interface LocationRanking {
  rank: number;
  label: string;
  percent: string;
}

export function RankingRow({ rank, label, percent }: RankingRowProps) {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-2">
        <span className="text-body-sm text-secondary w-[19px]">{rank}</span>
        <span className="text-body-sm-emph text-primary">{label}</span>
      </div>
      <span className="text-body-sm-emph text-primary">{percent}</span>
    </div>
  );
}

interface GenderBreakdownItem {
  label: string;
  percent: number;
  color: string;
}

function buildGenderGradient(items: GenderBreakdownItem[], progress: number) {
  let cumulative = 0;
  const stops = items.map(item => {
    const start = cumulative;
    cumulative += item.percent * progress;
    return `${item.color} ${start}% ${cumulative}%`;
  });

  if (progress < 1) {
    stops.push(`${MEDIA_KIT_ACCENT} ${cumulative}% 100%`);
  }

  return stops.join(', ');
}

function GenderPieChart({
  items,
  animate = false,
}: {
  items: GenderBreakdownItem[];
  animate?: boolean;
}) {
  const [progress, setProgress] = useState(animate ? 0 : 1);

  useLayoutEffect(() => {
    if (!animate) {
      setProgress(1);
      return;
    }

    setProgress(0);
    const controls = motionAnimate(0, 1, {
      duration: 0.65,
      ease: CHART_EASE,
      onUpdate: latest => setProgress(latest),
    });

    return () => controls.stop();
  }, [animate]);

  return (
    <div
      className="relative size-[108px] shrink-0 rounded-full"
      style={{
        background: `conic-gradient(from -90deg, ${buildGenderGradient(items, progress)})`,
      }}
    >
      <div
        className="absolute inset-[22px] rounded-full"
        style={{ backgroundColor: MEDIA_KIT_ACCENT }}
      />
    </div>
  );
}

interface GenderBreakdownCardProps {
  items: GenderBreakdownItem[];
  isActive?: boolean;
}

export function GenderBreakdownCard({
  items,
  isActive = false,
}: GenderBreakdownCardProps) {
  const { shouldAnimate, animationKey } = useActiveChartAnimation(isActive);

  return (
    <div
      className={BREAKDOWN_CARD_CLASS}
      style={{ backgroundColor: MEDIA_KIT_ACCENT }}
    >
      <p className="w-full text-body-xs text-secondary">Gender</p>
      <div className="flex w-full flex-1 items-center gap-6">
        <GenderPieChart items={items} animate={shouldAnimate} />
        <div key={animationKey} className="flex flex-1 flex-col gap-3">
          {items.map((item, index) => (
            <motion.div
              key={item.label}
              className="flex items-center gap-1"
              initial={shouldAnimate ? { opacity: 0, x: 6 } : false}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.4,
                ease: CHART_EASE,
                delay: 0.2 + index * 0.08,
              }}
            >
              <span
                className="size-3 shrink-0 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-body-sm text-secondary">{item.label}</span>
              <span className="text-body-sm-emph text-primary">
                {item.percent}%
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface AgeBreakdownCardProps {
  items: { percent: number; range: string }[];
  isActive?: boolean;
}

export function AgeBreakdownCard({
  items,
  isActive = false,
}: AgeBreakdownCardProps) {
  const { shouldAnimate, animationKey } = useActiveChartAnimation(isActive);

  return (
    <div
      className={BREAKDOWN_CARD_CLASS}
      style={{ backgroundColor: MEDIA_KIT_ACCENT }}
    >
      <p className="text-body-xs text-secondary">Age</p>
      <div
        key={animationKey}
        className="flex flex-1 flex-col justify-center gap-2"
      >
        {items.map((item, index) => (
          <AgeBar
            key={item.range}
            percent={item.percent}
            range={item.range}
            animate={shouldAnimate}
            delay={index * AGE_BAR_STAGGER}
          />
        ))}
      </div>
    </div>
  );
}

interface LocationBreakdownCardProps {
  activeTab: 'cities' | 'countries' | 'states';
  onTabChange: (tab: 'cities' | 'countries' | 'states') => void;
  rankings: LocationRanking[];
}

export function LocationBreakdownCard({
  activeTab,
  onTabChange,
  rankings,
}: LocationBreakdownCardProps) {
  return (
    <div
      className={BREAKDOWN_CARD_CLASS}
      style={{ backgroundColor: MEDIA_KIT_ACCENT }}
    >
      <p className="w-full text-body-xs text-secondary">Location</p>
      <div className="flex flex-1 flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          {(['cities', 'countries', 'states'] as const).map(tab => (
            <button
              key={tab}
              type="button"
              onClick={() => onTabChange(tab)}
              className={`rounded-full px-3 py-2 text-body-xs-emph capitalize ${
                activeTab === tab
                  ? 'bg-inverse text-on-inverse-primary'
                  : 'text-primary'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          {rankings.map(row => (
            <RankingRow
              key={`${activeTab}-${row.rank}`}
              rank={row.rank}
              label={row.label}
              percent={row.percent}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function LinktreeAttribution({
  prefix,
  suffix = 'in the last 28 days',
  showPlatformIcons = false,
}: {
  prefix: string;
  suffix?: string;
  showPlatformIcons?: boolean;
}) {
  return (
    <div
      className="flex w-full flex-col items-center justify-center gap-2 rounded-[20px] p-5"
      style={{ backgroundColor: 'rgba(255,255,255,0.45)' }}
    >
      {showPlatformIcons ? (
        <div className="flex items-start gap-1">
          <InstagramLogoIcon
            size={20}
            weight="regular"
            className="text-primary"
          />
          <TiktokLogoIcon size={20} weight="regular" className="text-primary" />
          <YoutubeLogoIcon
            size={20}
            weight="regular"
            className="text-primary"
          />
        </div>
      ) : null}
      <div className="flex flex-wrap items-center justify-center gap-1">
        <span className="text-center text-body-xs text-secondary">
          {prefix}
        </span>
        <Image
          src="/media-kit/linktree-wordmark.svg"
          alt="Linktree"
          width={55}
          height={11}
          className="shrink-0"
        />
        <span className="text-center text-body-xs text-secondary">
          {suffix}
        </span>
      </div>
    </div>
  );
}

/** Horizontal padding inside white section cards (16px from white edge). */
export const MEDIA_KIT_SURFACE_GUTTER = 16;
export const MEDIA_KIT_SURFACE_GUTTER_CLASS = 'px-4';
/** Bleed inner content to the white card edge (cancels surface gutter). */
export const MEDIA_KIT_SURFACE_BLEED_CLASS =
  '-mx-4 min-w-0 w-[calc(100%+2rem)]';
/** Carousel bleeds to section edges; scroll padding supplies the 16px left inset. */
const BREAKDOWN_CARD_WIDTH = 295;
const BREAKDOWN_CARD_GAP = 12;
const BREAKDOWN_CARD_CLASS = `flex h-[216px] w-[295px] shrink-0 flex-col gap-4 p-5 ${MEDIA_KIT_ACCENT_RADIUS_CLASS}`;

function getCarouselCards(container: HTMLElement): HTMLElement[] {
  return Array.from(container.children) as HTMLElement[];
}

function clampScrollLeft(container: HTMLElement, value: number) {
  const maxScroll = container.scrollWidth - container.clientWidth;
  return Math.max(0, Math.min(maxScroll, value));
}

type GetCardScrollLeft = (
  container: HTMLElement,
  cards: HTMLElement[],
  index: number
) => number;

/** Snap target per card — first left-inset; middle centered with peek; last with right inset. */
const getCardScrollLeft: GetCardScrollLeft = (container, cards, index) => {
  const card = cards[index];
  if (!card) return 0;
  const inset = MEDIA_KIT_SURFACE_GUTTER;

  if (index === cards.length - 1) {
    return clampScrollLeft(
      container,
      card.offsetLeft - (container.clientWidth - card.clientWidth - inset)
    );
  }

  if (index === 0) {
    return 0;
  }

  return clampScrollLeft(
    container,
    card.offsetLeft - (container.clientWidth - card.clientWidth) / 2
  );
};

/** Breakdown carousel — only the Age card (index 1) centers with adjacent peek. */
const BREAKDOWN_AGE_CARD_INDEX = 1;

function getBreakdownMaxScrollLeft() {
  const inset = MEDIA_KIT_SURFACE_GUTTER;
  const scrollWidth =
    inset +
    BREAKDOWN_CARD_WIDTH +
    BREAKDOWN_CARD_GAP +
    BREAKDOWN_CARD_WIDTH +
    BREAKDOWN_CARD_GAP +
    BREAKDOWN_CARD_WIDTH +
    inset;
  return scrollWidth - MEDIA_KIT_CONTENT_WIDTH;
}

function clampBreakdownScrollLeft(value: number) {
  return Math.max(0, Math.min(getBreakdownMaxScrollLeft(), value));
}

function getBreakdownCardOffset(index: number) {
  const inset = MEDIA_KIT_SURFACE_GUTTER;
  return inset + index * (BREAKDOWN_CARD_WIDTH + BREAKDOWN_CARD_GAP);
}

const getBreakdownCardScrollLeft: GetCardScrollLeft = (
  container,
  cards,
  index
) => {
  const card = cards[index];
  if (!card) return 0;
  const inset = MEDIA_KIT_SURFACE_GUTTER;
  const viewportWidth = MEDIA_KIT_CONTENT_WIDTH;

  if (index === 0) {
    return 0;
  }

  if (index === BREAKDOWN_AGE_CARD_INDEX) {
    const ageLeft = getBreakdownCardOffset(BREAKDOWN_AGE_CARD_INDEX);
    return clampBreakdownScrollLeft(
      ageLeft - (viewportWidth - BREAKDOWN_CARD_WIDTH) / 2
    );
  }

  const locationLeft = getBreakdownCardOffset(2);
  return clampBreakdownScrollLeft(
    locationLeft - (viewportWidth - BREAKDOWN_CARD_WIDTH - inset)
  );
};

function getChipScrollLeft(
  container: HTMLElement,
  chips: HTMLElement[],
  index: number
): number {
  const chip = chips[index];
  if (!chip) return 0;
  const inset = MEDIA_KIT_SURFACE_GUTTER;

  if (index === chips.length - 1) {
    return clampScrollLeft(
      container,
      chip.offsetLeft - (container.clientWidth - chip.clientWidth - inset)
    );
  }

  if (index === 0) {
    return 0;
  }

  return clampScrollLeft(container, chip.offsetLeft - inset);
}

function getNearestCardIndex(
  container: HTMLElement,
  getScrollLeft: GetCardScrollLeft
): number {
  const cards = getCarouselCards(container);
  if (cards.length === 0) return 0;

  let nearestIndex = 0;
  let nearestDistance = Number.POSITIVE_INFINITY;

  cards.forEach((_, index) => {
    const targetScroll = getScrollLeft(container, cards, index);
    const distance = Math.abs(container.scrollLeft - targetScroll);
    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestIndex = index;
    }
  });

  return nearestIndex;
}

function animateScrollTo(
  container: HTMLElement,
  targetLeft: number,
  onComplete?: () => void,
  animationFrameRef?: React.MutableRefObject<number | null>,
  options?: { minDuration?: number; maxDuration?: number; navigate?: boolean }
) {
  const startLeft = container.scrollLeft;
  const distance = targetLeft - startLeft;

  if (Math.abs(distance) < 0.5) {
    container.scrollLeft = targetLeft;
    onComplete?.();
    return;
  }

  const minDuration = options?.minDuration ?? 240;
  const maxDuration = options?.maxDuration ?? 420;
  const duration = Math.min(
    maxDuration,
    Math.max(
      minDuration,
      Math.abs(distance) * (options?.navigate ? 1.15 : 0.85)
    )
  );
  const startTime = performance.now();
  const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
  const easeInOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const ease = options?.navigate ? easeInOutCubic : easeOutQuart;

  const tick = (now: number) => {
    const progress = Math.min((now - startTime) / duration, 1);
    container.scrollLeft = startLeft + distance * ease(progress);

    if (progress < 1) {
      const frame = requestAnimationFrame(tick);
      if (animationFrameRef) animationFrameRef.current = frame;
    } else {
      container.scrollLeft = targetLeft;
      if (animationFrameRef) animationFrameRef.current = null;
      onComplete?.();
    }
  };

  const frame = requestAnimationFrame(tick);
  if (animationFrameRef) animationFrameRef.current = frame;
}

function snapToNearestCard(
  container: HTMLElement,
  getScrollLeft: GetCardScrollLeft,
  onComplete?: () => void,
  animationFrameRef?: React.MutableRefObject<number | null>
) {
  const cards = getCarouselCards(container);
  if (cards.length === 0) {
    onComplete?.();
    return;
  }

  const nearestIndex = getNearestCardIndex(container, getScrollLeft);
  animateScrollTo(
    container,
    getScrollLeft(container, cards, nearestIndex),
    onComplete,
    animationFrameRef
  );
}

const BREAKDOWN_DRAG_AXIS_THRESHOLD = 6;
const BREAKDOWN_FLING_DECAY = 0.94;
const BREAKDOWN_FLING_MIN_VELOCITY = 0.35;

interface SnapCarouselProps {
  children: React.ReactNode;
  activeIndex?: number;
  onActiveIndexChange?: (index: number) => void;
  getScrollLeft: GetCardScrollLeft;
  gapClass?: string;
  paddingInline?: number;
  paddingInlineEnd?: number;
  navigateKey?: number;
  /** Change when the carousel container resizes (e.g. collapsible section opens). */
  layoutKey?: boolean | number;
  enableAdjacentCardTap?: boolean;
  enableDrag?: boolean;
  /** Lock scrollport width when flex layout would otherwise expand to fit all cards. */
  viewportWidth?: number;
}

function SnapCarousel({
  children,
  activeIndex = 0,
  onActiveIndexChange,
  getScrollLeft,
  gapClass = 'gap-3',
  paddingInline,
  paddingInlineEnd,
  navigateKey = 0,
  layoutKey,
  enableAdjacentCardTap = false,
  enableDrag = true,
  viewportWidth,
}: SnapCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isSnappingRef = useRef(false);
  const suppressClickRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const scrollIdleTimerRef = useRef<number | null>(null);
  const onActiveIndexChangeRef = useRef(onActiveIndexChange);
  const getScrollLeftRef = useRef(getScrollLeft);
  const activeIndexRef = useRef(activeIndex);
  const isNavigatingRef = useRef(false);
  const prevActiveIndexRef = useRef<number | null>(null);
  const prevNavigateKeyRef = useRef(navigateKey);
  const prevLayoutKeyRef = useRef(layoutKey);
  const enableAdjacentCardTapRef = useRef(enableAdjacentCardTap);
  const pendingNavigateIndexRef = useRef<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  onActiveIndexChangeRef.current = onActiveIndexChange;
  getScrollLeftRef.current = getScrollLeft;
  activeIndexRef.current = activeIndex;
  enableAdjacentCardTapRef.current = enableAdjacentCardTap;

  const cancelAnimation = () => {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  };

  const cancelScheduledSnap = () => {
    if (scrollIdleTimerRef.current !== null) {
      window.clearTimeout(scrollIdleTimerRef.current);
      scrollIdleTimerRef.current = null;
    }
  };

  const notifyActiveIndex = (container: HTMLElement) => {
    if (isNavigatingRef.current) return;

    if (pendingNavigateIndexRef.current !== null) {
      const cards = getCarouselCards(container);
      const targetLeft = getScrollLeftRef.current(
        container,
        cards,
        pendingNavigateIndexRef.current
      );
      if (Math.abs(container.scrollLeft - targetLeft) > 1) return;
      pendingNavigateIndexRef.current = null;
    }

    const nearestIndex = getNearestCardIndex(
      container,
      getScrollLeftRef.current
    );
    if (nearestIndex !== activeIndexRef.current) {
      onActiveIndexChangeRef.current?.(nearestIndex);
    }
  };

  useLayoutEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let layoutFrame = 0;
    let cancelled = false;

    const runNavigate = () => {
      if (cancelled) return;

      if (container.clientWidth === 0) {
        layoutFrame = requestAnimationFrame(() => {
          layoutFrame = requestAnimationFrame(runNavigate);
        });
        return;
      }

      const cards = getCarouselCards(container);
      const card = cards[activeIndex];
      if (!card) return;

      const targetLeft = getScrollLeftRef.current(
        container,
        cards,
        activeIndex
      );

      const previousIndex = prevActiveIndexRef.current;
      const navigateKeyChanged = prevNavigateKeyRef.current !== navigateKey;
      const layoutKeyChanged = prevLayoutKeyRef.current !== layoutKey;
      prevNavigateKeyRef.current = navigateKey;
      prevLayoutKeyRef.current = layoutKey;

      if (previousIndex === null) {
        container.scrollLeft = targetLeft;
        prevActiveIndexRef.current = activeIndex;
        return;
      }

      if (
        previousIndex === activeIndex &&
        !navigateKeyChanged &&
        !layoutKeyChanged
      ) {
        return;
      }

      cancelAnimation();
      cancelScheduledSnap();
      isSnappingRef.current = true;
      isNavigatingRef.current = true;
      pendingNavigateIndexRef.current = activeIndex;

      animateScrollTo(
        container,
        targetLeft,
        () => {
          isSnappingRef.current = false;
          isNavigatingRef.current = false;
          prevActiveIndexRef.current = activeIndex;
          pendingNavigateIndexRef.current = null;
          cancelScheduledSnap();
        },
        animationFrameRef,
        { minDuration: 380, maxDuration: 680, navigate: true }
      );
    };

    layoutFrame = requestAnimationFrame(() => {
      layoutFrame = requestAnimationFrame(runNavigate);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(layoutFrame);
      cancelAnimation();
      isSnappingRef.current = false;
      isNavigatingRef.current = false;
      pendingNavigateIndexRef.current = null;
    };
  }, [activeIndex, navigateKey, layoutKey]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollParent = container.closest(
      '[data-media-kit-scroll]'
    ) as HTMLElement | null;

    let skipNextScrollEnd = false;

    const runSnap = () => {
      if (isSnappingRef.current || isNavigatingRef.current) {
        return;
      }

      const cards = getCarouselCards(container);
      if (cards.length === 0) return;

      const nearestIndex = getNearestCardIndex(
        container,
        getScrollLeftRef.current
      );
      const targetLeft = getScrollLeftRef.current(
        container,
        cards,
        nearestIndex
      );

      if (Math.abs(container.scrollLeft - targetLeft) < 1) {
        notifyActiveIndex(container);
        return;
      }

      isSnappingRef.current = true;
      skipNextScrollEnd = true;

      snapToNearestCard(
        container,
        getScrollLeftRef.current,
        () => {
          isSnappingRef.current = false;
          notifyActiveIndex(container);
        },
        animationFrameRef
      );
    };

    const scheduleSnapAfterScroll = () => {
      if (isSnappingRef.current || isNavigatingRef.current) {
        return;
      }

      cancelScheduledSnap();

      scrollIdleTimerRef.current = window.setTimeout(() => {
        scrollIdleTimerRef.current = null;
        if (isSnappingRef.current || isNavigatingRef.current) {
          return;
        }
        runSnap();
      }, 150);
    };

    const onScroll = () => {
      scheduleSnapAfterScroll();
    };

    const onScrollEnd = () => {
      if (skipNextScrollEnd) {
        skipNextScrollEnd = false;
        return;
      }
      if (isSnappingRef.current || isNavigatingRef.current) {
        return;
      }
      runSnap();
    };

    const onClickCapture = (event: MouseEvent) => {
      if (suppressClickRef.current) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      if (!enableAdjacentCardTapRef.current) return;

      const target = event.target as HTMLElement;
      if (target.closest('button, a, input, textarea, select')) return;

      const cards = getCarouselCards(container);
      const clickedIndex = cards.findIndex(card => card.contains(target));
      if (clickedIndex === -1) return;

      const current = activeIndexRef.current;
      if (clickedIndex === current - 1 || clickedIndex === current + 1) {
        event.preventDefault();
        event.stopPropagation();
        onActiveIndexChangeRef.current?.(clickedIndex);
      }
    };

    const drag = {
      pointerId: -1,
      startX: 0,
      startY: 0,
      startScrollLeft: 0,
      lastX: 0,
      lastTime: 0,
      velocity: 0,
      axis: null as 'x' | 'y' | null,
      moved: false,
    };

    const isFlingingRef = { current: false };

    const runSnapWithFling = () => {
      if (
        isSnappingRef.current ||
        isFlingingRef.current ||
        isNavigatingRef.current
      ) {
        return;
      }

      runSnap();
    };

    const scheduleSnapAfterScrollWithDrag = () => {
      if (
        isSnappingRef.current ||
        isFlingingRef.current ||
        isNavigatingRef.current ||
        drag.axis === 'x'
      ) {
        return;
      }

      cancelScheduledSnap();

      scrollIdleTimerRef.current = window.setTimeout(() => {
        scrollIdleTimerRef.current = null;
        if (
          isSnappingRef.current ||
          isFlingingRef.current ||
          isNavigatingRef.current ||
          drag.axis === 'x'
        ) {
          return;
        }
        runSnap();
      }, 150);
    };

    const resetDrag = () => {
      drag.pointerId = -1;
      drag.axis = null;
      drag.moved = false;
      drag.velocity = 0;
      setIsDragging(false);
      container.style.touchAction = 'pan-x';
      if (scrollParent) scrollParent.style.overflowY = '';
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0 && event.pointerType === 'mouse') return;

      const target = event.target as HTMLElement;
      if (target.closest('button, a, input, textarea, select')) return;

      drag.pointerId = event.pointerId;
      drag.startX = event.clientX;
      drag.startY = event.clientY;
      drag.startScrollLeft = container.scrollLeft;
      drag.lastX = event.clientX;
      drag.lastTime = performance.now();
      drag.velocity = 0;
      drag.axis = null;
      drag.moved = false;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerId !== drag.pointerId) return;

      const deltaX = event.clientX - drag.startX;
      const deltaY = event.clientY - drag.startY;

      if (drag.axis === null) {
        if (
          Math.abs(deltaX) < BREAKDOWN_DRAG_AXIS_THRESHOLD &&
          Math.abs(deltaY) < BREAKDOWN_DRAG_AXIS_THRESHOLD
        ) {
          return;
        }

        drag.axis = Math.abs(deltaX) > Math.abs(deltaY) ? 'x' : 'y';

        if (drag.axis === 'y') {
          if (container.hasPointerCapture(event.pointerId)) {
            container.releasePointerCapture(event.pointerId);
          }
          resetDrag();
          return;
        }

        setIsDragging(true);
        cancelAnimation();
        cancelScheduledSnap();
        isSnappingRef.current = false;
        isFlingingRef.current = false;
        isNavigatingRef.current = false;
        pendingNavigateIndexRef.current = null;
        container.setPointerCapture(event.pointerId);
        container.style.touchAction = 'none';
        if (scrollParent) scrollParent.style.overflowY = 'hidden';
      }

      if (drag.axis !== 'x') return;

      event.preventDefault();

      const now = performance.now();
      const elapsed = now - drag.lastTime;
      if (elapsed > 0) {
        drag.velocity = (event.clientX - drag.lastX) / elapsed;
      }
      drag.lastX = event.clientX;
      drag.lastTime = now;
      drag.moved = true;

      container.scrollLeft = clampScrollLeft(
        container,
        drag.startScrollLeft - deltaX
      );
    };

    const finishHorizontalDrag = () => {
      if (!drag.moved) return;

      suppressClickRef.current = true;
      window.setTimeout(() => {
        suppressClickRef.current = false;
      }, 0);

      cancelScheduledSnap();

      const startFlingVelocity = drag.velocity * 18;
      let velocity = startFlingVelocity;

      const step = () => {
        if (Math.abs(velocity) < BREAKDOWN_FLING_MIN_VELOCITY) {
          animationFrameRef.current = null;
          isFlingingRef.current = false;
          runSnapWithFling();
          return;
        }

        isFlingingRef.current = true;
        container.scrollLeft = clampScrollLeft(
          container,
          container.scrollLeft - velocity
        );
        velocity *= BREAKDOWN_FLING_DECAY;
        animationFrameRef.current = requestAnimationFrame(step);
      };

      if (Math.abs(startFlingVelocity) >= BREAKDOWN_FLING_MIN_VELOCITY) {
        isFlingingRef.current = true;
        step();
      } else {
        runSnapWithFling();
      }
    };

    const onPointerUp = (event: PointerEvent) => {
      if (event.pointerId !== drag.pointerId) return;

      const wasHorizontal = drag.axis === 'x';
      const didMove = drag.moved;

      if (container.hasPointerCapture(event.pointerId)) {
        container.releasePointerCapture(event.pointerId);
      }

      if (scrollParent) scrollParent.style.overflowY = '';

      if (wasHorizontal && didMove) {
        finishHorizontalDrag();
      }

      resetDrag();
    };

    const onScrollWithDrag = () => {
      scheduleSnapAfterScrollWithDrag();
    };

    const onScrollEndWithDrag = () => {
      if (skipNextScrollEnd) {
        skipNextScrollEnd = false;
        return;
      }
      if (
        drag.axis === 'x' ||
        isSnappingRef.current ||
        isFlingingRef.current ||
        isNavigatingRef.current
      ) {
        return;
      }
      runSnapWithFling();
    };

    if (enableDrag) {
      container.addEventListener('scroll', onScrollWithDrag, { passive: true });
      container.addEventListener('pointerdown', onPointerDown);
      container.addEventListener('pointermove', onPointerMove, {
        passive: false,
      });
      container.addEventListener('pointerup', onPointerUp);
      container.addEventListener('pointercancel', onPointerUp);
      container.addEventListener('scrollend', onScrollEndWithDrag);
    } else {
      container.addEventListener('scroll', onScroll, { passive: true });
      container.addEventListener('scrollend', onScrollEnd);
    }

    if (enableAdjacentCardTap) {
      container.addEventListener('click', onClickCapture, true);
    }

    return () => {
      cancelAnimation();
      cancelScheduledSnap();
      if (enableDrag) {
        container.removeEventListener('scroll', onScrollWithDrag);
        container.removeEventListener('pointerdown', onPointerDown);
        container.removeEventListener('pointermove', onPointerMove);
        container.removeEventListener('pointerup', onPointerUp);
        container.removeEventListener('pointercancel', onPointerUp);
        container.removeEventListener('scrollend', onScrollEndWithDrag);
      } else {
        container.removeEventListener('scroll', onScroll);
        container.removeEventListener('scrollend', onScrollEnd);
      }
      if (enableAdjacentCardTap) {
        container.removeEventListener('click', onClickCapture, true);
      }
      if (scrollParent) scrollParent.style.overflowY = '';
    };
  }, [enableDrag, enableAdjacentCardTap]);

  return (
    <div
      ref={scrollRef}
      className={`flex min-w-0 w-full max-w-full flex-nowrap items-stretch overflow-x-auto scrollbar-hide ${gapClass} ${
        enableDrag
          ? isDragging
            ? 'cursor-grabbing select-none'
            : 'cursor-grab'
          : ''
      }`}
      style={{
        scrollSnapType: 'none',
        ...(viewportWidth !== undefined
          ? { width: '100%', maxWidth: viewportWidth }
          : {}),
        ...(paddingInline !== undefined || paddingInlineEnd !== undefined
          ? {
              paddingInlineStart: paddingInline ?? 0,
              paddingInlineEnd: paddingInlineEnd ?? paddingInline ?? 0,
              scrollPaddingInlineStart: paddingInline ?? 0,
              scrollPaddingInlineEnd: paddingInlineEnd ?? paddingInline ?? 0,
            }
          : {}),
        touchAction: 'pan-x',
        overscrollBehaviorX: 'none',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {children}
    </div>
  );
}

interface BreakdownCarouselProps {
  children: React.ReactNode;
  /** Active card index (0 = Gender, 1 = Age, 2 = Location). */
  activeIndex?: number;
  onActiveIndexChange?: (index: number) => void;
}

export function BreakdownCarousel({
  children,
  activeIndex = 0,
  onActiveIndexChange,
}: BreakdownCarouselProps) {
  return (
    <div className={`${MEDIA_KIT_SURFACE_BLEED_CLASS} min-w-0 overflow-hidden`}>
      <SnapCarousel
        activeIndex={activeIndex}
        onActiveIndexChange={onActiveIndexChange}
        getScrollLeft={getBreakdownCardScrollLeft}
        gapClass="gap-3"
        paddingInline={MEDIA_KIT_SURFACE_GUTTER}
        viewportWidth={MEDIA_KIT_CONTENT_WIDTH}
        enableAdjacentCardTap
      >
        {children}
      </SnapCarousel>
    </div>
  );
}

interface PerformanceCarouselProps {
  children: React.ReactNode;
  activeIndex?: number;
  onActiveIndexChange?: (index: number) => void;
}

export function PerformanceCarousel({
  children,
  activeIndex = 0,
  onActiveIndexChange,
}: PerformanceCarouselProps) {
  return (
    <div className={MEDIA_KIT_SURFACE_BLEED_CLASS}>
      <SnapCarousel
        activeIndex={activeIndex}
        onActiveIndexChange={onActiveIndexChange}
        getScrollLeft={getCardScrollLeft}
        gapClass="gap-3"
        paddingInline={MEDIA_KIT_SURFACE_GUTTER}
        enableAdjacentCardTap
      >
        {children}
      </SnapCarousel>
    </div>
  );
}

export function CollaborationCarousel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`flex min-w-0 gap-2 overflow-x-auto scrollbar-hide ${MEDIA_KIT_SURFACE_BLEED_CLASS} ${MEDIA_KIT_SURFACE_GUTTER_CLASS}`}
      style={{
        scrollPaddingInline: MEDIA_KIT_SURFACE_GUTTER,
        WebkitOverflowScrolling: 'touch',
        touchAction: 'pan-x',
        overscrollBehaviorX: 'contain',
      }}
    >
      {children}
    </div>
  );
}

const COLLAB_PLATFORM_ICONS: Record<
  Platform,
  { layers: { src: string; inset: string }[] }
> = {
  tiktok: {
    layers: [
      {
        src: '/media-kit/collab-icons/tiktok-1.svg',
        inset: 'inset-[9.38%_12.5%_12.5%_12.5%]',
      },
      {
        src: '/media-kit/collab-icons/tiktok-2.svg',
        inset: 'inset-[6.25%_9.38%_9.38%_9.38%]',
      },
    ],
  },
  instagram: {
    layers: [
      {
        src: '/media-kit/collab-icons/instagram-1.svg',
        inset: 'inset-[12.5%]',
      },
      {
        src: '/media-kit/collab-icons/instagram-2.svg',
        inset: 'inset-[9.38%]',
      },
    ],
  },
  youtube: {
    layers: [
      {
        src: '/media-kit/collab-icons/youtube-1.svg',
        inset: 'inset-[18.75%_9.36%_18.75%_9.38%]',
      },
      {
        src: '/media-kit/collab-icons/youtube-2.svg',
        inset: 'inset-[15.62%_6.25%_15.63%_6.25%]',
      },
    ],
  },
};

function CollaborationPlatformIcon({ platform }: { platform: Platform }) {
  const { layers } = COLLAB_PLATFORM_ICONS[platform];

  return (
    <div className="relative size-5 shrink-0">
      {layers.map(layer => (
        <div key={layer.src} className={`absolute ${layer.inset}`}>
          <Image src={layer.src} alt="" fill className="object-contain" />
        </div>
      ))}
    </div>
  );
}

interface CollaborationPostProps {
  image: string;
  brandLogo: string;
  brandName: string;
  platform: Platform;
}

export function CollaborationPost({
  image,
  brandLogo,
  brandName,
  platform,
}: CollaborationPostProps) {
  return (
    <div className="flex w-[128px] shrink-0 flex-col gap-3">
      <div
        className={`relative flex h-[186px] w-[128px] flex-col items-end overflow-hidden p-2 ${MEDIA_KIT_ACCENT_RADIUS_CLASS}`}
      >
        <Image src={image} alt={brandName} fill className="object-cover" />
        <div className="relative z-[1] flex shrink-0 items-center overflow-hidden rounded-[34px] bg-black/50 p-1">
          <CollaborationPlatformIcon platform={platform} />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative size-[28px] shrink-0">
          <Image
            src={brandLogo}
            alt={brandName}
            fill
            className="object-cover rounded-full"
          />
        </div>
        <span className="text-body-sm-emph text-primary">{brandName}</span>
      </div>
    </div>
  );
}

interface BrandMentionGridProps {
  logos: string[];
}

export function BrandMentionGrid({ logos }: BrandMentionGridProps) {
  return (
    <div className="flex flex-wrap justify-between gap-y-3 w-full">
      {logos.map((logo, i) => (
        <div key={i} className="relative size-[68px] shrink-0">
          <Image src={logo} alt="" fill className="object-cover rounded-full" />
        </div>
      ))}
    </div>
  );
}
