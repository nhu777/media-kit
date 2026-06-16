import type { Platform } from './shared';

export type PerformanceMetric =
  | 'ctr'
  | 'engagement'
  | 'retention'
  | 'sales'
  | 'traffic';

export const PERFORMANCE_TABS: { id: PerformanceMetric; label: string }[] = [
  { id: 'ctr', label: 'Click-through rate' },
  { id: 'engagement', label: 'Engagement' },
  { id: 'retention', label: 'Retention' },
  { id: 'sales', label: 'Sales' },
  { id: 'traffic', label: 'Traffic' },
];

export function performanceMetricToIndex(metric: PerformanceMetric): number {
  return PERFORMANCE_TABS.findIndex(tab => tab.id === metric);
}

export function indexToPerformanceMetric(index: number): PerformanceMetric {
  return PERFORMANCE_TABS[index]?.id ?? 'ctr';
}

export interface TopLinkRow {
  title: string;
  clickRate: string;
  image?: string;
  variant?: 'image' | 'ticket';
}

export interface TrafficSourceRow {
  platform: Platform;
  label: string;
  value: string;
}

export interface PerformanceIconStat {
  title: string;
  caption?: string;
  icon: 'users' | 'click' | 'return' | 'eyes' | 'chart';
}

export interface PerformanceCardData {
  id: PerformanceMetric;
  label: string;
  highlight: string;
  topLinks?: TopLinkRow[];
  trafficSources?: TrafficSourceRow[];
  iconStats?: PerformanceIconStat[];
  categories?: string[];
}

export const PERFORMANCE_CARDS: PerformanceCardData[] = [
  {
    id: 'ctr',
    label: 'Click-through rate (CTR)',
    highlight: "Jean's average CTR ranks in the top 15% on Linktree.",
    topLinks: [
      {
        title: 'New Album by KiiKii Listen now',
        clickRate: '85% click rate',
        image: '/media-kit/link-preview-album.jpg',
        variant: 'image',
      },
      {
        title: '2026 Asia Tour Tickets',
        clickRate: '79% click rate',
        variant: 'ticket',
      },
      {
        title: 'KiiiKiii - Delulu Pack [2nd EP]',
        clickRate: '68% click rate',
        image: '/media-kit/link-preview-ep.jpg',
        variant: 'image',
      },
    ],
  },
  {
    id: 'engagement',
    label: 'Engagement',
    highlight: 'Visitors explore deeply, averaging 3+ clicks per visit.',
    trafficSources: [
      { platform: 'instagram', label: 'Instagram', value: '3.2' },
      { platform: 'tiktok', label: 'TikTok', value: '2.8' },
      { platform: 'youtube', label: 'YouTube', value: '2.4' },
    ],
    iconStats: [
      {
        icon: 'users',
        title: "With 100+ daily views, Jean's traffic is consistently high",
        caption: '3x the platform average',
      },
    ],
  },
  {
    id: 'retention',
    label: 'Audience retention',
    highlight: 'Return visitor activity is high, making up 40% of clicks.',
    iconStats: [
      {
        icon: 'users',
        title: '2 in 5 visitors return within a week',
        caption: '3x the platform average',
      },
      {
        icon: 'click',
        title: 'Jean ranks in the top 35% on Linktree for return visits.',
        caption: '4.5x the platform average',
      },
    ],
  },
  {
    id: 'sales',
    label: 'Sales performance',
    highlight: '$5-8k monthly average sales at a 5% conversion rate.',
    categories: ['apparel', 'beauty & wellness', 'music'],
    iconStats: [
      {
        icon: 'return',
        title: '31% of sales are from return visits',
        caption: '4.5x the platform average',
      },
    ],
  },
  {
    id: 'traffic',
    label: 'Traffic',
    highlight: "Jean's audience has grown 15% in the last 28 days.",
    iconStats: [
      {
        icon: 'eyes',
        title: "Jean's Linktree has been viewed 3049 times in the last 28 days",
        caption: '3x the platform average',
      },
      {
        icon: 'chart',
        title:
          'This compares to 2,811 total views in the previous 28-day period',
      },
    ],
  },
];
