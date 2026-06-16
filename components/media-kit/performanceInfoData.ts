import type { PerformanceMetric } from './performanceData';

export interface PerformanceInfoContent {
  title: string;
  description?: string;
  bullets: string[];
}

export const PERFORMANCE_INFO: Record<
  PerformanceMetric,
  PerformanceInfoContent
> = {
  ctr: {
    title: 'Click-through rate',
    description:
      'Click-through rate (CTR) is the percentage of views that result in clicks.',
    bullets: [
      'Jean’s average CTR is for their whole Linktree — dividing total clicks on all links by total views.',
      'The CTR for top-performing links divides total clicks on each individual link by total views.',
    ],
  },
  engagement: {
    title: 'Engagement',
    description:
      'These stats cover how Jean’s visitors typically behave, explore and take action when they land on Jean’s Linktree.',
    bullets: [
      'Platform averages compare Jean’s performance to similar music and fashion creators on Linktree with similar views in the last 28 days.',
      'Time spent per visit is estimated by tracking different actions that visitors take when viewing a Linktree.',
    ],
  },
  retention: {
    title: 'Retention',
    description:
      'These stats cover Jean’s returning audience: the number of unique visitors in last 28 days who returned — including those who did so multiple times.',
    bullets: [
      'Returning visits are estimated using browser IDs. Because visitors often use more than one browser, these stats are often under-estimated — but any rankings or comparisons against platform-averages will be 100% accurate.',
      'Platform averages compare Jean’s performance to similar music and fashion creators on Linktree with similar views in the last 28 days.',
    ],
  },
  sales: {
    title: 'Sales',
    description:
      'These stats cover sales made via Jean’s Linktree, not their total sales across platforms. To keep figures accurate no matter where transactions happen, we measure using methods that focus on what we know for sure.',
    bullets: [
      'Jean’s conversion rate is their total number of products sold, divided by the total clicks on monetized products on their Linktree.',
      'Monthly average sales is the total value of products sold before fees, cancellations or returns, averaged out over the last 3 months of sales.',
      'Jean’s top categories receive the most clicks on their Linktree.',
      'Platform averages compare Jean’s performance to similar music and fashion creators on Linktree with similar views in the last 28 days.',
    ],
  },
  traffic: {
    title: 'Traffic',
    bullets: [
      'Jean’s growth percentage compares views in the current 28-day period to the previous 28-day period.',
      'To measure concentration of traffic and identify spikes, we divide Jean’s highest number of daily views in the last month by their total number of views in the last month.',
      'Platform averages compare Jean’s performance to similar music and fashion creators on Linktree with similar views in the last 28 days.',
    ],
  },
};
