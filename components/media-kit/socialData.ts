import { PLATFORM_STATS } from './platformData';
import type { Platform } from './shared';

export type SocialStatKey =
  | 'total'
  | 'impressions'
  | 'growth'
  | 'engagementRate'
  | 'engagementGrowth'
  | 'averageEmv'
  | 'postingFrequency';

export const ALL_SOCIAL_STAT_KEYS: SocialStatKey[] = [
  'total',
  'impressions',
  'growth',
  'engagementRate',
  'engagementGrowth',
  'averageEmv',
  'postingFrequency',
];

export const SOCIAL_GRID_STAT_KEYS: SocialStatKey[] = [
  'impressions',
  'growth',
  'engagementRate',
  'engagementGrowth',
  'averageEmv',
  'postingFrequency',
];

export const SOCIAL_PLATFORMS: Platform[] = ['instagram', 'tiktok', 'youtube'];

export type VisibleSocialStatsByPlatform = Record<Platform, Set<SocialStatKey>>;

export function createDefaultVisibleSocialStatsByPlatform(): VisibleSocialStatsByPlatform {
  const allStats = new Set(ALL_SOCIAL_STAT_KEYS);

  return {
    instagram: new Set(allStats),
    tiktok: new Set(allStats),
    youtube: new Set(allStats),
  };
}

export function getAvailableSocialPlatforms(
  visibleStatsByPlatform: VisibleSocialStatsByPlatform
): Platform[] {
  return SOCIAL_PLATFORMS.filter(
    platform => visibleStatsByPlatform[platform].size > 0
  );
}

export function hasAnyVisibleSocialStats(
  visibleStatsByPlatform: VisibleSocialStatsByPlatform
): boolean {
  return getAvailableSocialPlatforms(visibleStatsByPlatform).length > 0;
}

export function getSocialStatGridRows(
  keys: SocialStatKey[]
): SocialStatKey[][] {
  const count = keys.length;

  if (count === 0) {
    return [];
  }

  if (count <= 3) {
    return keys.map(key => [key]);
  }

  const rows: SocialStatKey[][] = [];
  let index = 0;

  while (index < count) {
    const remaining = count - index;

    if (remaining === 1) {
      rows.push([keys[index]!]);
      index += 1;
      continue;
    }

    rows.push([keys[index]!, keys[index + 1]!]);
    index += 2;
  }

  return rows;
}

export const SOCIAL_PREVIEW_BLOCK_HEIGHT = 408;

export function getSocialPreviewGridRowCount(gridItemCount: number): number {
  if (gridItemCount === 0) {
    return 0;
  }

  if (usesStackedSocialStatGrid(gridItemCount)) {
    return gridItemCount;
  }

  return Math.ceil(gridItemCount / 2);
}

export function getSocialPreviewUnifiedRowCount(
  hasHero: boolean,
  gridItemCount: number
): number {
  return (hasHero ? 1 : 0) + getSocialPreviewGridRowCount(gridItemCount);
}

export function usesStackedSocialStatGrid(count: number): boolean {
  return count > 0 && count <= 3;
}

export function getSocialStatPreviewGridItemClassName(
  index: number,
  count: number
): string {
  if (usesStackedSocialStatGrid(count)) {
    return 'col-span-2';
  }

  if (count % 2 === 1 && index === count - 1) {
    return 'col-span-2';
  }

  return '';
}

export interface PreviewSocialStatItem {
  key: SocialStatKey;
  label: string;
  value: string;
  positive?: boolean;
  info?: boolean;
  postingFrequencyPrimary?: string;
  postingFrequencySecondary?: string;
}

function buildGridStatItem(
  platform: Platform,
  key: SocialStatKey
): PreviewSocialStatItem | null {
  const social = PLATFORM_STATS[platform].social;

  switch (key) {
    case 'impressions':
      return {
        key,
        label: social.impressionsLabel,
        value: social.impressions,
      };
    case 'growth':
      return {
        key,
        label: social.growthLabel,
        value: social.growth,
        positive: social.growthPositive,
      };
    case 'engagementRate':
      return {
        key,
        label: 'Engagement rate',
        value: social.engagementRate,
      };
    case 'engagementGrowth':
      return {
        key,
        label: 'Engagement growth',
        value: social.engagementGrowth,
        positive: social.engagementGrowthPositive,
      };
    case 'averageEmv':
      return {
        key,
        label: 'Average EMV',
        value: social.averageEmv,
        info: true,
      };
    case 'postingFrequency':
      return {
        key,
        label: 'Posting frequency',
        value: social.postingFrequencyPrimary,
        postingFrequencyPrimary: social.postingFrequencyPrimary,
        postingFrequencySecondary: social.postingFrequencySecondary,
      };
    default:
      return null;
  }
}

export function getPreviewSocialStats(
  platform: Platform,
  visibleStats: Set<SocialStatKey>
): {
  hero: PreviewSocialStatItem | null;
  gridItems: PreviewSocialStatItem[];
  gridRows: SocialStatKey[][];
} {
  const social = PLATFORM_STATS[platform].social;

  const hero = visibleStats.has('total')
    ? {
        key: 'total' as const,
        label: social.totalLabel,
        value: social.total,
      }
    : null;

  const gridItems = SOCIAL_GRID_STAT_KEYS.filter(key => visibleStats.has(key))
    .map(key => buildGridStatItem(platform, key))
    .filter((item): item is PreviewSocialStatItem => item !== null);

  return {
    hero,
    gridItems,
    gridRows: getSocialStatGridRows(gridItems.map(item => item.key)),
  };
}

export function getEditorSocialStatRows(platform: Platform): Array<
  Array<{
    key: SocialStatKey;
    label: string;
    value: string;
    positive?: boolean;
  }>
> {
  const social = PLATFORM_STATS[platform].social;

  return [
    [
      { key: 'total', label: social.totalLabel, value: social.total },
      {
        key: 'impressions',
        label: social.impressionsLabel,
        value: social.impressions,
      },
    ],
    [
      {
        key: 'growth',
        label: social.growthLabel,
        value: social.growth,
        positive: social.growthPositive,
      },
      {
        key: 'engagementRate',
        label: 'Engagement rate',
        value: social.engagementRate,
      },
    ],
    [
      {
        key: 'engagementGrowth',
        label: 'Engagement growth',
        value: social.engagementGrowth,
        positive: social.engagementGrowthPositive,
      },
      { key: 'averageEmv', label: 'Average EMV', value: social.averageEmv },
    ],
    [
      {
        key: 'postingFrequency',
        label: 'Posting frequency',
        value: `${social.postingFrequencyPrimary} ${social.postingFrequencySecondary}`,
      },
    ],
  ];
}
